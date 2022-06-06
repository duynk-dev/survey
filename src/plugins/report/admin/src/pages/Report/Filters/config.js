export const searchFields = [
  {
    name: "khao_sat",
    size: 6,
    fieldSchema: {
      type: "relation",
      relation: "manyToOne",
      target: "api::administrative.administrative",
      inversedBy: "people",
      targetModel: "api::administrative.administrative",
      relationType: "manyToOne",
    },
    metadatas: {
      label: "Phiếu khảo sát",
      description: "",
      placeholder: "",
      visible: true,
      editable: true,
      mainField: {
        name: "name",
        schema: {
          type: "string",
          required: true,
          unique: true,
          pluginOptions: {},
        },
      },
    },
    queryInfos: {
      endPoint:
        "/content-manager/relations/api::survey-result.survey-result/khao_sat",
      containsKey: "name",
      defaultParams: {},
      shouldDisplayRelationLink: true,
    },
    targetModelPluginOptions: {},
  },

  {
    name: "phu_luc",
    size: 6,
    fieldSchema: {
      type: "relation",
      relation: "manyToOne",
      target: "api::question.question",
      inversedBy: "people",
      targetModel: "api::question.question",
      relationType: "manyToOne",
    },
    metadatas: {
      label: "Phụ lục",
      description: "",
      placeholder: "",
      visible: true,
      editable: true,
      mainField: {
        name: "name",
        schema: {
          type: "string",
          required: true,
          unique: true,
          pluginOptions: {},
        },
      },
    },
    queryInfos: {
      endPoint: "/content-manager/relations/api::question.question/appendices",
      containsKey: "name",
      defaultParams: {},
      shouldDisplayRelationLink: true,
    },
    targetModelPluginOptions: {},
  },
];
