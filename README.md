# DevBooks API

Projeto da Atividade Prática Avaliativa (A1) da disciplina Programação para WEB II.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite
- Postman

## Requisitos

- Node.js 18.18+ instalado.

## Instalação

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

## Executar

Modo normal:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

`http://localhost:3000`

## Rotas

### Criar autor

`POST /authors`

```json
{
  "name": "Machado de Assis",
  "biography": "Escritor brasileiro."
}
```

### Criar livro

`POST /books`

```json
{
  "title": "Dom Casmurro",
  "release_year": 1899,
  "author_id": "UUID_DO_AUTOR"
}
```

### Listar livros com autores

`GET /books`

### Atualizar livro

`PUT /books/:id`

```json
{
  "title": "Dom Casmurro - Edição Revisada",
  "release_year": 1900,
  "author_id": "UUID_DO_AUTOR"
}
```

Também é possível enviar apenas os campos que deseja alterar.

### Excluir livro

`DELETE /books/:id`

## Postman

Importe o arquivo `collection.json` no Postman.

A variável `baseUrl` já está configurada como:

`http://localhost:3000`

Após criar um autor, copie o `id` retornado e use-o na variável `authorId` da coleção para testar a criação e atualização de livros.

## Estrutura

```text
devbooks/
├── prisma/
│   ├── migrations/
│   │   └── 20260926210000_init/
│   │       └── migration.sql
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authorsController.js
│   │   └── booksController.js
│   └── routes/
│       ├── authorsRoutes.js
│       └── booksRoutes.js
├── .env
├── .gitignore
├── collection.json
├── package.json
├── README.md
└── server.js
```

## GitHub

Não envie `node_modules`. O `.gitignore` já está configurado para isso.

Depois de criar o repositório público:

```bash
git init
git add .
git commit -m "Projeto DevBooks API"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```
