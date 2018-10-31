import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
import { BasicButtonState } from "./BasicClickButton";

/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
  protected manager!: BasicRadioButtonManager; //このボタンが所属するラジオボタングループ。

  public setManager(manager: BasicRadioButtonManager): void {
    this.manager = manager;
  }

  public outButton(evt?: createjs.MouseEvent): void {
    super.outButton(evt);

    if (!this.isDisable && this.isSelect) {
      this.updateMaterialVisible(BasicButtonState.SELECT);
    }
  }

  public checkActivity(): boolean {
    if (this.isDisable) return false;
    if (!this.mouseEnabled) return false;
    if (this.isSelect) return false;
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
}
