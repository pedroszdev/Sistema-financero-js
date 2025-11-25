import Transacao from "../Model/TransacaoModel.js";
import Categoria from "../Model/CategoriaModel.js";

export async function HomeProduto(req,res) {
    const categoria = await Categoria.findAll({raw: true,nest: true,});    
    return res.render('novaTransacao',{categoria})
}

export async function CadastrarProduto(req,res) {
    try{
        if (!parseFloat(req.body.valor) && req.body.valor.length >= 0){
            console.log('valor invalido')
            const erros = 'Valor deve ser um número e maior que 0'
            req.flash('error', erros)
            return res.redirect('/transacao')
        }
        if (req.body.descricao.length <=2){
            const erros = 'Descrição deve ter 2 ou mais caractere'
            req.flash('error', erros)
            return res.redirect('/transacao')
        }
        req.body.userId = '1'
        const transacao = await Transacao.create(req.body);
        req.flash('success', 'Transação criada com sucesso');
        return res.redirect('/')
    }catch(e){
        req.flash('error', `Error: ${e}`)
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
            const erros = 'Valor deve ser um número e maior que 0'
            req.flash('error', erros)
            return res.redirect('/transacao' + id)
        }
        if (req.body.descricao.length <=2){
            console.log('descricao errada')
            const erros = 'Descrição deve ter 2 ou mais caractere'
            req.flash('error', erros)
            return res.redirect('/transacao' + id)
        }
        const transacao = await Transacao.update(req.body,{where:{id}});
        console.log(req.body)
        req.flash('success', 'Transação editada com sucesso')
        return res.redirect('/')

    }catch(e){
        req.flash('error', `Error: ${e}`)

    }
}

export async function ApagarTransacao(req,res) {
    const id = parseInt(req.params.id);
    try{
        const transacao =  await Transacao.destroy({where:{id}})
        req.flash('success', 'Transação apagada com sucesso')
        return res.redirect('/')
    }catch(e){
        req.flash('error', `Error: ${e}`)
    }
}