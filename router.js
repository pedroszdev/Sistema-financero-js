import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';
import TransacoesController from './Controller/TransacoesControlller.js';

route.get('/', HomeController);
route.get('/transacoes', TransacoesController);


export default route;