import React from 'react';
import { sRender, expect } from '../test_helper';

import Clock from '../../src/components/clock';

describe('Clock' , () => {
  let component;
  
  window.Audio = function Audio() {
    return {
      play() {
        // do nothing;
      }
    }
  }

  const props = {
    start: 10,
    labelCount: 10,
  };

  const state = {
    audio: window.Audio,
    timer: props.start * 60,
    start: props.start,
    labelCount: props.labelCount,
    active: false,
    blinkCount: 50,
    breakDuration: '5',
    workDuration: props.start,
    mode: 'Working',
  };

  beforeEach(() => {
    component = sRender(<Clock {...props} />, state);
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });  

  it('Has as many ticks/labels as specified in props', () => {
    expect(component.find('.clock-tick')).to.have.length(props.labelCount);
  });  
  
  

});
