/*
 * @Author: gubai
 * @Date: 2020-12-15 17:05:11
 * @LastEditors: gubai
 * @LastEditTime: 2020-12-15 18:22:04
 * @Description: 生产环境配置
 */
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
// 处理每次重新打包，dist 目录文件夹文件没有清除的情况
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩 css 和 js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  module: {},
  plugins: [
    new CleanWebpackPlugin()
  ],
  mode: 'production', // 生产环境，默认开启相关插件,可删除未引用代码，压缩代码等
  output: {
    filename: 'js/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimizer: [
        // 压缩js
        new TerserJSPlugin({}),
        // 压缩css
        new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        }
      }
    }
  }
});