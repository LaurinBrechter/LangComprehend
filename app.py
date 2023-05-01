import dash
import dash_cytoscape as cyto  
from dash import dcc, html
from dash.dependencies import Output, Input, State
import pandas as pd  
import numpy as np
import dash_bootstrap_components as dbc
import plotly.graph_objects as go
from langchain import PromptTemplate
from langchain.llms import OpenAI
import dash_mantine_components as dmc
from funcs import get_video_text


app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP, "style.css"])


app.layout = html.Div([
    
    html.H1("LangComprehend"),
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
        dmc.Button("Get Text", variant="gradient", id="get-text-btn"),
    ]),
    dmc.TextInput(
        label="Text",
        id="text-output",
        value=None
    ),
    dbc.Row([
        dmc.Button("Generate Questions", variant="gradient", id="gen-question-btn"),
    ]),
    dmc.Accordion(
        id="questions"
    )

], style={"margin": 80})
])


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
            return [res]
        else:
            return ["Please fill in all the fields"]


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
        print("Generating questions: ", button, text[:200], num_questions)
        if text and num_questions:
            prompt = PromptTemplate(
                        input_variables=["n_questions", "text", "language"],
                        template="""Can you come up with {n_questions} questions that test the comprehension that a user 
                            has for the following text delimited by triple backticks? 
                            ```{text}```. 
                            Please provide the answers to the questions in {language}.
                            
                            Delimit the question answer pairs with the following sign: '###' (three hashes).
                            Delimit each question and answer with the following sign: '---' (three dashes).
                            """
                            # Return the questions and answers as a json object with the keys "answer" and "question".
                    )
            
            # formatted = prompt.format(n_questions=num_questions, text=text[:500], language=language)
            example = [("Question: Quels sont les trois enjeux majeurs entre Taiwan et la Chine selon le texte ?", 
                "Answer: Les trois enjeux majeurs entre Taiwan et la Chine sont historiques, politiques, et stratégiques.---Les enjeux majeurs entre Taiwan et la Chine sont: le premier est historique; le deuxième est politique; le troisième est stratégique."),

                ("Question: Quelle serait l'une des conséquences d'un blocus de Taiwan par la Chine ?",
                "Answer: Une des conséquences d'un blocus de Taiwan par la Chine serait une perte économique importante pour la Chine et pour le monde entier. Selon l'institut de recherche Rhodium Group, le manque à gagner commercial avec le reste du monde serait de 270 milliards de dollars. À l'échelle mondiale, c'est 2000 milliards de dollars. Cela à cause de l'effondrement des bourses, des perturbations dans le commerce maritime international, de la chute des investissements ou encore de la rupture des chaînes d'approvisionnement")]
            # llm = OpenAI(model_name="gpt-3.5-turbo")
            # res = llm(formatted)

            # qas = res.split("###")
            # qas = [qa.split("---") for qa in qas]

            return [dmc.AccordionItem(
                    [
                        dmc.AccordionControl(f"Question {i+1}"),
                        dmc.AccordionPanel(
                            [example[i][0],
                            dmc.TextInput(
                                label="Answer",
                                id=f"user_answer_{i+1}",
                                debounce=True,
                            ),
                            dmc.TextInput(
                                label="Model Correction",
                                id=f"model_correction_{i+1}",
                            ),
                            ]
                        ),
                    ],
                    value=f"{i+1}",
                ) for i in range(1)]
        else:
            return ["Please fill in all the fields"]



@app.callback(
    Output("model_correction_1", "value"),
    Input("user_answer_1", "n_submit"),
    State("language-select", "value")
)

def check_answer(submit, language):
    if submit:
        print("Checking answer: ", submit, language)
        return "Checking answer..."
        pt_check = PromptTemplate(
            input_variables=["answer", "language"],
            template="""
            Can you please check if the following piece delimited by triple backticks is grammatically correct.
            If it is not correct please also explain why it isn't in the following language: {language}
            ```
            {answer}
            ```
            """)
        formatted = pt_check.format(answer=answer, language=language)
        res = llm(formatted)





if __name__ == "__main__":
    app.run_server(debug=True)