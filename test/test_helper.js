import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

function sRender(ComponentClass, state = {}) {
  const component = shallow(ComponentClass)
  if (Object.keys(state).length > 0) {
    component.setState(state);    
  }
  return component
}

function fRender(ComponentClass, state = {}) {
  const component = mount(ComponentClass)
  if (Object.keys(state).length > 0) {
    component.setState(state);    
  }
  return component
}


export { sRender, fRender, expect };
