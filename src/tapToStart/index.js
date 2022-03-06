import './style.css';
import tapToStart_mp3 from './TapToStart.mp3';

window.addEventListener('DOMContentLoaded', () => {
	fetch('https://api.github.com/repos/HanHan233/PhiCommunity/commits?per_page=1')
		.then((response) => response.json())
		.then((data) => {
			document.querySelector('#ver').innerText = data[0].sha.slice(
				0,
				7
			);
		});
	try {
		document.querySelector('#device').innerText =
			'Platform: ' +
			navigator.userAgentData.platform +
			' ; isMobile:' +
			navigator.userAgentData.mobile;
	} catch (error) {
		document.querySelector('#device').innerText =
			'User-Agent : ' +
			navigator.userAgent.slice(navigator.userAgent.lastIndexOf(' '));
	}
	document.querySelector('#device').title = navigator.userAgent;
	fetch(tapToStart_mp3)
		.then((res) => res.arrayBuffer())
		.then((arrayBuffer) => {
			const actx = new (window.AudioContext ||
				window.webkitAudioContext ||
				window.mozAudioContext ||
				window.msAudioContext)();
			actx.decodeAudioData(arrayBuffer, function (buffer) {
				var source = actx.createBufferSource();
				source.buffer = buffer;
				source.loop = true;
				source.connect(actx.destination);
				source.start(0);
			});
		});
	document.body.addEventListener('click', () => {
		console.log('Clicked! Redirecting to MainPage');
		var fadeInElem = document.createElement('div');
		fadeInElem.classList.add('fadeIn');
		document.body.appendChild(fadeInElem);
		setTimeout(() => {
			if (window.localStorage.length == 0) {
				location.href = '../settings/index.html';
			} else {
				location.href = '../chapterSelect/index.html';
			}
		}, 510);
	});
});
