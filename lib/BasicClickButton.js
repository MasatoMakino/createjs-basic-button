"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicClickButton = void 0;
var createjs_cache_util_1 = require("createjs-cache-util");
var BasicButtonState_1 = require("./BasicButtonState");
var ButtonMaterialSet_1 = require("./ButtonMaterialSet");
var Shape = createjs.Shape;
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */
var BasicClickButton = /** @class */ (function (_super) {
  __extends(BasicClickButton, _super);
  /**
   * コンストラクタ
   * @param {ButtonMaterialSet} materials 状態セット
   */
  function BasicClickButton(materials) {
    var _this = _super.call(this) || this;
    _this.isDisable = false; //ボタンが使用不可状態か否か
    _this.isPressed = false; //ボタンが押されているか否か
    _this.isOver = false; //マウスオーバーしているか否か
    /**
     * ボタンの凍結状態。
     * trueに設定すると、ボタンの状態と外見を維持したまま、マウス操作を無視する。
     */
    _this._frozen = false;
    _this._buttonValue = null; //このボタンに割り当てられた値
    /*ボタンラベル*/
    _this._labelField = []; //ラベル表示用のテキストフィールド
    _this.labelColors = []; //ラベルの色のセット。各状態のラベルの文字色を格納する。
    //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
    _this.mouseChildren = false;
    _this.cursor = "pointer";
    _this.setMouseEvents();
    _this.addEventListener("added", function (e) {
      if (!_this.stage) return;
      e.remove();
      if (_this.stage._mouseOverIntervalID != null) return;
      console.warn(
        "BasicButton : stageはmouseoverイベントを処理していません。" +
          "そのためボタンのマウスオーバー処理が正常に働いていません。" +
          "stage.enableMouseOver()を実行してからボタンを配置してください。"
      );
    });
    if (materials) _this.initMaterial(materials);
    return _this;
  }
  /**
   * ボタンに対するマウスハンドリングを開始する。
   */
  BasicClickButton.prototype.setMouseEvents = function () {
    var _this = this;
    this.addEventListener("mousedown", function (e) {
      _this.pressButton(e);
    });
    this.addEventListener("pressup", function (e) {
      _this.releaseButton(e);
    });
    this.addEventListener("rollover", function (e) {
      _this.overButton(e);
    });
    this.addEventListener("mouseout", function (e) {
      _this.outButton(e);
    });
  };
  /**
   * ボタンに状態マテリアルを設定する。
   * @param {ButtonMaterialSet} materials
   */
  BasicClickButton.prototype.initMaterial = function (materials) {
    var _this = this;
    //すでにmaterialが設定済みの場合、以前のマテリアルを削除する。
    if (this.material) {
      ButtonMaterialSet_1.ButtonMaterialSet.remove(this.material);
      this.material = null;
    }
    this.material = materials;
    ButtonMaterialSet_1.ButtonMaterialSet.addChild(this, materials);
    this.updateMaterialVisible(this.getButtonState());
    //テキストラベルがあったら最前線に。
    this._labelField.forEach(function (label) {
      _this.removeChild(label);
      _this.addChild(label);
    });
  };
  /**
   * 状態表示およびラベル文字色を、状態に応じて更新する。
   * @param {BasicButtonState} state
   */
  BasicClickButton.prototype.updateMaterialVisible = function (state) {
    var _this = this;
    ButtonMaterialSet_1.ButtonMaterialSet.updateVisible(this.material, state);
    this._labelField.forEach(function (label, index) {
      ButtonMaterialSet_1.ButtonLabelColorSet.update(
        label,
        _this.labelColors[index],
        state
      );
    });
  };
  /**
   * ボタン上でマウスダウンした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  BasicClickButton.prototype.pressButton = function (evt) {
    if (!this.checkActivity()) return;
    this.isPressed = true;
    this.updateMaterialVisible(BasicButtonState_1.BasicButtonState.NORMAL_DOWN);
  };
  /**
   * ボタン上でマウスアップした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  BasicClickButton.prototype.releaseButton = function (evt) {
    if (!this.checkActivity()) return;
    if (!this.isPressed) return;
    this.isPressed = false;
    var state = this.isOver
      ? BasicButtonState_1.BasicButtonState.NORMAL_OVER
      : BasicButtonState_1.BasicButtonState.NORMAL;
    this.updateMaterialVisible(state);
  };
  /**
   * ボタンにマウスオーバーした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  BasicClickButton.prototype.overButton = function (evt) {
    this.isOver = true;
    if (!this.checkActivity()) return;
    this.updateMaterialVisible(BasicButtonState_1.BasicButtonState.NORMAL_OVER);
  };
  /**
   * ボタンからマウスアウトした際の処理。
   * 状態と表示を更新する。
   * @param {createjs.MouseEvent} evt
   */
  BasicClickButton.prototype.outButton = function (evt) {
    this.isOver = false;
    this.isPressed = false;
    if (!this.checkActivity()) return;
    this.updateMaterialVisible(BasicButtonState_1.BasicButtonState.NORMAL);
  };
  /**
   * ボタンを非活性化する
   */
  BasicClickButton.prototype.disableButton = function () {
    this.isDisable = true;
    this.updateMouseEnabled();
    this.updateMaterialVisible(BasicButtonState_1.BasicButtonState.DISABLE);
  };
  /**
   * ボタンを活性化する
   */
  BasicClickButton.prototype.enableButton = function () {
    this.isDisable = false;
    this.updateMouseEnabled();
    this.updateMaterialVisible(BasicButtonState_1.BasicButtonState.NORMAL);
  };
  Object.defineProperty(BasicClickButton.prototype, "frozen", {
    get: function () {
      return this._frozen;
    },
    set: function (value) {
      this._frozen = value;
      this.updateMouseEnabled();
    },
    enumerable: false,
    configurable: true,
  });
  BasicClickButton.prototype.updateMouseEnabled = function () {
    this.mouseEnabled = !this.isDisable && !this._frozen;
  };
  /**
   * 現在のボタンの有効、無効状態を取得する
   * @return    ボタンが有効か否か
   */
  BasicClickButton.prototype.checkActivity = function () {
    return !this.isDisable && !this._frozen && this.mouseEnabled;
  };
  /**
   * 現在のボタンの状態を取得する
   * @returns {BasicButtonState}
   */
  BasicClickButton.prototype.getButtonState = function () {
    if (this.isDisable) return BasicButtonState_1.BasicButtonState.DISABLE;
    else return BasicButtonState_1.BasicButtonState.NORMAL;
  };
  /**
   * ボタンラベルを追加する。
   * @param x ラベル位置
   * @param y ラベル位置
   * @param label ラベルに表示する文言
   * @param font フォント設定 createjs.Textのfont指定に準じる。
   * @param color
   * @param textAlign
   * @return テキストフィールドのインデックス値
   */
  BasicClickButton.prototype.addLabel = function (
    x,
    y,
    label,
    font,
    color,
    textAlign
  ) {
    this.labelColors.push(color);
    var field = new createjs.Text("", font, color.normal);
    this._labelField.push(field);
    field.x = x;
    field.y = y;
    if (textAlign) field.textAlign = textAlign;
    field.textBaseline = "alphabetic";
    field.mouseEnabled = false;
    createjs_cache_util_1.CreatejsCacheUtil.cacheText(field, label);
    this.addChild(field);
    return this._labelField.indexOf(field);
  };
  /**
   * ボタンラベルに表示されている文言を取得する。
   * @returns {string}
   */
  BasicClickButton.prototype.getLabel = function (index) {
    if (!this._labelField) return null;
    return this._labelField[index].text;
  };
  /**
   * ボタンラベルの文言を更新する。
   * @param index
   * @param value
   */
  BasicClickButton.prototype.setLabel = function (index, value) {
    if (this._labelField.length === 0) {
      console.warn(
        "BasicButton : " +
          "ボタンラベルが初期化されていませんが、ラベルの文言が指定されました。" +
          "文言を指定する前にラベルの初期化をaddLabel関数で行ってください。"
      );
      return;
    }
    createjs_cache_util_1.CreatejsCacheUtil.cacheText(
      this._labelField[index],
      value
    );
  };
  BasicClickButton.prototype.getLabelField = function (index) {
    return this._labelField[index];
  };
  Object.defineProperty(BasicClickButton.prototype, "buttonValue", {
    get: function () {
      return this._buttonValue;
    },
    set: function (value) {
      if (this._buttonValue != value) {
        this._buttonValue = value;
      }
    },
    enumerable: false,
    configurable: true,
  });
  /**
   * 当たり判定の矩形を指定する。
   * @param x
   * @param y
   * @param w
   * @param h
   */
  BasicClickButton.prototype.initHitRect = function (x, y, w, h) {
    var area = new Shape();
    area.graphics.beginFill("#000").drawRect(x, y, w, h).endFill();
    this.hitArea = area;
  };
  return BasicClickButton;
})(createjs.Container);
exports.BasicClickButton = BasicClickButton;
