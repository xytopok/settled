const db = require("../../adapter/db.js");

/**
 * repository is responsible for interacting with DB (a DB, not specific one) and  constructing a conversation
 * out of potentially many underlying storage-level entities, similarly it is responsible for decomposing complex
 * conversations object and converting it to a set of storage-level entities
 */


module.exports.get = function(conversationId) {
    return db.getById(conversationId);
};

module.exports.save = function(conversation) {
    return db.update(conversation.id, conversation);
};