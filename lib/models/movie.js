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
            title: Joi.string().required().min(1).example('L\'âge de glace').description('Title of the film'),
            description: Joi.string().required().example('Parce que tu es petit et insignifiant et parce que je te tabasse si tu refuses !').description('Description of the film'),
            releaseDate: Joi.date().required().example('2002-06-24').description('Release date of the film'),
            director: Joi.string().required().example('Chris Wedge').description('Director of the film'),
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