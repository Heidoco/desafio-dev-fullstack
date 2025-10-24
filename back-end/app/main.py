from fastapi import FastAPI
from .db.session import create_db_and_tables
from .routes import tasks

app = FastAPI()
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "ok"}

