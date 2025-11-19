if (typeof Chart === "undefined") {
  console.error("A biblioteca Chart.js não carregou. Verifique sua conexão.");
  document.querySelector(".chart-container").innerHTML =
    '<p style="color:red; text-align:center;">Erro ao carregar biblioteca Chart.js</p>';
} else {
  const ctx = document.getElementById("revenueExpenseChart-linha").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [
        {
          label: "Despesas",
          data: [3200, 3800, 3400, 4200, 3600, 3500],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          fill: true, // Preenchimento ativado
          tension: 0.4,
          pointBackgroundColor: "#ef4444",
          borderWidth: 2,
        },
        {
          label: "Receitas",
          data: [6800, 7500, 7000, 8000, 7600, 8200],
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
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: {
          grid: { borderDash: [4, 4], drawBorder: false },
          beginAtZero: true,
        },
      },
    },
  });
}
