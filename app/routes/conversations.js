const express = require('express');
const router = express.Router();
const conversationService = require('../models/conversations/service');
const _ = require('lodash');

router.get('/:conversationId/messages', function(req, res) {
    const conversationId = req.params.conversationId;
    // todo use promises
    const conversation = conversationService.getConversation(conversationId);
    res.status(200).header('Content-Type', 'application/json').send(JSON.stringify(conversation.messages));
});

router.post('/:conversationId/messages', function(req, res) {
    const conversationId = req.params.conversationId;
    //todo use validation
    const messageContent = req.body.content;
    const currentUserId = '3333'; // coming from authentication layer
    // todo use promises
    conversationService.sendMessageToConversation(conversationId, messageContent, currentUserId);
    res.status(201).send();
});

router.get('/', function(req, res, next) {
    res.status(501).send("Not implemented");
});

module.exports = router;
