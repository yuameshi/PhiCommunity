import './style.css';

window.addEventListener('DOMContentLoaded', () => {
	let loadingEmbedFrame = document.createElement('iframe');
	loadingEmbedFrame.src = '../loadingScreen/index.html';
	loadingEmbedFrame.classList.add('loadingEmbedFrame');
	document.body.appendChild(loadingEmbedFrame);
	document.querySelector('div#avatarBar').addEventListener('click', (e) => {
		var _element = e.target;
		if (_element.classList.toString().match('avatarBar') == null) {
			_element = e.target.parentElement;
		}
		if (_element.classList.toString().match('expand')) {
			_element.classList.remove('expand');
		} else {
			_element.classList.add('expand');
		}
	});
	if (window.localStorage.getItem('playerName') != null) {
		console.log(
			'Setting player name: ',
			window.localStorage.getItem('playerName')
		);
		document
			.querySelector('div#avatarBar')
			.setAttribute(
				'data-name',
				window.localStorage.getItem('playerName')
			);
	}
	if (window.localStorage.getItem('playerAvatar') != null) {
		console.log(
			'Setting player avatar: ',
			window.localStorage.getItem('playerAvatar')
		);
		document
			.querySelector('div#avatarBar')
			.children[0]
			.setAttribute(
				'style',
				'--avatar: url("'+window.localStorage.getItem('playerAvatar')+'");'
			);
	}
	document
		.querySelector('div#expandView.expandView')
		.addEventListener('click', (e) => {
			if (e.target.classList.toString().includes('expandView')) {
				e.target.classList.add('slideOut');
				setTimeout(() => {
					e.target.classList.remove('show');
					e.target.classList.remove('slideOut');
				}, 500);
			}
		});
	document
		.querySelector('button#addToChartListBtn.addToChartListBtn')
		.addEventListener('click', (e) => {
			const installedCharts =
				JSON.parse(localStorage.getItem('installedCharts')) ||
				new Array();
			const codename = document
				.querySelector('div#expandView.expandView')
				.getAttribute('data-codename');
			if (!installedCharts.includes(codename)) {
				installedCharts.push(codename);
				localStorage.setItem(
					'installedCharts',
					JSON.stringify(installedCharts)
				);
				e.target.innerText = '成功';
			} else {
				e.target.innerText = '已经添加，请勿重复添加';
			}
		});
	fetch(
		'https://api.github.com/repos/HanHan233/PhiCommunity-Charts-Repo/contents'
	)
		.then((res) => res.json())
		.then((response) => {
			window.songCodeNameList = new Array();
			// console.log(response);
			for (let i = 0; i < response.length; i++) {
				if (
					response[i].name.match(
						/.github|README.md|CNAME|_headers/
					) != null
				) {
					continue;
				}
				window.songCodeNameList.push(response[i].name);
			}
			// window.songCodeNameList = JSON.parse(songListXHR.responseText);
			window.songMetaList = new Array();

			for (let i = 0; i < window.songCodeNameList.length; i++) {
				fetch(
					encodeURI(
						'https://charts.phicommunity.com.cn/' +
							window.songCodeNameList[i] +
							'/meta.json'
					)
				)
					.then((res) => res.json())
					.then((json) => {
						window.songMetaList.push(json);
					});
			}
			const detectLoadCompleteInterval = setInterval(() => {
				if (
					window.songMetaList.length == window.songCodeNameList.length
				) {
					const songListContainer = document.querySelector(
						'div#chartListContainer'
					);
					window.songMetaList.forEach((metaObj) => {
						const songContainer = document.createElement('div');
						songContainer.classList.add('item');
						songContainer.setAttribute(
							'data-codename',
							metaObj.codename
						);
						songContainer.setAttribute('data-name', metaObj.name);
						songContainer.setAttribute(
							'data-artist',
							metaObj.artist
						);
						songContainer.setAttribute(
							'data-levelDesigner',
							metaObj.chartDesigner ||
								metaObj.atChartDesigner ||
								metaObj.inChartDesigner ||
								metaObj.hdChartDesigner ||
								metaObj.ezChartDesigner ||
								'Unknown'
						);
						songContainer.addEventListener('click', expandView);
						songContainer.setAttribute(
							'data-ezRanking',
							(metaObj.ezRanking || 'null').toString()
						);
						songContainer.setAttribute(
							'data-hdRanking',
							(metaObj.hdRanking || 'null').toString()
						);
						songContainer.setAttribute(
							'data-inRanking',
							(metaObj.inRanking || 'null').toString()
						);
						songContainer.setAttribute(
							'data-atRanking',
							(metaObj.atRanking || 'null').toString()
						);
						fetch(
							encodeURI(
								'https://charts.phicommunity.com.cn/' +
									metaObj.codename +
									'/' +
									metaObj.illustration
							)
						)
							.then((res) => res.blob())
							.then((blob) => {
								const url = window.URL.createObjectURL(blob);
								songContainer.style.setProperty(
									'--background',
									'url(' + url + ')'
								);
								createImageBitmap(blob).then((imageBitmap) => {
									songContainer.style.setProperty(
										'--color',
										getInvertedTextccolor(
											getImagePrimarilyColor(imageBitmap)
										)
									);
								});
							});
						songListContainer.appendChild(songContainer);
					});
					loadingEmbedFrame.remove();
					clearInterval(detectLoadCompleteInterval);
				}
			}, 100);
		})
		.catch(() => {
			alert('曲目列表获取失败！');
		});
});

