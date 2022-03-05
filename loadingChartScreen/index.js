window.addEventListener('DOMContentLoaded', () => {
	fetch('../assets/tips.json')
		.then(response => response.json())
		.then(tipsArray => {
			var rndNum = parseInt(Math.random() * (tipsArray.length + 1), 10);
			const tip = tipsArray[rndNum];
			console.log(tip);
			document.querySelector('#tipConteiner').innerText = tip;
		});
	const urlParams = new URL(location.href).search;
	const parsedURLParams = new URLSearchParams(urlParams);
	const chart = parsedURLParams.get('c');
	const level = parsedURLParams.get('l').toLowerCase();
	fetch(encodeURI('https://charts.phicommunity.com.cn/' + chart + '/meta.json'))
		.then(response => response.json())
		.then(songInfoObj => {
			document.querySelector('#songNameElem').innerText = songInfoObj.name;
			document.querySelector('#artistElem').innerText = songInfoObj.artist;
			if (songInfoObj.chartDesigner != undefined) {
				document.querySelector('#chartDesignerElem').innerText =
					songInfoObj.chartDesigner;
			} else {
				document.querySelector('#chartDesignerElem').innerText =
					songInfoObj[level + 'ChartDesigner'];
			}
			document.querySelector('#illustratorElem').innerText =
				songInfoObj.illustrator;
			document
				.querySelector('#songImgElem')
				.setAttribute(
					'src',
					encodeURI(
						'https://charts.phicommunity.com.cn/' +
							chart +
							'/' +
							songInfoObj.illustration
					)
				);
			document.body.setAttribute(
				'style',
				'--background: url(' +
					encodeURI(
						'https://charts.phicommunity.com.cn/' +
							chart +
							'/' +
							songInfoObj.illustration
					) +
					');'
			);
			document
				.querySelector('#levelInfoElem')
				.setAttribute(
					'data-level',
					Math.floor(songInfoObj[level + 'Ranking'] || 0)
				);
			document.querySelector('#levelInfoElem').classList.add(level);
		});
});
