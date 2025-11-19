import Transacao from "../Model/TransacaoModel.js";
export default async function home(req,res) {

    const transacoes = await Transacao.findAll({
        where: {
            userId: 1 
        }
    });

    let despesaMesAtual = 0;
    let receitaMesAtual = 0;
    const mesAtual = new Date().getMonth();

    //Pega as despesas e receitas do mes atual
    for (let i = 0; i<transacoes.length;i++){
        let dataTransação = new Date(transacoes[i].dataValues.data);

        if (dataTransação.getMonth() === mesAtual){
            if (transacoes[i].dataValues.tipo === 'despesa'){
                despesaMesAtual += transacoes[i].dataValues.valor
            }else if (transacoes[i].dataValues.tipo === 'Receita'){
                receitaMesAtual += transacoes[i].dataValues.valor
            }
        }
            
        
    }
    let saldo = receitaMesAtual - despesaMesAtual;


    const ultimos6Meses = [];
    for (let i=5;i>=0;i--){
        let mesAtual = new Date();
        mesAtual.setMonth(mesAtual.getMonth() - i)
        ultimos6Meses.push(mesAtual.getMonth())
    }
    const dados6meses = {};
    let receita = 0;
    let despesa = 0;
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago", "Set", "Out", "Nov", "Dez"];
    
    for (let mes of ultimos6Meses){
        for (let i = 0; i<transacoes.length;i++){
            let dataTransação = new Date(transacoes[i].dataValues.data);
            if (mes === dataTransação.getMonth()){
                if (transacoes[i].dataValues.tipo === 'despesa'){
                    despesa += transacoes[i].dataValues.valor
                }
                if (transacoes[i].dataValues.tipo === 'Receita'){
                    receita += transacoes[i].dataValues.valor
                }
            }
        }
        dados6meses[meses[mes]] = {receita,despesa}
        receita = 0;
        despesa = 0;
    }

    // const max = Math.max([])

    const context = {
        receitaMesAtual,
        despesaMesAtual,
        saldo,
        dados6meses
    }
    //usar char.js para fazer os graficos, arrumar os links
    // return res.json(dados6meses);
    return res.render('home', {context})
}