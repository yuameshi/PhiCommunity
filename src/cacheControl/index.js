import './style.css';

window.addEventListener('DOMContentLoaded', async () => {
	const cacheItems = [];
	const cacheList = document.getElementById('container');

	document
		.querySelector('#delAllCache')
		.addEventListener('click', delAllCache);
	const cacheKeys = await caches.keys();

	cacheKeys.forEach(async (cacheKey) => {
		const cache = await caches.open(cacheKey);
		const keys = await cache.keys();

		keys.forEach(function (request) {
			const item = CacheItem(cache, request);
			cacheList.append(item.element);
			cacheItems.push(item);
		});
	});

	function delAllCache() {
		cacheItems.forEach((item) => {
			item.delCache().then(item.element.remove);
		});
	}
});

function CacheItem(cache, request) {
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
	delBtn.addEventListener('click', delCache);
	container.appendChild(item);
	item.appendChild(delBtn);

	return { element: item, delCache };

	async function delCache() {
		await cache.delete(request);
		delBtn.removeEventListener('click', delCache);
		item.remove();
	}
}
