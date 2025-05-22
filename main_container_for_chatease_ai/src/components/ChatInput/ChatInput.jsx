import React, { useState } from 'react';
import './ChatInput.css';

/**
 * ChatInput - Component for user to input messages
 * 
 * @param {Object} props
 * @param {function} props.onSendMessage - Callback function when message is sent
 */
const ChatInput = ({ onSendMessage = () => {} }) => {
  const [message, setMessage] = useState('');
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    // Send message on Enter (but not with Shift+Enter which adds a new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div className="chat-input-area">
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea 
          className="chat-input" 
          placeholder="Message ChatEase AI..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows="1"
        ></textarea>
        <button type="submit" className="send-button">
          <span>Send</span>
          <span className="send-icon">➤</span>
        </button>
      </form>
      <div className="input-features">
        <span className="feature-hint">Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  );
};

export default ChatInput;
