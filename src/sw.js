import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { cacheNames, clientsClaim, setCacheNameDetails } from 'workbox-core';

setCacheNameDetails({
	prefix: 'phi',
	precache: 'precache',
	runtime: 'runtime',
	suffix: 'v1',
});

self.skipWaiting();
clientsClaim();

console.log(cacheNames);

registerRoute(/\.(html)$/, new NetworkFirst());
registerRoute(/\.(css|js)$/, new CacheFirst());
registerRoute(
	/\.(css|js|mp3|wav|ogg|png|jpg|svg|webp)$/,
	new CacheFirst({
		cacheName: 'static-cache',
	})
);

registerRoute(/^https?:\/\/api\.(.*)/, new NetworkFirst());

registerRoute(
	/alicdn\.com/,
	new CacheFirst({
		cacheName: 'alicdn-cache',
	})
);

precacheAndRoute(self.__WB_MANIFEST);
