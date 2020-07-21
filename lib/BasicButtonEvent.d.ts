/// <reference types="createjs-lib" />
export declare class BasicButtonEvent extends createjs.Event {
  index: number;
  buttonValue: any;
  constructor(
    type: BasicButtonEventType,
    bubbles?: boolean,
    cancelable?: boolean
  );
  clone(): createjs.Event;
  toString(): string;
}
export declare enum BasicButtonEventType {
  SELECTED = "button_event_select",
  UNSELECTED = "button_event_unselected",
}
//# sourceMappingURL=BasicButtonEvent.d.ts.map
