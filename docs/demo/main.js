import {
  BasicClickButton,
  BasicButtonMaterialConfig,
  BasicButtonEventType
} from "../../bin/BasicButton";

let stage;

const onDomContentsLoaded = () => {
  //ステージ更新処理
  const updateStage = () => {
    stage.update();
  };

  //stageの初期化
  const canvas = document.getElementById("appCanvas");
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver();
  console.log(stage._mouseOverIntervalID);

  createjs.Ticker.on("tick", updateStage);

  testButton();
};

const getMaterial = color => {
  const mat = new createjs.Shape();
  const g = mat.graphics;
  g.beginFill(color);
  g.drawRect(0, 0, 64, 32);
  g.endFill();
  return mat;
};

const getMaterialSet = () => {
  return {
    normal: getMaterial("#0f0"),
    over: getMaterial("#0fF"),
    down: getMaterial("#f0f"),
    disable: getMaterial("#666"),
    selectNormal: getMaterial("#0ff"),
    selectOver: getMaterial("#Ff0"),
    selectDown: getMaterial("#f8f")
  };
};

const testButton = () => {
  const testButton = new BasicClickButton();
  testButton.initMaterial(getMaterialSet());
  testButton.x = 180;
  testButton.y = 180;
  stage.addChild(testButton);

  testButton.addEventListener("click", e => {
    console.log(e);
  });
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
