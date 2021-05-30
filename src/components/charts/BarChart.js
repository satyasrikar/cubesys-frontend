import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { Bar } from "react-chartjs-2";
import "./BarChart.css";
const QRCode = require("qrcode.react");

const BarChart = ({ data, title, color }) => {
  const [monday, setMonday] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [modaltext, setModaltext] = React.useState("");

  const [open, setOpen] = useState(false);
  const [ticketqr, setTicketQR] = useState(false);

  const sortedTickets = [...data];
  const modalDesc = "Lorem";

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrcode")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "TicketQR_CubeSys_CRM";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  useEffect(() => {
    data.map((ticket, key) => {
      const str = sortedTickets[key].openAt;
      const res1 = str.slice(8, 10);
      let day = parseInt(res1);
      console.log(sortedTickets[key]);
    });
  }, []);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="modalbody">
            <h6>Open Ticket</h6>
            <p>{modaltext}</p>

            <p>
              <QRCode id="qrcode" value={modaltext} />
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={downloadQRCode} variant="success">
            Download QR
          </Button>
          <Button variant="dark" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <div id="barBody">
        <div id="ticketlog">
          {data.map((ticket) => {
            if (title === "Tickets Logged") {
              if (ticket.status === "Pending operator response") {
                return (
                  <div id="openTicketLog">
                    <p
                      id="ticketTag"
                      key={`${ticket.subject}_{ticket.openAt}`}
                      style={{ height: "40px" }}
                    >
                      <b id="openLabel">[PENDING]</b> TICKETS:
                      <b>[{ticket._id}]</b>
                      <hr />
                      <b>Title :</b>
                      {ticket.subject}
                      <Button
                        id="btn"
                        variant="dark"
                        style={{ fontSize: "1rem" }}
                        onClick={() => {
                          setModalShow(true);
                          setModaltext(ticket.subject);
                        }}
                      >
                        Show QR
                      </Button>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        name={{ ticket }}
                      />
                    </p>
                  </div>
                );
              }
            } else if (title === "Tickets Resolved") {
              if (ticket.status === "Closed") {
                return (
                  <ul id="closedTicketLog">
                    <li
                      id="ticketTag"
                      key={`${ticket.subject}_{ticket.openAt}`}
                    >
                      <b id="closedLabel">[RESOLVED]</b> TICKETS:
                      <b>[{ticket._id}]</b>
                      <hr />
                      <b>Title :</b>
                      {ticket.subject}
                      <Button
                        id="btn2"
                        variant="dark"
                        style={{ fontSize: "1rem" }}
                        onClick={() => setModalShow(true)}
                      >
                        Show QRx
                      </Button>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        name={{ ticket }}
                        desc={modalDesc}
                      />
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
                  backgroundColor: color,
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
    </>
  );
};

export default BarChart;
