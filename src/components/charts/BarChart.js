import React from "react";

import { Bar } from "react-chartjs-2";

const BarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              label: "# of Tickets",
              data: ["40", "20", "30", "40", "15", "34", "70"],
              backgroundColor: ["rgba(0, 0, 0, 0.80)"],
              borderColor: ["rgba(0, 0, 0, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        width={200}
        height={300}
        options={{ maintainAspectRatio: false }}
      >
        Barchart
      </Bar>
    </div>
  );
};

export default BarChart;
