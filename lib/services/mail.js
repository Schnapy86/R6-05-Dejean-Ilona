'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {

    async sendWelcomeEmail(user) {
        console.log('mail de type la con de sa race' + user.mail);
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: process.env.EMAIL_PORT || 587 ,
            auth: {
                user: process.env.EMAIL_USER || 'marina86@ethereal.email',
                pass: process.env.EMAIL_PASS || 'jcXkJvCRed8YBpWV8M'
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
};