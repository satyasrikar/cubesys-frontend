import React, { useEffect, useState } from "react";
import "./Profile.css";
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

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.ibb.co/1m0pj6k/Profile-Placeholder-image-Gray-silhouette-no-photo-of-a-person-on-the-avatar-The-default-pic-is-used.jpg"
  );

  const [bio, setBio] = useState("BIO");

  useEffect(() => {
    setBio("Associate Software Engineer / Operations");
  }, []);

  const getUserID = () => {
    const id = user.user._id;
    const userId = String(id).slice(-6);
    return userId;
  };

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
            Download Profile Details
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
