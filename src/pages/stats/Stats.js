import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Stats.css";
import "react-calendar/dist/Calendar.css";
import { SiNotion, SiSlack } from "react-icons/si";
import { FaCalendarAlt } from "react-icons/fa";

import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardGroup,
  Col,
  Collapse,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../ticket-list/ticketsAction";
import BarChart from "../../components/charts/BarChart";
import dotenv from "dotenv";
import Calendar from "react-calendar";

const Stats = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.NOTION_AUTH_TOKEN}`;

  // axios.defaults.headers.common["Notion-Version"] = "2021-05-13";
  // axios.defaults.headers.common["Content-Type"] = "application/json";
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [notion, setNotion] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const [date, setDate] = useState("");

  const [payload, setPayload] = useState([]);
  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  function setData() {
    setPayload({
      parent: { database_id: `${process.env.NOTION_DATABASE_ID}` },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Hello, World",
              },
            },
          ],
        },
      },
    });
    postToNotion(payload);
  }

  const postUrl = "https://api.notion.com/v1/pages";
  const getURL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`;

  const postToNotion = (payload) => {
    axios
      .post(postUrl, payload)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  if (isLoading) return <h3>Loading ...</h3>;
  if (error) return <h3>{error}</h3>;

  const showCalendar = () => {
    setCalendar(!calendar);
  };

  return (
    <>
      <Container>
        <Card>
          <div id="time" style={{ display: "flex", position: "relative" }}>
            <div>
              <b>CURRENT TIME:</b>
            </div>
            {"   "}

            <div style={{ backgroundColor: "pink", position: "" }}>{time}</div>
          </div>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Ticket Statistics</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Cubesys | Statistics</Card.Title>
            <Collapse in={open}>
              <div id="statsCalendar">
                <Calendar />
              </div>
            </Collapse>
            <Card.Text>
              View all your Statistics at one place, fetched from your
              dashboard. content.
            </Card.Text>

            {/* Buttons to Sync to Slack
         Buttons here are to be synced with Notion and SLACK API */}
            <Row>
              <Col className="text-center mt-0 mb-0">
                <Container id="buttonContainer">
                  <Row style={{ display: "flex" }}>
                    <Button
                      id="openCalendar"
                      variant="light"
                      style={{
                        fontSize: "1rem",
                        padding: "10px 30px",
                        margin: "5px",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <FaCalendarAlt /> View Calendar
                    </Button>
                    <Button
                      onClick={() => setShow(true)}
                      id="syncSlack"
                      variant="dark"
                      disabled
                      style={{
                        fontSize: "1rem",
                        padding: "10px 30px",
                        margin: "5px",
                      }}
                    >
                      <SiSlack /> {""}Sync Slack
                    </Button>

                    <Button
                      id="syncNotion"
                      variant="success"
                      style={{
                        fontSize: "1rem",
                        padding: "10px 30px",
                        margin: "5px",
                      }}
                      disabled
                      onClick={setData}
                    >
                      <SiNotion /> Sync Notion Workspace
                    </Button>
                  </Row>
                  <Row>
                    <BarChart
                      data={searchTicketList}
                      title="Tickets Logged"
                      className="mb-2"
                      color="rgb(255, 204, 204)"
                    />
                    <hr />
                  </Row>
                </Container>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />
      </Container>
    </>
  );
};

export default Stats;
