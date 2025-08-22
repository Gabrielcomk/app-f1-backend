# API de Equipes da F1

Esta é uma API Node.js Express simples que fornece uma lista de equipes da F1 e seus pilotos associados, indicando se são pilotos titulares ou reservas. Ela utiliza um banco de dados MySQL para armazenamento de dados e inclui Swagger para documentação da API.

## Configuração

1.  **Variáveis de Ambiente**:
    -   Crie um arquivo `.env` na raiz do projeto baseado no `.env.sample` e preencha suas credenciais de banco de dados.

2.  **Iniciar com Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    Isso irá construir as imagens, iniciar os contêineres do banco de dados e da aplicação, e importar o `database.sql` automaticamente.

    A API estará disponível em `http://localhost:3000`.
    A documentação do Swagger estará disponível em `http://localhost:3000/api-docs`.

## Endpoints da API

-   **GET /teams**: Retorna uma lista de equipes da F1 com seus pilotos.

## Estrutura do Projeto

```
. 
├── docker-compose.yml    # Define e executa a aplicação Docker multi-container
├── backend/
│   ├── Dockerfile        # Dockerfile para a aplicação Node.js
│   ├── server.js         # Ponto de entrada principal da aplicação
│   ├── package.json      # Dependências e scripts do projeto
│   ├── package-lock.json # Versões exatas das dependências
│   └── src/
│       ├── config/
│       │   └── db.config.js  # Configuração de conexão com o banco de dados
│       ├── models/
│       │   ├── team.model.js   # Lógica de acesso a dados para equipes
│       │   └── driver.model.js # Lógica de acesso a dados para pilotos
│       ├── routes/
│       │   └── team.routes.js  # Rotas da API para equipes
│       └── services/
│           └── team.service.js # Lógica de negócios para equipes e pilotos
├── infra/
│   └── db/
│       └── database.sql  # Script SQL para o esquema do banco de dados e dados iniciais (com a lista confirmada de pilotos titulares e reservas da F1 2025)
├── .env.sample           # Exemplo de arquivo de variáveis de ambiente
├── .gitignore            # Arquivos e diretórios a serem ignorados pelo Git
└── README.md             # Documentação do projeto
```