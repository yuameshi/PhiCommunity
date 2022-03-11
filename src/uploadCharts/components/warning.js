export class Warning extends HTMLElement {
	constructor() {
		super();

		/* 创建Shadow DOM */
		var shadow = this.attachShadow({ mode: 'open' });
		/* 创建模板 */
		var content = document.createElement('div');
		content.className = 'warning';
		content.innerHTML = `
			<summary id="__title">请注意</summary>
			<slot id="__content"></slot>
		`;
		/* 创建样式 */
		const style = document.createElement('style');
		style.textContent = `
			.warning {
				background-color: #ffffff;
				text-size-adjust: none;
				line-height: 1.6;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
					0 3px 1px -2px rgba(0, 0, 0, 0.2);
				position: relative;
				padding: 0 0.6rem;
				border-left: 0.2rem solid #ff9100;
				border-radius: 0.1rem;
				overflow: auto;
				display: block;
				margin: 1em 0 0.6rem;
			}
			.warning > summary {
				box-sizing: inherit;
				display: block;
				line-height: 1.6;
				margin: 0 -0.6rem;
				padding: 0.4rem 0.6rem 0.4rem 3rem;
				border-bottom: 0.05rem solid rgba(68, 138, 255, 0.1);
				font-weight: 700;
				padding-right: 2rem;
				border-bottom-color: rgba(255, 145, 0, 0.2);
				background-color: rgba(255, 145, 0, 0.2);
			}
			.warning > summary::before {
				position: absolute;
				left: 0.6rem;
				font-family: 'Material Icons' !important;
				font-style: normal !important;
				font-size: 1.5rem;
				content: '';
				color: rgb(255, 145, 0);
				font-variant: normal;
				font-weight: 400;
				line-height: 1;
				text-transform: none;
				white-space: nowrap;
				word-wrap: normal;
				direction: ltr;
			}
		`;
		
		/* 加载属性 */
		const title = this.getAttribute('title');
		if (title) {
			content.querySelector('#__title').innerText = title;
		}
		/* 加载元素 */
		shadow.appendChild(style);
		shadow.appendChild(content);
	}
}
