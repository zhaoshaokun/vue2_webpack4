/*
 * @Author: gubai
 * @Date: 2020-12-15 17:05:05
 * @LastEditors: gubai
 * @LastEditTime: 2020-12-15 17:10:17
 * @Description: 开发环境配置
 */
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
  // 增加调试过程，为了提升打包速度，生产环境不用
  devtool: 'inline-source-map',
  devServer: { // 开发服务器
    contentBase: '../dist',
    proxy: [
      {
        target: '' //  代理请求的域名
      }
    ]
  },
  output: { // 输出
    filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
    path: path.resolve(__dirname, '../dist')
  },
  module: {},
  mode: 'development', // 设置开发环境，可以默认开启相关插件。充分使用持久化缓存
});