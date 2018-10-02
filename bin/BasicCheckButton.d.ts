/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
import {
  BasicClickButton,
  BasicButtonState,
  BasicButtonMaterialConfig
} from "./BasicClickButton";
/**
 *
 * ui.BasicCheckButton
 *
 * 選択状態を持つボタンをあらわすクラスです
 *
 * @since 2017/05/31 16:09
 * @author m_makino
 */
export declare class BasicCheckButton extends BasicClickButton {
  isSelect: boolean;
  protected _selectNormalMaterial: DisplayObject;
  protected _selectOverMaterial: DisplayObject;
  protected _selectDownMaterial: DisplayObject;
  protected _selectMarkerMaterial?: DisplayObject;
  protected updateMaterialVisible(type: BasicButtonState): void;
  initMaterial(materials: BasicButtonMaterialConfig): void;
  pressButton(evt?: createjs.MouseEvent): void;
  releaseButton(evt?: createjs.MouseEvent): void;
  overButton(evt?: createjs.MouseEvent): void;
  outButton(evt?: createjs.MouseEvent): void;
  selectButton(evt?: createjs.MouseEvent): void;
  unselectButton(evt?: createjs.MouseEvent): void;
  reverseSelectState(evt?: createjs.MouseEvent): void;
  initSelection(isSelect: boolean): void;
  enableButton(): void;
  checkRollOverActivity(): boolean;
  getButtonState(): BasicButtonState;
  updateButtonDisplay(): void;
  readonly selection: boolean;
}
//# sourceMappingURL=BasicCheckButton.d.ts.map
