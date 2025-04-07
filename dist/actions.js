export const children = (el, children) => {
    children.forEach((node) => el.appendChild(node));
    return {
        destroy() {
            children.forEach((node) => el.removeChild(node));
        }
    };
};
