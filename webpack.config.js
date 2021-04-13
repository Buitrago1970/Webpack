const { exception } = require("console");
const path = require("path");
//recurso html
const htmlwebpackplugin = require("html-webpack-plugin");
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
    ],
  },
  // SECCION DE PLUGINS
  plugins: [
    new htmlwebpackplugin({
      //configuracion de plugins
      //inyecta el bundle al template html
      inject: true,
      //que template va a usar y donde buscar
      template: "./public/index.html",
      //nombre final del archivo
      filename: "index.html",
    }),
  ],
};
