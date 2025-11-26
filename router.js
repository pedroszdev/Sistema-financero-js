import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';
import {homeTransacoes} from './Controller/TransacoesController.js';
import {HomeProduto,CadastrarProduto, EditIndex, EditarTransacao,ApagarTransacao} from './Controller/TransacaoController.js'
import { IndexCadastro, CadastroUser } from './Controller/UserController.js';
import { LoginUser, LoginIndex } from './Controller/LoginController.js';

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

//CRUD User
route.get('/cadastro', IndexCadastro)
route.post('/cadastro', CadastroUser)

//LoginUser
route.get('/login', LoginIndex)
route.post('/login', LoginUser)

export default route;