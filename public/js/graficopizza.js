const chartData = Object.entries(dadosCategoria);
const colors = [
    // Azuis e Cianos
    '#0074D9', '#00BCD4', '#00A896', '#4CC9F0',
    // Verdes e Amarelos
    '#2ECC40', '#FFDC00', '#F0E68C', '#90EE90',
    // Laranjas e Vermelhos
    '#FF851B', '#FF4136', '#E91E63', '#FF69B4',
    // Roxos e Rosas
    '#B10DC9', '#673AB7', '#9932CC', '#D8BFD8',
    // Tons de Terra/Outros
    '#A0522D', '#B8860B', '#607D8B', '#778899',
    // Cores Adicionais
    '#39CCCC', '#1E90FF'
];
const labels = [];
const data = [];
let total = 0;
for (let i= 0;i<chartData.length;i++){
    labels.push(chartData[i][0]);
    data.push(chartData[i][1]);
    total += chartData[i][1];
    chartData[i].push(colors.sort(() => Math.random() - 0.5))
}

    

// 1. Configuração do Chart.js
const ctx = document.getElementById('expenseChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels,
        datasets: [{
            data,
            backgroundColor: chartData[0][2],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%', // Deixa a rosca mais fina como na imagem
        plugins: {
            legend: {
                display: false // Escondemos a legenda padrão para fazer a customizada
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// 2. Gerar a Lista Customizada (HTML Dinâmico)
const legendContainer = document.getElementById('legend-container');

for (let i= 0;i<chartData.length;i++){
    const percentage = ((chartData[i][1] / total) * 100).toFixed(1);
    console.log(chartData[i][2][i])
    
    const html = `
        <div class="legend-item-pizza">
            <div class="info-row-pizza">
                <div class="label-group-pizza">
                    <span class="dot-pizza" style="background-color: ${chartData[i][2][i]} "></span>
                    <span>${chartData[i][0]}</span>
                </div>
                <div class="value-group-pizza">
                    <span>R$ ${chartData[i][1].toFixed(2)}</span>
                    <span class="percentage-pizza">${percentage}%</span>
                </div>
            </div>
            <div class="progress-bg-pizza">
                <div class="progress-fill-pizza" style="width: ${percentage}%; background-color: ${chartData[i][2][i]} "></div>
            </div>
        </div>
    `;
    legendContainer.innerHTML += html;
};