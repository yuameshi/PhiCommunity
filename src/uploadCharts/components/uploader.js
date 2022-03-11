export class Uploader extends HTMLElement {
	constructor() {
		super();

		/* 创建Shadow DOM */
		var shadow = this.attachShadow({ mode: 'open' });
		/* 创建模板 */
		var content = document.createElement('div');
		content.style = 'width:100%;height:100%';
		content.innerHTML = `
			<input type="file" id="__filechooser" accept="*" style="display: none"></input>
			<div class="uploader" id="__uploader">
				<span id="__icon" class="icon">image</span>
				<slot id="__tip" name="tip" class="tip">将文件 <em>拖放</em> 到此处，或 <em>点击此处</em> 选择文件</slot>
			</div>
		`;
		/* 创建样式 */
		const style = document.createElement('style');
		style.textContent = `
			.uploader {
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
    			align-items: center;
				font-family: Phi;
				user-select: none;
				background-color: #ffffff80;
				border: 2px dashed #d9d9d9;
				border-radius: 6px;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				text-align: center;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
			.uploader__isDragover {
				z-index: 10;
				width: 100%;
				height: 100%;
				pointer-events: none;
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: #eaeaeacc;
				box-shadow: inset 0 0 2rem 2rem #0000001a;
				border: 2px dashed #409eff;
			}
			.icon {
				pointer-events: none;
				font-family: 'Material Icons';
				font-weight: normal;
				font-style: normal;
				font-size: 6.6rem;
				color: #979899;
				display: inline-block;
				line-height: 1;
				text-transform: none;
				letter-spacing: normal;
				word-wrap: normal;
				white-space: nowrap;
				direction: ltr;
				-webkit-font-smoothing: antialiased;
				text-rendering: optimizeLegibility;
				-moz-osx-font-smoothing: grayscale;
				font-feature-settings: 'liga';
			}
			.tip {
				pointer-events: none;
				display: flex;
			}
			.tip > em {
				color: #409eff;
				font-weight: bold;
				font-style: normal;
			}
		`;

		/* 加载属性 */
		const icon = this.getAttribute('icon');
		const accept = this.getAttribute('accept');
		const maxSize = Number(this.getAttribute('max-size'));
		const isImage = Boolean(this.getAttribute('image'));
		content
			.querySelector('#__filechooser')
			.setAttribute('accept', accept ? accept : '*');
		content.querySelector('#__icon').textContent = icon ? icon : 'image';
		/* 加载元素 */
		var dragoverCover = document.createElement('div');
		dragoverCover.className = 'uploader__isDragover';
		var droptip = document.createElement('div');
		droptip.className = 'tip';
		droptip.style = 'z-index: 20';
		droptip.textContent = '松开手指 加载文件';
		dragoverCover.appendChild(droptip);
		shadow.appendChild(style);
		shadow.appendChild(content);

		/* 监听事件 */
		const that = this;
		this.$dropbox = shadow.getElementById('__uploader');
		this.$fileChooser = shadow.getElementById('__filechooser');
		this.$tip = shadow.getElementById('__tip');
		this.$icon = shadow.getElementById('__icon');
		this.$dropbox.addEventListener(
			'dragenter',
			(e) => {
				that.$dropbox.appendChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropbox.addEventListener(
			'dragleave',
			(e) => {
				that.$dropbox.removeChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropbox.addEventListener(
			'dragover',
			(e) => {
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropbox.addEventListener(
			'drop',
			(e) => {
				that.$dropbox.removeChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
				handleFiles(e.dataTransfer.files);
			},
			false
		);
		this.$dropbox.addEventListener(
			'click',
			(e) => {
				that.$fileChooser.click();
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$fileChooser.addEventListener(
			'change',
			function (e) {
				handleFiles(e.path[0].files);
			},
			false
		);

		/* 定义方法 */
		const handleFiles = (files) => {
			const file = files[0];
			if (!new RegExp(`(${accept.replaceAll(',', '|').replaceAll('.', '\\.')})$`).test(file.name)) {
				alert(`不支持的文件格式，支持的格式为：${accept}`);
				return ;
			}
			if (file.size > maxSize) {
				alert(`文件过大，文件大小限制为：${maxSize} B`);
				return ;
			}
			if (isImage) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function () {
					that.$icon.style = 'display: none';
					that.$tip.style = 'display: none';
					that.$dropbox.style.background = `url(${this.result}) center center no-repeat`;
					that.$dropbox.style.backgroundSize = 'cover';
				};
			}
		};
	}
}
