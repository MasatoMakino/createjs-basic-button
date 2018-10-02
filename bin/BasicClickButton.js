var Container = createjs.Container;
import { CreatejsCacheUtil } from "createjs-cache-util";
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
export class BasicClickButton extends createjs.Container {
  //--------------------
  //	メソッド
  //--------------------
  /**
   * コンストラクタ
   * @since    2008/06/12 12:15
   */
  constructor() {
    super();
    this._buttonValue = null; //このボタンに割り当てられた値
    /**
     * ボタンを押す
     * @param    evt
     */
    this.onPressButton = e => {
      const evt = e;
      this.pressButton(evt);
    };
    /**
     * ボタンを離す
     * @param    evt
     */
    this.onReleaseButton = e => {
      const evt = e;
      this.releaseButton(evt);
    };
    /**
     * ボタンにマウスオーバーする
     * @param    evt
     */
    this.onOverButton = e => {
      const evt = e;
      this.overButton(evt);
    };
    /**
     * ボタンからマウスアウトする
     * @param    evt
     */
    this.onOutButton = e => {
      const evt = e;
      this.outButton(evt);
    };
    this.isDisable = false;
    this.isPressed = false;
    this._isOver = false;
    //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
    this.mouseChildren = false;
    this.cursor = "pointer";
    this.setMouseEvents();
  }
  setMouseEvents() {
    this.addEventListener("mousedown", this.onPressButton);
    this.addEventListener("pressup", this.onReleaseButton);
    this.addEventListener("rollover", this.onOverButton);
    this.addEventListener("mouseout", this.onOutButton);
  }
  initMaterial(materials) {
    const cloneMaterial = mat => {
      if (mat instanceof Container) return mat.clone(true);
      return mat.clone();
    };
    this._normalMaterial = materials.normal;
    this._overMaterial = materials.over || cloneMaterial(materials.normal);
    this._downMaterial = materials.down || cloneMaterial(materials.normal);
    this._disableMaterial =
      materials.disable || cloneMaterial(materials.normal);
    let materialArray = [
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
  updateMaterialVisible(type) {
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
  pressButton(evt) {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
  }
  releaseButton(evt) {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;
    this.isPressed = false;
    this.selectButton(evt);
    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
  }
  overButton(evt) {
    if (!this.checkActivity()) return;
    this._isOver = true;
    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
  }
  outButton(evt) {
    if (!this.checkActivity()) return;
    this._isOver = false;
    this.isPressed = false;
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }
  /**
   * ボタンを選択する
   * @param    evt
   */
  selectButton(evt) {
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }
  /**
   * ボタンを非活性化する
   */
  disableButton() {
    this.isDisable = true;
    this.disableMouseEvent();
    this.updateMaterialVisible(BasicButtonState.DISABLE);
  }
  /**
   * ボタンを活性化する
   */
  enableButton() {
    this.isDisable = false;
    this.enableMouseEvent();
    this.updateMaterialVisible(BasicButtonState.NORMAL);
  }
  /**
   * ボタンのイベントリスナを有効にする
   *
   *        このメソッドではenableButton(),disableButton()と異なり
   *        表示状態の変更は行われません。
   */
  enableMouseEvent() {
    this.mouseEnabled = true;
  }
  /**
   * ボタンのイベントリスナを無効にする
   *
   *        このメソッドではenableButton(),disableButton()と異なり
   *        表示状態の変更は行われません。
   */
  disableMouseEvent() {
    this.mouseEnabled = false;
  }
  /**
   * 現在のボタンの有効、無効状態を取得する
   * @return    ボタンが有効か否か
   */
  checkActivity() {
    const activity = !this.isDisable && this.mouseEnabled;
    return activity;
  }
  /**
   * 現在のボタンの状態を取得する
   * @return    定数STATE_*のいずれか
   */
  getButtonState() {
    if (this.isDisable) return BasicButtonState.DISABLE;
    else return BasicButtonState.NORMAL;
  }
  /**
   * ボタンの状態表示を更新する
   */
  updateButtonDisplay() {
    if (this.isPressed) {
      this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
    }
  }
  ///////////////////////////
  //	getter / setter
  ///////////////////////////
  addLabel(x, y, label, font, color, textAlign) {
    color = BasicButtonLabelColorConfig.initLabelColorConfig(color);
    this.labelColors = color;
    this.labelField = new createjs.Text("", font, color.normal);
    this.labelField.x = x;
    this.labelField.y = y;
    if (textAlign) this.labelField.textAlign = textAlign;
    CreatejsCacheUtil.cacheText(this.labelField, label);
    this.addChild(this.labelField);
  }
  get label() {
    return this._label;
  }
  set label(value) {
    this._label = value;
    if (this.labelField) {
      CreatejsCacheUtil.cacheText(this.labelField, value);
    }
  }
  get isOver() {
    return this._isOver;
  }
  get buttonValue() {
    return this._buttonValue;
  }
  set buttonValue(value) {
    if (this._buttonValue != value) {
      this._buttonValue = value;
    }
  }
}
export class BasicButtonMaterialConfig {}
export class BasicButtonLabelColorConfig {
  /**
   * 不足している初期値を補う
   * @param {ui.button.BasicButtonLabelColorConfig} config
   * @returns {ui.button.BasicButtonLabelColorConfig}
   */
  static initLabelColorConfig(config) {
    config.over = config.over || config.normal;
    config.down = config.down || config.normal;
    config.disable = config.disable || config.normal;
    config.selectNormal = config.selectNormal || config.normal;
    config.selectOver = config.selectOver || config.normal;
    config.selectDown = config.selectDown || config.normal;
    return config;
  }
}
export var BasicButtonState;
(function(BasicButtonState) {
  //ボタンの状態を表す定数
  BasicButtonState["NORMAL"] = "normal";
  BasicButtonState["NORMAL_OVER"] = "normal_over";
  BasicButtonState["NORMAL_DOWN"] = "normal_down";
  BasicButtonState["DISABLE"] = "disable";
  BasicButtonState["SELECT"] = "select";
  BasicButtonState["SELECT_OVER"] = "select_over";
  BasicButtonState["SELECT_DOWN"] = "select_down";
})(BasicButtonState || (BasicButtonState = {}));
