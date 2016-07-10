import React from 'react';
import { sRender, expect } from '../test_helper';

import ClockTick from '../../src/components/clock-tick';

describe('ClockTick' , () => {
  let component;

  const props = {
    label: 'test label',
    key: 1,
    x: 100,
    y: 100,
  };

  beforeEach(() => {
    component = sRender(<ClockTick {...props} />);
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });  

  it('should contain the props label', () => {
    expect(component.html()).to.contain(props.label);
  });  
  
  

});
