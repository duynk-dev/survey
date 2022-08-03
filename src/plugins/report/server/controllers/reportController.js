"use strict";
const { chain, set } = require("lodash");

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
        // populate: [
        //   "cau_hoi",
        //   "cau_hoi.survey",
        //   "ket_qua_khao_sat",
        //   "ket_qua_khao_sat.tinh",
        //   "ket_qua_khao_sat.huyen",
        //   "ket_qua_khao_sat.xa",
        //   "ket_qua_khao_sat.ap",
        //   "khao_sat",
        // ],
        filters: { ...phuLuc.filter, ...phieuKhaoSat },
        sort: "cau_hoi.order:ASC",
      }
    );

    const entriesTotal = await strapi.entityService.count(
      "api::survey-result.survey-result",
      {
        filters: { ...phuLuc.filter.ket_qua_khao_sat, ...phieuKhaoSat },
      }
    );

    const data = chain(entries)
      .groupBy("survey_result_id")
      .map((value, key) => ({ id: key * 1, count: value.length }))
      //.orderBy((group) => group.id, ["desc"])
      .value();

    const dataCauHoi = (phuLuc.cau_hois || []).map((cau_hoi) => {
      cau_hoi.SurveyQ = (cau_hoi.SurveyQ || [])
        .filter((item) => item.hideOnReport != true && item.parentId == null)
        .map((element) => {
          const result = data.find((d) => d.id == element.id);
          const children = (cau_hoi.SurveyQ || []).filter(
            (s) => s.parentId == element.id
          );
          element.children = [];
          children.map((c) => {
            const resultChildren = data.find((d) => d.id == c.id);
            element.children.push({
              ...c,
              count: resultChildren ? resultChildren.count : 0,
            });
          });
          set(element, "count", result ? result.count : 0);
          return element;
        });

      const totalByRow = cau_hoi.SurveyQ.reduce(
        (total, currentValue) => total + (currentValue.count || 0),
        0
      );
      cau_hoi["total"] = entriesTotal;
      cau_hoi["totalByRow"] = totalByRow;
      cau_hoi["percent"] = entriesTotal > 0 ? 100 : 0;
      return cau_hoi;
    });

    return {
      header: phuLuc.name,
      description: phuLuc.description,
      data: dataCauHoi,
    };
  },
};
