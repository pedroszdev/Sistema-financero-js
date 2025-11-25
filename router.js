import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';
import {homeTransacoes} from './Controller/TransacoesController.js';
import {HomeProduto,CadastrarProduto, EditIndex, EditarTransacao,ApagarTransacao} from './Controller/TransacaoController.js'

//Home
route.get('/', HomeController);

//ListaTransacoes
route.get('/transacoes', homeTransacoes);

//CRUD transacao
route.get('/transacao', HomeProduto);
route.post('/transacao', CadastrarProduto);
route.get('/transacao/:id', EditIndex);
route.post('/transacao/edit/:id', EditarTransacao);
route.get('/transacao/delete/:id', ApagarTransacao);



export default route;