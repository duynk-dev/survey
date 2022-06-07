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
  async createSurvey(ctx) {
    const { userAbility, user } = ctx.state;
    const { body } = ctx.request;
    const { surveyResult, surveyResultDetails } = body;
    const newCtx = {
      ...ctx,
      params: {
        model: "api::survey-result.survey-result",
      },
      request: {
        body: {
          khao_sat: surveyResult.khao_sat.id,
          huyen: surveyResult.huyen ? surveyResult.huyen.id : null,
          xa: surveyResult.xa ? surveyResult.xa.id : null,
          ap: surveyResult.ap ? surveyResult.ap.id : null,
        },
      },
    };
    await strapi.plugins["content-manager"].controllers[
      "collection-types"
    ].create(newCtx);

    const dataRes = { ...newCtx.body };
    if (dataRes) {
      const promiseAll = [];
      for (const entity of surveyResultDetails) {
        for (const el of entity.choice) {
          const body = {
            ket_qua_khao_sat: dataRes.id,
            cau_hoi: entity.id,
            survey_result_id: el.id,
            name: el.name,
            khao_sat: surveyResult.khao_sat.id,
            value: el.value,
          };
          const newCtx = {
            ...ctx,
            request: {
              body,
            },
            params: {
              model: "api::survey-result-detail.survey-result-detail",
            },
          };
          promiseAll.push(
            strapi.plugins["content-manager"].controllers[
              "collection-types"
            ].create(newCtx)
          );
        }
        await Promise.all(promiseAll);
      }
    }
    return dataRes;
  },
  async totalSurvey(ctx) {
    const { userAbility, user } = ctx.state;
    const { body } = ctx.request;
    const count = await strapi.entityService.count(
      "api::survey-result.survey-result",
      {
        filters: body,
      }
    );

    return count;
  },
};
