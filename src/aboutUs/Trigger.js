import { createElement } from 'dom-element-factory';
import Title_svg from '/assets/images/Title.svg';

export const Trigger = (onTriggered) => {
	const element = createElement(
		'div',
		{
			class: 'trigger',
		},
		[
			createElement('img', {
				src: Title_svg,
				alt: 'PhiCommunity',
				class: 'title',
			}),
			createElement(
				'div',
				{
					class: 'tapToStart',
				},
				'touch to start'
			),
		]
	);

	const onTrigger = () => {
		element.removeEventListener('click', onTrigger);
		element.classList.add('fadeout');
		setTimeout(() => {
			element.remove();
			onTriggered();
		}, 1000);
	};

	element.addEventListener('click', onTrigger);

	return { element };
};
