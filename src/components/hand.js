import React, { Component } from 'react';

export default class Hand extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const { radians } = this.props;
    const style = {
      MsTransform: `rotate(${radians}rad)`,
      WebkitTransform: `rotate(${radians}rad)`,
      transform: `rotate(${radians}rad)`,
    }
    return (
      <div className="hand-container" style={style}>
        <div className="hand"></div>
      </div>
    );    
  }
  
}