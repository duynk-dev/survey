'use strict';

/**
 *  administrative controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::administrative.administrative');
