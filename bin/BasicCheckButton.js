import { CreatejsCacheUtil } from "createjs-cache-util";
import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";
/**
 *
 * ui.BasicCheckButton
 *
 * 選択状態を持つボタンをあらわすクラスです
 *
 * @since 2017/05/31 16:09
 * @author m_makino
 */
export class BasicCheckButton extends BasicClickButton {
  constructor() {
    super(...arguments);
    this.isSelect = false;
  }
  updateMaterialVisible(type) {
    if (this._selectNormalMaterial)
      this._selectNormalMaterial.visible = type === BasicButtonState.SELECT;
    if (this._selectOverMaterial)
      this._selectOverMaterial.visible = type === BasicButtonState.SELECT_OVER;
    if (this._selectDownMaterial)
      this._selectDownMaterial.visible = type === BasicButtonState.SELECT_DOWN;
    if (this._selectMarkerMaterial) {
      const isSelect =
        type === BasicButtonState.SELECT ||
        type === BasicButtonState.SELECT_OVER ||
        type === BasicButtonState.SELECT_DOWN;
      this._selectMarkerMaterial.visible = isSelect;
    }
    if (this.labelField) {
      switch (type) {
        case BasicButtonState.SELECT:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.selectNormal
          });
          break;
        case BasicButtonState.SELECT_DOWN:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.selectDown
          });
          break;
        case BasicButtonState.SELECT_OVER:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.selectOver
          });
          break;
      }
    }
    super.updateMaterialVisible(type);
  }
  initMaterial(materials) {
    this._selectNormalMaterial =
      materials.selectNormal || materials.normal.clone();
    this._selectOverMaterial = materials.selectOver || materials.normal.clone();
    this._selectDownMaterial = materials.selectDown || materials.normal.clone();
    this._selectMarkerMaterial = materials.selectMarker;
    let selectMaterials = [
      this._selectNormalMaterial,
      this._selectOverMaterial,
      this._selectDownMaterial,
      this._selectMarkerMaterial
    ];
    for (let material of selectMaterials) {
      if (material && !material.parent) {
        this.addChild(material);
      }
    }
    super.initMaterial(materials);
  }
  pressButton(evt) {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    if (this.isSelect) {
      this.updateMaterialVisible(BasicButtonState.SELECT_DOWN);
    } else {
      super.pressButton(evt);
    }
  }
  releaseButton(evt) {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;
    this.isPressed = false;
    if (this.isSelect) this.unselectButton(evt);
    else this.selectButton(evt);
  }
  overButton(evt) {
    if (!this.checkRollOverActivity()) return;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT_OVER);
    else super.overButton(evt);
  }
  outButton(evt) {
    if (!this.checkRollOverActivity()) return;
    this.isPressed = false;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else super.outButton(evt);
  }
  selectButton(evt) {
    if (this.isSelect) return;
    super.selectButton(evt);
    this.isSelect = true;
    this.updateMaterialVisible(BasicButtonState.SELECT);
    let buttonEvt = new BasicButtonEvent(BasicButtonEventType.SELECTED);
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }
  unselectButton(evt) {
    if (!this.isSelect) return;
    if (!this.isDisable) this.updateMaterialVisible(BasicButtonState.NORMAL);
    this.isSelect = false;
    let buttonEvt = new BasicButtonEvent(BasicButtonEventType.UNSELECTED);
    buttonEvt.buttonValue = this.buttonValue;
    this.dispatchEvent(buttonEvt);
  }
  reverseSelectState(evt) {
    this.isSelect = !this.isSelect;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }
  initSelection(isSelect) {
    this.isSelect = isSelect;
    if (isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else this.updateMaterialVisible(BasicButtonState.NORMAL);
  }
  enableButton() {
    this.isDisable = false;
    if (this.isSelect) this.updateMaterialVisible(BasicButtonState.SELECT);
    else super.enableButton();
    this.enableMouseEvent();
  }
  checkRollOverActivity() {
    return !this.isDisable;
  }
  getButtonState() {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else {
      if (this.isSelect) return BasicButtonState.SELECT;
      else return BasicButtonState.NORMAL;
    }
  }
  updateButtonDisplay() {
    this.updateMaterialVisible(this.getButtonState());
  }
  ///////////////////////////
  //	getter / setter
  ///////////////////////////
  get selection() {
    return this.isSelect;
  }
}
