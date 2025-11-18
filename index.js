import express from 'express'
const server = express();
import sincronizarTabelas from './Model/index.js';


sincronizarTabelas();
server.listen(3000);