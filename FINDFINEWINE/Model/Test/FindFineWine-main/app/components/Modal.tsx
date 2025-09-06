// components/Modal.js
import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Age Verification</h2>
        <p>You must be at least 21 years old to enter this site. Are you over 21?</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }
        .modal-actions {
          margin-top: 1rem;
        }
        .modal-actions button {
          margin: 0 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
        }
        .modal-actions button:last-child {
          background-color: #f44336;
        }
      `}</style>
    </div>
  );
};

export default Modal;
