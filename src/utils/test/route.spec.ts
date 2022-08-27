import { JSDOM } from 'jsdom';
import Handlebars = require('handlebars');
import { TemplateDelegate } from 'handlebars';
import { expect } from 'chai';

import Block from '../block';
import Route from '../route';

const template = Handlebars.compile(`
      <div class="test">
        content
      </div>
    `);

class Component extends Block {
  render() {
    return this.compile(template as TemplateDelegate<any>);
  }
}

describe('ROUTE', () => {
  let route: Route;
  before(() => {
    const { window } = new JSDOM(`
      <html>
        <body>
          <div id="root"></div>
        </body>
      </html>`, {
      url: 'http://localhost',
    });

    global.document = window.document;
    global.window = window as any;

    route = new Route('/login', Component as typeof Block, { rootQuery: '#root' });
  });

  it('match сравнивает корректно', () => {
    expect(route.match('/login')).to.eq(true);
  });

  it('нет страницы login', () => {
    expect(window.document.querySelector('.test')).to.eq(null);
  });

  it('есть страница login', () => {
    route.navigate('/login');
    expect(window.document.querySelector('.test')?.textContent).to.contain('content');
  });
});
