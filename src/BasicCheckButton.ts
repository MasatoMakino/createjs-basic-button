import { BasicClickButton } from "./BasicClickButton";
import { BasicButtonState } from "./BasicButtonState";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";

/**
 * 選択状態を持つボタンクラス。
 */
export class BasicCheckButton extends BasicClickButton {
  protected _isSelect: boolean = false;

  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;

    const state = this._isSelect
      ? BasicButtonState.SELECT_DOWN
      : BasicButtonState.NORMAL_DOWN;
    this.updateMaterialVisible(state);
  }

  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;

    if (!this.isPressed) return;
    this.isPressed = false;

    if (this._isSelect) this.deselectButton(evt);
    else this.selectButton(evt);
  }

  public overButton(evt?: createjs.MouseEvent): void {
    super.overButton(evt);

    if (!this.checkActivity()) return;
    const state = this._isSelect
      ? BasicButtonState.SELECT_OVER
      : BasicButtonState.NORMAL_OVER;
    this.updateMaterialVisible(state);
  }

  public outButton(evt?: createjs.MouseEvent): void {
    super.outButton(evt);

    if (!this.isDisable) {
      const state = this._isSelect
        ? BasicButtonState.SELECT
        : BasicButtonState.NORMAL;
      this.updateMaterialVisible(state);
    }
    if (!this.checkActivity()) return;
  }

  /**
   * ボタンを選択する。
   * @param {createjs.MouseEvent} evt
   */
  public selectButton(evt?: createjs.MouseEvent): void {
    if (this._isSelect) return;

    this._isSelect = true;
    if (!this.isDisable) {
      const state = this.isOver
        ? BasicButtonState.SELECT_OVER
        : BasicButtonState.SELECT;
      this.updateMaterialVisible(state);
    }

    const buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.SELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  /**
   * ボタンの選択を解除する。
   * @param {createjs.MouseEvent} evt
   */
  public deselectButton(evt?: createjs.MouseEvent): void {
    if (!this._isSelect) return;

    if (!this.isDisable) {
      const state = this.isOver
        ? BasicButtonState.NORMAL_OVER
        : BasicButtonState.NORMAL;
      this.updateMaterialVisible(state);
    }
    this._isSelect = false;

    const buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.UNSELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  public enableButton(): void {
    super.enableButton();
    const state = this._isSelect
      ? BasicButtonState.SELECT
      : BasicButtonState.NORMAL;
    this.updateMaterialVisible(state);
  }

  public getButtonState(): BasicButtonState {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else {
      if (this._isSelect) return BasicButtonState.SELECT;
      else return BasicButtonState.NORMAL;
    }
  }

  /**
   * 選択状態を取得する。
   * @returns {boolean}
   */
  get selection(): boolean {
    return this._isSelect;
  }
}
