const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");

let DIST_DIR = path.resolve(__dirname, "dist");
let SRC_DIR = path.resolve(__dirname, "src");

let config;
config = {
  entry: SRC_DIR + "/app/index.jsx",
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "create-react-class": "preact-compat/lib/create-react-class",
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"],
          plugins: ["transform-object-rest-spread"]
        }
      },
      {
        test: /\.css?/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/img/",
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
    // new BabiliPlugin()
    // new WorkboxPlugin({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ] //, new BundleAnalyzerPlugin()]
};

module.exports = config;
