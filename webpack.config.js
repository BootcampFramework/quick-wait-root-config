const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "frwk";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const shared = singleSpaDefaults({
    orgName: "frwk",
    projectName: "quick-wait-shared",
    webpackConfigEnv,
    argv,
  });

  defaultConfig;
  Object.assign(defaultConfig, {
    entry: {
      "frwk-root-config": defaultConfig.entry,
      "frwk-quick-wait-shared": shared.entry,
    },
    output: {
      ...defaultConfig.output,
      filename: "[name].js",
      path: __dirname + "/dist",
    },
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    mode: "production",
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
