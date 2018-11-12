// Define express middleware here

const logger = (req, _, next) => {
    console.info(`${req.method} -> ${JSON.stringify(req.body)}`);
    next();
};

module.exports = {
    logger,
};
