'use strict';

/**
 * appendix service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::appendix.appendix');
