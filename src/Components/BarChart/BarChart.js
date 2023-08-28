import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart(props) {
  const { recordsData, countries, topics, regions, pestles, chartType } = props;

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Visualization",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  let labels = [];

  switch (chartType) {
    case "country":
      labels = countries;
      break;
    case "topic":
      labels = topics;
      break;
    case "region":
      labels = regions;
      break;

    default:
      labels = countries;
      break;
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Intensity",
        data: labels.map((label) => {
          const found = recordsData.find((item) => item[chartType] === label);
          return found ? found.intensity : 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Likelihood",
        data: labels.map((label) => {
          const found = recordsData.find((item) => item[chartType] === label);
          return found ? found.likelihood : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Relevance",
        data: labels.map((label) => {
          const found = recordsData.find((item) => item[chartType] === label);

          return found ? found.relevance : 0;
        }),
        borderColor: "rgb(22, 32, 333)",
        backgroundColor: "rgba(321, 22, 43, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
