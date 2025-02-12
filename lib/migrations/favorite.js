'use strict';

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
            table.integer('movieId').unsigned().notNullable().references('id').inTable('movie').onDelete('CASCADE');
            table.unique(['userId', 'movieId']);
        });
    },

    down: async (knex) => {
        await knex.schema.dropTableIfExists('favorites');
    }
};