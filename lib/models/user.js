'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(3).example('password').description('Password of the user'),
            mail: Joi.string().min(3).example('john.doe@example.com').description('Mail of the user'),
            username: Joi.string().min(3).example('JohnD').description('Username of the user'),
            scope: Joi.array().default(['user']).description('Scope of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes() {

        return ['scope'];
    }


    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};