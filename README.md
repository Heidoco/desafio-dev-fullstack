## Desafio Full Stack – Task List

Aplicação full stack para gerenciar tarefas com back-end em FastAPI e front-end em React, conteinerizados via Docker.

### Stacks utilizadas
- **Back-end**: FastAPI, SQLModel, SQLite
- **Front-end**: React, Vite, Tailwind

### Decisões técnicas
- **FastAPI**: Simples para criar um CRUD e documentação automática (OpenAPI/Swagger).
- **SQLModel**: Não conhecia, mas foi recomendado na documentação da FastAPI então achei uma boa oportunidade para testar.
- **SQLite**: Banco simples e rápido de criar sem configurações complexas.
- **Pytest**: Ferramenta popular de teste, documentação boa.
- **React + Vite + Tailwind**: Vite para iniciar rapidamente um projeto, React por conta da documentação e experiência, Tailwind por praticidade e customização.
- **Docker**: Ferramenta de containerização padrão.
  
### URLs
- **API**: `http://localhost:8000`
- **Documentação da API** `http://localhost:8000/docs`
- **Front-end**: `http://localhost:5173`
- **Banco de dados**: SQLite em `back-end/data/app.db`

### Instalação e execução (Docker)
Na raiz do projeto:

```shell
docker compose up -d --build
```

Acesse:
- Front-end: `http://localhost:5173`
- API docs: `http://localhost:8000/docs`

### Instalação e execução local
Os serviços podem ser iniciados localmente, para desenvolvimento ou testes.

Back-end:

```shell
cd back-end
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Front-end:

```shell
cd front-end
npm ci
npm run dev
```

Testes Back-end:
```shell
cd back-end
pytest -q
```

### Estrutura do repositório
```
back-end/
  app/
    db/
      models.py      # modelos SQLModel (Task, TaskStatus)
      session.py     # engine SQLite, criação de schema e sessão
    routes/
      tasks.py       # CRUD de tarefas
    main.py          # app FastAPI, CORS, roteamento e lifespan
  tests/
    test_tasks.py    # testes de criação, leitura, atualização e remoção
front-end/
  src/
    components/      # TaskForm, TaskItem, TaskList
    hooks/           # useApi
```

### Telas

<img width="1914" height="919" alt="image" src="https://github.com/user-attachments/assets/138d1d4d-1542-4cdd-9cb2-fdf51472bfca" />

<img width="1919" height="935" alt="image" src="https://github.com/user-attachments/assets/2d164e81-507d-4631-9a00-9efa85fdaced" />

<img width="1872" height="940" alt="image" src="https://github.com/user-attachments/assets/607ba5e7-08a7-4327-9772-a16aa3fbb1b2" />



