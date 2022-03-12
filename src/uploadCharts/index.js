import './style.css';
import { Uploader, Warning, InputField } from './components/index';
window.addEventListener('DOMContentLoaded', () => {
	customElements.define('drag-uploader', Uploader);
	customElements.define('notice-warning', Warning);
	customElements.define('input-field', InputField);

	var meta = new Object();
	var illustration = new Object();

	const illustUploader = document.getElementById('illustUploader');
	const codenameField = document.getElementById('codename');

	illustUploader.addEventListener('afterread', function (e) {
		illustration['file'] = e.detail;
		meta['illustration'] = illustration.file.name;
		e.preventDefault();
		e.stopPropagation();
	})
	codenameField.addEventListener('input', function (e) {
		meta['codename'] = e.detail.value;
	})
	codenameField.addEventListener('blur', function (e) {
		meta['codename'] = e.detail.value;
	})
});