const express = require('express');

const ContatoController = require('./controllers/ContatoController')

const routes = express.Router();

//Rota para listar todos os Contatos
routes.get('/contatos', ContatoController.index);

//Rota para criar um Contato
routes.put('/contato', ContatoController.create);

//Rota para deletar um Contato
routes.delete('/contato/:id', ContatoController.delete);

//Rota para dar update em um Contato
routes.post('/contato/:id', ContatoController.update);

module.exports = routes;
