import React, { Component } from 'react';

export default class ClockTick extends Component {
  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    const { click, label } = this.props;
    click(label);
  }
  
  render() {
    const { key, x, y, label } = this.props;
    return (
      <div
        onClick={this.onClick}
        key={key}
        style={{ left: x, top:y }}
        className="clock-tick"
      >
        {label}
      </div>
    );    
  }
  
}