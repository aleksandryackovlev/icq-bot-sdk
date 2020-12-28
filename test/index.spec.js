'use strict';

const createIcqBot = require('../dist').default;

/* eslint-disable jest/no-try-expect */
describe('ICQ bot sdk', () => {
  describe('tick', () => {
    it('should get events from the server', async () => {
      const icqBot = createIcqBot({
        token: 'some-token',
        pollTime: 5,
        timeout: 3,
      });

      const spy = jest.spyOn(icqBot.events, 'get').mockImplementation(() => ({
        json: {
          events: [
            {
              eventId: 1,
              type: 'newMessage',
              payload: 'first',
            },
            {
              eventId: 2,
              type: 'newMessage',
              payload: 'second',
            },
            {
              eventId: 3,
              type: 'someEvent',
              payload: 'thrird',
            },
          ],
        },
      }));

      await icqBot.tick({
        pollTime: 10,
        timeout: 1,
        eventIdStorage: {
          id: 6,
          async getId() {
            return this.id;
          },
          async setId(id) {
            this.id = id;
          },
        },
      });

      expect(spy).toHaveBeenCalledWith({
        lastEventId: 6,
        pollTime: 10,
      });

      spy.mockRestore();
    });

    it('should use eventIdStorage for tracking event ids', async () => {
      const icqBot = createIcqBot({
        token: 'some-token',
        pollTime: 5,
        timeout: 3,
      });

      const eventIdStorage = {
        id: 6,
        async getId() {
          return this.id;
        },
        async setId(id) {
          this.id = id;
        },
      };

      const spy = jest.spyOn(icqBot.events, 'get').mockImplementation(() => ({
        json: {
          events: [
            {
              eventId: 1,
              type: 'newMessage',
              payload: 'first',
            },
            {
              eventId: 2,
              type: 'newMessage',
              payload: 'second',
            },
            {
              eventId: 3,
              type: 'someEvent',
              payload: 'thrird',
            },
          ],
        },
      }));

      await icqBot.tick({
        pollTime: 10,
        timeout: 1,
        eventIdStorage,
      });

      expect(eventIdStorage.id).toBe(3);

      spy.mockRestore();
    });

    it('should emit events for the recieved events', async () => {
      const icqBot = createIcqBot({
        token: 'some-token',
        pollTime: 5,
        timeout: 3,
      });

      const spy = jest.spyOn(icqBot.events, 'get').mockImplementation(() => ({
        json: {
          events: [
            {
              eventId: 1,
              type: 'newMessage',
              payload: 'first',
            },
            {
              eventId: 2,
              type: 'newMessage',
              payload: 'second',
            },
            {
              eventId: 3,
              type: 'someEvent',
              payload: 'third',
            },
          ],
        },
      }));

      const eventsSpy = jest.spyOn(icqBot, 'emit');

      await icqBot.tick({
        pollTime: 10,
        timeout: 1,
        eventIdStorage: {
          id: 6,
          async getId() {
            return this.id;
          },
          async setId(id) {
            this.id = id;
          },
        },
      });

      expect(eventsSpy).toHaveBeenCalledTimes(6);

      expect(eventsSpy).toHaveBeenCalledWith('newMessage', {
        eventId: 1,
        type: 'newMessage',
        payload: 'first',
      });

      expect(eventsSpy).toHaveBeenCalledWith('all', {
        eventId: 1,
        type: 'newMessage',
        payload: 'first',
      });

      expect(eventsSpy).toHaveBeenCalledWith('newMessage', {
        eventId: 2,
        type: 'newMessage',
        payload: 'second',
      });

      expect(eventsSpy).toHaveBeenCalledWith('all', {
        eventId: 2,
        type: 'newMessage',
        payload: 'second',
      });

      expect(eventsSpy).toHaveBeenCalledWith('someEvent', {
        eventId: 3,
        type: 'someEvent',
        payload: 'third',
      });

      expect(eventsSpy).toHaveBeenCalledWith('all', {
        eventId: 3,
        type: 'someEvent',
        payload: 'third',
      });

      spy.mockRestore();
      eventsSpy.mockRestore();
    });

    it('should emit error event on errors', async () => {
      const icqBot = createIcqBot({
        token: 'some-token',
        pollTime: 5,
        timeout: 3,
      });

      const error = {
        message: 'some message',
      };

      const spy = jest.spyOn(icqBot.events, 'get').mockImplementation(() => {
        return Promise.reject(error);
      });

      const eventsSpy = jest.spyOn(icqBot, 'emit');

      try {
        await icqBot.tick({
          pollTime: 10,
          timeout: 1,
          eventIdStorage: {
            id: 6,
            async getId() {
              return this.id;
            },
            async setId(id) {
              this.id = id;
            },
          },
        });
      } catch (e) {
        /* eslint-disable jest/no-conditional-expect */
        expect(eventsSpy).toHaveBeenCalledWith('error', { message: 'some message' });
      }

      spy.mockRestore();
      eventsSpy.mockRestore();
    });
  });
});
