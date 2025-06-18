import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import service from "../../services/service.config";

const estadoLabels = {
  1: "😠 Muy enfadado",
  2: "😢 Triste",
  3: "😕 Meh",
  4: "😐 Neutro",
  5: "😊 Feliz",
};

function CustomCharts() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndRenderChart = async () => {
      try {
        const response = await service.get("/pacientes/journals");

        const entries = response.data;

        // Contamos cuántas veces aparece cada estado de ánimo
        const conteo = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        entries.forEach((entry) => {
          if (entry.estadoAnimo >= 1 && entry.estadoAnimo <= 5) {
            conteo[entry.estadoAnimo]++;
          }
        });

        // Datos para Chart.js
        const labels = Object.values(estadoLabels);
        const data = Object.values(conteo);

        const ctx = chartRef.current;

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Frecuencia de estado de ánimo",
                data,
                backgroundColor: [
                  "#d32f2f", // rojo accesible
                  "#1976d2", // azul
                  "#fbc02d", // amarillo
                  "#757575", // gris
                  "#388e3c", // verde
                ],
              },
            ],
          },
          options: {
            responsive: true,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 16,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 18, // Más grande para emojis y texto
                  },
                  color: "#333", // Contraste accesible
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 14,
                  },
                  color: "#333",
                },
                grid: {
                  color: "#e0e0e0",
                },
              },
            },
          },
        });
      } catch (err) {
        console.error("Error al obtener los datos del journaling:", err);
        setError("No se pudieron cargar los datos del estado de ánimo.");
      }
    };

    fetchAndRenderChart();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default CustomCharts;
