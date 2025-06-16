import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

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

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAndRenderChart = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/pacientes/journals`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const entries = response.data;

        // Contamos cuántas veces aparece cada estado de ánimo
        const conteo = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        entries.forEach(entry => {
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
                  "#e74c3c",
                  "#3498db",
                  "#f1c40f",
                  "#95a5a6",
                  "#2ecc71",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                stepSize: 1,
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