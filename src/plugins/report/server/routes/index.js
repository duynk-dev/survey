module.exports = [
  {
    method: "POST",
    path: "/get-report",
    handler: "myController.getReport",
    config: {
      policies: [],
    },
  },
];
