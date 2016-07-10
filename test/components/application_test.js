import React from 'react';
import { storageMock, fRender, expect } from '../test_helper';

import Application from '../../src/components/application';

describe('Application' , () => {
  let component;
  window.localStorage = storageMock();

  const state = {
  };

  beforeEach(() => {
    component = fRender(<Application />);
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });

  it('should have a header', () => {
    expect(component.find('#title').html()).to.contain('Pomodoro Clock');
  });
  
  

});
