export var ScrollPositions;
(function (ScrollPositions) {
    ScrollPositions["FULL"] = "FULL";
    ScrollPositions["ABOVE"] = "ABOVE";
    ScrollPositions["BELOW"] = "BELOW";
})(ScrollPositions || (ScrollPositions = {}));
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
