import DisplayObject = createjs.DisplayObject;
import { CreatejsCacheUtil } from "createjs-cache-util";
import Text = createjs.Text;

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
  protected material!: BasicButtonMaterialConfig;

  //ボタンラベル
  protected labelField!: createjs.Text; //ラベル表示用のテキストフィールド
  protected _label!: string; //ラベルの内容
  protected labelColors!: BasicButtonLabelColorConfig;

  /**
   * コンストラクタ
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
    this.material = materials;
    BasicButtonMaterialConfig.addChild(this, materials);
    this.updateMaterialVisible(this.getButtonState());

    //テキストラベルがあったら最前線に。
    if (this.labelField) {
      this.removeChild(this.labelField);
      this.addChild(this.labelField);
    }
  }

  protected updateMaterialVisible(type: BasicButtonState) {
    BasicButtonMaterialConfig.updateVisible(this.material, type);
    BasicButtonLabelColorConfig.update(this.labelField, this.labelColors, type);
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

  /**
   * ボタン上に状態パーツを配置する
   * @param {BasicClickButton} button
   * @param {BasicButtonMaterialConfig} material
   */
  public static addChild(
    button: BasicClickButton,
    material: BasicButtonMaterialConfig
  ): void {
    const materials = [
      material.normal,
      material.over,
      material.down,
      material.disable,
      material.selectNormal,
      material.selectOver,
      material.selectDown,
      material.selectMarker
    ];

    for (let mat of materials) {
      if (mat == null) continue;
      if (mat.parent) mat.parent.removeChild(mat);
      button.addChild(mat);
    }
  }

  /**
   * 可視状態をstateに合わせて更新する
   * @param {BasicButtonMaterialConfig} material
   * @param {BasicButtonState} state
   */
  public static updateVisible(
    material: BasicButtonMaterialConfig,
    state: BasicButtonState
  ): void {
    this.invisibleAll(material);
    this.getMaterial(material, state).visible = true;

    if (material.selectMarker) {
      const isSelect =
        state === BasicButtonState.SELECT ||
        state === BasicButtonState.SELECT_OVER ||
        state === BasicButtonState.SELECT_DOWN;
      material.selectMarker.visible = isSelect;
    }
  }

  /**
   * 全てのパーツを不可視にする。
   * @param {BasicButtonMaterialConfig} material
   */
  private static invisibleAll(material: BasicButtonMaterialConfig): void {
    material.normal.visible = false;
    if (material.over) material.over.visible = false;
    if (material.down) material.down.visible = false;
    if (material.disable) material.disable.visible = false;
    if (material.selectNormal) material.selectNormal.visible = false;
    if (material.selectOver) material.selectOver.visible = false;
    if (material.selectDown) material.selectDown.visible = false;
    if (material.selectMarker) material.selectMarker.visible = false;
  }

  /**
   * stateに対応する状態パーツを取り出す
   * @param {BasicButtonMaterialConfig} material
   * @param {BasicButtonState} state
   * @returns {createjs.DisplayObject}
   */
  private static getMaterial(
    material: BasicButtonMaterialConfig,
    state: BasicButtonState
  ): DisplayObject {
    switch (state) {
      case BasicButtonState.DISABLE:
        if (material.disable) return material.disable;
        break;
      case BasicButtonState.NORMAL_OVER:
        if (material.over) return material.over;
        break;
      case BasicButtonState.NORMAL_DOWN:
        if (material.down) return material.down;
        break;
      case BasicButtonState.SELECT:
        if (material.selectNormal) return material.selectNormal;
        break;
      case BasicButtonState.SELECT_OVER:
        if (material.selectOver) return material.selectOver;
        break;
      case BasicButtonState.SELECT_DOWN:
        if (material.selectDown) return material.selectDown;
        break;
    }
    return material.normal;
  }
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

  public static update(
    field: Text,
    colors: BasicButtonLabelColorConfig,
    state: BasicButtonState
  ): void {
    if (field == null) return;

    const option = {
      color: colors.normal
    };

    switch (state) {
      case BasicButtonState.NORMAL_DOWN:
        option.color = colors.down || colors.normal;
        break;
      case BasicButtonState.NORMAL_OVER:
        option.color = colors.over || colors.normal;
        break;
      case BasicButtonState.DISABLE:
        option.color = colors.disable || colors.normal;
        break;
      case BasicButtonState.SELECT:
        option.color = colors.selectNormal || colors.normal;
        break;
      case BasicButtonState.SELECT_DOWN:
        option.color = colors.selectDown || colors.normal;
        break;
      case BasicButtonState.SELECT_OVER:
        option.color = colors.selectOver || colors.normal;
        break;
    }

    CreatejsCacheUtil.cacheText(field, field.text, option);
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
