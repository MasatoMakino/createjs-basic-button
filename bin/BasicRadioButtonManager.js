import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";
export class BasicRadioButtonManager extends createjs.EventDispatcher {
  constructor() {
    super();
    this._buttons = [];
  }
  addButton(button) {
    this._buttons.push(button);
    button.setManager(this);
  }
  /**
   * 初期選択ボタンを指定する。
   * BasicButtonEventを返さないので、ラジオボタンの状態を
   * イベントを発行せずに整える用途にも使用できる。
   * nullを引数に取ると全ての選択を解除する。
   * @param selectedButton
   */
  initSelection(selectedButton) {
    this.selected = selectedButton;
    for (let btn of this._buttons) {
      btn.initSelection(selectedButton === btn);
    }
  }
  unselectOthers(selectedButton, isDispatchSelectEvent = true) {
    this.selected = selectedButton;
    for (let btn of this._buttons) {
      if (btn != selectedButton) {
        btn.unselectButton();
      }
    }
    if (isDispatchSelectEvent) {
      let evt = new BasicButtonEvent(BasicButtonEventType.SELECTED);
      evt.buttonValue = this.selected.buttonValue;
      evt.index = this._buttons.indexOf(this.selected);
      this.dispatchEvent(evt);
    }
  }
  unselectAllButtons() {
    this.selected = undefined;
    for (let btn of this._buttons) {
      btn.unselectButton();
    }
    let evt = new BasicButtonEvent(BasicButtonEventType.UNSELECTED);
    this.dispatchEvent(evt);
  }
  disableAll() {
    for (let btn of this._buttons) {
      btn.disableButton();
    }
  }
  disableMouseAll() {
    for (let btn of this._buttons) {
      btn.disableMouseEvent();
    }
  }
  enableAll() {
    for (let btn of this._buttons) {
      btn.enableButton();
    }
  }
  enableMouseAll() {
    for (let btn of this._buttons) {
      btn.enableMouseEvent();
    }
  }
  getSelectedButton() {
    return this.selected;
  }
  pressButton(button) {}
  releaseButton(button) {}
  overButton(button) {}
  outButton(button) {}
  getButtonValue() {
    const btn = this.getSelectedButton();
    if (btn) {
      return btn.buttonValue;
    }
    return null;
  }
  refreshButtons(value) {
    for (let btn of this._buttons) {
      if (btn.buttonValue === value) {
        btn.selectButton();
      }
    }
  }
  get buttons() {
    return this._buttons;
  }
  getButtonWithButtonValue(value) {
    for (let btn of this._buttons) {
      if (
        btn.buttonValue === value &&
        btn.buttonValue != null &&
        btn.buttonValue != undefined
      ) {
        return btn;
      }
    }
    return null;
  }
}
