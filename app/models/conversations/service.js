//todo use separate repositories for read and write
const repository = require('./repository');

getConversation = (conversationId) => {
    return repository.get(conversationId);
};

// todo move from service to domain object
roleOfUser = (conversation, userId) => {
    return (userId === conversation.seller)? ("seller") : ("buyer");
};

sendMessageToConversation = (conversationId, messageContent, userId) => {
    const conversation = repository.get(conversationId);
    if (conversation) {
        const role = roleOfUser(conversation, userId);
        const message = { content: messageContent, direction: ('seller'===role)?('S2B'):('B2S')};
        conversation.messages.push(message);
        repository.save(conversation);
    } else {
        throw Error("Conversation does not exist");
    }
};

module.exports = {
    getConversation : getConversation,
    sendMessageToConversation : sendMessageToConversation
};