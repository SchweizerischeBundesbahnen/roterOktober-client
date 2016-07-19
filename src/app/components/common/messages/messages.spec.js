/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests Messages
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import MessagesModule from './messages';
import MessagesController from './messages.controller';
import MessagesService from './messages.service';
import MessagesTemplate from './messages.html';

describe('Messages', () => {
    let $rootScope, makeController, makeService;
    let messagesServiceMock = {
        getMessages: function() {
            return [{message: 'Hi'}];
        },
        removeMessage: function() {
        }
    };

    beforeEach(window.module(MessagesModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;

        makeController = () => {
            return new MessagesController(messagesServiceMock, $rootScope);
        };

        makeService = () => {
            return new MessagesService($rootScope);
        };
    }));

    describe('Controller', () => {
        it('has a property [messagesService]', () => {
            let controller = makeController();
            expect(controller.messagesService).toBe(messagesServiceMock);
        });

        it('has a property [messages]', () => {
            let controller = makeController();
            expect(controller.messages.length).toBe(1);
            expect(controller.messages[0].message).toBe('Hi');
        });

        it('calls messagesService.removeMessage with removeMessage()', () => {
            let controller = makeController();
            spyOn(messagesServiceMock, 'removeMessage');

            controller.removeMessage(1);
            expect(messagesServiceMock.removeMessage).toHaveBeenCalledWith(1);
        });
    });

    describe('Service', () => {
        it('creates a property [messages] on $rootScope', () => {
            makeService();
            expect($rootScope.messages.length).toBe(0);
        });

        it('returns the messages from $rootScope with getMessages()', () => {
            let service = makeService();

            $rootScope.messages = [{message: 'Hi'}];

            let result = service.getMessages();

            expect(result.length).toBe(1);
        });

        it('clears all messages where !keepAfterLocationChange', () => {
            let service = makeService();

            $rootScope.messages = [{message: 'Hi', keepAfterLocationChange: false}];

            service.clearMessages();

            expect($rootScope.messages.length).toBe(0);
        });

        it('updates all messages where keepAfterLocationChange to !keepAfterLocationChange', () => {
            let service = makeService();

            $rootScope.messages = [{message: 'Hi', keepAfterLocationChange: true}];

            service.clearMessages();

            expect($rootScope.messages.length).toBe(1);
            expect($rootScope.messages[0].keepAfterLocationChange).toBe(false);
        });

        it('removes a specific messages with removeMessage()', () => {
            let service = makeService();

            $rootScope.messages = [{message: 'Hi', keepAfterLocationChange: false}];

            service.removeMessage(0);

            expect($rootScope.messages.length).toBe(0);
        });

        it('adds a new success-message with successMessage()', () => {
            let service = makeService();

            service.successMessage('test', true);

            expect($rootScope.messages.length).toBe(1);
            expect($rootScope.messages[0].message).toBe('test');
            expect($rootScope.messages[0].type).toBe('success');
            expect($rootScope.messages[0].keepAfterLocationChange).toBeTruthy();
        });

        it('adds a new info-message with infoMessage()', () => {
            let service = makeService();

            service.infoMessage('test', true);

            expect($rootScope.messages.length).toBe(1);
            expect($rootScope.messages[0].message).toBe('test');
            expect($rootScope.messages[0].type).toBe('info');
            expect($rootScope.messages[0].keepAfterLocationChange).toBeTruthy();
        });

        it('adds a new error-message with errorMessage()', () => {
            let service = makeService();

            service.errorMessage('test', true);

            expect($rootScope.messages.length).toBe(1);
            expect($rootScope.messages[0].message).toBe('test');
            expect($rootScope.messages[0].type).toBe('error');
            expect($rootScope.messages[0].keepAfterLocationChange).toBeTruthy();
        });
    });

    describe('Template', () => {
        // Use regex to ensure correct bindings are used e.g., {{  }}
        it('has name in template [msg.message]', () => {
            expect(MessagesTemplate).toMatch(/{{\s?msg.message\s?}}/g);
        });
    });

});