export class InputField extends HTMLElement {
	constructor() {
		super();

		/* 创建Shadow DOM */
		var shadow = this.attachShadow({ mode: 'open' });
		/* 创建模板 */
		var content = document.createElement('div');
		content.innerHTML = `
			<span id="__inpur-required-mark" class="input-required">*</span>
			<div id="__input-label" class="input-label"></div>
			<input type="text" id="__input-field" class="input-field"></input>
		`;
		/* 创建样式 */
		const style = document.createElement('style');
		style.textContent = `
			.input-label {
				display: inline-flex;
				font-family: Phi;
				margin: 0;
				color: #ffffff;
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
			}
			.input-required {
				color: #00ffd8;
				display: inline-flex;
				margin-left: 3%;
			}
			.input-field {
				font-family: Phi;
				font-size: 14px;
				width: 93%;
				margin: 8px 2% 12px;
				border: 0;
				padding: 2px 6px;
				border-radius: 6px;
				min-height: 22px;
			}
			.input-field__title {
				font-size: 2em;
				font-weight: bold;
			}
		`;

		/* 加载属性 */
		const placeholder = this.getAttribute('placeholder');
		const label = this.getAttribute('label');
		const required = this.hasAttribute('required');
		this.$inputField = content.querySelector('#__input-field');
		this.$inputLabel = content.querySelector('#__input-label');
		if (this.hasAttribute('title')) {
			this.$inputField.classList.add('input-field__title');
		}
		this.$inputField.setAttribute('placeholder', placeholder ? placeholder : '');
		if (label) {
			this.$inputLabel.textContent = label;
		} else {
			content.removeChild(this.$inputLabel);
		}
		/* 加载元素 */
		shadow.appendChild(style);
		shadow.appendChild(content);

		/* 监听事件 */
		const that = this;
		this.$inputField.addEventListener(
			'input',
			(e) => {
				e.stopPropagation();
				e.preventDefault();
				shadow.dispatchEvent(new CustomEvent('input', {
					composed: true,
					detail: {
						value: e.target.value
					}
				}))
			},
			false
		);
		this.$inputField.addEventListener(
			'blur',
			(e) => {
				e.stopPropagation();
				e.preventDefault();
				shadow.dispatchEvent(new CustomEvent('blur', {
					composed: true,
					detail: {
						value: e.target.value
					}
				}))
			},
			false
		);
	}
}
