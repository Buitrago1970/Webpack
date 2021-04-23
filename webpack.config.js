const { exception } = require("console");
const path = require("path");
//recurso html
const HtmlWebpackPlugin = require("html-webpack-plugin");
//loader css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//copy plugin
const CopyPlugin = require("copy-webpack-plugin");
//optimizer
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { dirname } = require("path");
//.env
const DotenvPlugin = require("dotenv-webpack");

/** @type {import('webpack').Configuration} */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash].[ext]",
  },
  resolve: {
    extensions: ["js"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
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
        // generator: { filename: "assets/images/[hash][ext][query]" },
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
            // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: "application/font-woff",
            // Especifica el tipo MIME con el que se alineará el archivo.
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
            // ubuntu-regularhola.woff
            outputPath: "./assets/fonts/",
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: "../assets/fonts/",
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
            esModule: false,
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
          },
        },
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
      filename: "[name].[contenthash].html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new DotenvPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images",
    //     },
    //   ],
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },
};
