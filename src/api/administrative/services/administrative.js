'use strict';

/**
 * administrative service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::administrative.administrative');
