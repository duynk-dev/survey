module.exports = [
  {
    method: "GET",
    path: "/get-survey-by-id/:id",
    handler: "myController.getSurveyById",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/create-survey-result",
    handler: "myController.createSurvey",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/get-total-survey",
    handler: "myController.totalSurvey",
    config: {
      policies: [],
    },
  },
];
