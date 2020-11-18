module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  rules: {
    "react-native/no-inline-styles": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
