/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 *
 * @since 2017/05/31 16:09
 * @version 2017/05/31 16:48
 * @author m_makino
 */
export declare class BasicClickButton extends createjs.Container {
  isDisable: boolean;
  isPressed: boolean;
  _isOver: boolean;
  protected _buttonValue: any;
  protected _normalMaterial: DisplayObject;
  protected _overMaterial: DisplayObject;
  protected _downMaterial: DisplayObject;
  protected _disableMaterial: DisplayObject;
  protected labelField: createjs.Text;
  protected _label: string;
  protected labelColors: BasicButtonLabelColorConfig;
  /**
   * コンストラクタ
   * @since    2008/06/12 12:15
   */
  constructor();
  private setMouseEvents;
  initMaterial(materials: BasicButtonMaterialConfig): void;
  protected updateMaterialVisible(type: BasicButtonState): void;
  /**
   * ボタンを押す
   * @param e
   */
  onPressButton: (e?: any) => void;
  pressButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンを離す
   * @param e
   */
  onReleaseButton: (e?: any) => void;
  releaseButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンにマウスオーバーする
   * @param e
   */
  onOverButton: (e?: any) => void;
  overButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンからマウスアウトする
   * @param e
   */
  onOutButton: (e?: any) => void;
  outButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンを選択する
   * @param    evt
   */
  selectButton(evt?: createjs.MouseEvent): void;
  /**
   * ボタンを非活性化する
   */
  disableButton(): void;
  /**
   * ボタンを活性化する
   */
  enableButton(): void;
  /**
   * ボタンのイベントリスナを有効にする
   *
   *        このメソッドではenableButton(),disableButton()と異なり
   *        表示状態の変更は行われません。
   */
  enableMouseEvent(): void;
  /**
   * ボタンのイベントリスナを無効にする
   *
   *        このメソッドではenableButton(),disableButton()と異なり
   *        表示状態の変更は行われません。
   */
  disableMouseEvent(): void;
  /**
   * 現在のボタンの有効、無効状態を取得する
   * @return    ボタンが有効か否か
   */
  checkActivity(): boolean;
  /**
   * 現在のボタンの状態を取得する
   * @return    定数STATE_*のいずれか
   */
  getButtonState(): BasicButtonState;
  /**
   * ボタンの状態表示を更新する
   */
  updateButtonDisplay(): void;
  addLabel(
    x: number,
    y: number,
    label: string,
    font: string,
    color: BasicButtonLabelColorConfig,
    textAlign?: string
  ): void;
  label: string;
  readonly isOver: boolean;
  buttonValue: any;
}
export declare class BasicButtonMaterialConfig {
  normal: DisplayObject;
  over?: DisplayObject;
  down?: DisplayObject;
  disable?: DisplayObject;
  selectNormal?: DisplayObject;
  selectOver?: DisplayObject;
  selectDown?: DisplayObject;
  selectMarker?: DisplayObject;
}
export declare class BasicButtonLabelColorConfig {
  normal: string;
  over?: string;
  down?: string;
  disable?: string;
  selectNormal?: string;
  selectOver?: string;
  selectDown?: string;
  /**
   * 不足している初期値を補う
   * @param {BasicButtonLabelColorConfig} config
   * @returns {BasicButtonLabelColorConfig}
   */
  static initLabelColorConfig(
    config: BasicButtonLabelColorConfig
  ): BasicButtonLabelColorConfig;
}
export declare enum BasicButtonState {
  NORMAL = "normal",
  NORMAL_OVER = "normal_over",
  NORMAL_DOWN = "normal_down",
  DISABLE = "disable",
  SELECT = "select",
  SELECT_OVER = "select_over",
  SELECT_DOWN = "select_down"
}
//# sourceMappingURL=BasicClickButton.d.ts.map
