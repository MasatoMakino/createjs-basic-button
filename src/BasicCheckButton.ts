import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";

/**
 * 選択状態を持つボタンクラス。
 */
export class BasicCheckButton extends BasicClickButton {
  isSelect: boolean = false;

  /**
   * ボタンがmousedownされた際の処理。
   * @param {createjs.MouseEvent} evt
   */
  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;

    if (this.isSelect) {
      this.updateMaterialVisible(BasicButtonState.SELECT_DOWN);
    } else {
      super.pressButton(evt);
    }
  }

  /**
   * ボタンがmouseupされた際の処理。
   * @param {createjs.MouseEvent} evt
   */
  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;

    this.isPressed = false;

    if (this.isSelect) this.deselectButton(evt);
    else this.selectButton(evt);
  }

  /**
   * ボタンがmouseoverされた際の処理
   * @param {createjs.MouseEvent} evt
   */
  public overButton(evt?: createjs.MouseEvent): void {
    if (!this.checkRollOverActivity()) return;

    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT_OVER);
    else super.overButton(evt);
  }

  public outButton(evt?: createjs.MouseEvent): void {
    if (!this.checkRollOverActivity()) return;
    this.isPressed = false;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else super.outButton(evt);
  }

  /**
   * @override
   * @param {createjs.MouseEvent} evt
   */
  public selectButton(evt?: createjs.MouseEvent): void {
    if (this.isSelect) return;

    super.selectButton(evt);
    this.isSelect = true;
    if (!this.isDisable) {
      const state = this._isOver
        ? BasicButtonState.SELECT_OVER
        : BasicButtonState.SELECT;
      this.updateMaterialVisible(state);
    }

    let buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.SELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  public deselectButton(evt?: createjs.MouseEvent): void {
    if (!this.isSelect) return;

    if (!this.isDisable) {
      const state = this._isOver
        ? BasicButtonState.NORMAL_OVER
        : BasicButtonState.NORMAL;
      this.updateMaterialVisible(state);
    }
    this.isSelect = false;

    let buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.UNSELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  /**
   * 選択状態を反転させる。
   * ButtonEvent.SELECTは発行しない。
   * @param {createjs.MouseEvent} evt
   */
  public reverseSelection(evt?: createjs.MouseEvent): void {
    this.isSelect = !this.isSelect;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * 選択状態の初期化のみを行う。
   * ButtonEvent.SELECTは発行しない。
   * @param {boolean} isSelect
   */
  public initSelection(isSelect: boolean): void {
    this.isSelect = isSelect;
    if (isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * ボタンを操作可能にする。
   */
  public enableButton(): void {
    this.isDisable = false;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else super.enableButton();
    this.enableMouseEvent();
  }

  public checkRollOverActivity(): boolean {
    return !this.isDisable;
  }

  public getButtonState(): BasicButtonState {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else {
      if (this.isSelect) return BasicButtonState.SELECT;
      else return BasicButtonState.NORMAL;
    }
  }

  /**
   * 選択状態を取得する。
   * @returns {boolean}
   */
  get selection(): boolean {
    return this.isSelect;
  }
}
