import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummy-tickets.json";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";

import { fetchAllTickets } from "../ticket-list/ticketsAction";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totlatTickets = tickets.length;
  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Dashboard" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 mb-2">
          <Container>
            <Row>
              <Col md={4}>
                <Link to="/add-ticket">
                  <Button
                    variant="dark"
                    style={{ fontSize: "1rem", padding: "10px 30px" }}
                  >
                    Add New Ticket
                  </Button>
                </Link>
              </Col>
              <Col md={{ span: 4, offset: 4 }}>
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
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className="text-center  mb-2">
          <div>Total tickets: {totlatTickets}</div>
          <div>Pending tickets: {pendingTickets.length}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">Recently Added tickets</Col>
      </Row>
      <hr />

      <Row>
        <Col className="recent-ticket">
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Container>
  );
};
