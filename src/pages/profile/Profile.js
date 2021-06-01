import React, { useEffect, useState } from "react";
import "./Profile.css";
import { CSVLink } from "react-csv";
import ChatBot from "react-simple-chatbot";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.ibb.co/1m0pj6k/Profile-Placeholder-image-Gray-silhouette-no-photo-of-a-person-on-the-avatar-The-default-pic-is-used.jpg"
  );
  const userData = user;
  const [bio, setBio] = useState("BIO");

  useEffect(() => {
    setBio("Associate Software Engineer / Operations");
  }, []);

  const headers = [
    { label: "Employee ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Profile", key: "bio" },
  ];

  const data = [
    {
      id: userData.user._id,
      name: userData.user.name,
      email: userData.user.email,
      profile: bio,
    },
  ];

  const csvData = {
    data: data,
    headers: headers,
    filename: `[${userData.user.name}]CubesysProfilePhoto.csv`,
  };

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
      <Row>
        <Col>
          <PageBreadcrumb page="Profile" />
        </Col>
      </Row>

      <div id="profileContainer">
        <Card bg="dark" text="white" style={{ width: "18rem" }}>
          <Card.Header>Profile Photo</Card.Header>
          <Image id="profilePhoto" src={profilePhoto} roundedCircle />

          <div style={{ display: "flex" }}>
            <Button id="editButton" variant="light">
              Edit
            </Button>
            <Button id="removeButton" variant="danger">
              Remove
            </Button>
          </div>
        </Card>

        <div id="profileDetails">
          <Card
            id="profileDetailsCard"
            bg="white"
            text="dark"
            style={{ width: "60rem" }}
            className="ml-4"
          >
            <Card.Header>
              <div>
                <b>Profile Details</b>
              </div>
            </Card.Header>
            <Card.Body>
              <Table bordered>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{user.user._id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{user.user.name}</td>
                  </tr>
                  <tr>
                    <th>Profile</th>
                    <td>Manager</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.user.email}</td>
                  </tr>
                  <tr>
                    <th>Bio</th>
                    <td>{bio}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Button id="downloadButton" variant="info">
            Home
          </Button>
          <Button id="homeButton" variant="success">
            <CSVLink id="csvlink" {...csvData}>
              {" "}
              Download Profile Details (CSV)
            </CSVLink>
          </Button>
        </div>
      </div>
      <div id="chatbot">{/* <ChatBot steps={steps} /> */}</div>
    </>
  );
};

export default Profile;
