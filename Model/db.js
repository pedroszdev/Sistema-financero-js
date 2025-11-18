import Sequelize from 'sequelize';
import 'dotenv/config'; 
const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres'     // Qual banco estamos usando
});

export default sequelize;


