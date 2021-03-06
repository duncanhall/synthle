
import SynthleEvent from './SynthleEvent';

class SynthlePubSub {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(eventType, handler) {
    if (eventType === undefined) {
      console.warn(`Adding undefined event handler for ${handler.name}`);
    }
    let subs = this.subscribers.get(eventType) || new Set();
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, subs);
    } 
    subs.add(handler);
  }

  unsubscribe(eventType, handler) {
    if (eventType === undefined) {
      console.warn(`Adding undefined event handler for ${handler.name}`);
    }
    let subs = this.subscribers.get(eventType);
    subs.delete(handler);
    this.subscribers.set(eventType, subs);
  }

  unsubscribeAll() {
    this.subscribers.forEach(sub => sub.clear());
    this.subscribers.clear();
    this.subscribers = null;
  }

  _publish(message) {
    const event = SynthleEvent.fromMessage(message);
    const type = event.type;
    const data = event.data;
    const subs = this.subscribers.get(type);
    if (subs !== undefined) {
      subs.forEach(sub => sub(data));
    }
  }
}

export default SynthlePubSub

