import DisplayObject = createjs.DisplayObject;
import Container = createjs.Container;
import { CreatejsCacheUtil } from "createjs-cache-util";

/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */

export class BasicClickButton extends createjs.Container {
  isDisable: boolean; //ボタンが使用不可状態か否か
  isPressed: boolean; //ボタンが押されているか否か
  _isOver: boolean; //マウスオーバーしているか否か

  protected _buttonValue: any = null; //このボタンに割り当てられた値

  //状態マテリアル 状態によって表示が切り替わるもの。
  //共通するパーツはこの上に配置する。
  protected _normalMaterial!: DisplayObject;
  protected _overMaterial!: DisplayObject;
  protected _downMaterial!: DisplayObject;
  protected _disableMaterial!: DisplayObject;

  //ボタンラベル
  protected labelField!: createjs.Text; //ラベル表示用のテキストフィールド
  protected _label!: string; //ラベルの内容
  protected labelColors!: BasicButtonLabelColorConfig;

  /**
   * コンストラクタ
   * @since    2008/06/12 12:15
   */
  constructor() {
    super();

    this.isDisable = false;
    this.isPressed = false;
    this._isOver = false;
    //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
    this.mouseChildren = false;

    this.cursor = "pointer";

    this.setMouseEvents();
  }

  private setMouseEvents(): void {
    this.addEventListener("mousedown", this.onPressButton);
    this.addEventListener("pressup", this.onReleaseButton);
    this.addEventListener("rollover", this.onOverButton);
    this.addEventListener("mouseout", this.onOutButton);
  }

  public initMaterial(materials: BasicButtonMaterialConfig): void {
    const cloneMaterial = (mat: DisplayObject): DisplayObject => {
      if (mat instanceof Container) return (mat as Container).clone(true);
      return mat.clone();
    };

    this._normalMaterial = materials.normal;
    this._overMaterial = materials.over || cloneMaterial(materials.normal);
    this._downMaterial = materials.down || cloneMaterial(materials.normal);
    this._disableMaterial =
      materials.disable || cloneMaterial(materials.normal);

    let materialArray: DisplayObject[] = [
      this._normalMaterial,
      this._overMaterial,
      this._downMaterial,
      this._disableMaterial
    ];
    for (let material of materialArray) {
      if (!material.parent) {
        this.addChild(material);
      }
    }
    this.updateMaterialVisible(this.getButtonState());

    //テキストラベルがあったら最前線に。
    if (this.labelField) {
      this.removeChild(this.labelField);
      this.addChild(this.labelField);
    }
  }

