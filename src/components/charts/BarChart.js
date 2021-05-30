import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { Bar } from "react-chartjs-2";
import "./BarChart.css";

const BarChart = ({ data, title }) => {
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState(0);

  const [monday, setMonday] = useState(0);

  const mydata = [
    {
      payload: 20,
      name: "first",
    },
    {
      payload: 30,
      name: "second",
    },
  ];
  const sortedTickets = [...data];

  useEffect(() => {
    data.map((ticket, key) => {
      const str = sortedTickets[key].openAt;
      const res1 = str.slice(8, 10);
      let day = parseInt(res1);

      switch (day % 7) {
        case 1:
          setMonday(monday + 1);
          break;
        case 2:
          console.log("two");
          break;
        case 3:
          console.log("three");
          break;
        case 4:
          console.log("four");
          break;
        case 5:
          console.log("fiveayyyyyyyy");
          break;
        case 6:
          console.log("six");
          break;
        case 7:
          console.log("seven");
          break;

        default:
          console.log("NOOOOOOOOOOOOOOOO");
          break;
      }
    });
  }, []);

  return (
    <div id="barBody">
      <div>
        {data.map((ticket) => {
          if (title === "Tickets Logged") {
            if (ticket.status === "Pending operator response") {
              return (
                <ul>
                  <li key={`${ticket.subject}_{ticket.openAt}`}>
                    <b>OPEN TICKETS: </b>
                    {ticket.subject} - {ticket.openAt}
                  </li>
                </ul>
              );
            }
          } else if (title === "Tickets Resolved") {
            if (ticket.status === "Closed") {
              return (
                <ul>
                  <li key={`${ticket.subject}_{ticket.openAt}`}>
                    <b>CLOSED TICKETS: </b>
                    {ticket.subject} - {ticket.openAt}
                  </li>
                </ul>
              );
            }
          }
        })}
      </div>
      <div id="bar">
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
                label: title,
                data: ["40", "20", "30", "40", "15", "34", "70"],
                backgroundColor: ["rgba(0, 0, 0, 0.80)"],
                borderColor: ["rgba(0, 0, 0, 0.75)"],
                borderWidth: 1,
                hoverBorderWidth: 4,
                hoverBorderColor: "rgba(255, 255, 255, 1)",
              },
            ],
            options: {
              title: {
                display: true,
                fontSize: 25,
              },
            },
            scales: {
              x: {
                type: "linear",
                min: 1000,
                max: new Date("2022-01-01").valueOf(),
              },
            },
            legend: {
              display: false,
              posititon: "right",
            },
          }}
          width={200}
          height={300}
          options={{ maintainAspectRatio: false }}
        >
          Barchart
        </Bar>
      </div>
    </div>
  );
};

export default BarChart;
