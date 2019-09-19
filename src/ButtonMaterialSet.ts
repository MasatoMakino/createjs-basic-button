import { BasicButtonState } from "./BasicButtonState";
import { CreatejsCacheUtil } from "createjs-cache-util";
import { BasicClickButton } from "./BasicClickButton";
import DisplayObject = createjs.DisplayObject;
import Text = createjs.Text;

/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
export class ButtonMaterialSet {
  normal!: DisplayObject;
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
  public static addChild(
    button: BasicClickButton,
    material: ButtonMaterialSet
  ): void {
    this.remove(material);
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat != null) button.addChild(mat);
    }
  }

  /**
   * この状態セットに含まれるパーツを表示ツリー上から削除する。
   * @param {ButtonMaterialSet} material
   */
  public static remove(material: ButtonMaterialSet): void {
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat && mat.parent) mat.parent.removeChild(mat);
    }
  }

  /**
   * 全ての表示パーツを配列として取得する。
   * @param {ButtonMaterialSet} materials
   * @returns {createjs.DisplayObject[]}
   */
  private static getMaterialArray(
    materials: ButtonMaterialSet
  ): DisplayObject[] {
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
  public static updateVisible(
    material: ButtonMaterialSet,
    state: BasicButtonState
  ): void {
    this.invisibleAll(material);
    this.getMaterial(material, state).visible = true;

    if (material.selectMarker) {
      const isSelect =
        state === BasicButtonState.SELECT ||
        state === BasicButtonState.SELECT_OVER ||
        state === BasicButtonState.SELECT_DOWN;
      material.selectMarker.visible = isSelect;
    }
  }

  /**
   * 全てのパーツを不可視にする。
   * @param {ButtonMaterialSet} material
   */
  private static invisibleAll(material: ButtonMaterialSet): void {
    const materials = this.getMaterialArray(material);
    for (let mat of materials) {
      if (mat != null) mat.visible = false;
    }
  }

  /**
   * stateに対応する状態パーツを取り出す
   * @param {ButtonMaterialSet} material
   * @param {BasicButtonState} state
   * @returns {createjs.DisplayObject}
   */
  private static getMaterial(
    material: ButtonMaterialSet,
    state: BasicButtonState
  ): DisplayObject {
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
  normal!: string;
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
  public static update(
    field: Text,
    colors: ButtonLabelColorSet,
    state: BasicButtonState
  ): void {
    if (field == null) return;

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
  private static getColor(
    colors: ButtonLabelColorSet,
    state: BasicButtonState
  ): string {
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
