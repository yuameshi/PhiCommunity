import './style.css';

window.addEventListener('DOMContentLoaded', async () => {
	const cacheItems = [];
	const cacheList = document.getElementById('container');
	const cache = await caches.open('phi-runtime-v1');
	const keys = await cache.keys();

	document
		.querySelector('#delAllCache')
		.addEventListener('click', delAllCache);

	keys.forEach(function (request) {
		const item = CacheItem(cache, request);
		cacheList.append(item.element);
		cacheItems.push(item);
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
		new URL(request.url).pathname.split('/').slice(-1)[0] // url的最后一段（文件名）
	);

	const delBtn = document.createElement('button');
	delBtn.classList.add('deleteBtn');
	delBtn.innerText = '删除';
	delBtn.addEventListener('click', delCache);
	item.appendChild(delBtn);

	return { element: item, delCache };

	async function delCache() {
		await cache.delete(request);
		delBtn.removeEventListener('click', delCache);
		item.remove();
	}
}
