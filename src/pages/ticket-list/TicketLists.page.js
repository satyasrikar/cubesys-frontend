import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";

import { Container, Row, Col, Button } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";

import { Link } from "react-router-dom";

export const TicketLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="All Tickets" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/add-ticket">
            <Button variant="dark">Add New Ticket</Button>
          </Link>
        </Col>
        <Col className="text-right">
          <SearchForm />
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">Recently Added tickets</Col>
      </Row>
      <hr />
      <hr />
      <Row>
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};
