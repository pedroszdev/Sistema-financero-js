import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import bcrypt from 'bcrypt';
const User = sequelize.define('User', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    hooks:{
        beforeSave: async (user) => {
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.senha, saltRounds);
            user.senha = hash; // Substitui a senha em texto puro pelo hash antes de salvar
        },
    }
});

export default User;