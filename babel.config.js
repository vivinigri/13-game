module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@api": "./api",
            "@assets": "./assets",
            "@core": "./core",
            "@hooks": "./hooks",
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@store": "./store",
            "@types": "./types.tsx",
          },
        },
      ],
    ],
  }
}
