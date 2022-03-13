import './style.css';
import { Uploader, Warning, InputField } from './components/index';

window.addEventListener('DOMContentLoaded', () => {
	customElements.define('drag-uploader', Uploader);
	customElements.define('notice-warning', Warning);
	customElements.define('input-field', InputField);

	var meta = new Object();
	var files = new Object();

	document.querySelectorAll('drag-uploader').forEach((element) =>
		element.addEventListener('afterread', (e) => {
			files[e.target.id] = e.detail;
			meta[e.target.id] = e.detail.name;
			e.stopPropagation();
			e.preventDefault();
		})
	);
	document.querySelectorAll('drag-uploader').forEach((element) =>
		element.addEventListener('ondelete', (e) => {
			files[e.target.id] = null;
			meta[e.target.id] = null;
			e.stopPropagation();
			e.preventDefault();
		})
	);
	document.querySelectorAll('input-field').forEach((element) =>
		element.addEventListener('blur', (e) => {
			meta[e.target.id] = e.detail.value;
			const lv = /^([a-z]{2})Ranking$/.exec(e.target.id);
			if (lv) {
				document
					.querySelector(`div#${lv[1]}`)
					.setAttribute('data-level', e.detail.value);
			}
			e.stopPropagation();
			e.preventDefault();
		})
	);

	const arrow = document.querySelector('div#arrow');
	const chartContainer = document.querySelector('div#chart-container');
	document.querySelectorAll('div.levelItem').forEach((element) =>
		element.addEventListener('click', (e) => {
			if (
				e.target.classList.contains('selected') &&
				!arrow.classList.contains('hidden')
			) {
				arrow.classList.value = 'hidden';
				chartContainer.classList.value = 'hidden';
				return;
			}
			document
				.querySelector('div.levelItem.selected')
				.classList.remove('selected');
			e.target.classList.add('selected');
			arrow.className = e.target.id;
			chartContainer.className = e.target.id;
			document.querySelector('.chart.selected').classList.value =
				'chart hidden';
			document.querySelector(
				`#chart${e.target.id.toUpperCase()}`
			).classList.value = 'chart selected';
			document
				.querySelectorAll('.chartField.selected')
				.forEach((element) => {
					element.classList.value = 'chartField hidden';
				});
			document.querySelector(`#${e.target.id}Ranking`).classList.value =
				'chartField selected';
			document.querySelector(
				`#${e.target.id}ChartDesigner`
			).classList.value = 'chartField selected';
		})
	);
});
