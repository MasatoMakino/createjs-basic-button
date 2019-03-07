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
  protected isDisable: boolean = false; //ボタンが使用不可状態か否か
  protected isPressed: boolean = false; //ボタンが押されているか否か
  protected isOver: boolean = false; //マウスオーバーしているか否か

  protected _buttonValue: any = null; //このボタンに割り当てられた値
  protected material!: ButtonMaterialSet; //状態マテリアル 状態によって表示が切り替わるもの。

  /*ボタンラベル*/
  protected _labelField: createjs.Text[] = []; //ラベル表示用のテキストフィールド
  protected labelColors: ButtonLabelColorSet[] = []; //ラベルの色のセット。各状態のラベルの文字色を格納する。

  /**
   * コンストラクタ
   * @param {ButtonMaterialSet} materials 状態セット
   */
  constructor(materials?: ButtonMaterialSet) {
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

    if (materials) this.initMaterial(materials);
  }

  /**
   * ボタンに対するマウスハンドリングを開始する。
   */
  private setMouseEvents(): void {
    this.addEventListener("mousedown", (e: any) => {
      this.pressButton(e as createjs.MouseEvent);
    });
    this.addEventListener("pressup", (e: any) => {
      this.releaseButton(e as createjs.MouseEvent);
    });
    this.addEventListener("rollover", (e: any) => {
      this.overButton(e as createjs.MouseEvent);
    });
    this.addEventListener("mouseout", (e: any) => {
      this.outButton(e as createjs.MouseEvent);
    });
  }

  /**
   * ボタンに状態マテリアルを設定する。
   * @param {ButtonMaterialSet} materials
   */
  public initMaterial(materials: ButtonMaterialSet): void {
    //すでにmaterialが設定済みの場合、以前のマテリアルを削除する。
    if (this.material) {
      ButtonMaterialSet.remove(this.material);
      this.material = null;
    }

    this.material = materials;
    ButtonMaterialSet.addChild(this, materials);
    this.updateMaterialVisible(this.getButtonState());

    //テキストラベルがあったら最前線に。
    this._labelField.forEach(label => {
      this.removeChild(label);
      this.addChild(label);
    });
  }

  /**
   * 状態表示およびラベル文字色を、状態に応じて更新する。
   * @param {BasicButtonState} state
   */
  protected updateMaterialVisible(state: BasicButtonState) {
    ButtonMaterialSet.updateVisible(this.material, state);
    this._labelField.forEach((label, index) => {
      ButtonLabelColorSet.update(label, this.labelColors[index], state);
    });
  }

  /**
   * ボタン上でマウスダウンした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  public pressButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
  }

  /**
   * ボタン上でマウスアップした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  public releaseButton(evt?: createjs.MouseEvent): void {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;

    this.isPressed = false;

    const state = this.isOver
      ? BasicButtonState.NORMAL_OVER
      : BasicButtonState.NORMAL;
    this.updateMaterialVisible(state);
  }

  /**
   * ボタンにマウスオーバーした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  public overButton(evt?: createjs.MouseEvent): void {
    this.isOver = true;

    if (!this.checkActivity()) return;
    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
  }

  /**
   * ボタンからマウスアウトした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  public outButton(evt?: createjs.MouseEvent): void {
    this.isOver = false;
    this.isPressed = false;

    if (!this.checkActivity()) return;
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * ボタンを非活性化する
   */
  public disableButton(): void {
    this.isDisable = true;
    this.mouseEnabled = false;
    this.updateMaterialVisible(BasicButtonState.DISABLE);
  }

  /**
   * ボタンを活性化する
   */
  public enableButton(): void {
    this.isDisable = false;
    this.mouseEnabled = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }

  /**
   * 現在のボタンの有効、無効状態を取得する
   * @return    ボタンが有効か否か
   */
  protected checkActivity(): boolean {
    return !this.isDisable && this.mouseEnabled;
  }

  /**
   * 現在のボタンの状態を取得する
   * @returns {BasicButtonState}
   */
  public getButtonState(): BasicButtonState {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else return BasicButtonState.NORMAL;
  }

  /**
   * ボタンラベルを追加する。
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
    this.labelColors.push(color);
    const field = new createjs.Text("", font, color.normal);
    this._labelField.push(field);
    field.x = x;
    field.y = y;
    if (textAlign) field.textAlign = textAlign;
    field.textBaseline = "alphabetic";
    field.mouseEnabled = false;
    CreatejsCacheUtil.cacheText(field, label);
    this.addChild(field);
  }

  /**
   * ボタンラベルに表示されている文言を取得する。
   * @returns {string}
   */
  public getLabel(index): string | null {
    if (!this._labelField) return null;
    return this._labelField[index].text;
  }

  /**
   * ボタンラベルの文言を更新する。
   * @param {string} value
   */
  public setLabel(index: number, value: string) {
    if (this._labelField.length === 0) {
      console.warn(
        "BasicButton : " +
          "ボタンラベルが初期化されていませんが、ラベルの文言が指定されました。" +
          "文言を指定する前にラベルの初期化をaddLabel関数で行ってください。"
      );
      return;
    }
    CreatejsCacheUtil.cacheText(this._labelField[index], value);
  }

  public getLabelField(index: number): Text {
    return this._labelField[index];
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
    this.remove(material);
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat != null) button.addChild(mat);
    }
  }

  /**
   * この状態セットに含まれるパーツを表示ツリー上から削除する。
   * @param {ButtonMaterialSet} material
   */
  public static remove(material: ButtonMaterialSet): void {
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat && mat.parent) mat.parent.removeChild(mat);
    }
  }

  /**
   * 全ての表示パーツを配列として取得する。
   * @param {ButtonMaterialSet} materials
   * @returns {createjs.DisplayObject[]}
   */
  private static getMaterialArray(
    materials: ButtonMaterialSet
  ): DisplayObject[] {
    return [
      materials.normal,
      materials.over,
      materials.down,
      materials.disable,
      materials.selectNormal,
      materials.selectOver,
      materials.selectDown,
      materials.selectMarker
    ];
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
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat != null) mat.visible = false;
    }
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
        return material.disable || material.normal;
      case BasicButtonState.NORMAL_OVER:
        return material.over || material.normal;
      case BasicButtonState.NORMAL_DOWN:
        return material.down || material.normal;
      case BasicButtonState.SELECT:
        return material.selectNormal || material.normal;
      case BasicButtonState.SELECT_OVER:
        return material.selectOver || material.normal;
      case BasicButtonState.SELECT_DOWN:
        return material.selectDown || material.normal;
      default:
        return material.normal;
    }
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

  /**
   * ラベル文字色をボタン状態に応じて更新する。
   * @param {createjs.Text} field 更新対象ラベル
   * @param {ButtonLabelColorSet} colors 状態文字色セット
   * @param {BasicButtonState} state ボタン状態
   */
  public static update(
    field: Text,
    colors: ButtonLabelColorSet,
    state: BasicButtonState
  ): void {
    if (field == null) return;

    const option = {
      color: this.getColor(colors, state)
    };
    CreatejsCacheUtil.cacheText(field, field.text, option);
  }

  /**
   * 状態に対応した文字色を取り出す。
   * @param {ButtonLabelColorSet} colors
   * @param {BasicButtonState} state
   * @returns {string}
   */
  private static getColor(
    colors: ButtonLabelColorSet,
    state: BasicButtonState
  ): string {
    switch (state) {
      case BasicButtonState.NORMAL_DOWN:
        return colors.down || colors.normal;
      case BasicButtonState.NORMAL_OVER:
        return colors.over || colors.normal;
      case BasicButtonState.DISABLE:
        return colors.disable || colors.normal;
      case BasicButtonState.SELECT:
        return colors.selectNormal || colors.normal;
      case BasicButtonState.SELECT_DOWN:
        return colors.selectDown || colors.normal;
      case BasicButtonState.SELECT_OVER:
        return colors.selectOver || colors.normal;
      default:
        return colors.normal;
    }
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
