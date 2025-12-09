import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Users",
      data: [400, 600, 800],
      borderColor: "#2563eb",
      fill: false,
    },
  ]
};

<Line data={data} />