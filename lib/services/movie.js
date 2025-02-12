'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    get() {
        const { Movie } = this.server.models();
        return Movie.query();
    }

    create(movie) {
        const { Movie } = this.server.models();
        return Movie.query().insertAndFetch(movie);
    }

    delete(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id);
    }

    patch(id,movie) {
        const { Movie } = this.server.models();

        return Movie.query().patchAndFetchById(id, movie);
    }
};