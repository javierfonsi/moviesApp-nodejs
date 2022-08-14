const dotenv = require('dotenv')

dotenv.config({ path: './config.env' });

class Email {
    constructor(emails) {
        this.emails = emails,
        this.from = 'Max Rangel <${process.env.EMAIL_FROM}>'
    }
}

module.exports = { Email }