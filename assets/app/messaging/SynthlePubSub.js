
import SynthleEvent from './SynthleEvent';

class SynthlePubSub {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(eventType, handler) {
    let subs = this.subscribers.get(eventType) || new Set();
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, subs);
    } 
    subs.add(handler);
  }

  unsubscribe(eventType, handler) {
    let subs = this.subscribers.get(eventType);
    subs.delete(handler);
    this.subscribers.set(eventType, subs);
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

