import Transacao from "../Model/TransacaoModel.js";
import Categoria from "../Model/CategoriaModel.js";
import { Op } from "sequelize";

export async function homeTransacoes(req,res) {
    const { search} = req.query;
    const tipoPesquisada = req.query.tipo || '';
    const categoriaPesquisada = req.query.categoria || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // Definimos 10 transações por página
    const offset = (page - 1) * limit;
    const user = req.session.usuario
    
    let condicao = { userId: req.session.usuario.id };

    if (search) {
        condicao.descricao = { [Op.iLike]: `%${search}%` };
    }

    if (categoriaPesquisada && categoriaPesquisada !== 'todas') {
        condicao.categoria = categoriaPesquisada;
    }

    if (tipoPesquisada && tipoPesquisada !== 'todas') {
        condicao.tipo = tipoPesquisada;
    }
    const { count, rows: transacoes } = await Transacao.findAndCountAll({
        where: condicao, 
        order: [['data', 'DESC']],
        raw: true,
        nest: true,
        limit: limit,   
        offset: offset,
    });
    const categoria = await Categoria.findAll({raw: true,nest: true,});
    const totalPages = Math.ceil(count / limit);
    return res.render('transacoes', { 
        transacoes, 
        search, 
        categoria,
        currentPage: page,
        totalPages,
        tipoPesquisada,
        categoriaPesquisada,
        user
    });
}
