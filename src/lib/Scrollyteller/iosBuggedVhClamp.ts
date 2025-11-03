import { writable } from 'svelte/store';

/**
 *
 * @param {function(number, { type: "initial" | "orientation" | "height" | "width" }): void} onChange -
 *   A callback function that receives the newly measured height
 *   (in pixels) whenever the viewport height changes. This will be triggered on
 *   orientation change and, on non-iPad devices, also on resize events.
 * @returns {() => void} A cleanup function to remove all listeners and observers.
 *
 * @see https://github.com/mozilla-mobile/firefox-ios/issues/22607
 */
function getViewportMaxHeightStore(onChange) {
	const isClientSide = typeof window !== 'undefined';
	let previousValue = 0;

	if (!isClientSide) {
		return () => {};
	}

	const div = document.createElement('div');
	div.style = 'height:10vh;position:absolute;left:0;top:0;width:1px;pointer-events:none;';
	document.body.appendChild(div);

	function measure() {
		if (!div) {
			return 0;
		}
		const { height } = div.getBoundingClientRect();
		return Math.round(height * 10);
	}

	const onOrientationChange = () => onChange(measure(), { type: 'orientation' });
	screen.orientation?.addEventListener('change', onOrientationChange);

	let previousWidth = window.innerWidth;
	const onResize = () => {
		const { innerWidth } = window;
		if (previousWidth !== innerWidth) {
			previousWidth = innerWidth;
			onChange(measure(), { type: 'width' });
		}
	};
	window.addEventListener('resize', onResize);

	const isIpad =
		!!navigator.userAgent.match(/Macintosh.*AppleWebKit.*Safari/) && navigator.maxTouchPoints > 1;

	const resizeObserver = new ResizeObserver(() => {
		// BUG: Safari webviews on iPadOS are the cause of all our headaches. For
		// those browsers, never recalculate height except on orientation change.
		if (!previousValue || !isIpad) {
			onChange(measure(), { type: 'height' });
		}
	});
	resizeObserver.observe(div);

	onChange(measure(), { type: 'initial' });

	return () => {
		window.removeEventListener('resize', onResize);
		screen.orientation?.removeEventListener('change', onOrientationChange);
	};
}

/**
 * Due to assorted bugs in iPadOS webview browsers (Firefox, Brave), `vh` and
 * `lvh` units change unpredictably and can cause content to shift.
 *
 * This utility provides an approximation of `100vh` in the browser. In most
 * browsers it will be exactly `100vh`, but in Safari iPad browsers it will
 * be clamped at either `100dvh` or `100vh` depending on the state of the browser
 * address bar at the time.
 *
 * Use this to size elements in the page flow in a way that won't trigger
 * content to shift when the address bar appears.
 */
export const stableViewportHeightPx = writable(0);

/**
 * A value equivalent to 100vh (or sometimes 100dvh on iPadOS, but will change
 * to and stay at 100vh when the address bar disappears)
 */
export const maxViewportHeightPx = writable(0);

getViewportMaxHeightStore((newVal, { type }) => {
	stableViewportHeightPx.set(newVal);

	// If orientation or screen width changes, always reset set the new value
	// otherwise only set if greater - assuming this is the url bar disappearing
	maxViewportHeightPx.update((existingVal) => {
		if (type === 'orientation' || type === 'width' || newVal > existingVal) {
			return newVal;
		}

		return existingVal;
	});
});
