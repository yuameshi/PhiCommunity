const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { InjectManifest } = require('workbox-webpack-plugin');

const path = require('path');

module.exports = (env) => {
	const deployPlatform =
		['cf', 'vercel'].find((platform) => env[platform]) || 'default';

	if (deployPlatform) console.log('deploy on platform: ' + deployPlatform);

	const loaders = [];
	if (deployPlatform !== 'default')
		loaders.push({
			test: /\.js$/,
			loader: 'string-replace-loader',
			options: {
				search: /https:\/\/charts\.phicommunity\.com\.cn/gi,
				replace: `https://${deployPlatform}.charts.phicommunity.com.cn`,
			},
		});

	return merge(common, {
		mode: 'production',
		plugins: [
			new InjectManifest({
				swSrc: path.resolve(__dirname, '../src', 'sw.js'),
				swDest: 'service-worker.js',
				exclude: [/service-worker\.js/, /sw\.js/],
			}),
		],
		module: {
			rules: [...loaders],
		},
	});
};
