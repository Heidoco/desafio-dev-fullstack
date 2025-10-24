from typing import Iterator
from . import models
from sqlmodel import SQLModel, Session, create_engine

DATABASE_URL = "sqlite:///./data/app.db"

engine = create_engine(
    DATABASE_URL, echo=False, connect_args={"check_same_thread": False}
)


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session