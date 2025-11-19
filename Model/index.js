import sequelize from './db.js';
import User from './UserModel.js';
import Transacao from './TransacaoModel.js';
import Categoria from './CategoriaModel.js';

export default async function sincronizarTabelas() {
    try {
        // Testa a conexão antes de sincronizar
        await sequelize.authenticate();
        console.log('Conexão estabelecida. Sincronizando modelos...');

        User.hasMany(Transacao, { 
            foreignKey: 'userId' // O usuário tem muitas transações
        });

        Transacao.belongsTo(User, {
            foreignKey: 'userId' // A transação pertence a um usuário
        });

        // O comando sequelize.sync() cria as tabelas que não existem no banco
        await sequelize.sync({alter: true}); 
        
        console.log('Tabela User criada/sincronizada com sucesso no Postgres!');
    } catch (error) {
        console.error('❌ Erro durante a sincronização:', error);
    }
}
