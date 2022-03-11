import './style.css';
import { Uploader, Warning } from './components/index';
window.addEventListener('DOMContentLoaded', () => {
	customElements.define('drag-uploader', Uploader);
	customElements.define('notice-warning', Warning);
});