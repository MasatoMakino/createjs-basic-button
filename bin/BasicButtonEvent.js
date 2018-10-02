export class BasicButtonEvent extends createjs.Event {
  constructor(type, bubbles = false, cancelable = false) {
    super(type, bubbles, cancelable);
    this.buttonValue = null;
  }
  clone() {
    let evt = new BasicButtonEvent(this.type, this.bubbles, this.cancelable);
    evt.index = this.index;
    evt.buttonValue = this.buttonValue;
    return evt;
  }
  toString() {
    //TODO Event.formatToStringの整備
    return "BasicButtonEvent : " + "type = " + this.type;
  }
}
export var BasicButtonEventType;
(function(BasicButtonEventType) {
  BasicButtonEventType["SELECTED"] = "button_event_select";
  BasicButtonEventType["UNSELECTED"] = "button_event_unselect";
})(BasicButtonEventType || (BasicButtonEventType = {}));
