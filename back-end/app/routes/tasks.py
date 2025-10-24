from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select, Session
from ..db.session import get_session
from ..db.models import Task, TaskCreate, TaskUpdate

router = APIRouter()


@router.post("/", response_model=Task, status_code=201)
def create_task(task: TaskCreate, session: Session = Depends(get_session)):
    new_task = Task.model_validate(task)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task


@router.get("/", response_model=list[Task])
def read_tasks(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    return tasks

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: TaskUpdate, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_data = updated_task.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(task, key, value)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{task_id}")
def delete_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"message": "Task deleted"}
