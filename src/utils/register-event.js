const events = [];

export const registerEventListener = ({selector, eventType, handler}) => {
    events.push({selector, eventType, handler});
}

export const unregisterEventListener = () => {

}

export const registerEventHandler = () => {
    events.forEach(({selector, eventType, handler}) => {
        const node = document.querySelector(selector);
        if (node) {
            node.addEventListener(eventType, handler);
        }
    })
}
