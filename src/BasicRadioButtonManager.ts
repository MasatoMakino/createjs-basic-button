import { BasicRadioButton } from "./BasicRadioButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";

/**
 * 排他的に選択されるボタンを制御するクラスです。
 *
 * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。
 * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。
 * また、このクラスは変更内容をEventとして発信します。
 *
 * 利用する際には以下のような手順でインスタンス化してください。
 *
 * let btn:BasicRadioButton = new BasicRadioButton(...);
 * let manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化
 * manager.addButton(btn);
 * manager.initSelection(btn); //デフォルトで選択されているボタンを指定
 */

export class BasicRadioButtonManager extends createjs.EventDispatcher {
  protected _buttons: BasicRadioButton[];
  selected?: BasicRadioButton;

  constructor() {
    super();
    this._buttons = [];
  }

  public addButton(button: BasicRadioButton): void {
    this._buttons.push(button);
    button.addEventListener(BasicButtonEventType.SELECTED, (e: any) => {
      const evt = e as BasicButtonEvent;
      this.deselectOthers(evt.currentTarget);
    });
  }

  /**
   * 初期選択ボタンを指定する。
   * nullを引数に取ると全ての選択を解除する。
   * @param {BasicRadioButton} selectedButton
   */
  public initSelection(selectedButton?: BasicRadioButton): void {
    this.selected = selectedButton;

    if (selectedButton == null) {
      this.deselectAllButtons();
      return;
    }

    for (let btn of this._buttons) {
      if (selectedButton === btn) {
        btn.selectButton();
      }
    }
  }

  public deselectOthers(
    selectedButton: BasicRadioButton,
    isDispatchSelectEvent: boolean = true
  ): void {
    this.selected = selectedButton;

    for (let btn of this._buttons) {
      if (btn != selectedButton) {
        btn.deselectButton();
      }
    }

    if (isDispatchSelectEvent) {
      let evt: BasicButtonEvent = new BasicButtonEvent(
        BasicButtonEventType.SELECTED
      );
      evt.buttonValue = this.selected.buttonValue;
      evt.index = this._buttons.indexOf(this.selected);
      this.dispatchEvent(evt);
    }
  }

  public deselectAllButtons(): void {
    this.selected = undefined;
    for (let btn of this._buttons) {
      btn.deselectButton();
    }

    const evt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.UNSELECTED
    );
    this.dispatchEvent(evt);
  }

  public disableAll(): void {
    for (let btn of this._buttons) {
      btn.disableButton();
    }
  }

  public disableMouseAll(): void {
    for (let btn of this._buttons) {
      btn.disableMouseEvent();
    }
  }

  public enableAll(): void {
    for (let btn of this._buttons) {
      btn.enableButton();
    }
  }

  public enableMouseAll(): void {
    for (let btn of this._buttons) {
      btn.enableMouseEvent();
    }
  }

  public getSelectedButton(): BasicRadioButton | undefined {
    return this.selected;
  }

  public getButtonValue(): any {
    const btn = this.getSelectedButton();
    if (btn) {
      return btn.buttonValue;
    }
    return null;
  }

  public refreshButtons(value: any): void {
    for (let btn of this._buttons) {
      if (btn.buttonValue === value) {
        btn.selectButton();
      }
    }
  }

  get buttons(): BasicRadioButton[] {
    return this._buttons;
  }

  /**
   * buttonValueを検索キーとして、該当するボタンを取得する。
   * 該当するボタンがない場合はnullを返す。
   *
   * @param value
   * @returns {BasicRadioButton | null}
   */
  public getButton(value: any): BasicRadioButton | null {
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
