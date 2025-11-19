import express from 'express'
const server = express();
import sincronizarTabelas from './Model/index.js';
import route from './router.js';


sincronizarTabelas();

server.set('views', './View');
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(route);

server.listen(3000);