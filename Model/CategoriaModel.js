import { DataTypes } from 'sequelize';
import sequelize from './db.js';
const Categoria = sequelize.define('Categoria', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull: false
    }
});

export default Categoria;