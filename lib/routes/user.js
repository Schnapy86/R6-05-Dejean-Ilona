'use strict';

const Joi = require('joi');
const Encrypt = require('iut-encrypt-mdp');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(8).example('password').description('Password of the user'),
                mail: Joi.string().required().min(8).example('john.doe@example.com').description('Mail of the user'),
                username: Joi.string().required().min(3).example('JohnD').description('Username of the user'),
                scope: Joi.array().items(Joi.string()).default(['user']).description('Scope of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const payload = request.payload;

        // Encrypter le mot de passe
        payload.password = Encrypt.sha1(payload.password);

        return await userService.create(payload);
    }

},
{
    method: 'get',
    path: '/user',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']

    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.get();
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user to delete')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.delete(request.params.id);
    }
},{
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user to update')
            }),
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(8).example('password').description('Password of the user'),
                mail: Joi.string().required().min(8).example('john.doe@example.com').description('Mail of the user'),
                username: Joi.string().required().min(3).example('JohnD').description('Username of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.patch(request.params.id, request.payload);

    }

},{
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        auth: false, // Désactiver l'authentification
        validate: {
            payload: Joi.object({
                password: Joi.string().required().min(8).example('password').description('Password of the user'),
                mail: Joi.string().required().min(8).example('john.doe@example.com').description('Mail of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.login(request.payload.password, request.payload.mail);

    }
}
];
