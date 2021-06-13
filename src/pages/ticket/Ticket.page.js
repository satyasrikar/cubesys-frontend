import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import "./Ticket.page.css";
import {
  fetchSingleTicket,
  closeTicket,
  openTicket,
} from "../ticket-list/ticketsAction";
import { resetResponseMsg } from "../ticket-list/ticketsSlice";

export const Ticket = () => {
  const { tId } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    selectedTicket,
    replyMsg,
    replyTicketError,
  } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchSingleTicket(tId));

    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
    };
  }, [tId, dispatch, replyMsg, replyTicketError]);

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          {selectedTicket.status === "Pending operator response" ? (
            <div className="statusbarOpen">
              TICKET IS: <b>OPEN</b> | Ref ID: <b>[{selectedTicket._id}]</b>
            </div>
          ) : (
            <div className="statusbarClosed">
              {" "}
              TICKET IS: <b>CLOSED</b> | Ref ID: <b>[{selectedTicket._id}]</b>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {replyTicketError && (
            <Alert variant="danger">{replyTicketError}</Alert>
          )}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">
            Subject: <b>{selectedTicket.subject}</b>
          </div>
          <div className="date">
            <b>
              Ticket Opened:{" "}
              {selectedTicket.openAt &&
                new Date(selectedTicket.openAt).toLocaleString()}
            </b>
          </div>
          <div className="status">
            Status: <b>{selectedTicket.status}</b>
          </div>
        </Col>
        <Col className="text-right">
          {selectedTicket.status == "Pending operator response" ? (
            <Button
              className="mr-2"
              variant="danger"
              onClick={() => dispatch(closeTicket(tId))}
              disabled={selectedTicket.status === "Closed"}
            >
              Close Ticket
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => dispatch(openTicket(tId))}
              disabled={selectedTicket.status === "Pending operator response"}
            >
              Open Ticket
            </Button>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {selectedTicket.conversations && (
            <MessageHistory msg={selectedTicket.conversations} />
          )}
        </Col>
      </Row>
      <hr />

      <Row className="mt-4">
        <Col>
          <UpdateTicket _id={tId} />
        </Col>
      </Row>
    </Container>
  );
};
