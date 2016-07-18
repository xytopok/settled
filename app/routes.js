const index = require('./routes/index');
const conversations = require('./routes/conversations');

const routes = {
    '/': index,
    '/conversations': conversations
};

module.exports = routes;
