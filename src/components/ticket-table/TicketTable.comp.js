import React from "react";
import { useSelector } from "react-redux";

import { Button, Table } from "react-bootstrap";

import { Link } from "react-router-dom";

import { FaListAlt } from "react-icons/fa";
import { CSVLink } from "react-csv";

export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  if (isLoading) return <h3>Loading ...</h3>;
  if (error) return <h3>{error}</h3>;

  const ticketData = searchTicketList;

  console.log(ticketData[0]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Ticket ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Opened Date</th>
          </tr>
        </thead>
        <tbody>
          {searchTicketList.length ? (
            searchTicketList.map((row, index) => (
              <tr key={row._id}>
                <td>{row._id}</td>
                <td>
                  <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
                </td>
                {row.status === "Closed" ? (
                  <td style={{ backgroundColor: "#FF9DA2" }}>{row.status}</td>
                ) : (
                  <td style={{ backgroundColor: "#93CA5B" }}>{row.status}</td>
                )}
                <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No ticket to show{" "}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Link to="#">
        <Button className="mt-2" variant="dark" style={{ float: "right" }}>
          Download Ticket Data
        </Button>
      </Link>
    </>
  );
};
