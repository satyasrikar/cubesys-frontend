import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  const lineChartlabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <Line
        data={{
          labels: { lineChartlabels },
          datasets: [
            {
              label: "My First Dataset",
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
        width={200}
        height={300}
        options={{ maintainAspectRatio: false }}
      >
        LineChart
      </Line>
    </>
  );
};

export default LineChart;
