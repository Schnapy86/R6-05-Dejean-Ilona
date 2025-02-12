'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {

    async sendWelcomeEmail(user) {
        console.log('mail de type la con de sa race' + user.mail);
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Bienvenue !',
            text: 'Wesh ma gueule !'
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }

    async sendNotificationEmailNewMovie(user,movie){
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Nouveau film !',
            text: `Bonjour cher utilisateur, il y a un nouveau film de zinzin qui vient d\'être ajouter \n Voici le titre de ce banger : "${movie.title}" \n Bonne journée ou soirée ou nuit !`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }

    async sendNotificationEmailUpdateMovie(user,movie){
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Modification d\'un film favori !',
            text: `Bonjour cher utilisateur, il y a une modification dans le film "${movie.title}" \n Bonne journée ou soirée ou nuit !`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé: ' + info.response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email: ' + error);
        }
    }
};