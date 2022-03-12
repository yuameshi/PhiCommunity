const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const resolve = (...paths) => path.resolve(__dirname, '..', ...paths);
const resolveSrc = (...paths) => path.resolve(__dirname, '../src', ...paths);

const pagePlugins = [
	new HtmlWebpackPlugin({
		template: resolveSrc('index.html'),
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
		'whilePlaying',
	].map(
		(pagename) =>
			new HtmlWebpackPlugin({
				template: resolveSrc(pagename, 'index.html'),
				filename: `${pagename}/index.html`,
				chunks: [pagename],
			})
	),

	//pages under 'settings/'
	...['calibrate', 'statistic'].map(
		(pagename) =>
			new HtmlWebpackPlugin({
				template: resolveSrc('settings', pagename, 'index.html'),
				filename: `settings/${pagename}/index.html`,
				chunks: [pagename],
			})
	),
];
module.exports = {
	entry: {
		index: resolveSrc('index.redirect.js'),
		aboutUs: resolveSrc('aboutUs/index.js'),
		cacheControl: resolveSrc('cacheControl/index.js'),
		chapterSelect: resolveSrc('chapterSelect/index.js'),
		LevelOver: resolveSrc('LevelOver/index.js'),
		loadingChartScreen: resolveSrc('loadingChartScreen/index.js'),
		loadingScreen: resolveSrc('loadingScreen/index.js'),
		settings: resolveSrc('settings/index.js'),
		songSelect: resolveSrc('songSelect/index.js'),
		tapToStart: resolveSrc('tapToStart/index.js'),
		calibrate: resolveSrc('settings/calibrate/index.js'),
		statistic: resolveSrc('settings/statistic/index.js'),
		whilePlaying: resolveSrc('whilePlaying/script.phi.community.core.js'),
	},
	output: {
		path: resolve('dist'),
		filename: 'js/[name].[chunkhash].js',
		assetModuleFilename: 'assets/packed/[name].[contenthash:4][ext]',
	},
	resolve: {
		alias: {
			assets: resolve('assets'),
		},
	},
	performance: {
		hints: 'warning',
		maxAssetSize: 12 * 1024 * 1024,
		maxEntrypointSize: 2 * 1024 * 1024,
		assetFilter: (assetFilename) =>
			assetFilename.match(/\.(css|js|mp3|wav|ogg|png|jpg|webp|svg)$/i),
	},
	plugins: [
		new CleanWebpackPlugin(),
		...pagePlugins,
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				resolve('public'),
				{
					from: resolve('assets'),
					to: 'assets/[path][name][ext]',
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
							name: 'assets/packed/[name].[contenthash:4].[ext]',
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
