window.addEventListener('DOMContentLoaded', () => {
	fetch('../assets/tips.json')
		.then(response => response.json())
		.then(tipsArray => {
			var rndNum = parseInt(Math.random() * (tipsArray.length + 1), 10);
			const tip = tipsArray[rndNum];
			console.log(tip);
			document.querySelector('#tipConteiner').innerText = tip;
		});
});
