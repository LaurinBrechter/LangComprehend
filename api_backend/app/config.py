from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "LangComprehend"
    email:str = "brechterlaurin@gmail.com"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"