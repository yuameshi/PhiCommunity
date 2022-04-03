import './style.css';
import ChapterSelect0_mp3 from './ChapterSelect0.mp3';

window.addEventListener('DOMContentLoaded', () => {
	const abortController = new AbortController();
	const actx = new (window.AudioContext ||
		window.webkitAudioContext ||
		window.mozAudioContext ||
		window.msAudioContext)();
	fetch(ChapterSelect0_mp3, abortController.signal)
		.then((res) => res.arrayBuffer())
		.then((arrayBuffer) => {
			actx.decodeAudioData(arrayBuffer, function (buffer) {
				var source = actx.createBufferSource();
				source.buffer = buffer;
				source.loop = true;
				source.connect(actx.destination);
				source.start(0);
			});
		});
	fetch(
		'https://api.github.com/repos/HanHan233/PhiCommunity/commits?per_page=1'
	)
		.then((res) => res.json())
		.then((data) => {
			document.querySelector('div#recentUpdContent').innerText =
				data[0].commit.message;
		});
	document
		.querySelector('div#startToPlayBtn')
		.addEventListener('click', () => {
			actx == undefined
				? abortController.abort()
				: actx.close();
			location.href = '../songSelect/index.html';
		});
	document.querySelector('div#getChart').addEventListener('click', () => {
		actx == undefined
			? abortController.abort()
			: actx.close();
		location.href = '../getChart/index.html';
	});
	document.querySelector('div#cacheControl').addEventListener('click', () => {
		actx == undefined
			? abortController.abort()
			: actx.close();
		location.href = '../cacheControl/index.html';
	});
	document.querySelector('div#settingBtn').addEventListener('click', () => {
		actx == undefined
			? abortController.abort()
			: actx.close();
		location.href = '../settings/index.html';
	});
	document
		.querySelector('div#uploadChartsBtn')
		.addEventListener('click', () => {
			actx == undefined
				? abortController.abort()
				: actx.close();
			location.href =
				'https://github.com/HanHan233/PhiCommunity-Charts-Repo';
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
