import './style.css';
import tips from 'assets/tips.json';

window.addEventListener('DOMContentLoaded', () => {
	const rndNum = parseInt(Math.random() * (tips.length + 1), 10);
	const tip = tips[rndNum];
	console.log(tip);
	document.querySelector('#tipConteiner').innerText = tip;
});
