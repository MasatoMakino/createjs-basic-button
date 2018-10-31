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
  isDisable: boolean = false; //ボタンが使用不可状態か否か
  isPressed: boolean = false; //ボタンが押されているか否か
  protected _isOver: boolean = false; //マウスオーバーしているか否か

  protected _buttonValue: any = null; //このボタンに割り当てられた値
  protected material!: ButtonMaterialSet; //状態マテリアル 状態によって表示が切り替わるもの。

  /*ボタンラベル*/
  protected _labelField!: createjs.Text; //ラベル表示用のテキストフィールド
  protected _label!: string; //ラベルの内容
  protected labelColors!: ButtonLabelColorSet;

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
    this.mouseChildren = false;
    this.cursor = "pointer";
    this.setMouseEvents();
    this.addEventListener(
      "added",
      (e: any): void => {
        if (!this.stage) return;

        e.remove();
        if ((<any>this.stage)._mouseOverIntervalID != null) return;
        console.warn(
          "BasicButton : stageはmouseoverイベントを処理していません。" +
            "そのためボタンのマウスオーバー処理が正常に働いていません。" +
            "stage.enableMouseOver()を実行してからボタンを配置してください。"
        );
      }
    );
  }

  /**
   * ボタンに対するマウスハンドリングを開始する。
   */
  private setMouseEvents(): void {
    this.addEventListener("mousedown", this.onPressButton);
    this.addEventListener("pressup", this.onReleaseButton);
    this.addEventListener("rollover", this.onOverButton);
    this.addEventListener("mouseout", this.onOutButton);
  }

  /**
   * ボタンに状態マテリアルを設定する。
   * @param {ButtonMaterialSet} materials
   */
  public initMaterial(materials: ButtonMaterialSet): void {
    this.material = materials;
    ButtonMaterialSet.addChild(this, materials);
    this.updateMaterialVisible(this.getButtonState());

    //テキストラベルがあったら最前線に。
    if (this._labelField) {
      this.removeChild(this._labelField);
      this.addChild(this._labelField);
    }
  }

  protected updateMaterialVisible(type: BasicButtonState) {
    ButtonMaterialSet.updateVisible(this.material, type);
    ButtonLabelColorSet.update(this._labelField, this.labelColors, type);
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

    const state = this._isOver
      ? BasicButtonState.NORMAL_OVER
      : BasicButtonState.NORMAL;
    this.updateMaterialVisible(state);
  }

  /**
   * ボタンにマウスオーバーする
   * @param e
   */
  public onOverButton = (e?: any): void => {
    const evt = e as createjs.MouseEvent;
    this.overButton(evt);
  };

  public overButton(evt?: createjs.MouseEvent): void {
    this._isOver = true;

    if (!this.checkActivity()) return;
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

  /**
   * ボタンからマウスアウトした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  public outButton(evt?: createjs.MouseEvent): void {
    this._isOver = false;
    this.isPressed = false;

    if (!this.checkActivity()) return;
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
   * ボタンラベルを初期化する。
   * @param {number} x ラベル位置
   * @param {number} y ラベル位置
   * @param {string} label ラベルに表示する文言
   * @param {string} font フォント設定 createjs.Textのfont指定に準じる。
   * @param {ButtonLabelColorSet} color
   * @param {string} textAlign
   */
  public addLabel(
    x: number,
    y: number,
    label: string,
    font: string,
    color: ButtonLabelColorSet,
    textAlign?: string
  ): void {
    this.labelColors = color;
    this._labelField = new createjs.Text("", font, color.normal);
    this._labelField.x = x;
    this._labelField.y = y;
    if (textAlign) this._labelField.textAlign = textAlign;
    CreatejsCacheUtil.cacheText(this._labelField, label);
    this.addChild(this._labelField);
  }

  /**
   * ボタンラベルに表示されている文言を取得する。
   * @returns {string}
   */
  get label(): string {
    return this._label;
  }

  /**
   * ボタンラベルの文言を更新する。
   * @param {string} value
   */
  set label(value: string) {
    this._label = value;
    if (this._labelField) {
      CreatejsCacheUtil.cacheText(this._labelField, value);
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
export class ButtonMaterialSet {
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
   * @param {ButtonMaterialSet} material
   */
  public static addChild(
    button: BasicClickButton,
    material: ButtonMaterialSet
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
   * @param {ButtonMaterialSet} material
   * @param {BasicButtonState} state
   */
  public static updateVisible(
    material: ButtonMaterialSet,
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
   * @param {ButtonMaterialSet} material
   */
  private static invisibleAll(material: ButtonMaterialSet): void {
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
   * @param {ButtonMaterialSet} material
   * @param {BasicButtonState} state
   * @returns {createjs.DisplayObject}
   */
  private static getMaterial(
    material: ButtonMaterialSet,
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
export class ButtonLabelColorSet {
  normal!: string;
  over?: string;
  down?: string;
  disable?: string;
  selectNormal?: string;
  selectOver?: string;
  selectDown?: string;

  public static update(
    field: Text,
    colors: ButtonLabelColorSet,
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
