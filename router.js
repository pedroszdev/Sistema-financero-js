import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';
import TransacoesController from './Controller/TransacoesControlller.js';
import {HomeProduto,CadastrarProduto, EditIndex, EditarTransacao,ApagarTransacao} from './Controller/TransacaoController.js'

route.get('/', HomeController);
route.get('/transacoes', TransacoesController);
route.get('/transacao', HomeProduto);
route.post('/transacao', CadastrarProduto);
route.get('/transacao/:id', EditIndex);
route.post('/transacao/edit/:id', EditarTransacao);
route.get('/transacao/delete/:id', ApagarTransacao)

export default route;