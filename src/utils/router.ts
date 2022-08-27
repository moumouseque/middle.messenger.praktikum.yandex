import Route from './route';
import Block from './block';

class Router {
  private readonly rootQuery: string;

  private routes: Route[];

  private history: typeof window.history;

  private currentRoute: Route | null;

  private defaultRoute: Route | null;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.defaultRoute = null;
    this.rootQuery = rootQuery;
  }

  use(pathname: string, block: typeof Block, isDefault?: boolean) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });
    if (isDefault) {
      this.defaultRoute = route;
    }
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      if (!event.currentTarget) {
        return;
      }
      const target = event.currentTarget as unknown as Window;
      this.onRoute(target.location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname?: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      if (this.defaultRoute) {
        route = this.defaultRoute;
      } else {
        return;
      }
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname?: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
