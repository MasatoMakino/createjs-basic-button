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
    _isOver: boolean;
    protected _buttonValue: any;
    protected material: BasicButtonMaterialConfig;
    protected labelField: createjs.Text;
    protected _label: string;
    protected labelColors: BasicButtonLabelColorConfig;
    /**
     * コンストラクタ
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
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
     */
    enableMouseEvent(): void;
    /**
     * ボタンのイベントリスナを無効にする
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
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
    addLabel(x: number, y: number, label: string, font: string, color: BasicButtonLabelColorConfig, textAlign?: string): void;
    label: string;
    readonly isOver: boolean;
    buttonValue: any;
}
/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
export declare class BasicButtonMaterialConfig {
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
     * @param {BasicButtonMaterialConfig} material
     */
    static addChild(button: BasicClickButton, material: BasicButtonMaterialConfig): void;
    /**
     * 可視状態をstateに合わせて更新する
     * @param {BasicButtonMaterialConfig} material
     * @param {BasicButtonState} state
     */
    static updateVisible(material: BasicButtonMaterialConfig, state: BasicButtonState): void;
    /**
     * 全てのパーツを不可視にする。
     * @param {BasicButtonMaterialConfig} material
     */
    private static invisibleAll;
    /**
     * stateに対応する状態パーツを取り出す
     * @param {BasicButtonMaterialConfig} material
     * @param {BasicButtonState} state
     * @returns {createjs.DisplayObject}
     */
    private static getMaterial;
}
/**
 * テキストラベルの色についてのオプション。
 * 各ボタンのaddLabel関数でインスタンスに渡す。
 */
export declare class BasicButtonLabelColorConfig {
    normal: string;
    over?: string;
    down?: string;
    disable?: string;
    selectNormal?: string;
    selectOver?: string;
    selectDown?: string;
    static update(field: Text, colors: BasicButtonLabelColorConfig, state: BasicButtonState): void;
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