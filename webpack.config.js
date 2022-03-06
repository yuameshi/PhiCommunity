const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const pagePlugins = [
	new HtmlWebpackPlugin({
		template: './src/index.html',
		filename: 'index.html',
		chunks: ['index'],
	}),
	...[
		'aboutUs',
		'cacheControl',
		'chapterSelect',
		'LevelOver',
		'loadingChartScreen',
		'loadingScreen',
		'settings',
		'songSelect',
		'tapToStart',
		'whilePlaying'
	].map(
		(pagename) =>
			new HtmlWebpackPlugin({
				template: `./src/${pagename}/index.html`,
				filename: `${pagename}/index.html`,
				chunks: [pagename],
			})
	),

	//pages under 'settings/'
	...['calibrate', 'statistic'].map(
		(pagename) =>
			new HtmlWebpackPlugin({
				template: `./src/settings/${pagename}/index.html`,
				filename: `settings/${pagename}/index.html`,
				chunks: [pagename],
			})
	),
];
module.exports = {
	entry: {
		index: './src/index.redirect.js',
		aboutUs: './src/aboutUs/index.js',
		cacheControl: './src/cacheControl/index.js',
		chapterSelect: './src/chapterSelect/index.js',
		LevelOver: './src/LevelOver/index.js',
		loadingChartScreen: './src/loadingChartScreen/index.js',
		loadingScreen: './src/loadingScreen/index.js',
		settings: './src/settings/index.js',
		songSelect: './src/songSelect/index.js',
		tapToStart: './src/tapToStart/index.js',
		calibrate: './src/settings/calibrate/index.js',
		statistic: './src/settings/statistic/index.js',
		whilePlaying: './src/whilePlaying/script.phi.community.core.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[chunkhash].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	resolve: {
		alias: {
			assets: path.resolve(__dirname, 'assets'),
		},
	},
	performance: {
		hints: 'warning',
		maxAssetSize: 12 * 1024 * 1024,
		maxEntrypointSize: 2 * 1024 * 1024,
		assetFilter: (assetFilename) =>
			assetFilename.match(/\.(css|js|mp3|wav|ogg|png|jpg|webp|svg)$/i),
	},
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin(),
		...pagePlugins,
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				path.join(__dirname, 'public'),
				{
					from: path.join(__dirname, 'assets'),
					to: 'assets/[path][name][ext]',
				},
				{
					from: path.join(__dirname, 'src/whilePlaying/assets'),
					to: 'whilePlaying/assets/[path][name][ext]',
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(mp3|wav|ogg|png|jpg)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(webp|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							esModule: false,
						},
					},
					/* 					{
						loader: 'url-loader',
						options: {
							name: '[path][name].[ext]',
							esModule: false,
						},
					}, */
				],
				type: 'javascript/auto',
			},
		],
	},
};
