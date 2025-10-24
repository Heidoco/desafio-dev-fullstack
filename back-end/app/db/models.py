from datetime import datetime, timezone
from enum import Enum
from sqlmodel import Field, SQLModel


class TaskStatus(str, Enum):
    pendente = "pendente"
    concluida = "concluida"


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    titulo: str = Field(index=True, nullable=False)
    descricao: str = Field(nullable=False)
    status: TaskStatus = Field(default=TaskStatus.pendente)
    data_criacao: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=False)

