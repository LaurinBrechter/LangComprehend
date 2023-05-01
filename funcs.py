from langchain.document_loaders import YoutubeLoader


def get_video_text(url, language):
    loader = YoutubeLoader.from_youtube_url(url, language=language)
    result = loader.load()
    return result[0].page_content