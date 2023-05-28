import dash
from dash import Dash, dcc, html, Input, Output, State, MATCH, Patch, ALL
from dash.dependencies import Output, Input, State
import pandas as pd  
import numpy as np
import dash_bootstrap_components as dbc
import plotly.graph_objects as go
from langchain import PromptTemplate
from langchain.llms import OpenAI
import dash_mantine_components as dmc
from funcs import (
    get_video_text, 
    output_parser, 
    get_n_tokens, 
    insert_query_to_db,
    get_qa_topic
)


from pymongo import MongoClient


client = MongoClient()
db = client.test



app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP, "style.css"])


app.layout = html.Div([
    
    html.H1("LangComprehend"),
    dbc.Row([
        html.H3("This app helps you to generate comprehesion questions for a given text."),
    ]),
    dbc.Row([
        dbc.Col([
            dmc.TextInput(
                label="Select the Youtube Video", 
                # style={"width": 200}, 
                id="video_url",
                value="https://www.youtube.com/watch?v=rxOQtLbaeuw&ab_channel=LeMonde"
            ),
        ]),
        dbc.Col([
            dmc.TextInput(
                label="Insert the API Key", 
                # style={"width": 200}, 
                id="API_KEY",
                value="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"
            ),
        ]),
        dbc.Col([
            dmc.Select(
                label="Select Language",
                placeholder="Language",
                id="language-select",
                value="fr",
                data=[
                    {"value": "fr", "label": "French"},
                    {"value": "it", "label": "Italian"},
                    {"value": "de", "label": "German"},
                    {"value": "en", "label": "English"},
                ],
                # style={"width": 200, "marginBottom": 10},
            ),
        ]),
        dbc.Col([
            dmc.NumberInput(
                label="Select the number of questions",
                value=1,
                min=1,
                max=10,
                step=1,
                id="num-questions"
            )
        ]),
    dbc.Row([
        # dmc.Button("Get Text", variant="gradient", id="get-text-btn"),
        dbc.Col([
            dmc.Button("Get Text", id="get-text-btn", variant="gradient")
        ])
    ]),
    html.Div(
        id="text-output"
    ),
    
    
    dbc.Row([
        dbc.Col([
            dmc.Button("Generate Questions", variant="gradient", id="gen-question-btn"),
        ]),
        dbc.Col([
            dmc.TextInput(
                label="N Tokens",
                id="n-tokens",
                value=0
            ),
        ]),
        dbc.Col([
            dmc.TextInput(
                label="Cost ($)",
                id="cost",
                value=0
            ),
        ])
    ]),
    dmc.Accordion(
        id="questions"
    )

])
], id="main-div")



@app.callback(
    Output("n-tokens", "value"),
    Input("text-output", "children"),
)

def show_n_tokens(text):
    if text:
        return get_n_tokens(text)



@app.callback(
    Output("cost", "value"),
    Input("n-tokens", "value"),
)

def show_cost(n_tokens):
    if n_tokens:
        return int(n_tokens)/1000 * 0.002


@app.callback(
    Output("text-output", "children"),
    Input("get-text-btn", "n_clicks"),
    State("language-select", "value"),
    State("video_url", "value"), 
)

def get_text(button, language, video_url):
    if button:
        print("Getting text: ", button, language, video_url)
        if language and video_url:
            res = get_video_text(video_url, language)
            return res
        else:
            return "Please fill in all the fields"


@app.callback(
    Output("questions", "children"),
    Input("gen-question-btn", "n_clicks"),
    State("text-output", "children"),
    State("num-questions", "value"),
    State("API_KEY", "value"),
    State("language-select", "value"),
)

def get_questions(button, text, num_questions, API_KEY, language):
    if button:
        print(len(text))
        print("Generating questions: ", button, text[:100], num_questions)
        if text and num_questions:
            llm = OpenAI(model_name="gpt-3.5-turbo", openai_api_key=API_KEY)
            formatted = get_qa_topic(num_questions, text, language, 0.3)
            res = llm(formatted)

            print("Questions generated")
            
            questions, answers = output_parser(res, llm)


            print("Questions Formatted:\n", questions)
            print("Answers Formatted:\n", answers)

            insertion_response = insert_query_to_db(
                client=client, 
                db_name="test",
                collection_name="test_col",
                text=text,
                n_questions=num_questions,
                language=language,
                url=None,
                questions=questions,
                answers=answers
                )
            
            print(insertion_response)


            return [dmc.AccordionItem(
                    [
                        dmc.AccordionControl(f"Question {i+1}"),
                        dmc.AccordionPanel(
                            [questions[i],
                            dmc.TextInput(
                                label="Answer",
                                id={
                                    "type": "user_answer", "index": i
                                }
                            ),
                            dmc.TextInput(
                                label="Model Correction",
                                id={
                                    "type": "model_correction",
                                    "index": i,
                                }
                                # id=f"model_correction_{i+1}",
                            ),
                            dbc.Button("Submit Answer", id={"type":"submit-btn", "index":i})# , variant="gradient")
                            ]
                        ),
                    ],
                    value=f"{i+1}",
                ) for i in range(len(questions))]
        else:
            return ["Please fill in all the fields"]



@app.callback(
    Output({"type":"model_correction", "index":MATCH}, "value"),
    # State("questions", "children"),
    Input({"type":"submit-btn", "index":MATCH}, "n_clicks"),
    State({'type': 'submit-btn', 'index': MATCH}, 'id'),
    State({"type": "user_answer", "index":MATCH}, "value"),
    State("language-select", "value"),
    prevent_initial_call=True
)

def check_answer(submit,id, user_answer, language):
    print("Checking answer:", submit,id, user_answer, language)
    if submit:
        pt_check = PromptTemplate(
            input_variables=["answer", "language"],
            template="""
            For the following, only give your answer in the following language: {language}
            - Can you please check if the following piece delimited by triple backticks
              is grammatically correct. 
            - Please also pay attention to the use of accents.
            - If the text is not correct please also explain why it isn't in the following language: {language}
            - Do not provide the translation of the sentence in your answer.
            ```
            {answer}
            ```
            """)
        formatted = pt_check.format(answer=user_answer, language=language)
        llm = OpenAI(model_name="gpt-3.5-turbo")
        res = llm(formatted)
        return res
    

if __name__ == "__main__":
    app.run_server(debug=True)