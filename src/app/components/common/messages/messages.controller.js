/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
class MessagesController {
    /*@ngInject*/
    constructor(messagesService, $rootScope) {
        this.messagesService = messagesService;

        $rootScope.$on('$locationChangeStart', () => this.messagesService.clearMessages());

        this.messages = messagesService.getMessages();
    }

    removeMessage(index) {
        this.messagesService.removeMessage(index);
    }
}

export default MessagesController;