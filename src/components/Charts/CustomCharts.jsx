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

    /*useEffect es un hook de React que permite ejecutar código cuando el componente se monta o cuando cambian ciertas variables.
   Se define una función asíncrona llamada fetchAndRenderChart para obtener datos del servidor y preparar la lógica del gráfico
    Se guarda la lista de entradas del diario (journals) que devuelve el backend.
    Este array contiene objetos
    Se crea un objeto conteo que servirá para contar cuántas veces se repite cada estado de ánimo del 1 al 5.
    */

  useEffect(() => {
    const fetchAndRenderChart = async () => {
      try {
        const response = await service.get("/pacientes/journals");

        const entries = response.data;
        const conteo = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        entries.forEach((entry) => {
          if (entry.estadoAnimo >= 1 && entry.estadoAnimo <= 5) {
            conteo[entry.estadoAnimo]++;
          }
        });

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
              display: false,  // <-- Aquí deshabilitamos la leyenda
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 18,
                },
                color: "#333",
              },
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                display: false,
              },
              grid: {
                display: false,
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

