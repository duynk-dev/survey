"use strict";

module.exports = {
  async getReport(ctx) {
    const { userAbility, user } = ctx.state;
    const { body } = ctx.request;
    if (!body.phu_luc || !body.khao_sat) return null;

    const phuLuc = await strapi.entityService.findOne(
      "api::appendix.appendix",
      body.phu_luc.id,
      {
        populate: ["cau_hois", "cau_hois.SurveyQ"],
      }
    );

    const phieuKhaoSat = {
      khao_sat: {
        id: {
          $eq: body.khao_sat.id,
        },
      },
    };

    const entries = await strapi.entityService.findMany(
      "api::survey-result-detail.survey-result-detail",
      {
        populate: [
          "cau_hoi",
          "cau_hoi.survey",
          "ket_qua_khao_sat",
          "ket_qua_khao_sat.tinh",
          "ket_qua_khao_sat.huyen",
          "ket_qua_khao_sat.xa",
          "ket_qua_khao_sat.ap",
          "khao_sat",
        ],
        filters: { ...phuLuc.filter, ...phieuKhaoSat },
        sort: "cau_hoi.order:ASC",
      }
    );
    return {
      header: phuLuc.name,
      description: phuLuc.description,
      data: phuLuc.cau_hois,
    };
  },
};
