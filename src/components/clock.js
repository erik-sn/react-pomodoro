import React, { Component } from 'react';

import ClockTick from './clock-tick';
import Hand from './hand';

export default class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: props.start * 60,
      start: props.start,
      labelCount: props.labelCount,
      active: false,
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
  }

  componentDidMount() {
    // decrement clock timer
    setInterval(this.decrementTimer, 150);
  }
  
  setTimer(label) {
    this.setState({ timer: 60 * label });
  }
  
  decrementTimer() {
    const { active, timer, start, mode, breakDuration, workDuration } = this.state;
    if (active && timer > 0) {
      this.setState({ timer: timer - 0.15 });     
    } else if(active && mode === 'Working') {
      this.setState({ mode: 'On Break', timer: breakDuration * 60, start: breakDuration });
    } else if(active && mode === 'On Break') {
      this.setState({ mode: 'Working', timer: workDuration * 60, start: workDuration });      
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
  
  changeState(field, val) {
    const update = {};
    update[field] = parseInt(this.state[field]) + val;
    this.setState(update);
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
    const { start, mode, timer, active, labelCount, sessionDuration, breakDuration, workDuration } = this.state;
    const labels = this.generateLabels(225, parseInt(start), parseInt(labelCount))
    const radians = -2 * Math.PI * (timer / (60 * start));
    
    const pause = <i className="fa fa-pause" aria-hidden="true"></i>;
    const play = <i className="fa fa-play" aria-hidden="true"></i>;
    const stop = <i className="fa fa-stop" aria-hidden="true"></i>;

    const playPauseStyle = active ? { color: 'red'} : { color: 'green' };

    return (
      <div className="clock">
        <div id="clock-container" >
        <div id="clock-body" className="shadow">
          <Hand radians={radians}/>
          <div id="input-container">
            <div id="input-duration-container">
              <label>Session:</label>
              <div>
                <div className="plusminus-icon" id="minus-work" onClick={() => this.changeState('workDuration', -1)}><i className="fa fa-minus" aria-hidden="true"></i></div>
                <div className="plusminus-icon">
                  <input id="session-input" className="form-control user-input" onChange={this.workChange} mode="text" value={workDuration} />
                </div>
                <div className="plusminus-icon" id="plus-work" onClick={() => this.changeState('workDuration', 1)}><i className="fa fa-plus" aria-hidden="true"></i></div>
              </div>
              <label>Break:</label>
              <div>
                <div className="plusminus-icon" id="minus-break" onClick={() => this.changeState('breakDuration', -1)}><i className="fa fa-minus" aria-hidden="true"></i></div>
                <div className="plusminus-icon" >
                  <input id="break-input" className="form-control user-input" onChange={this.breakChange} mode="text" value={breakDuration} />
                </div>
                <div className="plusminus-icon" id="plus-break" onClick={() => this.changeState('breakDuration', 1)}><i className="fa fa-plus" aria-hidden="true"></i></div>
              </div>
            </div>
            <div id="input-config-container">      
              <label>Labels:</label>
              <div>
                <div className="plusminus-icon" id="minus-labels" onClick={() => this.changeState('labelCount', -1)}><i className="fa fa-minus" aria-hidden="true"></i></div>
                <div className="plusminus-icon" >
                  <input id="label-input" className="form-control user-input" onChange={this.labelChange} mode="text" value={labelCount} />
                </div>
                <div className="plusminus-icon" id="plus-labels" onClick={() => this.changeState('labelCount', 1)}><i className="fa fa-plus" aria-hidden="true"></i></div>
              </div>              
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
