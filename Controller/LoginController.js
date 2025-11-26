import UserModel from '../Model/UserModel.js'
import bcrypt from 'bcrypt';
export async function LoginIndex(req,res) {
    return res.render('login')
}
export async function LoginUser(req,res) {
    const {email,senha} = req.body
    const user = await UserModel.findOne({
        where:{email},
        raw: true,
        nest: true,
    })
    if (!user){
        req.flash('error', 'Email ou senha inválido')
        return res.redirect('/login')
    }
    if (!bcrypt.compareSync(senha,user.senha)){
        console.log('senha invalida')
        req.flash('error', 'Email ou senha inválido')
        return res.redirect('/login')
    }
    req.session.usuario = {id:user.id, nome:user.nome}
    req.flash('success', 'Login realizado com sucesso')
    return res.redirect('/')
}