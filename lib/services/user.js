'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const Encrypt = require('iut-encrypt-mdp');

module.exports = class UserService extends Service {

    async create(user) {

        const { User } = this.server.models();
        const newUser = await User.query().insertAndFetch(user);
        console.log('mail de type la con de sa race' + newUser.mail);
        const { mailService } = this.server.services();
        await mailService.sendWelcomeEmail(newUser);

        return newUser;
    }

    get() {

        const { User } = this.server.models();

        return User.query();
    }

    delete(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id);
    }

    patch(id,user) {
        const { User } = this.server.models();

        return User.query().patchAndFetchById(id, user);
    }

    async login(password,mail) {
        const { User } = this.server.models();
        // Encrypter le mot de passe
        const passworddha1 = Encrypt.sha1(password);
        // console.log('-----------------------------------------');
        // console.log(passworddha1 + '     ' + mail);
        // console.log('-----------------------------------------');
        const user =  await User.query().findOne({ password: passworddha1,mail });
        console.log(user);
        if (!user) {
            return Boom.unauthorized('Invalid mail or password');
        }

        const isValidPassword = Encrypt.compareSha1(password, user.password);
        if (!isValidPassword) {
            return Boom.unauthorized('Invalid email or password');
        }

        return Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                id: user.id, //Pour les favories ça
                firstName: user.firstName,
                lastName: user.lastName,
                mail: user.mail,
                scope: user.scope // Le scope du user
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 heures
            }
        );
    }
};
