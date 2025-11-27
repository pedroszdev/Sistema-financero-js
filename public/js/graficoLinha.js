if (typeof Chart === "undefined") {
  document.querySelector(".chart-container").innerHTML =
    '<p style="color:red; text-align:center;">Erro ao carregar biblioteca Chart.js</p>';
} else {
  if (typeof dados6meses !== "undefined") {
    const ctx = document
      .getElementById("revenueExpenseChart-linha")
      .getContext("2d");

    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const labels = [];
    const despesas6meses = [];
    const receitas6meses = [];
    for (let mes in dados6meses) {
      labels.push(mes);
      despesas6meses.push(dados6meses[mes].despesa.toFixed(2));
      receitas6meses.push(dados6meses[mes].receita.toFixed(2));
    }
    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Despesas",
            data: despesas6meses,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            fill: true, // Preenchimento ativado
            tension: 0.4,
            pointBackgroundColor: "#ef4444",
            borderWidth: 2,
          },
          {
            label: "Receitas",
            data: receitas6meses,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true, // Preenchimento ativado
            tension: 0.4,
            pointBackgroundColor: "#10b981",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { // Configurando o Eixo Y
                beginAtZero: true, // Garante que o eixo comece no 0 (opcional)
                grid: { borderDash: [4, 4], drawBorder: false },
                beginAtZero: true,
                ticks: {
                    // Define o intervalo entre as marcas
                    stepSize: 1500, 
                    // Você também pode formatar os rótulos aqui (para adicionar R$)
                    callback: function(value, index, ticks) {
                        // Formata a label: transforma 1000 em R$ 1.000
                        return 'R$ ' + value.toLocaleString('pt-BR');
                    }
                }
            },
            x: { grid: { display: false }, border: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": R$ " + context.parsed.y;
              },
            },
          },
        },
      },
    });
  }
}
