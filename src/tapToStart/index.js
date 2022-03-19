import './style.css';
import tapToStart_mp3 from './TapToStart.mp3';

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#ver').innerText = $VERSION;

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
			window.actx = new (window.AudioContext ||
				window.webkitAudioContext ||
				window.mozAudioContext ||
				window.msAudioContext)();
			window.actx.decodeAudioData(arrayBuffer, function (buffer) {
				var source = window.actx.createBufferSource();
				source.buffer = buffer;
				source.loop = true;
				source.connect(window.actx.destination);
				source.start(0);
			});
		});
	document.body.addEventListener('click', () => {
		console.log('Clicked! Redirecting to MainPage');
		var fadeInElem = document.createElement('div');
		fadeInElem.classList.add('fadeIn');
		document.body.appendChild(fadeInElem);
		setTimeout(() => {
			window.actx.close();
			if (window.localStorage.length == 0) {
				location.href = '../settings/index.html';
			} else {
				location.href = '../chapterSelect/index.html';
			}
		}, 510);
	});
});
