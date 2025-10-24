import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.pool import StaticPool
from app.main import app
from app.db.session import get_session


@pytest.fixture
def client():
    # Criar um banco de dados em memória para testes
    test_engine = create_engine(
        "sqlite://",
        echo=False,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(test_engine)

    # Usar o banco de dados em memória
    def override_session():
        with Session(test_engine) as session:
            yield session

    app.dependency_overrides[get_session] = override_session
    client = TestClient(app)
    try:
        yield client
    finally:
        app.dependency_overrides.clear()


def test_create_task(client):
    response = client.post("/tasks/", json={"titulo": "Teste", "descricao": "Desc"})
    assert response.status_code == 201
    data = response.json()
    assert data["titulo"] == "Teste"
    assert data["status"] == "pendente"
    assert data["data_criacao"] is not None
    assert "id" in data


def test_read_tasks(client):
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_read_task(client):
    create_response = client.post("/tasks/", json={"titulo": "Teste", "descricao": "Desc"})
    task_id = create_response.json()["id"]
    list_response = client.get("/tasks/")
    assert list_response.status_code == 200
    ids = [t["id"] for t in list_response.json()]
    assert task_id in ids


def test_update_task(client):
    create_response = client.post("/tasks/", json={"titulo": "Teste", "descricao": "Desc"})
    task_id = create_response.json()["id"]
    response = client.put(f"/tasks/{task_id}", json={"titulo": "Atualizado", "descricao": "Desc"})
    assert response.status_code == 200
    assert response.json()["titulo"] == "Atualizado"


def test_delete_task(client):
    create_response = client.post("/tasks/", json={"titulo": "Teste", "descricao": "Desc"})
    task_id = create_response.json()["id"]
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    list_response = client.get("/tasks/")
    assert list_response.status_code == 200
    ids = [t["id"] for t in list_response.json()]
    assert task_id not in ids
