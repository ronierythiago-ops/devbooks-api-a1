const express = require("express");

const authorsRoutes = require("./src/routes/authorsRoutes");
const booksRoutes = require("./src/routes/booksRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DevBooks API está funcionando!",
    version: "1.0.0"
  });
});

app.use(authorsRoutes);
app.use(booksRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada."
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Erro interno do servidor."
  });
});

app.listen(PORT, () => {
  console.log(`DevBooks API rodando em http://localhost:${PORT}`);
});
