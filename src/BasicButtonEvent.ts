export class BasicButtonEvent extends createjs.Event {
  public index!: number;
  public buttonValue: any = null;

  constructor(
    type: BasicButtonEventType,
    bubbles: boolean = false,
    cancelable: boolean = false
  ) {
    super(type, bubbles, cancelable);
  }

  clone(): createjs.Event {
    const evt: BasicButtonEvent = new BasicButtonEvent(
      this.type as BasicButtonEventType,
      this.bubbles,
      this.cancelable
    );
    evt.index = this.index;
    evt.buttonValue = this.buttonValue;
    return evt;
  }

  toString(): string {
    return "BasicButtonEvent : " + "type = " + this.type;
  }
}

export enum BasicButtonEventType {
  SELECTED = "button_event_select",
  UNSELECTED = "button_event_unselect"
}
