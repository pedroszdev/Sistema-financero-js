import Transacao from "../Model/TransacaoModel.js";
import Categoria from "../Model/CategoriaModel.js";
import { where } from "sequelize";


export async function HomeProduto(req,res) {
    const categoria = await Categoria.findAll({raw: true,nest: true,});    
    return res.render('novaTransacao',{categoria})
}

export async function CadastrarProduto(req,res) {
    const categoria = await Categoria.findAll({raw: true,nest: true,});    
    try{
        if (!parseFloat(req.body.valor) && req.body.valor.length >= 0){
            const erros = 'Valor deve ser um numero e maior que 0'
            return res.redirect('/transacao',{categoria, erros})
        }
        if (req.body.descricao.length <=2){
            const erros = 'descricao deve ser mais que 2 caractere'
            return res.redirect('/transacao',{categoria, erros})
        }
        req.body.userId = '1'
        const transacao = await Transacao.create(req.body);
        return res.redirect('/')
    }catch(e){

    }
}

export async function EditIndex(req,res){
    const id = parseInt(req.params.id);
    const transacao = await Transacao.findAll({where:{id},raw: true,nest: true,});
    if (transacao.length <= 0){
        return res.send('ERROR 404')
    }
    const categoria = await Categoria.findAll();
    return res.render('editarTransacao', {transacao,categoria})
}
export async function EditarTransacao(req,res) {
    const id = parseInt(req.params.id);
    try{
        if (!parseFloat(req.body.valor) && req.body.valor.length >= 0){
            console.log('valor invalido')
            const erros = 'Valor deve ser um numero e maior que 0'
            return res.redirect('/transacao',{categoria, erros})
        }
        if (req.body.descricao.length <=2){
            console.log('descricao errada')
            const erros = 'descricao deve ser mais que 2 caractere'
            return res.redirect('/transacao',{categoria, erros})
        }
        const transacao = await Transacao.update(req.body,{where:{id}});
        console.log(req.body)
        return res.redirect('/')

    }catch(e){}
}

export async function ApagarTransacao(req,res) {
    const id = parseInt(req.params.id);
    try{
        const transacao =  await Transacao.destroy({where:{id}})
        return res.redirect('/')
    }catch(e){}
}