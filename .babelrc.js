const eslintrc = {
  "presets": [
    "es2015",
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-async-to-generator",
    "transform-class-properties",
    "transform-runtime"
  ],
  "env": {
    "production": {}
  },
}

if (process.env.NODE_ENV === 'development') {
  // 不要包含多余的空格字符和行结束符。
  // 设置为“auto”时，对于大于500KB的输入大小，设置为"true"。
  // https://babeljs.io/docs/usage/api/#options
  eslintrc.cacheDirectory = true;
} else {
  eslintrc.compact = true;
}

module.exports = eslintrc
