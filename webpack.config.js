
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');
const environment = process.env.NODE_ENV;
const stream = fs.createWriteStream("src/services/environment.js");
stream.once('open', function(fd) {
  stream.write('const env = "'+environment+'";\n');
  stream.write('export default env;');
  stream.end();
});
var isDev = process.env.NODE_ENV === 'development';
module.exports = isDev;
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
                { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            use: { loader: "babel-loader" } 
			 },
                 {
            test: /\.css$/,
            use:  [
                (isDev ? 'style-loader' :
                MiniCssExtractPlugin.loader), 
                {loader:'css-loader',
                options: {
                 importLoaders: 2
                }
                }, 
                'postcss-loader']
                },
             {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: ['file-loader?name=././images/[name].[ext]',                
            {
                                    loader: 'image-webpack-loader',
                                    options: {
                                        esModule: false,
                                    },
                            },
                    ]
             },

             {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },

            ]
        },
        plugins: [ 
            new MiniCssExtractPlugin({
               
                filename: 'index.[contenthash].css',}),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                        preset: ['default'],
                },
                canPrint: true,
        }),  
            new HtmlWebpackPlugin({
                inject: false, 
                template: './src/index.html', 
                filename: 'index.html', 
                minify:
                    false,
                   
            

                filename: 'index.html' 


              }),
              new WebpackMd5Hash(),
              new webpack.DefinePlugin({
                  'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
              }),
            ],
     
};  
