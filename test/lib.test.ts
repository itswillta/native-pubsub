import { describe, expect, test } from 'vitest';

import { EventBus } from '../src';

describe('Given EventBus class', () => {
  describe('When an EventBus instance is created', () => {
    test('Then an event can be subscribed to and published synchronously', () => {
      const eventBus = new EventBus<number>();
      let receivedData: number | undefined;

      const unsubscribe = eventBus.subscribe((data) => {
        receivedData = data;
      });

      eventBus.publishSync(42);

      expect(receivedData).toEqual(42);

      unsubscribe();
    });

    test('Then an event can be subscribed to and published asynchronously', async () => {
      const eventBus = new EventBus<string>();
      let receivedData: string | undefined;

      const unsubscribe = eventBus.subscribe((data) => {
        receivedData = data;
      });

      eventBus.publish('Hello, world!');

      expect(receivedData).toBeUndefined();

      await Promise.resolve();

      expect(receivedData).toEqual('Hello, world!');

      unsubscribe();
    });

    test('Then publishing and subscribing to multiple events are allowed', () => {
      const eventBus = new EventBus<boolean>();
      let receivedData1: boolean | undefined;
      let receivedData2: boolean | undefined;

      const unsubscribe1 = eventBus.subscribe((data) => {
        receivedData1 = data;
      }, 'event1');

      const unsubscribe2 = eventBus.subscribe((data) => {
        receivedData2 = data;
      }, 'event2');

      eventBus.publishSync(true, 'event1');
      eventBus.publishSync(false, 'event2');

      expect(receivedData1).toEqual(true);
      expect(receivedData2).toEqual(false);

      unsubscribe1();
      unsubscribe2();
    });
  });
});
