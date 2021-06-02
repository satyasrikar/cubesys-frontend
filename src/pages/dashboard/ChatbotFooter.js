import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatBot from "react-simple-chatbot";

import "./ChatbotFooter.css";

const ChatbotFooter = () => {
  const [toggle, setToggle] = useState(false);
  const toggleChatBox = () => {
    setToggle(!toggle);
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
    <div id="chatbot">
      <Button onClick={toggleChatBox} id="chatbotHeader">
        CubeSys Assistant
      </Button>
      {toggle ? <ChatBot steps={steps} /> : ""}
    </div>
  );
};

export default ChatbotFooter;
