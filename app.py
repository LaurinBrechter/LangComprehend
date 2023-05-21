import dash
import dash_cytoscape as cyto  
from dash import Dash, dcc, html, Input, Output, State, MATCH, Patch, ALL
from dash.dependencies import Output, Input, State
import pandas as pd  
import numpy as np
import dash_bootstrap_components as dbc
import plotly.graph_objects as go
from langchain import PromptTemplate
from langchain.llms import OpenAI
import dash_mantine_components as dmc
from funcs import get_video_text
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage
)

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
                value=2,
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
    dmc.TextInput(
        label="Text",
        id="text-output",
        value=None
    ),
    dbc.Row([
        dbc.Col([
            dmc.Button("Generate Questions", variant="gradient", id="gen-question-btn"),
        ])
    ]),
    dmc.Accordion(
        id="questions"
    )

])
], id="main-div")


@app.callback(
    Output("text-output", "value"),
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
            return ["Please fill in all the fields"]


def cut_text(text, frac):
    splitted_text = text.split()
    n_words = len(splitted_text)
    print(n_words)
    lim = int(frac*n_words)
    text_red = splitted_text[:lim]
    return " ".join(text_red), n_words


def get_response_chat(language, text):

    messages = [
        SystemMessage(content=f"""You are a helpful assistant that only provides answers in {language}"""),
        HumanMessage(content=text),
    ]

    return messages



@app.callback(
    Output("questions", "children"),
    Input("gen-question-btn", "n_clicks"),
    State("text-output", "value"),
    State("num-questions", "value"),
    State("API_KEY", "value"),
    State("language-select", "value"),
)

def get_questions(button, text, num_questions, API_KEY, language):
    if button:
        print(len(text))
        print("Generating questions: ", button, text, num_questions)
        if text and num_questions:
            # prompt = PromptTemplate(
            #             input_variables=["n_questions", "text", "language"],
            #             template="""Can you come up with {n_questions} questions that test the comprehension that a user 
            #                 has for the following text delimited by triple backticks? 
            #                 ```{text}```. 
            #                 Please provide the answers to the questions in {language}.
                            
            #                 Delimit the question answer pairs with the following sign: '###' (three hashes).
            #                 Delimit each question and answer with the following sign: '---' (three dashes).
            #                 """
            #         )
            
            prompt = PromptTemplate(
                        input_variables=["n_questions", "text", "language"],
                        template="""
                            - Can you come up with {n_questions} questions that test the comprehension that a user has for the following text delimited by triple backticks? 
                            ```{text}```. 
                            - Please provide the answers to the questions in {language}.
                            - Start each question with the following sign: 'Question: '.
                            - Start each answer with the following sign: 'Answer: '.
                            """
                            # - Delimit each question-answer pair with the following sign: '###' (three hashes).
                    )

            formatted = prompt.format(n_questions=num_questions, text=cut_text(text, 0.3), language=language)
            # example = [("Question: Quels sont les trois enjeux majeurs entre Taiwan et la Chine selon le texte ?", 
            #     "Answer: Les trois enjeux majeurs entre Taiwan et la Chine sont historiques, politiques, et stratégiques.---Les enjeux majeurs entre Taiwan et la Chine sont: le premier est historique; le deuxième est politique; le troisième est stratégique."),

            #     ("Question: Quelle serait l'une des conséquences d'un blocus de Taiwan par la Chine ?",
            #     "Answer: Une des conséquences d'un blocus de Taiwan par la Chine serait une perte économique importante pour la Chine et pour le monde entier. Selon l'institut de recherche Rhodium Group, le manque à gagner commercial avec le reste du monde serait de 270 milliards de dollars. À l'échelle mondiale, c'est 2000 milliards de dollars. Cela à cause de l'effondrement des bourses, des perturbations dans le commerce maritime international, de la chute des investissements ou encore de la rupture des chaînes d'approvisionnement")]
            llm = OpenAI(model_name="gpt-3.5-turbo")
            # chat = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
            # messages = get_response_chat(language, text)
            # res = chat(messages)
            res = llm(formatted)
            """
            1. Quel est le principal enjeu entre Taïwan et la Chine ?
            ### Le principal enjeu entre Taïwan et la Chine est la revendication de la Chine sur la souveraineté de Taïwan, malgré le fait que l'île est devenue un État démocratique souverain de fait et que la Chine considère toujours que l'île lui appartient.###

            2. Pourquoi la présidente taïwanaise a-t-elle augmenté les tensions entre Taïwan et la Chine ?
            ###La présidente taïwanaise, Tsai Ing-wen, a augmenté les tensions entre Taïwan et la Chine avec sa position indépendantiste et en étant moins conciliante que son prédécesseur avec le régime chinois, ce qui a incité Pékin à accroître considérablement sa stratégie de pression politique, économique et militaire. 
            ###
            """
            print(res)
            # qs = res.content.split("###")[:-1][::2]
            # print(qs)
            qas = res.split("Question:")[1:]
            print(qas)
            # qas = [qa.split("Answer:") for qa in qas[:-1]]

            return [dmc.AccordionItem(
                    [
                        dmc.AccordionControl(f"Question {i+1}"),
                        dmc.AccordionPanel(
                            [qas[i],
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
                ) for i in range(len(qas))]
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