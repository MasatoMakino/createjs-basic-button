/// <reference types="createjs-lib" />
import { BasicRadioButton } from "./BasicRadioButton";
/**
 * 排他的に選択されるボタンを制御するクラスです。
 *
 * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。
 * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。
 * また、このクラスは変更内容をEventとして発信します。
 *
 * 利用する際には以下のような手順でインスタンス化してください。
 *
 *	let manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化
 *	(BasicRadioButton).selectButton(); //デフォルトで選択されているボタンを指定
 */
export declare class BasicRadioButtonManager extends createjs.EventDispatcher {
    protected _buttons: BasicRadioButton[];
    selected?: BasicRadioButton;
    constructor();
    addButton(button: BasicRadioButton): void;
    /**
     * 初期選択ボタンを指定する。
     * BasicButtonEventを返さないので、ラジオボタンの状態を
     * イベントを発行せずに整える用途にも使用できる。
     * nullを引数に取ると全ての選択を解除する。
     * @param selectedButton
     */
    initSelection(selectedButton: BasicRadioButton): void;
    deselectOthers(selectedButton: BasicRadioButton, isDispatchSelectEvent?: boolean): void;
    deselectAllButtons(): void;
    disableAll(): void;
    disableMouseAll(): void;
    enableAll(): void;
    enableMouseAll(): void;
    getSelectedButton(): BasicRadioButton | undefined;
    getButtonValue(): any;
    refreshButtons(value: any): void;
    readonly buttons: BasicRadioButton[];
    /**
     * buttonValueを検索キーとして、該当するボタンを取得する。
     * 該当するボタンがない場合はnullを返す。
     *
     * @param value
     * @returns {BasicRadioButton | null}
     */
    getButton(value: any): BasicRadioButton | null;
}
//# sourceMappingURL=BasicRadioButtonManager.d.ts.map