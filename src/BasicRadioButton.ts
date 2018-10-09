import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
import { BasicButtonState } from "./BasicClickButton";

/**
 * 複数のボタンがセットになり、排他的に選択可能なボタン
 */
export class BasicRadioButton extends BasicCheckButton {
  protected manager!: BasicRadioButtonManager;
  protected isUnselectable: boolean = false;

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
    if (this.isSelect && !this.isUnselectable) return false;
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

  public setUnselectable(isUnselectable: boolean): void {
    this.isUnselectable = isUnselectable;
  }
}
