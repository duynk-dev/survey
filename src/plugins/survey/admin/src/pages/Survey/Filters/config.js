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
    name: "huyen",
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
      label: "Quận/Huyện",
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
        "/content-manager/relations/api::survey-result.survey-result/huyen",
      containsKey: "name",
      defaultParams: {
        "filters[level][$eq]": 1,
      },
      shouldDisplayRelationLink: true,
    },
    targetModelPluginOptions: {},
  },
  {
    name: "xa",
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
      label: "Phường/Xã",
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
        "/content-manager/relations/api::survey-result.survey-result/xa",
      containsKey: "name",
      defaultParams: {
        "filters[level][$eq]": 2,
      },
      filter: "huyen",
      shouldDisplayRelationLink: true,
    },
    targetModelPluginOptions: {},
  },
  {
    name: "ap",
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
      label: "Khu phố/ Ấp",
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
        "/content-manager/relations/api::survey-result.survey-result/ap",
      containsKey: "name",
      defaultParams: {
        "filters[level][$eq]": 3,
      },
      filter: "xa",
      shouldDisplayRelationLink: true,
    },
    targetModelPluginOptions: {},
  },
];
