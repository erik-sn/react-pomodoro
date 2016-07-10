if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';

import Modal from './modal';
import Clock from './clock';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * Check to see if this site has been visited, if it hasn't show the modal
   * that gives the user somem information. Additionally, bind keyboard handlers
   * to button presses to give calculator functionality.
   */
  componentWillMount() {
    const visited = JSON.parse(window.localStorage.getItem('visited')) || false;
    if (!visited) {
      this.setState({ showModal: true });
    }
  }

  hideModal() {
    window.localStorage.setItem('visited', true);
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    const modal = (
      <Modal
        close={this.hideModal}
        text={'Welcome to React Pomodoro, made for Free Code Camp!'}
      />
    );
    
    return (
      <div>
        {showModal ? modal : ''}
        <div id="app-container" style={showModal ? { opacity: '0.3' } : {}} >
          <Clock timer={25} labelCount={10} />
        </div>
        <div id="footer">
          <a href="https://github.com/kiresuah/react-pomodoro"><img height="55" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" alt="github" /></a>
          <span id="info-tab">Application created by Erik Niehaus</span>
        </div>
      </div>
    );
  }
}
