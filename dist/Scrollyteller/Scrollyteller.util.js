import { ScrollPositions } from '../types.js';
export const getScrollingPos = (scrollytellerRef) => {
    const boundingRect = scrollytellerRef.getBoundingClientRect();
    if (boundingRect.bottom - window.innerHeight < 0) {
        return ScrollPositions.BELOW;
    }
    if (boundingRect.top > 0) {
        return ScrollPositions.ABOVE;
    }
    return ScrollPositions.FULL;
};
/**
 * An onScroll handler with throttling and scroll speed limiting.
 *
 * This is used because flinging the page up in Safari was creating too many
 * WebGL contexts and crashing the tab.
 *
 * @param fn - Function to call back when on scroll.
 * @param options
 * @param options.interval - interval to debounce scroll check.
 */
export const getScrollSpeed = (callback) => {
    const getScrollTop = () => document.documentElement.scrollTop;
    let lastOffset = getScrollTop();
    let lastDate = Date.now();
    const onScroll = () => {
        const delayInMs = Date.now() - lastDate;
        const offset = getScrollTop() - lastOffset;
        const speedInpxPerMs = offset / delayInMs;
        const scrollSpeed = Math.abs(speedInpxPerMs);
        lastDate = Date.now();
        lastOffset = getScrollTop();
        callback(scrollSpeed);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const onEndScroll = () => callback(0);
    window.addEventListener('scrollend', onEndScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('scrollend', onEndScroll);
    };
};
/** Keep trying until the condition is met */
export const retryUntil = (condition) => new Promise((resolve) => condition() ? resolve(0) : setInterval(() => condition() && resolve(0), 10));
