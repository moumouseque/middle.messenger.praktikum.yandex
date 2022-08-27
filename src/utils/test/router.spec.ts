// eslint-disable-next-line max-classes-per-file
import { JSDOM } from 'jsdom';
import Handlebars = require('handlebars');
import { TemplateDelegate } from 'handlebars';
import { expect } from 'chai';

import Block from '../block';
import Router from '../router';

const template = (pathname: string) => Handlebars.compile(`
  <div class="${pathname}">
    content
  </div>
`);

class Login extends Block {
  render() {
    return this.compile(template('login') as TemplateDelegate<any>);
  }
}

class Logout extends Block {
  render() {
    return this.compile(template('logout') as TemplateDelegate<any>);
  }
}

describe('ROUTER', () => {
  let router: Router;

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

    router = new Router('#root');
    router.use('/', Login as any)
      .use('/logout', Logout as any)
      .start();
  });

  it('стартовый роут отрендерился', () => {
    expect(window.document.querySelector('.login')).to.be.not.a('null');
  });

  it('переход на другой роут', () => {
    router.go('/logout');
    expect(window.document.querySelector('.logout')).to.be.not.a('null');
  });
});
