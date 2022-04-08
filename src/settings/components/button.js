/**
 * @param {import('../setting').ButtonSetting} option
 */
export function ButtonItem({ title, onClick }) {
	const container = document.createElement('div');
	container.className = 'item';

	const button = document.createElement('button');
	button.innerText = title;
	button.className = 'button';

	container.appendChild(button);

	if (title=='修改玩家头像') {
		const fileBtn = document.createElement('input');
		fileBtn.type = 'file';
		fileBtn.accept = '.png,.jpg,.jpeg,.webp';
		fileBtn.id = 'fileBtn';
		fileBtn.style = 'display:none';
		fileBtn.addEventListener(
			'change',
			function (e) {
				let file = e.path[0].files[0];
				if (!/(.png|.jpg|.jpeg|.webp)$/.test(file.name)) {
					alert('不支持的文件格式，支持的格式为：png, jpg, jpeg, webp');
					return ;
				}
				if (file.size > 4194304) {
					alert(`头像过大，大小限制为：4MB`);
					return;
				}

				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function () {
					const avatar = reader.result;
					if (avatar==''||avatar==null||avatar==undefined) {
						console.error('Failed to set player avatar : Empty input');
						return;
					}
					localStorage.setItem('playerAvatar', avatar);
				}
				e.stopPropagation();
				e.preventDefault();
			},
			false
		)
		container.appendChild(fileBtn);
	}

	button.onclick = onClick;

	return { element: container };
}
