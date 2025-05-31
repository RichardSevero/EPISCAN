const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve arquivos HTML/CSS/JS

// Conexão MySQL
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb'
});

conexao.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado ao MySQL!');
});

// Rota POST da API
app.post('/api/bacterias', (req, res) => {
  const { nome, gravidade } = req.body;

  const sql = 'INSERT INTO culturabacteria (idculturabacteria, bacteria, gravidade) VALUES (1, ?, ?)';
  conexao.query(sql, [nome, gravidade], (err) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      return res.status(500).json({ mensagem: 'Erro ao salvar no banco.' });
    }
    res.json({ mensagem: 'Bactéria registrada com sucesso!' });
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
