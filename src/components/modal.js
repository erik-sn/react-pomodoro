import React from 'react';

const Modal = (props) => {
  const { text, close } = props;
  return (
    <div className="modal">
      <div onClick={close} id="modal-close">X</div>
      <div id="modal-text">{text}</div>
    </div>
  );
};

export default Modal;