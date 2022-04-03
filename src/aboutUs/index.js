import { createElement, br } from 'dom-element-factory';
import './style.css';
import AboutUs_mp3 from './AboutUs.mp3';
import { Trigger } from './Trigger';

const thanks = [
	`At First / 写在前面
	我是憨憨 (HanHan233)
	如你所见，PhiCommunity是一个仿照Phigros制作基于HTML5的游戏。
	也感谢Pigeon Games创造出Phigros这一如此好玩的游戏。
	顺便这里特别感谢lchzh3473的Phigros模拟器，没有它，这个项目消耗的时间可能要长数倍。
	PhiCommunity已经在GitHub开源，人人皆可贡献。
	你可以在其中上传自己的谱面（粪谱就算了），改进代码，我十分欢迎这样做，大家共同进步。

	祝你们在这里玩得愉快

	具有较大贡献的社区人员 / Developers
	HanHan233						开发者
	lchzh3473 							开发者
	熙晨	 						代码优化
	DrYeXiu	 					背景图片
	万炯鸣		 				部分背景音乐
	爱音乐de大神🎶	部分背景音乐思路提供
	余音歆风						测试人员
	守约							测试人员`,
	`感谢所有为PhiCommunity提供帮助的个人或团体`,
	['And', br(), 'You.', br()],
];

const main = Main();

const exitPrompt = ExitPrompt();

const onTriggered = () => {
	const actx = new (window.AudioContext ||
		window.webkitAudioContext ||
		window.mozAudioContext ||
		window.msAudioContext)();

	fetch(AboutUs_mp3)
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

	main.scrollStart(() => {
		setTimeout(() => {
			actx == undefined ? undefined : actx.close();
			location.href = '../chapterSelect/index.html';
		}, 3000);
	});

	let exitCounter = 6;
	document.body.addEventListener('click', () => {
		exitCounter--;
		exitPrompt.prompt(exitCounter);

		if (exitCounter <= 0) {
			setTimeout(() => {
				actx == undefined ? undefined : actx.close();
				location.href = '../chapterSelect/index.html';
			}, 1000);
		}
		const bactToMinScreenTimeOut = setTimeout(() => {
			exitCounter = 6;
			/* 		setTimeout(() => {
			document.querySelector('div.clickToExitTag').innerText =
				'再点击' + window.clickToExitCounter + '次以跳过';
		}, 300); */
			exitPrompt.unVisible();
			clearTimeout(bactToMinScreenTimeOut);
		}, 5000);
	});
};

const trigger = Trigger(onTriggered);

document.body.append(...[trigger, exitPrompt, main].map((c) => c.element));

function ExitPrompt() {
	const element = createElement('div', {
		class: 'clickToExitTag',
	});
	return { element, prompt, unVisible };

	function prompt(num) {
		element.innerText = '再点击' + num + '次以跳过';
		element.style.opacity = '0.' + (10 - num);
	}

	function unVisible() {
		element.style.opacity = 0;
	}
}

function Main() {
	const element = createElement(
		'div',
		{
			id: 'main',
		},
		[
			createElement(
				'pre',
				{
					class: 'fromGameDirector',
				},
				thanks[0]
			),
			createElement(
				'div',
				{
					class: 'thanksAllHelpers',
				},
				thanks[1]
			),
			createElement(
				'div',
				{
					class: 'thankYou',
				},
				thanks[2]
			),
		]
	);

	return { element, scrollStart };

	//	自动滚动，通过持续修改CSS的Margin Top实现
	// window.addEventListener('DOMContentLoaded',()=>{
	// 	autoScroll();
	// });
	function scrollStart(onScrollEnd) {
		let topSize = window.innerHeight;
		element.style.setProperty('--topSize', topSize + 'px');

		const autoScrollInterval = setInterval(() => {
			if (element.offsetTop < window.innerHeight * -2.25 == true) {
				console.log('The END!');
				clearInterval(autoScrollInterval);
				onScrollEnd();
			}
			element.style.setProperty('--topSize', topSize + 'px');
			// document.body.style.marginTop=topSize+'px';
			topSize -= 0.5;
		}, 12); //	此数字改小同时topSize需要相应改小，改小后滑动更细腻，但是资源占用会增大
	}
}
