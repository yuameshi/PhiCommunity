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
			<div style="margin-left: 3%">
				<div id="__required-mark" class="required-mark">*</div>
				<div id="__field-label" class="field-label"></div>
			</div>
			<div class="uploader" id="__uploader">
				<span id="__icon" class="icon">image</span>
				<slot id="__tip" name="tip" class="tip">将文件 <em>拖放</em> 到此处，或 <em>点击此处</em> 选择文件</slot>
				<div id="__uploader-click"></div>
				<div id="__file-bar" class="file-bar">
					<div style="display: flex; align-items: center">
						<span id="__err-icon" class="icon" style="display: none">report</span>
						<p id="__file-name">未上传文件</p>
					</div>
					<slot name="file-bar"></slot>
					<button id="__file-choose" class="file-choose">选择文件</button>
					<button id="__file-delete" class="file-delete">删除文件</button>
				</div>
			</div>
		`;
		/* 创建样式 */
		const style = document.createElement('style');
		style.textContent = `
			#__uploader-click {
				cursor: pointer;
				position: absolute;
				top: 0;
				background: transparent;
				width: 100%;
				height: calc(100% - 42px);
			}
			#__icon {
				font-size: 6.6rem;
				color: #575758;
			}
			#__err-icon {
				color: #ff0000;
    			font-size: 1.6rem;
				margin-right: 4px;
			}
			.field-label {
				display: inline-flex;
				font-family: Phi;
				margin: 0;
				color: #ffffff;
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
			}
			.required-mark {
				color: #00ffd8;
				display: inline-flex;
			}
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
				margin: 8px 2%;
				border-radius: 6px;
				box-sizing: border-box;
				width: 96%;
				height: 100%;
				text-align: center;
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
			}
			.icon {
				pointer-events: none;
				font-family: 'Material Icons';
				font-weight: normal;
				font-style: normal;
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
				color: #000000;
				pointer-events: none;
				display: flex;
			}
			.tip > em {
				color: #0d10cd;
				font-weight: bold;
				font-style: normal;
			}
			.file-bar {
				display: flex;
				justify-content: space-around;
				align-items: center;
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 42px;
				background-color: #000000c0;
				color: #ffffff;
			}
			.file-bar .file-choose {
				display: none;
				height: 32px;
			}
			.file-bar .file-delete {
				display: none;
				height: 32px;
				background-color: #e08bbe;
				border-radius: 6px;
				border: 1px solid red;
			}
			.file-bar .file-delete:hover {
				background-color: #bb749e;
			}
		`;

		/* 加载属性 */
		const icon = this.getAttribute('icon');
		const accept = this.getAttribute('accept');
		const maxSize = Number(this.getAttribute('max-size'));
		const type = this.getAttribute('type');
		content
			.querySelector('#__filechooser')
			.setAttribute('accept', accept ? accept : '*');
		content.querySelector('#__icon').textContent = icon ? icon : 'cloud_upload';
		if (!this.hasAttribute('required')) {
			content.querySelector('#__required-mark').style = 'display: none';
		}
		if (this.hasAttribute('label')) {
			content.querySelector('#__field-label').textContent = this.getAttribute('label');
		} else {
			content.querySelector('#__field-label').style = 'display: none';
		}
		if (this.hasAttribute('error')) {
			content.querySelector('#__err-icon').style = 'display: initial';
		}
		if (this.hasAttribute('inline')) {
			content.querySelector('#__uploader').style = 'height: 46px';
			content.querySelector('#__file-choose').style = 'display: initial';
		}
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
		this.$dropboxClick = shadow.getElementById('__uploader-click')
		this.$fileChooser = shadow.getElementById('__filechooser');
		this.$delBtn = shadow.getElementById('__file-delete');
		this.$chooseBtn = shadow.getElementById('__file-choose');
		this.$tip = shadow.getElementById('__tip');
		this.$icon = shadow.getElementById('__icon');
		this.$errIcon = shadow.getElementById('__err-icon');
		this.$dropboxClick.addEventListener(
			'dragenter',
			(e) => {
				that.$dropbox.appendChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropboxClick.addEventListener(
			'dragleave',
			(e) => {
				that.$dropbox.removeChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropboxClick.addEventListener(
			'dragover',
			(e) => {
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$dropboxClick.addEventListener(
			'drop',
			(e) => {
				that.$dropbox.removeChild(dragoverCover);
				e.stopPropagation();
				e.preventDefault();
				handleFiles(e.dataTransfer.files);
			},
			false
		);
		this.$dropboxClick.addEventListener(
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
				e.stopPropagation();
				e.preventDefault();
			},
			false
		);
		this.$delBtn.addEventListener(
			'click',
			(e) => {
				deleteFile();
				e.stopPropagation();
				e.preventDefault();
			},
			false
		)
		this.$chooseBtn.addEventListener(
			'click',
			(e) => {
				that.$fileChooser.click();
				e.stopPropagation();
				e.preventDefault();
			},
			false
		)

		/* 定义方法 */
		const handleFiles = (files) => {
			const file = files[0];
			if (!new RegExp(`(${accept.replaceAll(',', '|').replaceAll('.', '\\.')})$`).test(file.name)) {
				alert(`不支持的文件格式，支持的格式为：${accept.replaceAll(',', ', ')}`);
				return ;
			}
			if (maxSize && file.size > maxSize) {
				alert(`文件过大，文件大小限制为：${maxSize} B`);
				return ;
			}
			this.$delBtn.style = 'display: initial';
			shadow.getElementById("__file-name").textContent = file.name;
			shadow.dispatchEvent(new CustomEvent('afterread', {
				composed: true,
				detail: file
			}));
			if (type === 'image') {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function (e) {
					if (!e.target.result) {
						alert('文件读取失败，请检查文件是否损坏。');
						return ;
					}
					that.$icon.style = 'display: none';
					that.$tip.style = 'display: none';
					that.$dropbox.style.background = `url(${e.target.result}) center center no-repeat`;
					that.$dropbox.style.backgroundSize = 'cover';
				};
			}
		};
		const deleteFile = () => {
			this.$icon.style = '';
			this.$tip.style = '';
			this.$dropbox.style.background = '';
			this.$delBtn.style = '';
			shadow.getElementById("__file-name").textContent = '未上传文件';
			shadow.dispatchEvent(new CustomEvent('ondelete', {
				composed: true
			}));
		}
	}

	static get observedAttributes() {
		return ['error'];
	}

	get error() {
		return this.hasAttribute('error');
	}

	set error(val) {
		if (val) {
		  	this.$errIcon.style = 'display:initial';
		} else {
			this.$errIcon.style = 'display:none';
		}
	}
}
