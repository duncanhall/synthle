
class SynthleEvent {
  
  static fromMessage(msg) {
    const event = JSON.parse(msg.data);
    return new SynthleEvent(event.st, event.sd);
  }
  
  constructor(type, data) {
    this.type = type;
    this.data = data || {};
  }

  tx() {
    return this.toString();
  }

  toString() {
    return JSON.stringify({ st:this.type, sd:this.data });
  }
}

export default SynthleEvent
