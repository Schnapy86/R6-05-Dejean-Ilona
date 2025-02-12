'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [{
    method: 'get',
    path: '/movie',
    options: {
        tags: ['api'],
        auth: false
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.get();
    }
}, {
    method: 'post',
    path: '/movie',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                title: Joi.string().required().min(1).example('Inception').description('Title of the film'),
                description: Joi.string().required().example('A mind-bending thriller').description('Description of the film'),
                releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the film'),
                director: Joi.string().required().example('Christopher Nolan').description('Director of the film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.create(request.payload);
    }
},{method: 'delete',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the movie to delete')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.delete(request.params.id);
    }
},{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the movie to update')
            }),
            payload: Joi.object({
                title: Joi.string().required().min(1).example('Inception').description('Title of the film'),
                description: Joi.string().required().example('A mind-bending thriller').description('Description of the film'),
                releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the film'),
                director: Joi.string().required().example('Christopher Nolan').description('Director of the film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.patch(request.params.id, request.payload);

    }

}
];