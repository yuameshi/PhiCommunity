const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new GenerateSW({
			cacheId: 'phi',
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/(cf.)?charts/,
					handler: 'CacheFirst',
					options: {
						cacheableResponse: {
							statuses: [200],
						},
					},
				},
				{
					urlPattern: /^https:\/\/cdn/,
					handler: 'NetworkFirst',
					options: {
						networkTimeoutSeconds: 2,
						cacheableResponse: {
							statuses: [200],
						},
					},
				},
			],
		}),
	],
});
