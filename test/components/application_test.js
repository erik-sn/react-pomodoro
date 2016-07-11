import React from 'react';
import { sRender, expect } from '../test_helper';
import sinon from 'sinon';

import Application from '../../src/components/application';

describe('Application' , () => {
  let component;

  const state = {
  };

  beforeEach(() => {
    component = sRender(<Application />);
    console.log(component.html())
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });
  
  describe('Footer' , () => {

    it('should have a footer', () => {
      expect(component.find('#footer').html()).to.contain('created by');
    });
    
    it('should simulate click envents', () => {
      expect(component.find('#footer')).simulate('click');
    });
  
  });  

});
