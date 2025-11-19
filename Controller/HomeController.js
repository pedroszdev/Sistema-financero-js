import Transacao from "../Model/TransacaoModel.js";
export default async function home(req,res) {

    const transacoes = await Transacao.findAll({
        where: {
            userId: 1 
        }
    });

    let despesa = 0;
    let receita = 0;

    for (let i = 0; i<transacoes.length;i++){
        if (transacoes[i].dataValues.tipo === 'despesa'){
            despesa += transacoes[i].dataValues.valor
        }else if (transacoes[i].dataValues.tipo === 'Receita'){
            receita += transacoes[i].dataValues.valor
        }
        
        
    }

    let saldo = receita - despesa;
    const context = {
        receita,
        despesa,
        saldo,
    }
    //usar char.js para fazer os graficos, arrumar os links
    
    return res.render('home', {context})
}