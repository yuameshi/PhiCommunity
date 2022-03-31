/**
 * @typedef {{
 * 	title: string,
 * 	codename: string
 * }} BaseSetting
 *
 * @typedef { BaseSetting & {
 *  range: [number,number],
 * 	defaultValue?: number = range[0],
 * 	offset: number = 1,
 * }} SlideSetting
 *
 *  @typedef { BaseSetting & {
 * 	defaultValue:boolean = false,
 * }} ToggleSetting
 *
 *  @typedef {{
 * 	title: string,
 * 	onClick: (this: GlobalEventHandlers, ev: MouseEvent) => any
 * }} ButtonSetting
 *
 */

/**
 * @type {Array <
 * (SlideSetting & {type: 'slide'})|
 * (ToggleSetting & {type: 'toggle'}|
 * (ButtonSetting & {type: 'button'})>
 * }
 */
export const settings = [
	{
		type: 'slide',
		title: '谱面延时(MS)',
		codename: 'input-offset',
		range: [-500, 500],
		defaultValue: 0,
		offset: 5,
	},
	{
		type: 'button',
		title: '根据声音调整偏移率',
		onClick() {
			location.href = './calibrate/index.html';
		},
	},
	{
		type: 'slide',
		title: '按键缩放',
		codename: 'select-scale-ratio',
		range: [1, 5],
		defaultValue: 3,
	},
	{
		type: 'slide',
		title: '背景亮度',
		codename: 'select-global-alpha',
		range: [1, 5],
		defaultValue: 3,
	},
	{
		type: 'toggle',
		title: '开启多押辅助',
		codename: 'highLight',
		defaultValue: true,
	},
	{
		type: 'toggle',
		title: '开启打击音效',
		codename: 'hitSong',
		defaultValue: true,
	},
	{
		type: 'toggle',
		title: '游玩时自动全屏',
		codename: 'autoFullscreen',
		defaultValue: true,
	},
	{
		type: 'toggle',
		title: '开启FC/AP指示器',
		codename: 'lineColor',
	},
	//下面就是模拟器其他的功能了
	{
		type: 'toggle',
		title: '开启低分辨率模式',
		codename: 'enableLowRes',
	},
	{
		type: 'slide',
		title: '界面宽高比',
		codename: 'select-aspect-ratio',
		range: [1, 8],
		defaultValue: 8,
	},
	{
		type: 'button',
		title: '界面宽高比数值说明',
		onClick() {
			alert(
				'1=>5:4     (1.25)\n2=>4:3     (1.333333)\n3=>10:7   (1.428571)\n4=>19:13 (1.461538)\n5=>8:5     (1.6)\n6=>5:3     (1.666667)\n7=>22:13 (1.692308)\n8=>16:9   (1.777778)'
			);
		},
	},
	{
		type: 'toggle',
		title: '开启HyperMode',
		codename: 'hyperMode',
	},
	{
		type: 'toggle',
		title: '启用旧版本打歌界面UI',
		codename: 'useOldUI',
	},
	{
		type: 'toggle',
		title: '背景模糊显示',
		codename: 'imageBlur',
		defaultValue: true,
	},
	// {
	// 	type: 'toggle',
	// 	title: '显示过渡动画',
	// 	codename: 'showTransition',
	// },
	{
		type: 'slide',
		title: '谱面倍速(10为1倍)',
		codename: 'chart-speedchange',
		range: [7, 15],
		defaultValue: 10,
		offset: 1,
	},
	{
		type: 'toggle',
		title: '启用AutoPlay',
		codename: 'autoplay',
	},
	{
		type: 'toggle',
		title: '游玩时使用背景动画作为背景',
		codename: 'useBGABG',
	},
	{
		type: 'toggle',
		title: '开启触摸反馈',
		codename: 'feedback',
	},
	{
		type: 'toggle',
		title: '显示定位点',
		codename: 'showPoint',
	},
	{
		type: 'button',
		title: '观看教学',
		onClick() {
			location.href = '../whilePlaying/index.html?play=tutorial&l=ez';
		},
	},
	{
		type: 'button',
		title: '修改玩家昵称',
		onClick() {
			const name = prompt('输入昵称', localStorage.getItem('playerName')||'GUEST');
			if (name ==''||name==null||name==undefined) {
				console.error('Failed to set player name : Empty input');
				return;
			}
			localStorage.setItem('playerName', name);
		},
	},
	{
		type: 'button',
		title: '修改玩家头像',
		onClick() {
			const avatar = prompt(
				'在下方的输入框内以Data URI的格式粘贴您的图像，注意不要超过4MB', 
				localStorage.getItem('playerAvatar')
				||'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGRlZnM+DQogICAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGlkPSJhcnRib2FyZF8xIiAvPg0KICAgIDxjbGlwUGF0aCBpZD0iY2xpcF8xIj4NCiAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2FydGJvYXJkXzEiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQogIDxnIGlkPSJBdmF0YXIiIGNsaXAtcGF0aD0idXJsKCNjbGlwXzEpIj4NCiAgICA8dXNlIHhsaW5rOmhyZWY9IiNhcnRib2FyZF8xIiBzdHJva2U9Im5vbmUiIGZpbGw9IiNGRjAwMDAiIC8+DQogICAgPGcgaWQ9IuaCqCIgZmlsbD0iI0ZGRkYwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcuNSA5KSI+DQogICAgICA8cGF0aCBkPSJNMTggMzAuNjA5NFEyNS4zNzUgMjIuNzM0NCAzMC4wNjI1IDEyLjQyMTlMMzQuOTM3NSAxMy41NDY5UTMzLjU2MjUgMTYuNDg0NCAzMi4wNjI1IDE5LjE3MTlMNjAuNSAxOS4xNzE5TDYwLjUgMjMuMjM0NEw1Ni4xODc1IDMyLjIzNDRRNTMuODc1IDMxLjA0NjkgNTEuNzUgMzAuMDQ2OUw1NSAyMy40MjE5TDI5LjU2MjUgMjMuNDIxOVEyNi4wNjI1IDI5LjA0NjkgMjIgMzMuNTQ2OVEyMC4yNSAzMi4yMzQ0IDE4IDMwLjYwOTRaTTE2LjA2MjUgNTMuNjA5NEwyMC44MTI1IDUzLjYwOTRMMjAuODEyNSA2My45MjE5UTIwLjgxMjUgNjcuODU5NCAyNS4wNjI1IDY3Ljg1OTRMMzguNTYyNSA2Ny44NTk0UTQzLjE4NzUgNjcuODU5NCA0NCA2NC4yMzQ0UTQ0LjgxMjUgNjEuMTcxOSA0NS4zMTI1IDU3LjA0NjlRNDcuNTYyNSA1Ny45ODQ0IDUwLjEyNSA1OC44NTk0UTQ5LjMxMjUgNjMuMzU5NCA0OC42MjUgNjUuOTg0NFE0Ny4xMjUgNzIuMjk2OSAzOS42MjUgNzIuMjk2OUwyNC4xMjUgNzIuMjk2OVExNi4wNjI1IDcyLjI5NjkgMTYuMDYyNSA2NC41NDY5TDE2LjA2MjUgNTMuNjA5NFpNMTQuNzUgMTEuOTg0NEwxOS4zMTI1IDE0LjEwOTRRMTYuNzgxMyAxOC4zOTA2IDE0LjE4NzUgMjIuMzI4MUwxNC4xODc1IDUwLjIzNDRMOS40Mzc1IDUwLjIzNDRMOS40Mzc1IDI5LjEwOTRRNi44NDM3NSAzMi41NzgxIDQuMTg3NSAzNS43MzQ0UTIuNjg3NSAzMy45ODQ0IDAuNjg3NSAzMS45ODQ0UTguOTM3NSAyMy4xMDk0IDE0Ljc1IDExLjk4NDRaTTM5LjA2MjUgMjcuMTA5NEw0My44MTI1IDI3LjEwOTRMNDMuODEyNSA0Mi4xNzE5UTQzLjgxMjUgNDkuNTQ2OSAzNi41IDQ5LjU0NjlRMzQuMTg3NSA0OS41NDY5IDMwLjI1IDQ5LjQ4NDRRMjkuOTM3NSA0Ny4zNTk0IDI5LjMxMjUgNDQuNDIxOVEzMi42ODc1IDQ0Ljg1OTQgMzUuMTg3NSA0NC44NTk0UTM5LjA2MjUgNDQuODU5NCAzOS4wNjI1IDQwLjY3MTlMMzkuMDYyNSAyNy4xMDk0Wk00Ni43NSAzNi40ODQ0TDQ5LjkzNzUgMzMuMTcxOVE1Ni4xODc1IDM3Ljk4NDQgNjIuNjI1IDQzLjg1OTRMNTkuMTI1IDQ3LjczNDRRNTIuODEyNSA0MS40MjE5IDQ2Ljc1IDM2LjQ4NDRaTTI5LjY4NzUgMzIuMTA5NEwzMy40Mzc1IDM0LjkyMTlRMjguMTI1IDQxLjA0NjkgMjEuMTg3NSA0Ny42MDk0UTE5Ljc1IDQ2LjEwOTQgMTcuNjg3NSA0NC4yOTY5UTIzLjkzNzUgMzguODU5NCAyOS42ODc1IDMyLjEwOTRaTTQ5LjE4NzUgNTMuNjcxOUw1Mi45Mzc1IDUwLjk4NDRRNTguODEyNSA1Ny42MDk0IDYzLjQzNzUgNjMuNzk2OUw1OS40Mzc1IDY2LjkyMTlRNTQuMzc1IDU5Ljc5NjkgNDkuMTg3NSA1My42NzE5Wk03Ljg3NSA1My4xMDk0TDEyLjQzNzUgNTQuNjcxOVE5LjQzNzUgNjIuOTg0NCA2LjMxMjUgNjkuNDIxOVE0LjMxMjUgNjguNTQ2OSAxLjY4NzUgNjcuNjA5NFE1LjYyNSA2MC40MjE5IDcuODc1IDUzLjEwOTRaTTI2LjA2MjUgNTMuNDIxOUwyOS4yNSA1MC40MjE5UTM0LjQzNzUgNTQuNDg0NCAzOC45Mzc1IDU4LjkyMTlMMzUuMzEyNSA2Mi4zNTk0UTMxIDU3LjYwOTQgMjYuMDYyNSA1My40MjE5WiIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg=='
			);
			if (avatar ==''||avatar==null||avatar==undefined) {
				console.error('Failed to set player avatar : Empty input');
				return;
			}
			localStorage.setItem('playerAvatar', avatar);
		},
	},
	{
		type: 'button',
		title: '关于我们',
		onClick() {
			location.href = '../aboutUs/index.html';
		},
	},
	{
		type: 'button',
		title: '清除全部数据',
		onClick() {
			window.localStorage.clear();
			location.href = '../index.html';
		},
	},
	{
		type: 'button',
		title: '导出本地数据到剪贴板',
		onClick() {
			navigator.clipboard.writeText(JSON.stringify(localStorage));
			this.innerHTML = '<img src="../assets/images/Tick.svg"> 成功';
			const timeout = setTimeout(() => {
				this.innerHTML = '导出本地数据到剪贴板';
				clearTimeout(timeout);
			}, 2000);
		},
	},
	{
		type: 'button',
		title: '从剪贴板导入数据',
		onClick() {
			navigator.clipboard.readText().then((clipText) => {
				try {
					const clipTextObj = JSON.parse(clipText);
					const clipTextObjKeys = Object.keys(clipTextObj);
					for (const keys in clipTextObjKeys) {
						console.log(keys, clipTextObj[keys]);
						localStorage.setItem(
							clipTextObjKeys[keys],
							clipTextObj[clipTextObjKeys[keys]]
						);
					}
					this.innerHTML =
						'<img src="../assets/images/Tick.svg"> 成功';
					const timeout = setTimeout(() => {
						this.innerHTML = '导出本地数据到剪贴板';
						clearTimeout(timeout);
					}, 2000);
					location.reload();
				} catch (error) {
					alert('导入失败，请检查剪贴板内容是否正确\n' + error);
				}
			});
		},
	},
];
