const { exception } = require("console");
const path = require("path");
//recurso html
const HtmlWebpackPlugin = require("html-webpack-plugin");
//loader css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//copy plugin
const CopyPlugin = require("copy-webpack-plugin");
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: ["js"],
  },
  module: {
    rules: [
      {
        //declara que extenciones de archivo aplica el loader (m o js)
        test: /\.m?js$/,
        //usar babel loader
        use: "babel-loader",
        //exclue node_moduls
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/,
        type: "asset/resource",
        generator: { filename: "assets/images/[hash][ext][query]" },
      },
    ],
  },
  // SECCION DE PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
      //configuracion de plugins
      //inyecta el bundle al template html
      inject: true,
      //que template va a usar y donde buscar
      template: "./public/index.html",
      //nombre final del archivo
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images",
    //     },
    //   ],
    // }),
  ],
};
