/**
 * ui.button.BasicRadioButton
 * ...
 *
 * @since 2017/05/31 16:09
 * @author 	m_makino
 */
import { BasicCheckButton } from "./BasicCheckButton";
import { BasicButtonState } from "./BasicClickButton";
export class BasicRadioButton extends BasicCheckButton {
  constructor() {
    super(...arguments);
    this.isUnselectable = false;
  }
  setManager(manager) {
    this.manager = manager;
  }
  pressButton(evt) {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    super.pressButton(evt);
    if (this.manager) this.manager.pressButton(this);
  }
  releaseButton(evt) {
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
  overButton(evt) {
    super.overButton(evt);
    if (this.manager) this.manager.overButton(this);
  }
  outButton(evt) {
    super.outButton(evt);
    if (this.manager) this.manager.outButton(this);
  }
  checkActivity() {
    if (this.isDisable) return false;
    if (this.isSelect && !this.isUnselectable) return false;
    return true;
  }
  selectButton(evt) {
    super.selectButton();
    this.manager.unselectOthers(this);
  }
  initSelection(isSelect) {
    super.initSelection(isSelect);
    if (isSelect) this.manager.unselectOthers(this, false);
  }
  setUnselectable(isUnselectable) {
    this.isUnselectable = isUnselectable;
  }
}
