'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    get() {
        const { Movie } = this.server.models();
        return Movie.query();
    }

    async create(movie) {
        const { Movie, User } = this.server.models();
        const newMovie = await Movie.query().insertAndFetch(movie);
        const users = await User.query();

        for (const user of users) {
            await this.server.services().mailService.sendNotificationEmailNewMovie(user, newMovie);
        }

        return newMovie;
    }

    delete(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id);
    }

    async patch(id,movie) {
        const { Movie , Favorite , User } = this.server.models();

        const updateMovie =  Movie.query().patchAndFetchById(id, movie);

        const favorites = await Favorite.query().where({ movieId: id });
        for (const favorite of favorites) {
            const user = await User.query().findById(favorite.userId);
            await this.server.services().mailService.sendNotificationEmailUpdateMovie(user, updateMovie);
        }

        return updateMovie;
    }
};
