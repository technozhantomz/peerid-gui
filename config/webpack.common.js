const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const chalk = require('chalk');
const path = require('path');
const getClientEnvironment = require('./env');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = '';
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

module.exports = {
  entry: [paths.appIndexJs],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: devMode,
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                // Polyfills to support multiple browsers based on hbrowserslist in package.json
                require('postcss-preset-env')()
              ]
            }
          }, 'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [ 'css-to-mui-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[contenthash].[ext]'
        }
      },
      {
        test: /\.txt$/i,
        type: 'asset/source'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // This is the URL that app is served from. We use "/" in development.
    publicPath: devMode ? publicPath : paths.servedPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: [
          {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        ],
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
        ],
      }),
    ],
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: devMode ? false : true,
        collapseWhitespace: devMode ? false : true,
        removeRedundantAttributes: devMode ? false : true,
        useShortDoctype: devMode ? false : true,
        removeEmptyAttributes: devMode ? false : true,
        removeStyleLinkTypeAttributes: devMode ? false : true,
        keepClosingSlash: devMode ? false : true,
        minifyJS: devMode ? false : true,
        minifyCSS: devMode ? false : true,
        minifyURLs: devMode ? false : true
      }
    }),
    new ESLintPlugin({
      extensions: [`js`, `jsx`],
      include: [paths.appSrc]
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin((percentage, msg) => {
      process.stdout.write(chalk.green(
        (percentage * 100).toFixed(2) + '% ' + msg + '                   \n'
      ));
    }),
    new StyleLintPlugin({
      "extends": "./src/assets/styling/index.js",
        "ignoreFiles": [
          "**/*.js",
          "**/*.jsx"
        ]
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? ' [name].css' : '[name].[hash].css',
      chunkFilename:devMode ? '[id].css' : '[id].[hash].css'
    }),
  ]
};
