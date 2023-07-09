import { useLayoutEffect, useState } from 'react';

const debounce = (func) => {
	let timer;
	return function (...args) {
		const context = this;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			func.apply(context, args);
		}, 200);
	};
};

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useLayoutEffect(() => {
		const updateSize = (): void => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener('resize', debounce(updateSize));
		return (): void => window.removeEventListener('resize', updateSize);
	}, []);

	return isMobile;
}
