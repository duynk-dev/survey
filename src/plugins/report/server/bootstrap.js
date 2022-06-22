/* eslint-disable no-unreachable */
"use strict";

// Add permissions
const RBAC_ACTIONS = [
  {
    section: "plugins",
    displayName: "Access",
    uid: "access",
    pluginName: "report",
  },
];

/**
 *
 * @param {{strapi: import("@strapi/strapi").Strapi}} args
 */
module.exports = async ({ strapi }) => {
  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
  );
};
