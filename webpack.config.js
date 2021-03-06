const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const MODE = process.env.NODE_ENV || 'development';
const enabledSourceMap = MODE === 'development';

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `${__dirname}/src/main.tsx`,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js',
  },
  devServer: {
    static: './dist',
    open: true,
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/html/index.html`,
      filename: 'index.html',
    }),
    new CopyPlugin({
      // HACK:
      // imageに関して、`${__dirname}/src/application/images`ではビルドエラーになる。
      // ※GenerateSWとの相性の可能性がある
      // ${path.resolve(__dirname, 'src')}指定したらビルドできた
      patterns: [
        {
          from: `${path.resolve(__dirname, 'src')}/application/json`,
          to: `${path.resolve(__dirname, 'dist')}`,
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        use: {
          loader: 'url-loader',
          options: {
            limit: 300000,
          },
        },
      },
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  performance: { hints: false },
};
