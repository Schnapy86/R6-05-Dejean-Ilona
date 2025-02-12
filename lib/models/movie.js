'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required().min(1).example('Inception').description('Title of the film'),
            description: Joi.string().required().example('A mind-bending thriller').description('Description of the film'),
            releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the film'),
            director: Joi.string().required().example('Christopher Nolan').description('Director of the film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};