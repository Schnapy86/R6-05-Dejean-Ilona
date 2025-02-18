'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = {
    method: 'GET',
    path: '/export/csv',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { csvService } = request.services();
        const to = request.auth.credentials.mail;
        return await csvService.get(request, to);
    }
};
