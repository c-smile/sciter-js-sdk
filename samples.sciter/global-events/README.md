# Global Events, also known as "Application [wide] events".

Global events is Sciter's built-in native PubSub mechansim.

## Idea 

Basic idea is to support a) loosely coupled front- and backends and/or b) decoupled components. 

### Scenario 1: inter-component communication

Your application may have two UI components (DOM elements A and B) that don't know about each other in any way - not about particular classes nor existence of instances of these components in UI at any given time.

When component A will need to notify other potential receivers on its (or in other) window it can broadcast the event as:

```JavaScript
// component A code:

  class ComponentA extends Element {
    notifyOthers() {
      Window.post( new Event("some-event-name") );
    }
  }
```

This will cause the event to be asynchronously dispatched (a.k.a. **Pub**lished) to all potential receivers of the event.

If component "B" is interested in receiving such global events then it should **Sub**scribe itself to that event:

```JavaScript
// component A code:

  class ComponentB extends Element {

    componentDidMount() {
      function callback(evt) {...}      
      // subscribe this instance to global event named "some-event-name"
      this.onGlobalEvent("some-event-name", callback);
    }

  }
```

This way two components are decoupled completely. The only information they need to know is the name of event.


### Scenario 2: backend->frontend communication

Global events can be used for notifications from native side ("backend" here) of the application to notify UI that something happened outside of UI.

Sciter API contains helper method that can be used to dispatch (post) events to global event subscribers:

```C++
  BEHAVIOR_EVENT_PARAMS evt = {0};

  evt.name = WSTR("some-event-name");
  frame::broadcast_event(evt); // this will post the event to global event subscribers in the app
```


## Passing data payload

Sender can post events with data payload if needed:

```JavaScript
 Window.post( new Event("some-event-name", {data:42}) );
```

The data will be received by event handler by reading Event.data field:

```JavaScript
  function callback(evt) {
    let data = evt.data;
    ... 
  }      
  // subscribe this instance to global event named "some-event-name"
  this.onGlobalEvent("some-event-name", callback);
  ```

## Subscription lifecycle

Unsubscription from global events is optional. When the element will be removed from the DOM it will be automatically unsbscribed from all global events.

In other words Global subcriptions use weak pointer semantic.

But you also can explicitly unsubscribe the element from event notifications by using `Element.offGlobalEvent()` method :

```JavaScript
this.offGlobalEvent("some-event-name"); // unsbscribe this element from particular event
this.offGlobalEvent(); // unsbscribe this element from all events
```

