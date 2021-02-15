/// <reference types="easeljs" />
import Text = createjs.Text;
import { BasicButtonState } from "./BasicButtonState";
import { ButtonMaterialSet, ButtonLabelColorSet } from "./ButtonMaterialSet";
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */
export declare class BasicClickButton extends createjs.Container {
    protected isDisable: boolean;
    protected isPressed: boolean;
    protected isOver: boolean;
    /**
     * ボタンの凍結状態。
     * trueに設定すると、ボタンの状態と外見を維持したまま、マウス操作を無視する。
     */
    private _frozen;
    protected _buttonValue: any;
    protected material: ButtonMaterialSet;
    protected _labelField: createjs.Text[];
    protected labelColors: ButtonLabelColorSet[];
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
     * ボタン上でマウスダウンした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
    pressButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタン上でマウスアップした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
    releaseButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタンにマウスオーバーした際の処理。
     * 状態と表示を更新する。
     * @param {createjs.MouseEvent} evt
     */
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
    get frozen(): boolean;
    set frozen(value: boolean);
    private updateMouseEnabled;
    /**
     * 現在のボタンの有効、無効状態を取得する
     * @return    ボタンが有効か否か
     */
    protected checkActivity(): boolean;
    /**
     * 現在のボタンの状態を取得する
     * @returns {BasicButtonState}
     */
    getButtonState(): BasicButtonState;
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
    addLabel(x: number, y: number, label: string, font: string, color: ButtonLabelColorSet, textAlign?: string): number;
    /**
     * ボタンラベルに表示されている文言を取得する。
     * @returns {string}
     */
    getLabel(index: any): string | null;
    /**
     * ボタンラベルの文言を更新する。
     * @param index
     * @param value
     */
    setLabel(index: number, value: string): void;
    getLabelField(index: number): Text;
    get buttonValue(): any;
    set buttonValue(value: any);
    /**
     * 当たり判定の矩形を指定する。
     * @param x
     * @param y
     * @param w
     * @param h
     */
    initHitRect(x: number, y: number, w: number, h: number): void;
}
//# sourceMappingURL=BasicClickButton.d.ts.map