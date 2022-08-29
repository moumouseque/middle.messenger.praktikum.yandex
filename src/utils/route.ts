import Block from './block';
import render from './route-render';

class Route {
  private pathname: string;

  private readonly block: typeof Block | null;

  private props: Record<string, any>;

  constructor(pathname: string, view: typeof Block, props: Record<string, any>) {
    this.pathname = pathname;
    this.block = view;
    this.props = props;
  }

  match(pathname?: string): boolean {
    return pathname === this.pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      // this.block.hide();
    }
  }

  render() {
    if (!this.block) {
      return;
    }
    render(this.props.rootQuery, this.block);
  }
}

export default Route;