function expandView(e) {
	const element = e.target;
	const songName = element.getAttribute('data-name');
	const songArtist = element.getAttribute('data-artist');
	const songLevelDesigner = element.getAttribute('data-levelDesigner');
	const color = element.style.getPropertyValue('--color');
	const background = element.style.getPropertyValue('--background');
	const codename = element.getAttribute('data-codename');
	const expandView = document.querySelector('div#expandView.expandView');
	expandView.setAttribute('data-codename', codename);
	expandView.style.setProperty('--expandViewBG', background);
	expandView.style.setProperty('--expandViewColor', color);
	expandView.querySelector('div#songName').innerText = songName;
	expandView.querySelector('div#artist').innerText = songArtist;
	expandView.querySelector('div#chartDesigner').innerText = songLevelDesigner;
	expandView.querySelectorAll('div.levelItem').forEach((levelItem) => {
		levelItem.classList.remove('hidden');
	});
	element.getAttribute('data-ezRanking') != 'null'
		? expandView
			.querySelector('div#ezRanking')
			.setAttribute(
				'data-level',
				element.getAttribute('data-ezRanking')
			)
		: expandView.querySelector('div#ezRanking').classList.add('hidden');
	element.getAttribute('data-hdRanking') != 'null'
		? expandView
			.querySelector('div#hdRanking')
			.setAttribute(
				'data-level',
				element.getAttribute('data-hdRanking')
			)
		: expandView.querySelector('div#hdRanking').classList.add('hidden');
	element.getAttribute('data-inRanking') != 'null'
		? expandView
			.querySelector('div#inRanking')
			.setAttribute(
				'data-level',
				element.getAttribute('data-inRanking')
			)
		: expandView.querySelector('div#inRanking').classList.add('hidden');
	element.getAttribute('data-atRanking') != 'null'
		? expandView
			.querySelector('div#atRanking')
			.setAttribute(
				'data-level',
				element.getAttribute('data-atRanking')
			)
		: expandView.querySelector('div#atRanking').classList.add('hidden');
	document.querySelector(
		'button#addToChartListBtn.addToChartListBtn'
	).innerText = '添加到我的谱面仓库';
	expandView.classList.add('show');
}

function getImagePrimarilyColor(img) {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	var data = ctx.getImageData(0, 0, img.width, img.height).data;
	var r = 0,
		g = 0,
		b = 0;
	for (let row = 0; row < img.height; row++) {
		for (let col = 0; col < img.width; col++) {
			if (row == 0) {
				r += data[img.width * row + col];
				g += data[img.width * row + col + 1];
				b += data[img.width * row + col + 2];
			} else {
				r += data[(img.width * row + col) * 4];
				g += data[(img.width * row + col) * 4 + 1];
				b += data[(img.width * row + col) * 4 + 2];
			}
		}
	}
	r /= img.width * img.height;
	g /= img.width * img.height;
	b /= img.width * img.height;
	return [r, g, b];
}
function getInvertedTextccolor(rgb) {
	if (!rgb) {
		return 'black';
	}
	const brightness = Math.round(
		(rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
	);
	return brightness > 125 ? 'black' : 'white';
}
