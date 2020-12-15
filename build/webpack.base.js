/*
 * @Author: gubai
 * @Date: 2020-12-15 17:04:57
 * @LastEditors: gubai
 * @LastEditTime: 2020-12-15 18:19:01
 * @Description: 开发环境和生产环境通用配置
 */
const webpack = require('webpack');
const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用 mini-css-extract-plugin 插件来分离 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Happypack 的作用是将文件解析任务分解成多个子进程并发执行，子进程处理完成任务后再将结果发送给主线程。多进程加快编译速度
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
  entry: './src/main.js', //入口
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'happypack/loader?id=happyBabel',
            exclude: /node_modules/
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(sa|sc)ss$/,
            use: ['style-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.less$/,
            use: [
                {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
                },
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 5000,
                        // 分离图片至imgs文件夹
                        name: 'imgs/[name].[ext]'
                    }
                },
                // 图片压缩
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        }
                    }
                }
            ]
        }
    ]},
  // 插件
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html'),
    }),
    new HappyPack({
        //用id来标识 happypack处理类文件
        id: 'happyBabel',
        //如何处理 用法和loader 的配置一样
        loaders: [
          {
            loader: 'babel-loader?cacheDirectory=true'
          }
        ],
        //共享进程池
        threadPool: happyThreadPool,
        //允许 HappyPack 输出日志
        verbose: true
    })
  ]
};