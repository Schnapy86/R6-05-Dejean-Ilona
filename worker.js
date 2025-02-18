'use strict';

const amqp = require('amqplib');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const MailService = require('./lib/services/mail');

const QUEUE_NAME = 'export_queue'; // Valeur par défaut

const processMessage = async (msg) => {
    //console.log('processMessage called');
    const { to, movies } = JSON.parse(msg.content.toString());
    const mailService = new MailService();
    //console.log(`Exporting for ${to}...`);

    // Créer le répertoire exports s'il n'existe pas
    const exportsDir = path.join(__dirname, 'exports');
    if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir);
    }

    const filePath = path.join(exportsDir, `movies-${Date.now()}.csv`);
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'title', title: 'Title' },
            { id: 'description', title: 'Description' },
            { id: 'releaseDate', title: 'Release Date' },
            { id: 'director', title: 'Director' }
        ]
    });

    await csvWriter.writeRecords(movies);
    //console.log(`CSV file created at ${filePath}`);
    await mailService.sendEmailWithCsv(to, filePath);
};

const startWorker = async () => {
    //console.log('Worker started');
    try {
        const connection = await amqp.connect('amqp://localhost'); // Valeur par défaut
        //console.log('Connected to RabbitMQ');
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        //console.log('Queue asserted');
        //console.log('Worker ready to export..');
        channel.consume(QUEUE_NAME, async (msg) => {
            try {
                await processMessage(msg);
                channel.ack(msg);
            }
            catch (err) {
                console.error('Erreur lors du traitement:', err);
                channel.nack(msg, false, true);
            }
        });
    }
    catch (error) {
        console.error('Erreur de connexion à RabbitMQ:', error);
    }
};

startWorker().catch(console.error);
