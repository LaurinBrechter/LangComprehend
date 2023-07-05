from pymongo.results import InsertOneResult, InsertManyResult
from pymongo import MongoClient
from langchain.document_loaders import YoutubeLoader
from langchain import PromptTemplate
import ast
import tiktoken
import datetime
from langchain.schema import (
    HumanMessage,
    SystemMessage
)
from .data_structs import (
    Text, 
    Languages, 
    Worksheet, 
    VocabAnswer,
    VocabularyList
)
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI



def cut_text(text, frac):
    splitted_text = text.split()
    n_words = len(splitted_text)
    # print(n_words)
    lim = int(frac*n_words)
    text_red = splitted_text[:lim]
    return " ".join(text_red), n_words


def get_video_text(url:str, language) -> str:
    loader = YoutubeLoader.from_youtube_url(url, language=language)
    result = loader.load()
    return result[0].page_content


# def output_parser(text, llm):
#     questions = ast.literal_eval(llm(
#         f"""
#         Please parse the following text in such a way that all the Questions are in one Python list.

#         {text}
        
#         """
#     ))

#     answers = ast.literal_eval(llm(
#         f"""
#         Please parse the following text in such a way that all the Answers are in one Python list. Only put the answers in the list.

#         {text}
        
#         """
#     ))
#     out_str = llm(
#         f"""
#         Please parse the following text in such a way that all the Topics are in one Python list. Only put the topics in the list.
#         {text}
#         """
#     )
#     print(out_str)
#     topics = ast.literal_eval(out_str)

#     return topics, questions, answers


def get_n_tokens(text) -> int:
    enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(text))


def insert_query_to_db(
        client:MongoClient, 
        db_name:str, 
        collection_name:str, 
        text:str, 
        n_questions:int, 
        language:str, 
        url:str, 
        questions:list, 
        answers:list) -> InsertOneResult:
    
    document = {
    "text":text,
    "time_created":datetime.datetime.utcnow(),
    "n_questions":n_questions,
    "language_code":language,
    "url":url,
    "questions":questions,
    "answers":answers
    }
    
    db = client[db_name]
    collection = db[collection_name]

    res = collection.insert_one(document)

    return res


def add_vocab_to_db(
        client:MongoClient, 
        db_name:str, 
        collection_name:str, 
        vocab:VocabularyList, 
        u_id:int
    ) -> InsertManyResult:
    docs = []
    for v in vocab.vocs_list:
        # docs.append({"u_id":u_id, "vocab":v[0], "inserted_at":datetime.datetime.utcnow(), "forms":v[1]})
        docs.append({"u_id":u_id, "vocab":v, "inserted_at":datetime.datetime.utcnow()})

    db = client[db_name]
    collection = db[collection_name]

    return collection.insert_many(docs)



def get_response_chat(language, text):

    messages = [
        SystemMessage(content=f"""You are a helpful assistant that only provides answers in {language}"""),
        HumanMessage(content=text),
    ]

    return messages

def correct_vocab(vocab_solution:VocabAnswer) -> str:
    answer = vocab_solution.user_translation
    original_text = vocab_solution.original_text

    load_dotenv()
    model = ChatOpenAI(temperature=0)

    return model.predict(
        f"""
        You will be given an original text and its translation. Please state whether the translation is correct or not.

        Original text: 
        {original_text}

        Translation:
        {answer}

        you MUST answer with 'True' if the translation correct and 'False' otherwiese.
        """
    )





def get_qa_topic(num_questions, text:Text, language, fraction, dummy=True) -> str:

    load_dotenv()
    model = ChatOpenAI(temperature=0)

    prompt = PromptTemplate(
        input_variables=["n_questions", "text", "language"],
        # template="""
        #     - Can you come up with {n_questions} questions that test the comprehension 
        #     that a user has for the following text delimited by triple backticks? 
        #     Please also provide the 3 primary topics of the text.
        #     ```{text}```. 
        #     - Please provide the answers to the questions in {language}.
        #     - Start each question with the following sign: 'Question: '.
        #     - Start each answer with the following sign: 'Answer: '.
        #     - Start the topics with the following sign:'Topics: '.
        #     """
        template="""
        - Can you come up with {n_questions} questions that test the comprehension 
            that a user has for the following text delimited by triple backticks? 
            Please also provide the 3 primary topics of the text.
            ```{text}```.
        - Please provide the answers to the questions in {language}.
        - Once you have {n_questions} questions, answers and topics provide them as a json object with the following keys: 'questions', 'answers', 'topics'.
        """
            # - Delimit each question-answer pair with the following sign: '###' (three hashes).
    )

    formatted = prompt.format(n_questions=num_questions, text=cut_text(text.text, frac=fraction), language=language)
    if dummy:
        return """{
            "questions": [
                "Quels sont les trois enjeux majeurs des tensions entre Taïwan et la Chine ?",
                "Quels sont les obstacles potentiels à une invasion de Taïwan par la Chine ?",
                "Quelles seraient les conséquences d'un conflit entre Taïwan et la Chine ?"
            ],
            "answers": [
                "Les trois enjeux majeurs des tensions entre Taïwan et la Chine sont historiques, politiques et stratégiques.",
                "Les obstacles potentiels à une invasion de Taïwan par la Chine sont les montagnes escarpées à l'est de l'île, les infrastructures solides de Taïwan et le large détroit avec des eaux agitées.",
                "Les conséquences d'un conflit entre Taïwan et la Chine seraient lourdes, notamment un emballement régional, un blocus économique avec des conséquences pour les deux pays et le reste du monde, et des perturbations dans le commerce maritime international."
            ],
            "topics": [
                "Tensions entre Taïwan et la Chine",
                "Obstacles potentiels à une invasion de Taïwan",
                "Conséquences d'un conflit entre Taïwan et la Chine"
            ]
            }
            """
    else:
        return model.predict(formatted)
                
    
def get_vocab(pipeline, text:str, irrel:list[str]) -> dict:
    doc = pipeline(text)
    
    voc = {}
    ents = doc.ents
    irrel = ["PUNCT", "SPACE", "NUM"]

    for token in doc:
        tok_str = str(token).lower()
        lemma = token.lemma_.lower()
        if token.pos_ not in irrel:
            if lemma in voc.keys():
                if tok_str not in voc[lemma]:
                    voc[lemma].append(tok_str)
            else:
                voc[lemma] = [tok_str]
    # for vocab in voc.keys():
    #     print(voc[vocab], np.unique(voc[vocab]))
    #     voc[vocab] = list(set(voc[vocab]))

    return {"vocab":voc, "entities":ents}