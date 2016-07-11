import React, { Component } from 'react';

import ClockTick from './clock-tick';
import Hand from './hand';
import InputField from './input-field';

export default class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio('/static/beep.wav'),
      timer: props.start * 60,
      start: props.start,
      labelCount: props.labelCount,
      active: false,
      blinkCount: 50,
      breakDuration: '5',
      workDuration: props.start,
      mode: 'Working',
    };
    this.setTimer = this.setTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.generateLabels = this.generateLabels.bind(this);
    this.breakChange = this.breakChange.bind(this);
    this.workChange = this.workChange.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.plusMinus = this.plusMinus.bind(this);
  }

  componentDidMount() {
    // decrement clock timer
    setInterval(this.decrementTimer, 150);
  }
  
  setTimer(label) {
    this.setState({ timer: 60 * label });
  }
  
  decrementTimer() {
    const { active, timer, start, mode, breakDuration, workDuration, blinkCount, audio } = this.state;
    if (active && timer > 0) {
      this.setState({ timer: timer - 0.15 });     
    } else if (active && blinkCount > 0) {
      // play four beeps
      if (blinkCount === 49 || blinkCount === 39 || blinkCount === 29|| blinkCount === 19) {
        audio.play();
      }
      this.setState({ blinkCount: blinkCount - 1 });
    } else if(active && mode === 'Working') {
      this.setState({ mode: 'On Break', timer: breakDuration * 60, start: breakDuration, blinkCount: 50 });
    } else if(active && mode === 'On Break') {
      this.setState({ mode: 'Working', timer: workDuration * 60, start: workDuration, blinkCount: 50 });      
    }
  }
  
  resetTimer() {
    this.setState({
      timer: 60 * this.state.workDuration,
      active: false,
      start: this.state.workDuration,
      mode: 'Working'
    });  
  }
  
  toggleActive() {
    const { timer, active, start } = this.state;
    this.setState({ active: !active });
  }
  
  workChange(e) {
    const val = e.target.value;
    if (val <= 999) {
      this.setState({ 
        workDuration: val,
        start: this.state.mode === 'Working' ? val : this.state.start,
        timer: this.state.mode === 'Working' ? 60 * val : this.state.timer,
      });
    }    
  }
  
  breakChange(e) {
    const val = e.target.value;
    if (val <= 999) {
      this.setState({ 
        breakDuration: val,
        start: this.state.mode === 'On Break' ? val : this.state.start,
        timer: this.state.mode === 'On Break' ? 60 * val : this.state.timer,
      });
    }
  }
  
  labelChange(e) {
    const val = e.target.value;
    if (val <= 30) {
      this.setState({ labelCount: val });
    }
  }
  
  plusMinus(field, val) {
    const update = {};
    const newVal = parseInt(this.state[field]) + val
    if (newVal >= 0) {
      update[field] = newVal;
      
      if ((this.state.mode === 'Working' && field === 'workDuration') || 
          (this.state.mode === 'On Break' && field === 'breakDuration')) {
        update.start = newVal;
        update.timer = this.state.timer + 60 * val;
      }
      this.setState(update);      
    }
  }
  
  generateLabels(radius, start, labelCount) {
    const results = [];
    const radiansIncrement = 2 * Math.PI / labelCount;   
    const timeIncrement = start / labelCount;
    let radians = Math.PI / 2;
    for (let i = 0; i < labelCount; i++) {
      const x = radius - radius * Math.cos(radians) - 40;
      const y = radius - radius * Math.sin(radians) - 35;
      radians += radiansIncrement;
      
      // adjust the text for case where Math.round would create duplicate labels
      let text;
      if (labelCount > start) {
        text = (start - (i * timeIncrement)).toFixed(1);
      } else {
        text = Math.round(start - (i * timeIncrement));
      }
      const label = (
        <ClockTick click={this.setTimer} key={i} x={x} y={y} label={text} />
      );
      results.push(label);
    }
    return results;
  }

  render() {
    const { start, mode, timer, active, labelCount, sessionDuration, 
      breakDuration, workDuration, blinkCount } = this.state;
    const labels = this.generateLabels(225, parseInt(start), parseInt(labelCount))
    const radians = -2 * Math.PI * (timer / (60 * start));
    
    const pause = <i className="fa fa-pause" aria-hidden="true"></i>;
    const play = <i className="fa fa-play" aria-hidden="true"></i>;
    const stop = <i className="fa fa-stop" aria-hidden="true"></i>;

    const playPauseStyle = active ? { color: 'red'} : { color: 'green' };
    return (
      <div className="clock">
        <div id="clock-container" >
        <div id="clock-body" className={`shadow ${blinkCount < 50 ? 'blink' : ''}`}>
          <Hand radians={radians}/>
          <div id="input-container">
            <div id="input-duration-container">        
              <InputField
                label="Session"
                plusminus={this.plusMinus}
                onChange={this.workChange}
                value={workDuration}
                stateField="workDuration"
              />
              <InputField
                label="Break"
                plusminus={this.plusMinus}
                onChange={this.breakChange}
                value={breakDuration}
                stateField="breakDuration"
              />
            </div>
            <div id="input-config-container">            
              <InputField
                label="Labels"
                plusminus={this.plusMinus}
                onChange={this.labelChange}
                value={labelCount}
                stateField="labelCount"
              />            
              <div id="start-stop-container" onClick={this.toggleActive} style={playPauseStyle}>{active ? pause : play}</div>
              <div id="reset-container" onClick={this.resetTimer}>{stop}</div>
            </div>
            <div id="mode-container">{mode}</div>
          </div>
          <div id="clock-labels">{labels}</div>
          <div id="clock-timer">{Math.round(timer / 60)}</div>
        </div>
        </div>
      </div>
    );
  }
}
