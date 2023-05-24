from langchain.document_loaders import YoutubeLoader
from langchain.llms import OpenAI
import ast
import tiktoken


def get_video_text(url, language):
    loader = YoutubeLoader.from_youtube_url(url, language=language)
    result = loader.load()
    return result[0].page_content


def output_parser(text, llm):
    questions =  ast.literal_eval(llm(
        f"""
        Please parse the following text in such a way that all the Questions are in one Python list.

        {text}
        
        """
    ))

    answers = ast.literal_eval(llm(
        f"""
        Please parse the following text in such a way that all the Answers are in one Python list. Only put the answers in the list.

        {text}
        
        """
    ))

    return questions, answers


def get_n_tokens(text):
    enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(text))