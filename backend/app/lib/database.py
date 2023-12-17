from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

SQLALCHEMY_DATABASE_URL = "sqlite:///./lc_db.sqlite"

load_dotenv()

username="lc_admin"
password=os.environ["DB_PASSWORD"] # plain (unescaped) text
host="lc-backend-db.postgres.database.azure.com"
database="db"
port=5432
query={"sslmode": "require"}

destination_credential_string = f"postgresql://{username}:{password}@{host}:{port}/{database}?sslmode=require"

engine = create_engine(destination_credential_string, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()