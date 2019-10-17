import { CreatejsCacheUtil } from "createjs-cache-util";
import { BasicButtonState } from "./BasicButtonState";
import { ButtonMaterialSet, ButtonLabelColorSet } from "./ButtonMaterialSet";
var Shape = createjs.Shape;
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */
export class BasicClickButton extends createjs.Container {
    /**
     * コンストラクタ
     * @param {ButtonMaterialSet} materials 状態セット
     */
    constructor(materials) {
        super();
        this.isDisable = false; //ボタンが使用不可状態か否か
        this.isPressed = false; //ボタンが押されているか否か
        this.isOver = false; //マウスオーバーしているか否か
        /**
         * ボタンの凍結状態。
         * trueに設定すると、ボタンの状態と外見を維持したまま、マウス操作を無視する。
         */
        this._frozen = false;
        this._buttonValue = null; //このボタンに割り当てられた値
        /*ボタンラベル*/
        this._labelField = []; //ラベル表示用のテキストフィールド
        this.labelColors = []; //ラベルの色のセット。各状態のラベルの文字色を格納する。
        //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
        this.mouseChildren = false;
        this.cursor = "pointer";
        this.setMouseEvents();
        this.addEventListener("added", (e) => {
            if (!this.stage)
                return;
            e.remove();
            if (this.stage._mouseOverIntervalID != null)
                return;
            console.warn("BasicButton : stageはmouseoverイベントを処理していません。" +
                "そのためボタンのマウスオーバー処理が正常に働いていません。" +
                "stage.enableMouseOver()を実行してからボタンを配置してください。");
        });
        if (materials)
            this.initMaterial(materials);
    }
    /**
     * ボタンに対するマウスハンドリングを開始する。
     */
    setMouseEvents() {
        this.addEventListener("mousedown", (e) => {
            this.pressButton(e);
        });
        this.addEventListener("pressup", (e) => {
            this.releaseButton(e);
        });
        this.addEventListener("rollover", (e) => {
            this.overButton(e);
        });
        this.addEventListener("mouseout", (e) => {
            this.outButton(e);
        });
    }
    /**
     * ボタンに状態マテリアルを設定する。
     * @param {ButtonMaterialSet} materials
     */
    initMaterial(materials) {
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
    updateMaterialVisible(state) {
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
    pressButton(evt) {
        if (!this.checkActivity())
            return;
        this.isPressed = true;
        this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
    }
    /**
     * ボタン上でマウスアップした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
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
    overButton(evt) {
        this.isOver = true;
        if (!this.checkActivity())
            return;
        this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
    }
    /**
     * ボタンからマウスアウトした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
    outButton(evt) {
        this.isOver = false;
        this.isPressed = false;
        if (!this.checkActivity())
            return;
        this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * ボタンを非活性化する
     */
    disableButton() {
        this.isDisable = true;
        this.updateMouseEnabled();
        this.updateMaterialVisible(BasicButtonState.DISABLE);
    }
    /**
     * ボタンを活性化する
     */
    enableButton() {
        this.isDisable = false;
        this.updateMouseEnabled();
        this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    get frozen() {
        return this._frozen;
    }
    set frozen(value) {
        this._frozen = value;
        this.updateMouseEnabled();
        console.log(this.isDisable, this._frozen, this.mouseEnabled);
    }
    updateMouseEnabled() {
        this.mouseEnabled = !this.isDisable && !this._frozen;
    }
    /**
     * 現在のボタンの有効、無効状態を取得する
     * @return    ボタンが有効か否か
     */
    checkActivity() {
        return !this.isDisable && !this._frozen && this.mouseEnabled;
    }
    /**
     * 現在のボタンの状態を取得する
     * @returns {BasicButtonState}
     */
    getButtonState() {
        if (this.isDisable)
            return BasicButtonState.DISABLE;
        else
            return BasicButtonState.NORMAL;
    }
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
    addLabel(x, y, label, font, color, textAlign) {
        this.labelColors.push(color);
        const field = new createjs.Text("", font, color.normal);
        this._labelField.push(field);
        field.x = x;
        field.y = y;
        if (textAlign)
            field.textAlign = textAlign;
        field.textBaseline = "alphabetic";
        field.mouseEnabled = false;
        CreatejsCacheUtil.cacheText(field, label);
        this.addChild(field);
        return this._labelField.indexOf(field);
    }
    /**
     * ボタンラベルに表示されている文言を取得する。
     * @returns {string}
     */
    getLabel(index) {
        if (!this._labelField)
            return null;
        return this._labelField[index].text;
    }
    /**
     * ボタンラベルの文言を更新する。
     * @param index
     * @param value
     */
    setLabel(index, value) {
        if (this._labelField.length === 0) {
            console.warn("BasicButton : " +
                "ボタンラベルが初期化されていませんが、ラベルの文言が指定されました。" +
                "文言を指定する前にラベルの初期化をaddLabel関数で行ってください。");
            return;
        }
        CreatejsCacheUtil.cacheText(this._labelField[index], value);
    }
    getLabelField(index) {
        return this._labelField[index];
    }
    get buttonValue() {
        return this._buttonValue;
    }
    set buttonValue(value) {
        if (this._buttonValue != value) {
            this._buttonValue = value;
        }
    }
    /**
     * 当たり判定の矩形を指定する。
     * @param x
     * @param y
     * @param w
     * @param h
     */
    initHitRect(x, y, w, h) {
        const area = new Shape();
        area.graphics
            .beginFill("#000")
            .drawRect(x, y, w, h)
            .endFill();
        this.hitArea = area;
    }
}
