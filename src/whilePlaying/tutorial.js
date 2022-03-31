function showText(text, showTime) {
	const container = document.createElement('div');
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.justifyContent = 'center';
	container.style.textAlign = 'center';
	container.style.pointerEvents = 'none';
	container.style.alignItems = 'center';
	container.style.position = 'fixed';
	container.style.top = '0';
	container.style.left = '0';
	container.style.right = '0';
	container.style.bottom = '0';
	container.style.transition = 'all linear 0.3s';
	setTimeout(() => {
		container.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
	}, 100);
	container.style.zIndex = '9999';
	container.style.color = 'white';
	container.style.width = '100vw';
	container.style.height = '100vh';
	container.innerHTML = text;
	document.body.appendChild(container);
	const clearTextTimeOut = setTimeout(() => {
		container.remove();
		clearTimeout(clearTextTimeOut);
	}, showTime || Infinity);
}
function drawTutorial(stage) {
	switch (stage) {
	case 0:
		showText(
			'<h1>欢迎来到PhiCommunity!</h1>现在将进行基本的游戏玩法教学。',
			2000
		);
		break;
	case 1:
		showText(
			'左上角是暂停按钮，右上角是您的分数<br />下方是歌曲和难度信息<br/>屏幕中央的是判定线<br/>音符将落在判定线上',
			2000
		);
		break;
	case 2:
		showText('首先是Tap音符<br/>当它们落到判定线上时点击它们', 1000);
		break;
	case 3:
		showText(
			'接下来是Hold音符<br/>当它们落到判定线上时长按它们直至结束',
			2000
		);
		break;
	case 4:
		showText('然后是Drag音符<br/>当它们落到判定线上时接住它们', 3000);
		break;
	case 5:
		showText(
			'最后是Flick音符<br/>当它们落到判定线上向任意方向滑动',
			4000
		);
		break;
	case 6:
		showText('让我们把所有的元素综合起来', 2000);
		break;
	case 7:
		showText('判定线还会旋转，移动，显现，消失', 4000);
		break;
	case 8:
		showText(
			'最后，希望你在PhiCommunity游玩愉快<br/>有任何Bug及时到GitHub反馈噢',
			2000
		);
		break;

	default:
		break;
	}
}

function renderTutorialByTime(time) {
	time = parseInt(time) - 3;
	if (time > 0 && time < 2) {
		if (window.tutorialStage == undefined) {
			drawTutorial(0);
			window.tutorialStage = 1;
		}
	}
	if (time > 2 && time < 4) {
		if (window.tutorialStage == 1) {
			drawTutorial(1);
			window.tutorialStage = 2;
		}
	}
	if (time > 4 && time < 5) {
		if (window.tutorialStage == 2) {
			drawTutorial(2);
			window.tutorialStage = 3;
		}
	}
	if (time > 18 && time < 20.5) {
		if (window.tutorialStage == 3) {
			drawTutorial(3);
			window.tutorialStage = 4;
		}
	}
	if (time > 38 && time < 43) {
		if (window.tutorialStage == 4) {
			drawTutorial(4);
			window.tutorialStage = 5;
		}
	}
	if (time > 54 && time < 60) {
		if (window.tutorialStage == 5) {
			drawTutorial(5);
			window.tutorialStage = 6;
		}
	}
	if (time > 60 && time < 70) {
		if (window.tutorialStage == 6) {
			drawTutorial(7);
			window.tutorialStage = 7;
		}
	}
	if (time > 79 && time < 82) {
		if (window.tutorialStage == 7) {
			drawTutorial(6);
			window.tutorialStage = 8;
		}
	}
	if (time > 122 && time < Infinity) {
		if (window.tutorialStage == 8) {
			drawTutorial(8);
			window.tutorialStage = 9;
		}
	}
}
function drawTutorialSP(stage) {
	switch (stage) {
	case 0:
		showText(
			'<h1>欢迎来到PhiCommunity!</h1>现在将进行<b style="color: #6cf">基本的</b>游戏玩法教学。',
			2000
		);
		break;
	case 1:
		showText(
			'左上角是暂停按钮，右上角是您的分数<br />下方是歌曲和难度信息<br/>屏幕中央的是判定线<br/>音符将落在判定线上',
			2000
		);
		break;
	case 2:
		showText('首先是Tap音符<br/>当它们落到判定线上时点击它们', 1000);
		break;
	case 3:
		showText('然后是Drag音符<br/>当它们落到判定线上时接住它们', 2000);
		break;
	case 4:
		showText(
			'接下来是Hold音符<br/>当它们落到判定线上时长按它们直至结束',
			2000
		);
		break;
	case 5:
		showText('那先来熟悉一下这三种音符吧', 4000);
		break;
	case 6:
		showText(
			'最后是Flick音符<br/>当它们落到判定线上向任意方向滑动',
			4000
		);
		break;
	case 7:
		showText(
			'判定线还会旋转，移动，显现，消失<br/>其还有另一面可以判定',
			4000
		);
		break;
	case 8:
		showText('让我们把所有的元素综合起来', 2000);
		break;
	case 9:
		showText(
			'最后，希望你在PhiCommunity游玩愉快<br/>有任何Bug及时到GitHub反馈噢',
			2000
		);
		break;

	default:
		break;
	}
}
function renderTutorialSPByTime(time) {
	time = parseInt(time) - 3;
	if (time > 0 && time < 2) {
		if (window.tutorialStage == undefined) {
			drawTutorialSP(0);
			window.tutorialStage = 1;
		}
	}
	if (time > 2 && time < 4) {
		if (window.tutorialStage == 1) {
			drawTutorialSP(1);
			window.tutorialStage = 2;
		}
	}
	if (time > 4 && time < 6) {
		if (window.tutorialStage == 2) {
			drawTutorialSP(2);
			window.tutorialStage = 3;
		}
	}
	if (time > 18.5 && time < 20) {
		if (window.tutorialStage == 3) {
			drawTutorialSP(3);
			window.tutorialStage = 4;
		}
	}
	if (time > 30 && time < 31) {
		if (window.tutorialStage == 4) {
			drawTutorialSP(4);
			window.tutorialStage = 5;
		}
	}
	if (time > 32 && time < 34) {
		if (window.tutorialStage == 5) {
			drawTutorialSP(5);
			window.tutorialStage = 6;
		}
	}
	if (time > 84 && time < 86) {
		if (window.tutorialStage == 6) {
			drawTutorialSP(7);
			window.tutorialStage = 7;
		}
	}
	if (time > 79 && time < 82) {
		if (window.tutorialStage == 7) {
			drawTutorialSP(6);
			window.tutorialStage = 8;
		}
	}
	if (time > 102 && time < 104) {
		if (window.tutorialStage == 8) {
			drawTutorialSP(8);
			window.tutorialStage = 9;
		}
	}
	if (time > 145 && time < 150) {
		if (window.tutorialStage == 8) {
			drawTutorialSP(8);
			window.tutorialStage = 9;
		}
	}
}

export { renderTutorialSPByTime, renderTutorialByTime };
