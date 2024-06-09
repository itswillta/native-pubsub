# Native Pubsub

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/itswillta/native-pubsub/tests.yml?style=for-the-badge)
 ![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/native-pubsub?style=for-the-badge) ![NPM Version](https://img.shields.io/npm/v/native-pubsub?style=for-the-badge)

This library provides a simple and efficient way to manage events in your JavaScript or TypeScript applications. It allows you to create an event bus that you can subscribe to and publish events.

## Installation

```sh
npm install native-pubsub
```

## Usage

First, you need to create an event bus:

```typescript
import { createEventBus } from 'native-pubsub';

const eventBus = createEventBus();

// or create an event bus with a typed data structure:

const typedEventBus = createEventBus<{ id: string, name: string }>();
```

Event buses are unique, and it's recommended that you only publish (and subscribe to) one kind of events for each event bus.

### Subscribing to Events

To subscribe to an event, use the `subscribe` method. This method takes a function that will be called when the event is triggered:

```typescript
const unsubscribe = eventBus.subscribe((data) => {
  console.log(data);
});
```

The `subscribe` method returns a function that you can call to unsubscribe from the event.

### Publishing Events

To publish an event, you can use either the `publish` or `publishSync` method.

The `publish` method publishes an event asynchronously:

```typescript
eventBus.publish('Hello, world!');
```

The `publishSync` method publishes an event synchronously:

```typescript
eventBus.publishSync('Hello, world!');
```

## Contributing

Contributions are welcome! Please see the `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` files for more information.
