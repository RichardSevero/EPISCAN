const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'banco'
});

conexao.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});


document.getElementById("form-bacteria").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const gravidade = document.getElementById("gravidade").value;
    
    const resposta = await fetch('/api/bacterias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, gravidade })
    });
    
    const resultado = await resposta.json();
    alert(resultado.mensagem);
});

app.post("/api/bacterias", (req, res) => {
    const { nome, gravidade } = req.body;
  
    const sql = "INSERT INTO bacterias (nome, gravidade) VALUES (?, ?)";
    conexao.query(sql, [nome, gravidade], (err, resultado) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao salvar no banco." });
      }
      res.json({ mensagem: "Bactéria registrada com sucesso!" });
    });
});