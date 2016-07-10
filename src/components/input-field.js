import React, { Component } from 'react';

export default class InputField extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const { label, plusminus, onChange, stateField, value } = this.props;
    return (
      <div className="input-field">
        <label>{`${label}:`}</label>
        <div>
          <div className="plusminus-icon" id="minus-work" onClick={() => plusminus(stateField, -1)}>
            <i className="fa fa-minus" aria-hidden="true"></i>
          </div>
          <div className="plusminus-icon">
            <input 
              type="text"
              id="session-input"
              className="form-control user-input"
              onChange={onChange}
              value={value}
            />
          </div>
          <div className="plusminus-icon" id="plus-work" onClick={() => plusminus(stateField, 1)}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>      
      </div>      
    );    
  }
  
}