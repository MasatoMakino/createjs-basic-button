/**
 * ui.button.BasicRadioButton
 * ...
 *
 * @since 2017/05/31 16:09
 * @author 	m_makino
 */
/// <reference types="easeljs" />
import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
export declare class BasicRadioButton extends BasicCheckButton {
  protected manager: BasicRadioButtonManager;
  protected isUnselectable: boolean;
  setManager(manager: BasicRadioButtonManager): void;
  pressButton(evt?: createjs.MouseEvent): void;
  releaseButton(evt?: createjs.MouseEvent): void;
  overButton(evt?: createjs.MouseEvent): void;
  outButton(evt?: createjs.MouseEvent): void;
  checkActivity(): boolean;
  selectButton(evt?: createjs.MouseEvent): void;
  initSelection(isSelect: boolean): void;
  setUnselectable(isUnselectable: boolean): void;
}
//# sourceMappingURL=BasicRadioButton.d.ts.map
