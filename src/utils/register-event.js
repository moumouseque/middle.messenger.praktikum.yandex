const events = [];

export const registerEventListener = ({selector, eventType, handler}) => {
    events.push({selector, eventType, handler});
}

export const unregisterEventListener = () => {

}

const handler = () => {
    events.forEach(({selector, eventType, handler}) => {
        const node = document.querySelector(selector);
        if (node) {
            node.addEventListener(eventType, handler);
        }
    })
}

window.addEventListener('load', handler);
window.addEventListener('hashchange', () => {
    setTimeout(handler, 300)
});