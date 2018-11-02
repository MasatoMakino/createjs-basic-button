/// <reference types="easeljs" />
import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */
export declare class BasicClickButton extends createjs.Container {
    isDisable: boolean;
    isPressed: boolean;
    protected _isOver: boolean;
    protected _buttonValue: any;
    protected material: ButtonMaterialSet;
    protected _labelField: createjs.Text;
    protected labelColors: ButtonLabelColorSet;
    /**
     * コンストラクタ
     * @param {ButtonMaterialSet} materials 状態セット
     */
    constructor(materials?: ButtonMaterialSet);
    /**
     * ボタンに対するマウスハンドリングを開始する。
     */
    private setMouseEvents;
    /**
     * ボタンに状態マテリアルを設定する。
     * @param {ButtonMaterialSet} materials
     */
    initMaterial(materials: ButtonMaterialSet): void;
    /**
     * 状態表示およびラベル文字色を、状態に応じて更新する。
     * @param {BasicButtonState} state
     */
    protected updateMaterialVisible(state: BasicButtonState): void;
    /**
     *
     * @param {createjs.MouseEvent} evt
     */
    pressButton(evt?: createjs.MouseEvent): void;
    /**
     *
     * @param {createjs.MouseEvent} evt
     */
    releaseButton(evt?: createjs.MouseEvent): void;
    overButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタンからマウスアウトした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
    outButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタンを非活性化する
     */
    disableButton(): void;
    /**
     * ボタンを活性化する
     */
    enableButton(): void;
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
     * ボタンラベルを初期化する。
     * @param {number} x ラベル位置
     * @param {number} y ラベル位置
     * @param {string} label ラベルに表示する文言
     * @param {string} font フォント設定 createjs.Textのfont指定に準じる。
     * @param {ButtonLabelColorSet} color
     * @param {string} textAlign
     */
    addLabel(x: number, y: number, label: string, font: string, color: ButtonLabelColorSet, textAlign?: string): void;
    /**
     * ボタンラベルに表示されている文言を取得する。
     * @returns {string}
     */
    /**
    * ボタンラベルの文言を更新する。
    * @param {string} value
    */
    label: string | null;
    readonly isOver: boolean;
    buttonValue: any;
}
/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
export declare class ButtonMaterialSet {
    normal: DisplayObject;
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
    static addChild(button: BasicClickButton, material: ButtonMaterialSet): void;
    static remove(material: ButtonMaterialSet): void;
    /**
     * 全ての表示パーツを配列として取得する。
     * @param {ButtonMaterialSet} materials
     * @returns {createjs.DisplayObject[]}
     */
    private static getMaterialArray;
    /**
     * 可視状態をstateに合わせて更新する
     * @param {ButtonMaterialSet} material
     * @param {BasicButtonState} state
     */
    static updateVisible(material: ButtonMaterialSet, state: BasicButtonState): void;
    /**
     * 全てのパーツを不可視にする。
     * @param {ButtonMaterialSet} material
     */
    private static invisibleAll;
    /**
     * stateに対応する状態パーツを取り出す
     * @param {ButtonMaterialSet} material
     * @param {BasicButtonState} state
     * @returns {createjs.DisplayObject}
     */
    private static getMaterial;
}
/**
 * テキストラベルの色についてのオプション。
 * 各ボタンのaddLabel関数でインスタンスに渡す。
 */
export declare class ButtonLabelColorSet {
    normal: string;
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
    static update(field: Text, colors: ButtonLabelColorSet, state: BasicButtonState): void;
    /**
     * 状態に対応した文字色を取り出す。
     * @param {ButtonLabelColorSet} colors
     * @param {BasicButtonState} state
     * @returns {string}
     */
    private static getColor;
}
/**
 * ボタン状態を表す定数
 */
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