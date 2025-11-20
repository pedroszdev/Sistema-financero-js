import Transacao from "../Model/TransacaoModel.js";
export default async function home(req,res) {

    const transacoes = await Transacao.findAll({
        where: {
            userId: 1 
        }
    });

    let despesaMesAtual = 0;
    let receitaMesAtual = 0;
    let despesaTotal = 0;
    let receitaTotal = 0;
    const mesAtual = new Date().getMonth();
    const dadosCategoria = {};

    for (let i = 0; i<transacoes.length;i++){
        let dataTransação = new Date(transacoes[i].dataValues.data);


        if (dataTransação.getMonth() === mesAtual){
            //CALCULAR RECEITAS E DESPESAS DO MES ATUAL
            if (transacoes[i].dataValues.tipo === 'despesa'){
                despesaMesAtual += transacoes[i].dataValues.valor;
                

                const categoria = transacoes[i].dataValues.categoria;
                const valor = transacoes[i].dataValues.valor;
                // Se a categoria já existe no objeto, adiciona o valor.
                if (dadosCategoria[categoria]) {
                    dadosCategoria[categoria] += valor;
                } else {
                    // Se não existe, inicializa com o valor atual.
                    dadosCategoria[categoria] = valor;
                }


            }else if (transacoes[i].dataValues.tipo === 'Receita'){
                receitaMesAtual += transacoes[i].dataValues.valor;
            }


            //INFOS GRAFICO PIZZA

            
        }

        //CALCULAR SALDO
        if (transacoes[i].dataValues.tipo === 'despesa'){
            despesaTotal += transacoes[i].dataValues.valor;
        }else if (transacoes[i].dataValues.tipo === 'Receita'){
            receitaTotal += transacoes[i].dataValues.valor;
        }

            
        
    }
    let saldo = receitaTotal - despesaTotal;

    //VE OS ULTIMOS 6 MESES
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago", "Set", "Out", "Nov", "Dez"]
    const ultimos6Meses = [];
    for (let i=5;i>=0;i--){
        let mesAtual = new Date();
        mesAtual.setMonth(mesAtual.getMonth() - i)
        ultimos6Meses.push(mesAtual.getMonth())
    }


    const dados6meses = {};
    let receita = 0;
    let despesa = 0;

    //PEGA AS INFOS DE RECEITA E DESPESA DOS ULTIMOS 6 MESES
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

    const context = {
        receitaMesAtual: receitaMesAtual.toFixed(2),
        despesaMesAtual: despesaMesAtual.toFixed(2),
        saldo: saldo.toFixed(2),
        dados6meses,
        dadosCategoria
    }

    return res.render('home', {context})
}