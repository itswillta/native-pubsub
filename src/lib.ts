/**
 * Event bus class that allows subscribing to and publishing events.
 * @template T - The type of data that will be passed in the events.
 */
export class EventBus<T = Record<string, unknown>> {
  #eventTarget: EventTarget;
  #defaultEventName: string;

  constructor() {
    this.#eventTarget = new EventTarget();
    this.#defaultEventName = crypto.randomUUID();
  }

  /**
   * Subscribes to an event with the specified event handler.
   * @param eventHandler - The function that will be called when the event is triggered.
   * @param eventName - The name of the event to subscribe to. Defaults to the default event name.
   * @returns A function that can be called to unsubscribe from the event.
   */
  subscribe(eventHandler: (data: T) => void, eventName = this.#defaultEventName) {
    const handleEvent = (event: Event) => {
      const data = (event as CustomEvent).detail as T;

      eventHandler(data);
    };

    this.#eventTarget.addEventListener(eventName, handleEvent);

    return () => {
      this.#eventTarget.removeEventListener(eventName, handleEvent);
    };
  }

  /**
   * Publishes an event synchronously with the specified data.
   * @param data - The data to be passed in the event.
   * @param eventName - The name of the event to publish. Defaults to the default event name.
   */
  publishSync(data: T, eventName = this.#defaultEventName) {
    this.#eventTarget.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }

  /**
   * Publishes an event asynchronously with the specified data.
   * @param data - The data to be passed in the event.
   * @param eventName - The name of the event to publish. Defaults to the default event name.
   */
  async publish(data: T, eventName = this.#defaultEventName) {
    await Promise.resolve();

    this.publishSync(data, eventName);
  }
}
