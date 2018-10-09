/// <reference types="easeljs" />
import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
/**
 * 複数のボタンがセットになり、排他的に選択可能なボタン
 */
export declare class BasicRadioButton extends BasicCheckButton {
    protected manager: BasicRadioButtonManager;
    protected isUnselectable: boolean;
    setManager(manager: BasicRadioButtonManager): void;
    pressButton(evt?: createjs.MouseEvent): void;
    releaseButton(evt?: createjs.MouseEvent): void;
    overButton(evt?: createjs.MouseEvent): void;
    outButton(evt?: createjs.MouseEvent): void;
    checkActivity(): boolean;
    selectButton(evt?: createjs.MouseEvent): void;
    initSelection(isSelect: boolean): void;
    setUnselectable(isUnselectable: boolean): void;
}
//# sourceMappingURL=BasicRadioButton.d.ts.map