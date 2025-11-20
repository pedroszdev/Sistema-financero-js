import Transacao from "../Model/TransacaoModel.js";
export default async function home(req,res) {
    const transacoes = await Transacao.findAll({
        where: {
            userId: 1 
        },
        order: [['data', 'DESC']],
        raw: true,  
        nest: true,
    });
    return res.render('transacoes', {transacoes})
}