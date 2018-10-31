/// <reference types="easeljs" />
import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export declare class BasicRadioButton extends BasicCheckButton {
    protected manager: BasicRadioButtonManager;
    protected _isAbleToDeselect: boolean;
    setManager(manager: BasicRadioButtonManager): void;
    pressButton(evt?: createjs.MouseEvent): void;
    releaseButton(evt?: createjs.MouseEvent): void;
    overButton(evt?: createjs.MouseEvent): void;
    outButton(evt?: createjs.MouseEvent): void;
    checkActivity(): boolean;
    selectButton(evt?: createjs.MouseEvent): void;
    initSelection(isSelect: boolean): void;
    isAbleToDeselect: boolean;
}
//# sourceMappingURL=BasicRadioButton.d.ts.map