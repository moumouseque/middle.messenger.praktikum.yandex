import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { TemplateDelegate } from 'handlebars';
import Handlebars = require('handlebars');
import Block from '../block';

const template = Handlebars.compile(`
      <div class="test">
        {{content}}
      </div>
    `);

class Component extends Block {
  render() {
    return this.compile(template as TemplateDelegate<any>, this.props);
  }
}

describe('Block', () => {
  let component: Component;
  before(() => {
    const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
      url: 'http://localhost',
    });

    global.window = window as any;
    global.document = window.document;

    component = new Component({ content: 'testContent' });
  });

  it('компонент компилится', () => {
    expect(component.getContent()?.classList.value).to.eq('test');
  });

  it('в компонент просталяется пропс', () => {
    expect(component.getContent()?.textContent).to.include('testContent');
  });

  it('пропс изменяется при setProps', () => {
    component.setProps({ content: 'replacedContent' });

    expect(component.getContent()?.textContent).to.include('replacedContent');
  });
});
