import sequelize from './db.js';
import User from './UserModel.js';
import Transacao from './TransacaoModel.js';
import Categoria from './CategoriaModel.js';

export default async function sincronizarTabelas() {
    try {
        await sequelize.authenticate();

        User.hasMany(Transacao, { 
            foreignKey: 'userId'
        });

        Transacao.belongsTo(User, {
            foreignKey: 'userId' 
        });

        await sequelize.sync({alter: true}); 
        
    } catch (error) {
        console.error('Erro durante a sincronização:', error);
    }
}
