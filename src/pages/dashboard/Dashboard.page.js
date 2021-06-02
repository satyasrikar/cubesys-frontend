import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Jumbotron, Card } from "react-bootstrap";
import { ThemeProvider } from "styled-components";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
import ChatBot from "react-simple-chatbot";

import { fetchAllTickets } from "../ticket-list/ticketsAction";
import "./Dashboard.css";
import Calendar from "react-calendar";
import { GrAdd } from "react-icons/gr";
import { FaListAlt } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState();

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica",
    headerBgColor: "#292b2c",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#292b2c",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch, date]);

  const toggleChatBox = () => {
    setToggle(!toggle);
  };

  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (row) => row.status !== "Pending operator response"
  );
  let last = openTickets.pop();
  const showCalendar = () => {
    setCalendar(!calendar);
  };
  const [nowTime, setNowtime] = useState(value);
  console.log(nowTime);

  const steps = [
    {
      id: "1",
      message: "Welcome to Cubesys, what do you want to do today?",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: 1, label: "Add new Ticket", trigger: "3" },
        { value: 2, label: "View Dashboard", trigger: "4" },
        { value: 3, label: "View latest tickets", trigger: "5" },
        { value: 4, label: "Go to profile", trigger: "6" },
      ],
    },
    {
      id: "3",
      component: (
        <Button id="chatButton" variant="link" block>
          <Link
            to="/add-ticket"
            style={{
              textDecoration: "none",
            }}
          >
            Add New Ticket
          </Link>
        </Button>
      ),
      end: true,
    },
    {
      id: "4",
      component: (
        <Button id="chatButton" variant="light">
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      ),
      end: true,
    },
    {
      id: "5",
      component: <div>LATEST TICKETS</div>,
      end: true,
    },
    {
      id: "6",
      component: (
        <Button variant="light">
          <Link to="/profile">Profile</Link>
        </Button>
      ),
      end: true,
    },
  ];

  return (
    <>
      <Container>
        <Jumbotron>
          <h3>Welcome to CubeSys CRM</h3>
          <p>
            Log new tickets, view your ticket stats and sync to workspaces live
            from your Cubesys Dashboard!
          </p>
          {/* <p>
            <Link to="#">
              <Button
                variant="dark"
                style={{ fontSize: "1rem", padding: "10px 30px" }}
              >
                Read More
              </Button>
            </Link>
          </p> */}
        </Jumbotron>

        <Row>
          <Col>
            <PageBreadcrumb page="Dashboard" />
          </Col>
        </Row>

        <div id="dashboardCards">
          <Card border="dark" style={{ width: "15rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Total tickets:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Total Log Count
              </Card.Subtitle>
              <Card.Text>{totalTickets}</Card.Text>
              <Card.Link href="#">View Tickets</Card.Link>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "15rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Pending tickets:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Unresolved
              </Card.Subtitle>
              <Card.Text>{pendingTickets.length}</Card.Text>
              <Card.Link href="#">View Tickets</Card.Link>
            </Card.Body>
          </Card>
          <div id="calendar">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>

        <Link to="/add-ticket">
          <Button
            variant="light"
            style={{
              fontSize: "1rem",
              padding: "10px 30px",
              border: "1px solid black",
            }}
          >
            <GrAdd /> Add New Ticket
          </Button>
        </Link>

        <Link to="/tickets">
          <Button
            variant="info"
            style={{
              fontSize: "1rem",
              padding: "10px 30px",
              margin: "1rem",
            }}
          >
            <FaListAlt /> View All Tickets
          </Button>
        </Link>
      </Container>
      <div id="chatbot">
        <span
          style={{
            color: "#00CC22",
            padding: "15px",
            alignItems: "center",
          }}
        >
          <RiRadioButtonLine />
          Online
        </span>
        <Button onClick={toggleChatBox} id="chatbotHeader">
          CubeSys Assistant
        </Button>
        <ThemeProvider theme={theme}>
          {toggle ? <ChatBot steps={steps} /> : ""}
        </ThemeProvider>
      </div>
    </>
  );
};
