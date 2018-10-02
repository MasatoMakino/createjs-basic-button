/// <reference types="createjs-lib" />
/**
 * 排他的に選択されるボタンを制御するクラスです。
 *
 * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。
 * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトを変更します。
 *
 * 利用する際には以下のような手順でインスタンス化してください。
 *
 *	let manager:BasicRadioButtonManager = new BasicRadioButtonManager();	//インスタンス化
 *	(BasicRadioButton).selectButton();										//デフォルトで選択されているボタンを指定
 *
 * @since	2017/05/31 16:09
 * @author	m_makino
 */
import { BasicRadioButton } from "./BasicRadioButton";
export declare class BasicRadioButtonManager extends createjs.EventDispatcher {
  protected _buttons: BasicRadioButton[];
  selected?: BasicRadioButton;
  constructor();
  addButton(button: BasicRadioButton): void;
  /**
   * 初期選択ボタンを指定する。
   * BasicButtonEventを返さないので、ラジオボタンの状態を
   * イベントを発行せずに整える用途にも使用できる。
   * nullを引数に取ると全ての選択を解除する。
   * @param selectedButton
   */
  initSelection(selectedButton: BasicRadioButton): void;
  unselectOthers(
    selectedButton: BasicRadioButton,
    isDispatchSelectEvent?: boolean
  ): void;
  unselectAllButtons(): void;
  disableAll(): void;
  disableMouseAll(): void;
  enableAll(): void;
  enableMouseAll(): void;
  getSelectedButton(): BasicRadioButton | undefined;
  pressButton(button: BasicRadioButton): void;
  releaseButton(button: BasicRadioButton): void;
  overButton(button: BasicRadioButton): void;
  outButton(button: BasicRadioButton): void;
  getButtonValue(): any;
  refreshButtons(value: any): void;
  readonly buttons: BasicRadioButton[];
  getButtonWithButtonValue(value: any): BasicRadioButton | null;
}
//# sourceMappingURL=BasicRadioButtonManager.d.ts.map
