import './style.css';
import ChapterSelect0_mp3 from './ChapterSelect0.mp3';

window.addEventListener('DOMContentLoaded', () => {
	document
		.querySelector('div#startToPlayBtn')
		.addEventListener('click', () => {
			location.href = '../songSelect/index.html';
		});
	document
		.querySelector('div#cacheControl')
		.addEventListener('click', () => {
			location.href = '../cacheControl/index.html';
		});
	document.querySelector('div#settingBtn').addEventListener('click', () => {
		location.href = '../settings/index.html';
	});
	document
		.querySelector('div#uploadChartsBtn')
		.addEventListener('click', () => {
			location.href = '../uploadCharts/index.html';
		});
	fetch(ChapterSelect0_mp3)
		.then(res => res.arrayBuffer())
		.then(arrayBuffer => {
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
	const body = document.getElementById('body');
	if (window.DeviceOrientationEvent) {
		console.log(
			'DeviceOrientationEvent detected, attaching event listener.'
		);
		window.addEventListener(
			'deviceorientation',
			(event) => {
				const { gamma, beta } = event;
				body.style.setProperty('--gamma', gamma);
				body.style.setProperty('--beta', beta);
				// console.log(gamma, beta);
			},
			true
		);
	}
});
