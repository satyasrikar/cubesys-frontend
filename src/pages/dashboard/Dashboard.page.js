import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Jumbotron, Card } from "react-bootstrap";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
import ChatBot from "react-simple-chatbot";

import { fetchAllTickets } from "../ticket-list/ticketsAction";
import "./Dashboard.css";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);

  const toggleChatBox = () => {
    setToggle(!toggle);
  };

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;

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

        <div id="chatbot">
          <Button onClick={toggleChatBox} id="chatbotHeader">
            CubeSys Assistant
          </Button>
          {toggle ? <ChatBot steps={steps} /> : ""}
        </div>

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
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{totalTickets}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "15rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Pending tickets:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{pendingTickets.length}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "15rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Pending tickets:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{pendingTickets.length}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "15rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Pending tickets:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{pendingTickets.length}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </div>

        <Link to="/add-ticket">
          <Button
            variant="dark"
            style={{ fontSize: "1rem", padding: "10px 30px" }}
          >
            Add New Ticket
          </Button>
        </Link>

        <Link to="/tickets">
          <Button
            variant="success"
            style={{
              fontSize: "1rem",
              padding: "10px 30px",
              margin: "1rem",
            }}
          >
            View All Tickets
          </Button>
        </Link>
      </Container>
    </>
  );
};
