import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Stats.css";

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

const Stats = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.NOTION_AUTH_TOKEN}`;

  // axios.defaults.headers.common["Notion-Version"] = "2021-05-13";
  // axios.defaults.headers.common["Content-Type"] = "application/json";
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [notion, setNotion] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, []);

  const [payload, setPayload] = useState([]);

  const showAlert = () => {
    setShow(true);
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
  };

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

  console.log("THE PAYLOAD is " + payload);
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  if (isLoading) return <h3>Loading ...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled">Disabled</Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Cubesys | Statistics</Card.Title>
          <Collapse in={open}>
            <div id="example-collapse-text">
              Please use the Sync to Slack Button to keep your updates in sync
              with your Slack Channels!
            </div>
          </Collapse>
          <Card.Text>
            View all your Statistics at one place, fetched from your dashboard.
            content.
          </Card.Text>

          {/* Buttons to Sync to Slack
         Buttons here are to be synced with Notion and SLACK API */}
          <Row>
            <Col className="text-center mt-0 mb-0">
              <Container id="buttonContainer">
                <Row>
                  <Col md={4}>
                    <Link to="#">
                      <Button
                        id="openInfo"
                        variant="light"
                        style={{ fontSize: "1rem", padding: "10px 30px" }}
                        onClick={() => setOpen(!open)}
                      >
                        View Info
                      </Button>
                      <Button
                        onClick={() => setShow(true)}
                        id="syncSlack"
                        variant="dark"
                        style={{ fontSize: "1rem", padding: "10px 30px" }}
                      >
                        Sync Slack
                      </Button>
                    </Link>
                  </Col>
                  <Col md={{ span: 4, offset: 4 }}>
                    <Link to="#">
                      <Button
                        variant="success"
                        style={{
                          fontSize: "1rem",
                          padding: "10px 30px",
                        }}
                        onClick={setData}
                      >
                        Sync Notion Workspace
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <BarChart
        data={searchTicketList}
        title="Tickets Logged"
        className="mb-2"
        color="rgb(255, 204, 204)"
      />
      <br />
      <br />
      <BarChart
        data={searchTicketList}
        title="Tickets Resolved"
        className="mb-2"
        color="rgb(204, 255, 204)"
      />

      {/* <Container>
        <Row
          lg={5}
          style={({ justifyContent: "center" }, { backgroundColor: "white" })}
        >
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Header>Dashboard UI1</Card.Header>
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Header>Dashboard UI1</Card.Header>
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Header>Dashboard UI1</Card.Header>
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Header>Dashboard UI1</Card.Header>
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          lg={5}
          style={({ justifyContent: "center" }, { backgroundColor: "white" })}
        >
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              bg="dark"
              text="light"
              style={{ margin: "5px" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>
                  Card Title
                  <Badge bg="success">Success</Badge>
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ButtonToolbar
          className="justify-content-between p-2"
          aria-label="Toolbar with Button groups"
        >
          <Button variant="outline-success">Home</Button>{" "}
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Input group example"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon2"
            />
          </InputGroup>
        </ButtonToolbar>
      </Container> */}

      {/* <Container>
        <hr />
        <h2>Blog</h2>

        <CardGroup style={({ width: "full" }, { margin: "25px" })}>
          <Card>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200/400"
              style={{ height: "200px", width: "500px" }}
            />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200/302"
              style={{ height: "200px", width: "500px" }}
            />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200/102"
              style={{ height: "200px", width: "353px" }}
            />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container> */}
    </>
  );
};

export default Stats;