  protected updateMaterialVisible(type: BasicButtonState) {
    if (this._normalMaterial)
      this._normalMaterial.visible = type === BasicButtonState.NORMAL;
    if (this._overMaterial)
      this._overMaterial.visible = type === BasicButtonState.NORMAL_OVER;
    if (this._downMaterial)
      this._downMaterial.visible = type === BasicButtonState.NORMAL_DOWN;
    if (this._disableMaterial)
      this._disableMaterial.visible = type === BasicButtonState.DISABLE;

    if (this.labelField) {
      switch (type) {
        case BasicButtonState.NORMAL:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.normal
          });
          break;
        case BasicButtonState.NORMAL_DOWN:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.down
          });
          break;
        case BasicButtonState.NORMAL_OVER:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.over
          });
          break;
        case BasicButtonState.DISABLE:
          CreatejsCacheUtil.cacheText(this.labelField, this.labelField.text, {
            color: this.labelColors.disable
          });
          break;
      }
    }
  }

  /**
   * ボタンを押す
   * @param e
   */
  onPressButton = (e?: any): void => {
    const evt = e as createjs.MouseEvent;
    this.pressButton(evt);
  };

  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
  }

  /**
   * ボタンを離す
   * @param e
   */
  onReleaseButton = (e?: any): void => {
    const evt = e as createjs.MouseEvent;
    this.releaseButton(evt);
  };

  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;

    this.isPressed = false;

    this.selectButton(evt);
    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
  }

  /**
   * ボタンにマウスオーバーする
   * @param e
   */
  onOverButton = (e?: any): void => {
    const evt = e as createjs.MouseEvent;
    this.overButton(evt);
  };

  public overButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this._isOver = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
  }

  /**
   * ボタンからマウスアウトする
   * @param e
   */
  public onOutButton = (e?: any): void => {
    const evt = e as createjs.MouseEvent;
    this.outButton(evt);
  };

  public outButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this._isOver = false;
    this.isPressed = false;
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * ボタンを選択する
   * @param    evt
   */
  public selectButton(evt?: createjs.MouseEvent): void {
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * ボタンを非活性化する
   */
  public disableButton(): void {
    this.isDisable = true;
    this.disableMouseEvent();
    this.updateMaterialVisible(BasicButtonState.DISABLE);
  }

  /**
   * ボタンを活性化する
   */
  public enableButton(): void {
    this.isDisable = false;
    this.enableMouseEvent();
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * ボタンのイベントリスナを有効にする
   *   このメソッドではenableButton(),disableButton()と異なり
   *   表示状態の変更は行われません。
   */
  public enableMouseEvent(): void {
    this.mouseEnabled = true;
  }

  /**
   * ボタンのイベントリスナを無効にする
   *   このメソッドではenableButton(),disableButton()と異なり
   *   表示状態の変更は行われません。
   */
  public disableMouseEvent(): void {
    this.mouseEnabled = false;
  }

  /**
   * 現在のボタンの有効、無効状態を取得する
   * @return    ボタンが有効か否か
   */
  public checkActivity(): boolean {
    return !this.isDisable && this.mouseEnabled;
  }

  /**
   * 現在のボタンの状態を取得する
   * @return    定数STATE_*のいずれか
   */
  public getButtonState(): BasicButtonState {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else return BasicButtonState.NORMAL;
  }

  /**
   * ボタンの状態表示を更新する
   */
  public updateButtonDisplay(): void {
    if (this.isPressed) {
      this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
    }
  }

  public addLabel(
    x: number,
    y: number,
    label: string,
    font: string,
    color: BasicButtonLabelColorConfig,
    textAlign?: string
  ): void {
    color = BasicButtonLabelColorConfig.initLabelColorConfig(color);
    this.labelColors = color;
    this.labelField = new createjs.Text("", font, color.normal);
    this.labelField.x = x;
    this.labelField.y = y;
    if (textAlign) this.labelField.textAlign = textAlign;
    CreatejsCacheUtil.cacheText(this.labelField, label);
    this.addChild(this.labelField);
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
    if (this.labelField) {
      CreatejsCacheUtil.cacheText(this.labelField, value);
    }
  }

  get isOver(): boolean {
    return this._isOver;
  }

  get buttonValue(): any {
    return this._buttonValue;
  }
  set buttonValue(value: any) {
    if (this._buttonValue != value) {
      this._buttonValue = value;
    }
  }
}

/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 * ボタンのinitMaterial関数に渡す。
 */
export class BasicButtonMaterialConfig {
  normal!: DisplayObject;
  over?: DisplayObject;
  down?: DisplayObject;
  disable?: DisplayObject;
  selectNormal?: DisplayObject;
  selectOver?: DisplayObject;
  selectDown?: DisplayObject;
  selectMarker?: DisplayObject;
}

/**
 * テキストラベルの色についてのオプション。
 * 各ボタンのaddLabel関数でインスタンスに渡す。
 */
export class BasicButtonLabelColorConfig {
  normal!: string;
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
  public static initLabelColorConfig(
    config: BasicButtonLabelColorConfig
  ): BasicButtonLabelColorConfig {
    config.over = config.over || config.normal;
    config.down = config.down || config.normal;
    config.disable = config.disable || config.normal;
    config.selectNormal = config.selectNormal || config.normal;
    config.selectOver = config.selectOver || config.normal;
    config.selectDown = config.selectDown || config.normal;
    return config;
  }
}

/**
 * ボタン状態を表す定数
 */
export enum BasicButtonState {
  NORMAL = "normal",
  NORMAL_OVER = "normal_over",
  NORMAL_DOWN = "normal_down",
  DISABLE = "disable",
  SELECT = "select",
  SELECT_OVER = "select_over",
  SELECT_DOWN = "select_down"
}
