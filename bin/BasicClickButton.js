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
    /**
     * コンストラクタ
     * @param {ButtonMaterialSet} materials 状態セット
     */
    constructor(materials) {
        super();
        this.isDisable = false; //ボタンが使用不可状態か否か
        this.isPressed = false; //ボタンが押されているか否か
        this._isOver = false; //マウスオーバーしているか否か
        this._buttonValue = null; //このボタンに割り当てられた値
        /**
         * ボタンを押す
         * @param e
         */
        this.onPressButton = (e) => {
            const evt = e;
            this.pressButton(evt);
        };
        /**
         * ボタンを離す
         * @param e
         */
        this.onReleaseButton = (e) => {
            const evt = e;
            this.releaseButton(evt);
        };
        /**
         * ボタンにマウスオーバーする
         * @param e
         */
        this.onOverButton = (e) => {
            const evt = e;
            this.overButton(evt);
        };
        /**
         * ボタンからマウスアウトする
         * @param e
         */
        this.onOutButton = (e) => {
            const evt = e;
            this.outButton(evt);
        };
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
        this.addEventListener("mousedown", this.onPressButton);
        this.addEventListener("pressup", this.onReleaseButton);
        this.addEventListener("rollover", this.onOverButton);
        this.addEventListener("mouseout", this.onOutButton);
    }
    /**
     * ボタンに状態マテリアルを設定する。
     * @param {ButtonMaterialSet} materials
     */
    initMaterial(materials) {
        this.material = materials;
        ButtonMaterialSet.addChild(this, materials);
        this.updateMaterialVisible(this.getButtonState());
        //テキストラベルがあったら最前線に。
        if (this._labelField) {
            this.removeChild(this._labelField);
            this.addChild(this._labelField);
        }
    }
    /**
     * 状態表示およびラベル文字色を、状態に応じて更新する。
     * @param {BasicButtonState} state
     */
    updateMaterialVisible(state) {
        ButtonMaterialSet.updateVisible(this.material, state);
        ButtonLabelColorSet.update(this._labelField, this.labelColors, state);
    }
    pressButton(evt) {
        if (!this.checkActivity())
            return;
        this.isPressed = true;
        this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
    }
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
        this.isPressed = false;
        const state = this._isOver
            ? BasicButtonState.NORMAL_OVER
            : BasicButtonState.NORMAL;
        this.updateMaterialVisible(state);
    }
    overButton(evt) {
        this._isOver = true;
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
        this._isOver = false;
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
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
     */
    enableMouseEvent() {
        this.mouseEnabled = true;
    }
    /**
     * ボタンのイベントリスナを無効にする
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
     */
    disableMouseEvent() {
        this.mouseEnabled = false;
    }
    /**
     * 現在のボタンの有効、無効状態を取得する
     * @return    ボタンが有効か否か
     */
    checkActivity() {
        return !this.isDisable && this.mouseEnabled;
    }
    /**
     * 現在のボタンの状態を取得する
     * @return    定数STATE_*のいずれか
     */
    getButtonState() {
        if (this.isDisable)
            return BasicButtonState.DISABLE;
        else
            return BasicButtonState.NORMAL;
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
    addLabel(x, y, label, font, color, textAlign) {
        this.labelColors = color;
        this._labelField = new createjs.Text("", font, color.normal);
        this._labelField.x = x;
        this._labelField.y = y;
        if (textAlign)
            this._labelField.textAlign = textAlign;
        this._labelField.textBaseline = "alphabetic";
        this._labelField.mouseEnabled = false;
        CreatejsCacheUtil.cacheText(this._labelField, label);
        this.addChild(this._labelField);
    }
    /**
     * ボタンラベルに表示されている文言を取得する。
     * @returns {string}
     */
    get label() {
        return this._label;
    }
    /**
     * ボタンラベルの文言を更新する。
     * @param {string} value
     */
    set label(value) {
        this._label = value;
        if (this._labelField) {
            CreatejsCacheUtil.cacheText(this._labelField, value);
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
/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
export class ButtonMaterialSet {
    /**
     * ボタン上に状態パーツを配置する
     * @param {BasicClickButton} button
     * @param {ButtonMaterialSet} material
     */
    static addChild(button, material) {
        const materials = this.getMaterialArray(material);
        for (let mat of materials) {
            if (mat == null)
                continue;
            if (mat.parent)
                mat.parent.removeChild(mat);
            button.addChild(mat);
        }
    }
    /**
     * 全ての表示パーツを配列として取得する。
     * @param {ButtonMaterialSet} materials
     * @returns {createjs.DisplayObject[]}
     */
    static getMaterialArray(materials) {
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
    static updateVisible(material, state) {
        this.invisibleAll(material);
        this.getMaterial(material, state).visible = true;
        if (material.selectMarker) {
            const isSelect = state === BasicButtonState.SELECT ||
                state === BasicButtonState.SELECT_OVER ||
                state === BasicButtonState.SELECT_DOWN;
            material.selectMarker.visible = isSelect;
        }
    }
    /**
     * 全てのパーツを不可視にする。
     * @param {ButtonMaterialSet} material
     */
    static invisibleAll(material) {
        const materials = this.getMaterialArray(material);
        for (let mat of materials) {
            if (mat != null)
                mat.visible = false;
        }
    }
    /**
     * stateに対応する状態パーツを取り出す
     * @param {ButtonMaterialSet} material
     * @param {BasicButtonState} state
     * @returns {createjs.DisplayObject}
     */
    static getMaterial(material, state) {
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
    /**
     * ラベル文字色をボタン状態に応じて更新する。
     * @param {createjs.Text} field 更新対象ラベル
     * @param {ButtonLabelColorSet} colors 状態文字色セット
     * @param {BasicButtonState} state ボタン状態
     */
    static update(field, colors, state) {
        if (field == null)
            return;
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
    static getColor(colors, state) {
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
export var BasicButtonState;
(function (BasicButtonState) {
    BasicButtonState["NORMAL"] = "normal";
    BasicButtonState["NORMAL_OVER"] = "normal_over";
    BasicButtonState["NORMAL_DOWN"] = "normal_down";
    BasicButtonState["DISABLE"] = "disable";
    BasicButtonState["SELECT"] = "select";
    BasicButtonState["SELECT_OVER"] = "select_over";
    BasicButtonState["SELECT_DOWN"] = "select_down";
})(BasicButtonState || (BasicButtonState = {}));
