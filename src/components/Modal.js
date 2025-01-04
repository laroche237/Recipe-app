import React from 'react';
import './Modal.css';

const Modal = ({ meal, closeModal }) => {
    if (!meal) return null;
  
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content"
         onClick={(e) => e.stopPropagation()}>
          <img src={meal.src} alt={meal.title} />
          <div className="modal-title">{meal.title}</div>
          <div className="modal-title">{meal.category}</div>
          <div className="modal-title">{meal.descriptio}</div>
          <div className="modal-title">{meal.ingredients}</div>
          <div className="modal-title">{meal.instruction}</div>
          <div className="modal-title">{meal.cooking_time}</div>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  