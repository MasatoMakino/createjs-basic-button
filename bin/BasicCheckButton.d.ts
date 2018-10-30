/// <reference types="easeljs" />
import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
/**
 * 選択状態を持つボタンクラスです
 */
export declare class BasicCheckButton extends BasicClickButton {
    isSelect: boolean;
    pressButton(evt?: createjs.MouseEvent): void;
    releaseButton(evt?: createjs.MouseEvent): void;
    overButton(evt?: createjs.MouseEvent): void;
    outButton(evt?: createjs.MouseEvent): void;
    selectButton(evt?: createjs.MouseEvent): void;
    unselectButton(evt?: createjs.MouseEvent): void;
    reverseSelectState(evt?: createjs.MouseEvent): void;
    initSelection(isSelect: boolean): void;
    enableButton(): void;
    checkRollOverActivity(): boolean;
    getButtonState(): BasicButtonState;
    updateButtonDisplay(): void;
    readonly selection: boolean;
}
//# sourceMappingURL=BasicCheckButton.d.ts.map