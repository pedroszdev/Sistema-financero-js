import express from 'express';
const route = express.Router();
import HomeController from './Controller/HomeController.js';


route.get('/', HomeController);


export default route;