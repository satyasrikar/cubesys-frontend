steps = [
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
      { value: 3, label: "View Ticket Stats", trigger: "5" },
      { value: 4, label: "Go to profile", trigger: "6" },
    ],
  },
  {
    id: "3",
    component: <Button variant="info">Dashboard</Button>,
    trigger: "2",
  },
  {
    id: "4",
    component: <Button variant="success">Dashboard</Button>,
    end: true,
  },
  {
    id: "5",
    component: <Button variant="primary">Ticket Stats</Button>,
    end: true,
  },
  {
    id: "6",
    component: <Button variant="primary">Profile</Button>,
    end: true,
  },
];

export default ChatbotSteps;
