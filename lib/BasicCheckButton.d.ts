/// <reference types="easeljs" />
import { BasicButtonState } from "./BasicButtonState";
import { BasicClickButton } from "./BasicClickButton";

/**
 * 選択状態を持つボタンクラス。
 */
export declare class BasicCheckButton extends BasicClickButton {
  protected _isSelect: boolean;
  pressButton(evt?: createjs.MouseEvent): void;
  releaseButton(evt?: createjs.MouseEvent): void;
  overButton(evt?: createjs.MouseEvent): void;
  outButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンを選択する。
   * @param {createjs.MouseEvent} evt
   */
  selectButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンの選択を解除する。
   * @param {createjs.MouseEvent} evt
   */
  deselectButton(evt?: createjs.MouseEvent): void;
  enableButton(): void;
  getButtonState(): BasicButtonState;
  /**
   * 選択状態を取得する。
   * @returns {boolean}
   */
  get selection(): boolean;
}
//# sourceMappingURL=BasicCheckButton.d.ts.map
