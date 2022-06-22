'use strict';

/**
 * administrative router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::administrative.administrative');
