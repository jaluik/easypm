# easypm

easypm is a JavaScript library that provides an easy-to-use wrapper around `window.postMessage`, allowing you to send and receive messages within the same window. easypm simplifies the handling of events and data transmission, offering an enhanced capability over `postMessage` by enabling the passing of functions as well as data.

## Features

- Simplified message passing within the same window.
- Event-based message handling.
- Easy subscription and unsubscription to events.
- Supports passing functions along with data, unlike `window.postMessage`.

## Installation

To use easypm in your project, simply import the library.

```javascript
import easypm from 'easypm';
```

## Usage

### 1. Subscribing to Events

Use the `on` method to subscribe to an event. This method takes an event name and a callback function that will be called when the event is emitted.

```javascript
easypm.on('myEvent', (data) => {
  console.log('Received data:', data);
});
```

### 2. Emitting Events

Use the `emit` method to emit an event. This method takes an event name and the data to be sent. Unlike `window.postMessage`, easypm allows you to pass functions as well as data.

```javascript
easypm.emit('myEvent', { key: 'value', callback: () => console.log('Hello!') });
```

### 3. Unsubscribing from Events

Use the `off` method to unsubscribe from an event. This method takes an event name and the callback function to be removed.

```javascript
const callback = (data) => {
  console.log('Received data:', data);
};

easypm.on('myEvent', callback);
easypm.off('myEvent', callback);
```

## Example

Here's a complete example demonstrating how to use easypm to send and receive messages within the same window, including passing functions.

### In the main script:

```javascript
import easypm from './easypm';

// Subscribing to an event
easypm.on('customEvent', (data) => {
  console.log('Received:', data);
  if (data.callback) {
    data.callback(); // Execute the passed function
  }
});

// Emitting an event
easypm.emit('customEvent', {
  message: 'Hello, easypm!',
  callback: () => console.log('Function executed!'),
});

// Unsubscribing from an event
const callback = (data) => {
  console.log('Received:', data);
};

easypm.on('customEvent', callback);
easypm.off('customEvent', callback);
```

## API Reference

### `on(event: string, callback: Function)`

Subscribes to an event.

- **event**: The name of the event to subscribe to.
- **callback**: The function to call when the event is emitted.

### `off(event: string, callback: Function)`

Unsubscribes from an event.

- **event**: The name of the event to unsubscribe from.
- **callback**: The function to remove from the subscription list.

### `emit(event: string, data: any)`

Emits an event with the specified data. Supports passing functions along with data.

- **event**: The name of the event to emit.
- **data**: The data to send with the event, which can include functions.

## License

This library is licensed under the MIT License. Feel free to use it in your projects.

## Conclusion

easypm simplifies the process of sending and receiving messages within the same window by providing a convenient API for event-based communication. With its enhanced capability to pass functions as well as data, easypm offers more flexibility and power compared to `window.postMessage`. Whether you're building a complex web application or just need a reliable way to pass messages and functions within the same window, easypm can help streamline your development process.
