"use strict";

module.exports = {
  async getSurveyById(ctx) {
    const { userAbility, user } = ctx.state;
    const { body } = ctx.request;

    if (!ctx.params.id) {
      return null;
    }

    const entries = await strapi.entityService.findMany(
      "api::question.question",
      {
        populate: [
          "question",
          "question.SurveyQ",
          "question.question",
          "question.question.SurveyQ",
        ],
        filters: {
          survey: {
            id: {
              $eq: ctx.params.id,
            },
          },
        },
        sort: "order:ASC",
      }
    );
    return entries;
  },
};
