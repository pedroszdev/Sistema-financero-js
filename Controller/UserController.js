import { where } from 'sequelize';
import UserModel from '../Model/UserModel.js'
export async function IndexCadastro(req,res) {
    return res.render('cadastro')
}

export async function CadastroUser(req,res){
    try{
        const {nome,email,senha} = req.body;
        if ( nome.length <= 2){
            const erros = 'Seu nome precisa ter pelo menos 3 caractere'
            req.flash('error', erros)
            req.session.save(()=>{
                res.redirect('/cadastro')
            })
            return
        }

        const VerificarSeEmailExiste = UserModel.findOne({where:{email}})
        if (VerificarSeEmailExiste){
            const erros = 'Já existe uma conta com esse email'
            req.flash('error', erros)
            req.session.save(()=>{
                res.redirect('/cadastro')
            })
            return
        }

        if (senha.length <=6 ){
            const erros = 'Sua senha precisa ter 7 ou mais caractere'
            req.flash('error', erros)
            req.session.save(()=>{
                res.redirect('/cadastro')
            })
            return
        }

        const user = await UserModel.create({nome,email,senha})
        req.flash('success', 'Usuário criado com sucesso')
        req.session.save(()=>{
            res.redirect('/login')
        })
        return

    }catch(e){
        req.flash('error', `Error: ${e}`)
        req.session.save(()=>{
            res.redirect('/')
        })
        return
    }

}

