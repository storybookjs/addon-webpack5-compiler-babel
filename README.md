# @storybook/addon-webpack5-compiler-babel

This addon adds babel support to Storybook's webpack5 compiler. It adds the babel-loader to the webpack config and sets the `babel-loader` as the default loader for JavaScript and TypeScript files.

## Installation

```sh
npm install --save-dev @storybook/addon-webpack5-compiler-babel
```

## Usage

```js
// .storybook/main.js

const config = {
  addons: ["@storybook/addon-webpack5-compiler-babel"],
};

export default config;
```
