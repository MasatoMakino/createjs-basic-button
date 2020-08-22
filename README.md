# createjs-basic-button

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/c1b6a32faecab44047c3/maintainability)](https://codeclimate.com/github/MasatoMakino/createjs-basic-button/maintainability)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=createjs-basic-button&show_owner=true)](https://github.com/MasatoMakino/createjs-basic-button)

## Demo

[Demo Page](https://masatomakino.github.io/createjs-basic-button/demo/index.html)

## Getting Started

### Install

createjs-basic-button depend on [CreateJS / EaselJS](https://github.com/CreateJS/EaselJS)

```bash
npm install easeljs --save-dev
```

or load script files in html.

```html
<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
```

and

```bash
npm install https://github.com/MasatoMakino/createjs-basic-button.git --save-dev
```

### Import

createjs-basic-button is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { BasicClickButton } from "createjs-basic-button";
```

### Setting stage

Enables mouse over events for a stage.

[enableMouseOver](https://createjs.com/docs/easeljs/classes/Stage.html#method_enableMouseOver)

```js
stage.enableMouseOver();
```

### Add button

```js
const button = new BasicClickButton();
button.initMaterial({
  normal: new createjs.Bitmap("imagePath.jpg"),
});
stage.addChild(button);
```

[API documents](https://masatomakino.github.io/createjs-basic-button/api/index.html)

see also [demo script](https://masatomakino.github.io/createjs-basic-button/demo/main.js).

## License

createjs-basic-button is [MIT licensed](LICENSE).
