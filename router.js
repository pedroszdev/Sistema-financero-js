import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';
import {homeTransacoes} from './Controller/TransacoesController.js';
import {HomeProduto,CadastrarProduto, EditIndex, EditarTransacao,ApagarTransacao} from './Controller/TransacaoController.js'
import { IndexCadastro, CadastroUser } from './Controller/UserController.js';
import { LoginUser, LoginIndex } from './Controller/LoginController.js';
import LoginRequired from './Middleware/LoginRequired.js';
//Home
route.get('/', LoginRequired, HomeController);

//ListaTransacoes
route.get('/transacoes', LoginRequired, homeTransacoes);

//CRUD transacao
route.get('/transacao', LoginRequired, HomeProduto);
route.post('/transacao', LoginRequired, CadastrarProduto);
route.get('/transacao/:id', LoginRequired, EditIndex);
route.post('/transacao/edit/:id', LoginRequired, EditarTransacao);
route.get('/transacao/delete/:id', LoginRequired, ApagarTransacao);

//CRUD User
route.get('/cadastro', IndexCadastro)
route.post('/cadastro', CadastroUser)

//LoginUser
route.get('/login', LoginIndex)
route.post('/login', LoginUser)

export default route;