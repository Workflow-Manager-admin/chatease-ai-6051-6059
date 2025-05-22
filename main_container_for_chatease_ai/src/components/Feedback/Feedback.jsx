import React from 'react';
import './Feedback.css';
import { useChat } from '../../context/ChatContext';

/**
 * Feedback - Component for displaying user action feedback/notifications
 */
const Feedback = () => {
  const { feedback, showFeedback } = useChat();
  
  if (!feedback) return null;
  
  const handleClose = () => {
    showFeedback(null);
  };
  
  return (
    <div className="feedback-container">
      <div className={`feedback-message ${feedback.type}`}>
        <span>{feedback.message}</span>
        <button className="feedback-close" onClick={handleClose}>✕</button>
      </div>
    </div>
  );
};

export default Feedback;
