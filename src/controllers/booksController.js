const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createBook(req, res) {
  try {
    const { title, release_year, author_id } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "O campo title é obrigatório."
      });
    }

    if (
      release_year === undefined ||
      release_year === null ||
      !Number.isInteger(Number(release_year))
    ) {
      return res.status(400).json({
        error: "O campo release_year deve ser um número inteiro."
      });
    }

    if (!author_id || typeof author_id !== "string") {
      return res.status(400).json({
        error: "O campo author_id é obrigatório."
      });
    }

    const author = await prisma.authors.findUnique({
      where: { id: author_id }
    });

    if (!author) {
      return res.status(404).json({
        error: "Autor não encontrado."
      });
    }

    const book = await prisma.books.create({
      data: {
        title: title.trim(),
        release_year: Number(release_year),
        author_id
      },
      include: {
        author: true
      }
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
}

async function getBooks(req, res) {
  try {
    const books = await prisma.books.findMany({
      include: {
        author: true
      },
      orderBy: {
        title: "asc"
      }
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, release_year, author_id } = req.body;

    const existingBook = await prisma.books.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({
        error: "Livro não encontrado."
      });
    }

    const data = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          error: "O campo title deve ser uma string não vazia."
        });
      }
      data.title = title.trim();
    }

    if (release_year !== undefined) {
      if (!Number.isInteger(Number(release_year))) {
        return res.status(400).json({
          error: "O campo release_year deve ser um número inteiro."
        });
      }
      data.release_year = Number(release_year);
    }

    if (author_id !== undefined) {
      if (typeof author_id !== "string" || !author_id) {
        return res.status(400).json({
          error: "O campo author_id deve ser uma string válida."
        });
      }

      const author = await prisma.authors.findUnique({
        where: { id: author_id }
      });

      if (!author) {
        return res.status(404).json({
          error: "Autor não encontrado."
        });
      }

      data.author_id = author_id;
    }

    const book = await prisma.books.update({
      where: { id },
      data,
      include: {
        author: true
      }
    });

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const existingBook = await prisma.books.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({
        error: "Livro não encontrado."
      });
    }

    await prisma.books.delete({
      where: { id }
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
}

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook
};
