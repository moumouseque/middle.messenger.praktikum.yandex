import { expect } from 'chai';
import { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import http from '../http-transport';

const sinon = require('sinon');

describe('HTTP-transport', () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  before(() => {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    (global.XMLHttpRequest as unknown as SinonFakeXMLHttpRequestStatic).onCreate = (req) => {
      requests.push(req);
    };
  });

  after(() => {
    (global.XMLHttpRequest as unknown as SinonFakeXMLHttpRequestStatic).restore();
  });

  describe('GET', () => {
    before(() => {
      http.get('localhost34', { data: { user: 42 } });
    });

    it('корректный метод', () => {
      expect(requests[0].method).to.eq('GET');
    });

    it('корректный url', () => {
      expect(requests[0].url).to.eq('localhost34?user=42');
    });
  });

  describe('POST', () => {
    before(() => {
      http.post('localhost34', { data: { user: 42 } });
    });

    it('корректный метод', () => {
      expect(requests[1].method).to.eq('POST');
    });

    it('корректный url', () => {
      expect(requests[1].url).to.eq('localhost34');
    });

    it('корректное тело запроса', () => {
      expect(requests[1].requestBody).to.eq('{"user":42}');
    });
  });

  describe('PUT', () => {
    before(() => {
      http.put('localhost34', { data: { user: 42 } });
    });

    it('корректный метод', () => {
      expect(requests[2].method).to.eq('PUT');
    });

    it('корректный url', () => {
      expect(requests[2].url).to.eq('localhost34');
    });

    it('корректное тело запроса', () => {
      expect(requests[2].requestBody).to.eq('{"user":42}');
    });
  });

  describe('DELETE', () => {
    before(() => {
      http.delete('localhost34', { data: { user: 42 } });
    });

    it('корректный метод', () => {
      expect(requests[3].method).to.eq('DELETE');
    });

    it('корректный url', () => {
      expect(requests[3].url).to.eq('localhost34');
    });

    it('корректное тело запроса', () => {
      expect(requests[3].requestBody).to.eq('{"user":42}');
    });
  });
});
