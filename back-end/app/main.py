from fastapi import FastAPI
from contextlib import asynccontextmanager
from .db.session import create_db_and_tables
from .routes import tasks

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

@app.get("/")
def read_root():
    return {"message": "ok"}

