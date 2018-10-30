import { CreatejsCacheUtil } from "createjs-cache-util";
import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";

/**
 * 選択状態を持つボタンクラスです
 */
export class BasicCheckButton extends BasicClickButton {
  isSelect: boolean = false;

  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;

    if (this.isSelect) {
      this.updateMaterialVisible(BasicButtonState.SELECT_DOWN);
    } else {
      super.pressButton(evt);
    }
  }

  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;

    this.isPressed = false;

    if (this.isSelect) this.unselectButton(evt);
    else this.selectButton(evt);
  }

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

  public selectButton(evt?: createjs.MouseEvent): void {
    if (this.isSelect) return;

    super.selectButton(evt);
    this.isSelect = true;
    this.updateMaterialVisible(BasicButtonState.SELECT);
    let buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.SELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  public unselectButton(evt?: createjs.MouseEvent): void {
    if (!this.isSelect) return;

    if (!this.isDisable) this.updateMaterialVisible(BasicButtonState.NORMAL);
    this.isSelect = false;

    let buttonEvt: BasicButtonEvent = new BasicButtonEvent(
      BasicButtonEventType.UNSELECTED
    );
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }

  public reverseSelectState(evt?: createjs.MouseEvent): void {
    this.isSelect = !this.isSelect;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  public initSelection(isSelect: boolean): void {
    this.isSelect = isSelect;
    if (isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

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

  public updateButtonDisplay(): void {
    this.updateMaterialVisible(this.getButtonState());
  }

  ///////////////////////////
  //	getter / setter
  ///////////////////////////

  get selection(): boolean {
    return this.isSelect;
  }
}
