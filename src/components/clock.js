import React, { Component } from 'react';

import ClockTick from './clock-tick';
import Hand from './hand';

export default class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      start: props.timer,
      labelCount: props.labelCount,
      active: false,
      sessionDuration: '25',
      breakDuration: '5',
    };
    this.setTimer = this.setTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.generateLabels = this.generateLabels.bind(this);
    this.breakChange = this.breakChange.bind(this);
    this.sessionChange = this.sessionChange.bind(this);
    this.labelChange = this.labelChange.bind(this);
  }

  componentDidMount() {
    // decrement clock timer
    setInterval(this.decrementTimer, 50);
  }
  
  setTimer(timer) {
    this.setState({ timer });
  }
  
  decrementTimer() {
    const { active, timer } = this.state;
    if (active && timer > 0) {
      this.setState({ timer: timer - 0.05 });     
    } else {
      this.setState({ active: false });
    }
  }
  
  toggleActive() {
    const { timer, active, start } = this.state;
    this.setState({ active: !active });
    if (Math.round(timer) === 0) {
      this.setState({ timer: start});
    }
  }
  
  sessionChange(e) {
    const val = e.target.value;
    if (val <= 120) {
      this.setState({ 
        sessionDuration: val,
        start: val,
        timer: val,
      });
    }    
  }
  
  breakChange(e) {
    const val = e.target.value;
    if (val <= 60) {
      this.setState({ breakDuration: val });
    }
  }
  
  labelChange(e) {
    const val = e.target.value;
    if (val <= 25) {
      this.setState({ labelCount: val });
    }
  }
  
  generateLabels(radius, start, labelCount) {
    const results = [];
    const clockincrement = 2 * Math.PI / labelCount;   
    const timeIncrement = start / labelCount;
    let radians = Math.PI / 2;
    for (let i = 0; i < labelCount; i++) {
      const x = radius - radius * Math.cos(radians) - 40;
      const y = radius - radius * Math.sin(radians) - 35;
      radians += clockincrement;
      
      const label = (
        <ClockTick click={this.setTimer} key={i} x={x} y={y} label={Math.round(start - (i * timeIncrement))} />
      );
      results.push(label);
    }
    return results;
  }

  render() {
    const { start, timer, active, labelCount, sessionDuration, breakDuration } = this.state;
    const labels = this.generateLabels(225, start, labelCount);
    const radians = -2 * Math.PI * (timer / start);
    
    const pause = <i className="fa fa-pause" aria-hidden="true"></i>;
    const play = <i className="fa fa-play" aria-hidden="true"></i>;
    const stop = <i className="fa fa-stop" aria-hidden="true"></i>;


    const playPauseStyle = active ? { color: 'red'} : { color: 'green' };

    return (
      <div className="clock">
        <div id="clock-container" >
        <div id="clock-body">
          <div id="input-container">
            <div id="input-duration-container">
              <label>Session:</label>
              <input id="session-input" className="form-control user-input" onChange={this.sessionChange} type="text" value={sessionDuration} />
              <label>Break:</label>
              <input id="break-input" className="form-control user-input" onChange={this.breakChange} type="text" value={breakDuration} />
            </div>
            <div id="input-config-container">      
              <label>Tick Count:</label>      
              <input id="label-input" className="form-control user-input" onChange={this.labelChange} type="text" value={labelCount} />
              <div id="start-stop-container" onClick={this.toggleActive} style={playPauseStyle}>{active ? pause : play}</div>
              <div id="reset-container">{stop}</div>
            </div>
          </div>
          <div id="clock-labels">{labels}</div>
          <Hand radians={radians}/>
          <div id="clock-timer">{Math.round(timer)}</div>
        </div>
        </div>
      </div>
    );
  }
}
