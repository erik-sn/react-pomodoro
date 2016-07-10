import React from 'react';
import { fRender, expect } from '../test_helper';

import Clock from '../../src/components/clock';

describe('Clock' , () => {
  let component;

  const state = {
  };

  const props = {
    timer: 500,
    labelCount: 10,
  };

  beforeEach(() => {
    component = fRender(<Clock {...props} />, state);
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });  

  it('Has as many ticks/labels as specified in props', () => {
    expect(component.find('.clock-tick')).to.have.length(props.labelCount);
  });  
  
  

});
