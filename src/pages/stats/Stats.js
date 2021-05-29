import Axios from "axios";
import React, { useState } from "react";
import {
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

const Stats = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled">Disabled</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Collapse in={open}>
            <div id="example-collapse-text">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
          </Collapse>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Row style={{ width: "full" }}>
            <Col md={4}>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                variant="primary"
              >
                Go somewhere
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                variant="primary"
              >
                Go somewhere
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Container>
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
      </Container>

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
            src="https://picsum.photos/201/300"
            style={{ height: "200px", width: "500px" }}
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
};

export default Stats;
