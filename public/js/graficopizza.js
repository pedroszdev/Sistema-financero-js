const chartData = [
            { label: 'Alimentação', value: 850, color: '#3b82f6' }, // Azul
            { label: 'Transporte', value: 650, color: '#8b5cf6' },  // Roxo
            { label: 'Moradia', value: 1200, color: '#ec4899' },    // Rosa
            { label: 'Lazer', value: 450, color: '#f59e0b' },       // Laranja
            { label: 'Outros', value: 300, color: '#10b981' }       // Verde
        ];

        const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

        // 1. Configuração do Chart.js
        const ctx = document.getElementById('expenseChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartData.map(d => d.label),
                datasets: [{
                    data: chartData.map(d => d.value),
                    backgroundColor: chartData.map(d => d.color),
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

        chartData.forEach(item => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            
            const html = `
                <div class="legend-item-pizza">
                    <div class="info-row-pizza">
                        <div class="label-group-pizza">
                            <span class="dot-pizza" style="background-color: ${item.color}"></span>
                            <span>${item.label}</span>
                        </div>
                        <div class="value-group-pizza">
                            <span>R$ ${item.value.toFixed(2)}</span>
                            <span class="percentage-pizza">${percentage}%</span>
                        </div>
                    </div>
                    <div class="progress-bg-pizza">
                        <div class="progress-fill-pizza" style="width: ${percentage}%; background-color: ${item.color}"></div>
                    </div>
                </div>
            `;
            legendContainer.innerHTML += html;
        });