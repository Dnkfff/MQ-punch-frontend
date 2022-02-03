const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /.fbx$/i,
      use: "raw-loader",
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles"), path.join(__dirname, "components")],
  },
};
