'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async addFavorite(userId, movieId) {
        if (!userId || !movieId) {
            throw Boom.badRequest('User ID and Film ID must be provided');
        }

        const { Favorite, Movie } = this.server.models();

        // Vérifier si le film existe
        const movie = await Movie.query().findById(movieId);
        if (!movie) {
            throw Boom.notFound('Movie not found');
        }

        // Vérifier si le film est déjà dans les favoris
        const existingFavorite = await Favorite.query().findOne({ userId, movieId });
        if (existingFavorite) {
            throw Boom.badRequest('Film already in favorites');
        }

        // Ajouter le film aux favoris
        return Favorite.query().insertAndFetch({ userId, movieId });
    }

    async removeFavorite(userId, movieId) {
        const { Favorite } = this.server.models();

        // Vérifier si le film est dans les favoris
        const favorite = await Favorite.query().findOne({ userId, movieId });
        if (!favorite) {
            throw Boom.badRequest('Film not in favorites');
        }

        // Supprimer le film des favoris
        return Favorite.query().deleteById(favorite.id);
    }

    getFavorites(userId) {
        if (!userId) {
            throw Boom.badRequest('User ID must be provided');
        }

        const { Favorite  } = this.server.models();
        return Favorite.query()
            .where({ userId })
            .join('movie', 'favorites.movieId', 'movie.id')
            .select('favorites.*', 'movie.title');
    }
};
