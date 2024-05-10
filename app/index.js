const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { engine } = require ('express-handlebars');
const app = express();
var connect = require('./utils/database/connection');

app.engine('handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views/');

// Configurar o middleware express.static para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Middleware para analisar dados de requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para exibir os dados do primeiro usuário da tabela na home.
app.get('/', (req, res) => {
  const query = 'SELECT * FROM users LIMIT 1'; 
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar dados do primeiro usuário:', error);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado');
      return;
    }
    const userData = results[0];
    res.render('home', { userData });
  });
});

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'sync_user',
  password: 'Sync.1234',
  database: 'sync360_db'
});

// Rota para exibir o formulário de cadastro
app.get('/register', (req, res) => {
  res.render('register');
});


// Rota para exibir a página do usuário com os dados carregados.
app.get('/users/:id', (req, res) => {
  // Obtém o ID do usuário da URL
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  connection.query(query, [userId], (error, results) => {
    console.log(results);
    if (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado');
      return;
    }

    res.render('home', { userData: results[0] });
  });
});

// Rota  para salvar novos cadastros ou atualizar um já existente.
app.post('/submit', (req, res) => {
  const { id, name, address, age, biography, img } = req.body;
  if (id) {
      const query = 'UPDATE users SET name = ?, address = ?, age = ?, biography = ?, img = ? WHERE id = ?';

      connection.query(query, [name, address, age, biography, img, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados do usuário:', error);
              res.status(500).send('Erro interno do servidor');
              return;
          }
          res.redirect('/users/' + id);
      });
  } else {
      const query = 'INSERT INTO users (name, address, age, biography, img) VALUES (?, ?, ?, ?, ?)';

      connection.query(query, [name, address, age, biography, img], (error, results) => {
          if (error) {
              console.error('Erro ao cadastrar novo usuário:', error);
              res.status(500).send('Erro interno do servidor');
              return;
          }

          res.redirect('/users/' + results.insertId);
      });
  }
});


// Rota para exibir a lista de usuários
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    res.render('users', { users: results });
    
  });
});

// Rota para deletar o usuário
app.post('/delete/:id', (req, res) => {
  const userId = req.body.id;
  const query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [userId], (error, results) => {
      if (error) {
          console.error('Erro ao excluir usuário:', error);
          res.status(500).send('Erro interno do servidor');
          return;
      }

      res.redirect('users/?deleted=true');
  });
});


// Porta em que o servidor vai escutar
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
