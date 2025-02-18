'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const lab = exports.lab = Lab.script();
const sinon = require('sinon');
const UserService = require('../lib/services/user');
const MailService = require('../lib/services/mail');

lab.experiment('UserService', () => {
    let userService;
    let mailServiceStub;
    let serverStub;

    lab.beforeEach(() => {
        mailServiceStub = sinon.stub(MailService.prototype, 'sendWelcomeEmail').resolves();
        serverStub = {
            models: () => ({
                User: {
                    query: () => ({
                        insertAndFetch: sinon.stub().resolves({ mail: 'test@example.com', password: 'password' }),
                        findOne: sinon.stub().resolves({ mail: 'test@example.com', password: 'password' })
                    })
                }
            }),
            services: () => ({
                mailService: new MailService()
            })
        };
        userService = new UserService(serverStub);
    });

    lab.afterEach(() => {
        sinon.restore();
    });

    lab.test('create should insert a new user and send a welcome email', async () => {
        const user = { mail: 'test@example.com', password: 'password' };
        const newUser = await userService.create(user);

        expect(newUser).to.include(user);
        expect(mailServiceStub.calledOnce).to.be.true();
        expect(mailServiceStub.calledWith(newUser)).to.be.true();
    });

    lab.test('login should return a JWT token for valid credentials', async () => {
        const user = { mail: 'test@example.com', password: 'password' };
        const token = await userService.login(user.password, user.mail);

        expect(token).to.exist();
    });
});