module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.fbx$/i,
      use: 'raw-loader'
    })
    return config
  }
}
