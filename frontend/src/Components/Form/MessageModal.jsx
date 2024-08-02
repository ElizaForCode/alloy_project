import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MessageModal = ({ isOpen, onRequestClose, message, isSuccess }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Message Modal"
    className="modal"
    overlayClassName="overlay"
  >
    <div className={`modal-content ${isSuccess ? 'success' : 'error'}`}>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      <button onClick={onRequestClose}>Close</button>
    </div>
  </Modal>
);

export default MessageModal;
