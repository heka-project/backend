// Define express middleware here
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");

const logger = (request, _, next) => {
    console.info(`${request.method} -> ${JSON.stringify(request.body)}`);
    next();
};

const adminAuthentication = basicAuth({
    users: {
        admin: process.env.ADMIN_SECRET,
    },
});

const clientAuthentication = basicAuth({
    users: {
        client: process.env.CLIENT_SECRET,
        admin: process.env.ADMIN_SECRET,
    },
});

module.exports = {
    logger,
    bodyParser,
    adminAuthentication,
    clientAuthentication,
};
