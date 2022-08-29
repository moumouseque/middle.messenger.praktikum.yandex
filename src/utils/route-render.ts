import Block from './block';

function render(query: string, Component: typeof Block | null) {
  const root = window.document.querySelector(query);

  if (root && Component) {
    const component = new Component({});
    if (root.firstChild) {
      root.replaceChild(component.getContent() as Node, root.firstChild as Node);
    } else {
      root.appendChild(component.getContent() as Node);
    }

    component.dispatchComponentDidMount();
  }

  return root;
}

export default render;
