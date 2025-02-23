'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {

    createTransporter() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendWelcomeEmail(user) {
        //console.log('mail du type que je veux pour envoyer le mail de willkommen' + user.mail);
        const transporter = this.createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.mail,
            subject: 'Bienvenue !',
            text: 'Bonjour, Notre équipe vous souhaite la bienvenue !'
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }

    async sendNotificationEmailNewMovie(user,movie) {
        const transporter = this.createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.mail,
            subject: 'Nouveau film !',
            text: `Bonjour cher utilisateur, il y a un nouveau film de zinzin qui vient d\'être ajouter \n Voici le titre de ce banger : "${movie.title}" \n Bonne journée ou soirée ou nuit !`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }

    async sendNotificationEmailUpdateMovie(user,movie) {
        const transporter = this.createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.mail,
            subject: 'Modification d\'un film favori !',
            text: `Bonjour cher utilisateur, il y a une modification dans le film "${movie.title}" \n Bonne journée ou soirée ou nuit !`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }

    async sendEmailWithCsv(to, filePath) {
        console.log('le mail de l\'envoi de l\'email: ' + to);
        const transporter = this.createTransporter();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Tous les films !',
            text: 'Voici le CSV avec tous les films disponibles.',
            attachments: [{ filename: 'movies.csv', path: filePath }]
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }
};
