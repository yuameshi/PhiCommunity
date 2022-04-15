/*
测试代码：
import DB from './DB.js';
DB().createDB('test1', 'keyPath',['key1','key2'])
	.then((result) => {
		DB().createKey(result.objectStore, {keyPath:'t1-value1', key1:'t1-value2', key2:'t1-value3'});
	});
DB().createDB('test2', 'keyPath',['key1','key2'])
	.then((result) => {
		DB().createKey(result.objectStore, {keyPath:'t2-value1', key1:'t2-value2', key2:'t2-value3'});
	});
DB().openDB('test1').then((result) => {
	DB().readAllKeys(result.objectStore).then((res) =>
		console.log('ALL KEYS:', res.data)
	);
	DB().createKey(result.objectStore, {
		keyPath: 't1-value999',
		key1: 't1-value998',
		key2: 't1-value997',
	});
	DB().updateKey(result.objectStore, {
		keyPath: 't1-value1',
		key1: 't1-value666',
		key2: 't1-value667',
	});
});
*/
function DB() {
	/*
	@param {string} name
	@param {string} kPath
	@param {Array} indexes

	DB.createDB('MyTable','MyKeyPath',['Key1','Key2'])
		.then(res=>console.log(res));
	*/
	function createDB(name, kPath, indexes) {
		return new Promise(function (resolve, reject) {
			const request = indexedDB.open(name);

			request.onerror = (e) => {
				reject({ result: 'failed', e: e, request: request });
				// console.error(e);
			};
			request.onupgradeneeded = (e) => {
				const db = e.target.result;
				const objectStore = db.createObjectStore(name, {
					keyPath: kPath,
				});
				objectStore.createIndex(kPath, kPath, {
					unique: true,
				});
				indexes.forEach((index) => {
					objectStore.createIndex(index, index, { unique: false });
				});
				resolve({
					result: 'success',
					database: db,
					objectStore: objectStore,
				});
			};
		});
	}
	/*
	@param {string} objStoreName
	*/
	function openDB(name) {
		return new Promise(function (resolve, reject) {
			const request = indexedDB.open(name);

			request.onerror = (e) => {
				console.error(e);
				reject({ result: 'failed', e: e, request: request });
			};
			request.onsuccess = (e) => {
				if (!e.target.result.objectStoreNames.contains(name)) {
					e.target.result.close();
					indexedDB.deleteDatabase(name);
					reject({ result: 'failed', e: e, request: request });
					return;
				}
				const db = e.target.result;
				var transaction = db.transaction([name], 'readwrite');
				var objectStore = transaction.objectStore(name);
				resolve({
					result: 'success',
					database: db,
					objectStore: objectStore,
				});
			};
		});
	}
	/*
	@param {IDBObjectStore} objStore
	@param {object} data
	*/
	function createKey(objStore, data) {
		return new Promise(function (resolve, reject) {
			var request = objStore.add(data);

			request.onsuccess = function () {
				resolve({
					result: 'success',
					objectStore: objStore,
					request: request,
				});
				// console.log('Success to add data to indexedDB.');
			};

			request.onerror = function () {
				reject({
					result: 'failed',
					objectStore: objStore,
					request: request,
				});
				// console.error('Failed to write into indexedDB.');
			};
		});
	}
	/*
	@param {IDBObjectStore} objStore
	@param {string} key
	*/
	function readKey(objStore, key) {
		return new Promise((resolve, reject) => {
			var request = objStore.get(key);
			request.onerror = (e) => {
				reject({
					result: 'failed',
					objectStore: objStore,
					request: request,
					e: e,
				});
				// console.error('Failed to get the data from indexedDB.');
			};

			request.onsuccess = (e) => {
				resolve(request.result);
				resolve({
					result: 'success',
					value: request.result,
					objectStore: objStore,
					request: request,
					e: e,
				});
			};
		});
	}

	/*
	@param {IDBObjectStore} objStore
	@param {object} data
	*/
	function updateKey(objStore, data) {
		return new Promise((resolve, reject) => {
			var request = objStore.put(data);

			request.onsuccess = function () {
				resolve({
					result: 'success',
					objectStore: objStore,
					request: request,
				});
				// console.log('Success.');
			};

			request.onerror = function () {
				reject({
					result: 'failed',
					objectStore: objStore,
					request: request,
				});
				// console.error('Failed to update into indexedDB.');
			};
		});
	}

	/*
	@param {IDBObjectStore} objectStore
	*/
	function readAllKeys(objectStore) {
		return new Promise((resolve) => {
			const getAllKeysReq = objectStore.getAllKeys();
			getAllKeysReq.onsuccess = function (e) {
				const keyStr = e.target.result;
				const gettedKeys = [];
				keyStr.forEach((keys, index) => {
					const req = objectStore.get(keys);
					req.onsuccess = function (e) {
						gettedKeys.push(e.target.result);
						if (index == keyStr.length - 1) {
							resolve({
								result: 'success',
								data: gettedKeys,
								objectStore: objectStore,
								request: getAllKeysReq,
								e: e,
							});
						}
					};
				});
			};
		});
	}

	return {
		createDB,
		openDB,
		readAllKeys,
		readKey,
		updateKey,
		createKey,
	};
}


export { DB };
