import './style.css';

window.addEventListener('DOMContentLoaded', async () => {
	let cacheList = [];

	document
		.querySelector('#delAllCache')
		.addEventListener('click', delAllCache);
	const container = document.querySelector('div#container');
	const cacheKeys = await caches.keys();

	cacheKeys.forEach(async (cacheKey) => {
		const cache = await caches.open(cacheKey);
		const keys = await cache.keys();

		keys.forEach(function (request, index, array) {
			cacheList = cacheList.concat(array);
			const item = document.createElement('div');
			item.classList.add('item');
			item.setAttribute('title', request.url);
			item.setAttribute('data-url', request.url);
			item.setAttribute(
				'data-file-name',
				new URL(request.url).pathname.split('/')[
					new URL(request.url).pathname.split('/').length - 1
				]
			);
			const delBtn = document.createElement('button');
			delBtn.classList.add('deleteBtn');
			delBtn.innerText = '删除';
			delBtn.addEventListener('click', (e) => delCache(e, cache));
			delBtn.setAttribute('data-index', index);
			container.appendChild(item);
			item.appendChild(delBtn);
			// console.log(request);
		});
	});

	function delCache(e, cache) {
		const index = parseInt(e.target.getAttribute('data-index'));
		cache.delete(cacheList[index]).then(function () {
			document
				.querySelector('div#container')
				.children[index + 1].remove();
		});
	}
	function delAllCache() {
		cacheKeys.forEach(async (cacheKey) => {
			const cache = await caches.open(cacheKey);
			cache
				.keys()
				.then((keys) =>
					keys.forEach(function (request) {
						cache.delete(request);
					})
				)
				.finally(() => window.location.reload());
		});
	}
});
