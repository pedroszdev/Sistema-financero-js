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
            return res.redirect('/cadastro')
        }
        if (senha.length <=6 ){
            const erros = 'Sua senha precisa ter 7 ou mais caractere'
            req.flash('error', erros)
            return res.redirect('/cadastro')
        }
        const user = await UserModel.create({nome,email,senha})
        req.flash('success', 'Usuário criado com sucesso')
        return res.redirect('/login')
    }catch(e){
        req.flash('error', `Error: ${e}`)
        return res.redirect('/')
    }

}

export async function LoginUser(req,res) {
    
}
