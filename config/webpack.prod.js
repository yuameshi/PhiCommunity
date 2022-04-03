const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { InjectManifest } = require('workbox-webpack-plugin');

const path = require('path');

module.exports = (env) => {
	console.log(env);
	const chartsSource = env['charts-source'] || 'default';

	if (chartsSource) console.log('Deploy with charts source: ' + chartsSource);

	const loaders = [];
	if (chartsSource !== 'default')
		loaders.push({
			test: /\.js$/,
			loader: 'string-replace-loader',
			options: {
				search: /https:\/\/charts\.phicommunity\.com\.cn/gi,
				replace: chartsSource,
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
