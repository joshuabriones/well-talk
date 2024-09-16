export default function getScrollAnimation() {
	return {
		offscreen: {
			y: 50,
			opacity: 0,
		},
		onScreen: ({ duration = 1 } = {}) => ({
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration,
				ease: "easeInOut",
			},
		}),
	};
}

export function getFadeInFromRightAnimation() {
	return {
		offscreen: {
			x: 50,
			opacity: 0,
		},
		onScreen: ({ duration = 1 } = {}) => ({
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				duration,
				ease: "easeInOut",
			},
		}),
	};
}

export function getFadeInFromLeftAnimation() {
	return {
		offscreen: {
			x: -50,
			opacity: 0,
		},
		onScreen: ({ duration = 1 } = {}) => ({
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				duration,
				ease: "easeInOut",
			},
		}),
	};
}
