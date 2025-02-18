'use strict';

const { Service } = require('@hapipal/schmervice');
const amqp = require('amqplib');
const Dotenv = require('dotenv');

Dotenv.config({ path: `.env` });

module.exports = class CsvService extends Service {
    async get(request, to) {
        console.log('CsvService.get called');
        const { movieService } = request.services();
        const movies = await movieService.get();
        const QUEUE_NAME = 'export_queue'; // Valeur par défaut
        const connection = await amqp.connect('amqp://localhost'); // Valeur par défaut
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        const message = JSON.stringify({ to, movies });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        return { message: 'The export is currently being processed, you will receive a mail' };
    }
};
