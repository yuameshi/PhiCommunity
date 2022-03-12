const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { InjectManifest } = require('workbox-webpack-plugin');

const path = require('path');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new InjectManifest({
			swSrc: path.resolve(__dirname, '../src', 'sw.js'),
			swDest: 'service-worker.js',
			exclude: [/service-worker\.js/, /sw\.js/],
		}),
	],
});
