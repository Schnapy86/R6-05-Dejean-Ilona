'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/favorite',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user']
        },
        validate: {
            payload: Joi.object({
                movieId: Joi.number().integer().required().description('ID of the film to add to favorites')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const { id: userId } = request.auth.credentials;
        const { movieId } = request.payload;

        return await favoriteService.addFavorite(userId, movieId);
    }
},
{
    method: 'delete',
    path: '/favorite/{movieId}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user']
        },
        validate: {
            params: Joi.object({
                movieId: Joi.number().integer().required().description('ID of the film to remove from favorites')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const { id: userId } = request.auth.credentials;
        const { movieId } = request.params;

        return await favoriteService.removeFavorite(userId, movieId);
    }
},
{
    method: 'get',
    path: '/favorite',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user']
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const { id: userId } = request.auth.credentials;

        return await favoriteService.getFavorites(userId);
    }
}
];
