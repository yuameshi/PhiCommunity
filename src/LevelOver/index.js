import './style.css';
// import LevelOver_mp3 from './LevelOver.mp3';
import LevelOver0 from './LevelOver0.ogg';
import LevelOver1 from './LevelOver1.ogg';
import LevelOver2 from './LevelOver2.ogg';
import LevelOver3 from './LevelOver3.ogg';
import phi15phi from 'assets/images/phi15phi.svg';
import V15FC from 'assets/images/V15FC.svg';
import V15V from 'assets/images/V15V.svg';
import S15S from 'assets/images/S15S.svg';
import A15A from 'assets/images/A15A.svg';
import B15B from 'assets/images/B15B.svg';
import C15C from 'assets/images/C15C.svg';
import F15F from 'assets/images/F15F.svg';
import { gameLevels } from '../constants.js';

window.addEventListener('DOMContentLoaded', () => {
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
	// resize('div.mainContent');
	// resize('body > div.extraInfo', 'skew(-15deg)');
	// 获取各种数据
	const play = sessionStorage.getItem('play');
	const playLevelString = sessionStorage.getItem('level');
	const playLevel = gameLevels[playLevelString];
	const score = parseInt(sessionStorage.getItem('score'));
	const maxCombo = sessionStorage.getItem('maxCombo');
	const perFect = sessionStorage.getItem('perfect');
	const good = sessionStorage.getItem('good');
	const early = sessionStorage.getItem('early');
	const bad = sessionStorage.getItem('bad');
	const miss = sessionStorage.getItem('miss');
	const mode = sessionStorage.getItem('mode');
	switch (mode) {
	case 'normal':
		if (sessionStorage.getItem('isNewBest')=='true') {
			document.querySelector('#scrollFrame').classList.add('newBest');
			document.querySelector('#scrollFrame').setAttribute('data-nb','NEW BEST '+sessionStorage.getItem('prevBest').toString().padStart(7, '0')+' +'+(score-sessionStorage.getItem('prevBest')));
		}
		// document.querySelector('#scrollFrame').classList.add('normal');
		break;

	case 'auto':
		document.querySelector('#scrollFrame').classList.add('auto');
		break;

	case 'hyper':
		document.querySelector('#scrollFrame').classList.add('hyper');
		break;

	default:
		break;
	}
	sessionStorage.clear();
	const accuracy =
		Math.round(
			((parseInt(perFect) + parseInt(good) * 0.65) /
				(parseInt(perFect) +
					parseInt(good) +
					parseInt(bad) +
					parseInt(miss) +
					0)) *
				10000
		) / 100;
	const late = good - early;
	document.getElementById('retryBtn').addEventListener('click', () => {
		window.actx.close();
		location.href =
			'../whilePlaying/index.html?play=' +
			play +
			'&l=' +
			playLevelString;
	});
	document.getElementById('backInResultBtn').addEventListener('click', () => {
		window.actx.close();
		location.href =
			'../songSelect/index.html';
	});
	//	判断等级（范围来自萌娘百科）
	var grade,gradeURL;
	if (score == 0) {
		console.log('No grade');
		grade = '';
		gradeURL='';
	}
	if (score < 699999 && score != 0) {
		console.log('Grade: False');
		grade = 'F15F';
		gradeURL=F15F;
	}
	if (700000 <= score && score <= 819999) {
		console.log('Grade:C');
		grade = 'C15C';
		gradeURL=C15C;
	}
	if (820000 <= score && score <= 879999) {
		console.log('Grade:B');
		grade = 'B15B';
		gradeURL=B15B;
	}
	if (880000 <= score && score <= 919999) {
		console.log('Grade:A');
		grade = 'A15A';
		gradeURL=A15A;
	}
	if (920000 <= score && score <= 959999) {
		console.log('Grade:S');
		grade = 'S15S';
		gradeURL=S15S;
	}
	if (960000 <= score && score <= 999999) {
		console.log('Grade:V');
		grade = 'V15V';
		gradeURL=V15V;
	}
	if (bad == 0 && miss == 0) {
		console.log('Grade: V wih Full Combo');
		grade = 'V15FC';
		gradeURL=V15FC;
	}
	if (1000000 <= score) {
		console.log('Grade:Phi');
		grade = 'phi15phi';
		gradeURL=phi15phi;
	}
	// switch (score) {
	// 	default:
	// 		console.log('Error, Fallback to False');
	// 		grade='F15F';
	// 		break;
	// }
	// gradeImage
	//	获取歌曲信息
	fetch('https://charts.phicommunity.com.cn/' + play + '/meta.json')
		.then((response) => response.json())
		.then((data) => {
			window.window.playResult = {
				score: score,
				grade: grade,
				gradeURL: gradeURL,
				play: play,
				playLevel: playLevel,
				songInfo: data,
				maxCombo: maxCombo,
				accuracy: accuracy,
				perFect: perFect,
				good: good,
				bad: bad,
				miss: miss,
				early: early,
				late: late,
				playLevelString: playLevelString,
				mode: mode,
			};
			console.log(window.playResult);
			//	操作DOM修改可见部分数据
			let levelOverAudio=LevelOver0;
			switch (playLevel) {
			case 0:
				levelOverAudio=LevelOver0;
				break;
	
			case 1:
				levelOverAudio=LevelOver1;
				break;

			case 2:
				levelOverAudio=LevelOver2;
				break;

			case 3:
				levelOverAudio=LevelOver3;
				break;
		
			default:
				break;
			}
			fetch(levelOverAudio)
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
			document.body.setAttribute(
				'style',
				`--background:url(${encodeURI(
					'https://charts.phicommunity.com.cn/' +
						window.playResult.play +
						'/' +
						window.playResult.songInfo.illustration
				)});`
			);
			document
				.querySelector('#songImg')
				.setAttribute(
					'src',
					encodeURI(
						'https://charts.phicommunity.com.cn/' +
							play +
							'/' +
							window.playResult.songInfo.illustration
					)
				);
			document.querySelector('#score').innerText = score
				.toString()
				.padStart(7, '0');
			fetch(gradeURL)
				.then(res=>res.blob())
				.then(blob=>{
					document.querySelector('#gradeImage').src = URL.createObjectURL(blob);
				});
			document.querySelector('#maxCombo').innerText = maxCombo;
			document.querySelector('#accuracy').innerText = accuracy + '%';
			document.querySelector('#perfect').innerText = perFect;
			document.querySelector('#good').innerText = good;
			document.querySelector('#bad').innerText = bad;
			document.querySelector('#miss').innerText = miss;
			document.querySelector('#early').innerText = early;
			document.querySelector('#late').innerText = late;
			document.querySelector('div.songName#songName').innerText =
				window.playResult.songInfo.name;
			document.querySelector('div.levelString#levelString').innerText =
				window.playResult.playLevelString.toUpperCase() +
				' Lv.' +
				Math.floor(
					window.playResult.songInfo[
						window.playResult.playLevelString.toLowerCase() +
							'Ranking'
					] || 0
				);
			// 加载歌曲元信息（计算RKS等）
			var deltaRKS, deltaData;
			if (window.playResult.accuracy >= 70) {
				deltaRKS = (
					Math.pow((window.playResult.accuracy - 55) / 45, 2) *
					(window.playResult.songInfo[
						window.playResult.playLevelString.toLowerCase() +
							'Ranking'
					] || 0)
				).toFixed(2);
			} else {
				deltaRKS = 0;
			}
			if (window.playResult.score < 880000) {
				deltaData = 0;
			}
			document.querySelector('#rks').innerText = deltaRKS;
			console.log('ΔRKS:', deltaRKS);
			console.log('ΔData(KB):', deltaData);
		})
		.catch(() => {
			alert('歌曲信息获取失败！');
		});
});
// window.onresize = function () {
// 	//	自动缩放
// 	resize('div.mainContent');
// 	resize('body > div.extraInfo', 'skew(-15deg)');
// };
// function resize() {
// 	// document.body.querySelector(selector).style.transform="scale("+window.outerHeight/600+transformDefaultString+")";
// 	// console.log('Resize:',document.body.querySelector(selector).style.transform);
// }
