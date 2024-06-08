/**
 * Creates an event bus that allows subscribing to and publishing events.
 * @template T - The type of data that will be passed in the events.
 * @returns An object containing the `subscribe`, `publish`, and `publishSync` methods.
 */
export function createEventBus<T = Record<string, unknown>>() {
  const eventTarget = new EventTarget()
  const defaultEventName: string = crypto.randomUUID()

  /**
   * Subscribes to an event with the specified event handler.
   * @param eventHandler - The function that will be called when the event is triggered.
   * @param eventName - The name of the event to subscribe to. Defaults to the default event name.
   * @returns A function that can be called to unsubscribe from the event.
   */
  const subscribe = (eventHandler: (data: T) => void, eventName = defaultEventName) => {
    const handleEvent = (event: Event) => {
      const data = (event as CustomEvent).detail as T

      eventHandler(data)
    }

    eventTarget.addEventListener(eventName, handleEvent)

    return () => {
      eventTarget.removeEventListener(eventName, handleEvent)
    }
  }

  /**
   * Publishes an event synchronously with the specified data.
   * @param data - The data to be passed in the event.
   * @param eventName - The name of the event to publish. Defaults to the default event name.
   */
  const publishSync = (data: T, eventName = defaultEventName) => {
    eventTarget.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }

  /**
   * Publishes an event asynchronously with the specified data.
   * @param data - The data to be passed in the event.
   * @param eventName - The name of the event to publish. Defaults to the default event name.
   */
  const publish = (data: T, eventName = defaultEventName) => {
    Promise.resolve().then(() => publishSync(data, eventName))
  }

  return { subscribe, publish, publishSync }
}
