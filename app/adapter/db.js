const inMemoryDB = {};

inMemoryDB['1234'] = {
    id: '1234',
    title: '3 bed flat in Southfields',
    seller: {
        name: "Mr Seller",
        id: '4444'
    },
    buyer: {
        name: "Mr Buyer",
        id: '3333'
    },
    messages: [
        {
            content: "Hello to Mr Seller",
            direction: 'B2S'
        },
        {
            content: "Hello to Mr Buyer",
            direction: 'S2B'
        }
    ]
};

module.exports.getById = function (conversationId) {
    return inMemoryDB[conversationId];
};

module.exports.update = function (conversationId, conversation) {
    return inMemoryDB[conversationId] = conversation;
};
