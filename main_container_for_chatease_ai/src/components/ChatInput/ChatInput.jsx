import React, { useState, useImperativeHandle, useRef, forwardRef } from 'react';
import './ChatInput.css';

/**
 * ChatInput - Component for user to input messages
 * 
 * @param {Object} props
 * @param {function} props.onSendMessage - Callback function when message is sent
 */
const ChatInput = forwardRef(({ onSendMessage = () => {} }, ref) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  
  // Expose methods to parent components via ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      textareaRef.current?.focus();
    },
    clear: () => {
      setMessage('');
    }
  }));
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Auto-resize the textarea back to its original size
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e) => {
    // Send message on Enter (but not with Shift+Enter which adds a new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Auto-resize the textarea as user types
  const handleTextareaInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };
  
  return (
    <div className="chat-input-area">
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea 
          ref={textareaRef}
          className="chat-input" 
          placeholder="Message ChatEase AI..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onInput={handleTextareaInput}
          rows="1"
        ></textarea>
        <button 
          type="submit" 
          className={`send-button ${!message.trim() ? 'disabled' : ''}`}
          disabled={!message.trim()}
        >
          <span>Send</span>
          <span className="send-icon">➤</span>
        </button>
      </form>
      <div className="input-features">
        <span className="feature-hint">Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  );
});

export default ChatInput;
