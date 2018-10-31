import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
import { BasicButtonState } from "./BasicClickButton";

/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
  protected manager!: BasicRadioButtonManager; //このボタンが所属するラジオボタングループ。
  protected _isAbleToDeselect: boolean = false; //ボタン自体が解除可能か。本来ラジオボタンは自身では選択を解除できない。

  public setManager(manager: BasicRadioButtonManager): void {
    this.manager = manager;
  }

  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    super.pressButton(evt);
    if (this.manager) this.manager.pressButton(this);
  }

  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;

    this.isPressed = false;

    if (!this.isSelect) {
      this.selectButton();
      this.updateMaterialVisible(BasicButtonState.SELECT_OVER);
      if (this.manager) this.manager.releaseButton(this);
    } else {
      this.manager.unselectAllButtons();
      this.updateMaterialVisible(BasicButtonState.NORMAL);
      if (this.manager) this.manager.releaseButton(this);
    }
  }

  public overButton(evt?: createjs.MouseEvent): void {
    super.overButton(evt);
    if (this.manager) this.manager.overButton(this);
  }

  public outButton(evt?: createjs.MouseEvent): void {
    super.outButton(evt);
    if (this.manager) this.manager.outButton(this);
  }

  public checkActivity(): boolean {
    if (this.isDisable) return false;
    if (this.isSelect && !this._isAbleToDeselect) return false;
    return true;
  }

  public selectButton(evt?: createjs.MouseEvent): void {
    super.selectButton();
    this.manager.unselectOthers(this);
  }

  public initSelection(isSelect: boolean): void {
    super.initSelection(isSelect);
    if (isSelect) this.manager.unselectOthers(this, false);
  }

  public set isAbleToDeselect(value: boolean) {
    this._isAbleToDeselect = value;
  }
}
