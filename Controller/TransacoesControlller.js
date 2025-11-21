import Transacao from "../Model/TransacaoModel.js";
import Categoria from "../Model/CategoriaModel.js";
import { Op } from "sequelize";

export default async function home(req,res) {
    const { search} = req.query;
    const tipoPesquisada = req.query.tipo;
    const categoriaPesquisada = req.query.categoria;

    let condicao = { userId: 1 };

    if (search) {
        condicao.descricao = { [Op.iLike]: `%${search}%` };
    }

    if (categoriaPesquisada && categoriaPesquisada !== 'todas') {
        condicao.categoria = categoriaPesquisada;
    }

    if (tipoPesquisada && tipoPesquisada !== 'todas') {
        condicao.tipo = tipoPesquisada;
    }
    const transacoes = await Transacao.findAll({
        where: condicao, 
        order: [['data', 'DESC']],
        raw: true,
        nest: true,
    });
    const categoria = await Categoria.findAll({raw: true,nest: true,});
    return res.render('transacoes', { transacoes, search, categoria });
}