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
                title: Joi.string().required().min(1).example('L\'âge de glace').description('Title of the film'),
                description: Joi.string().required().example('Parce que tu es petit et insignifiant et parce que je te tabasse si tu refuses !').description('Description of the film'),
                releaseDate: Joi.date().required().example('2002-06-24').description('Release date of the film'),
                director: Joi.string().required().example('Chris Wedge').description('Director of the film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.create(request.payload);
    }
},{ method: 'delete',
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
                title: Joi.string().required().min(1).example('L\'âge de glace').description('Title of the film'),
                description: Joi.string().required().example('Parce que tu es petit et insignifiant et parce que je te tabasse si tu refuses !').description('Description of the film'),
                releaseDate: Joi.date().required().example('2002-06-24').description('Release date of the film'),
                director: Joi.string().required().example('Chris Wedge').description('Director of the film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.patch(request.params.id, request.payload);

    }

}
];
