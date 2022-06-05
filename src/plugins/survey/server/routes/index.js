module.exports = [
  {
    method: "GET",
    path: "/get-survey-by-id/:id",
    handler: "myController.getSurveyById",
    config: {
      policies: [],
    },
  },
];
