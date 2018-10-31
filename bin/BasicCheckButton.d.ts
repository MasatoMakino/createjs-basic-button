/// <reference types="easeljs" />
import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
/**
 * 選択状態を持つボタンクラス。
 */
export declare class BasicCheckButton extends BasicClickButton {
    isSelect: boolean;
    /**
     * ボタンがmousedownされた際の処理。
     * @param {createjs.MouseEvent} evt
     */
    pressButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタンがmouseupされた際の処理。
     * @param {createjs.MouseEvent} evt
     */
    releaseButton(evt?: createjs.MouseEvent): void;
    /**
     * ボタンがmouseoverされた際の処理
     * @param {createjs.MouseEvent} evt
     */
    overButton(evt?: createjs.MouseEvent): void;
    outButton(evt?: createjs.MouseEvent): void;
    /**
     * @param {createjs.MouseEvent} evt
     */
    selectButton(evt?: createjs.MouseEvent): void;
    deselectButton(evt?: createjs.MouseEvent): void;
    /**
     * 選択状態を反転させる。
     * ButtonEvent.SELECTは発行しない。
     * @param {createjs.MouseEvent} evt
     */
    reverseSelection(evt?: createjs.MouseEvent): void;
    /**
     * 選択状態の初期化のみを行う。
     * ButtonEvent.SELECTは発行しない。
     * @param {boolean} isSelect
     */
    initSelection(isSelect: boolean): void;
    /**
     * ボタンを操作可能にする。
     */
    enableButton(): void;
    getButtonState(): BasicButtonState;
    /**
     * 選択状態を取得する。
     * @returns {boolean}
     */
    readonly selection: boolean;
}
//# sourceMappingURL=BasicCheckButton.d.ts.map