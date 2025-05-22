import React from 'react';
import './ChatMessage.css';

/**
 * ChatMessage - Component to display a single message in the chat
 * 
 * @param {Object} props
 * @param {string} props.type - The type of message ('user' or 'ai')
 * @param {string|React.ReactNode} props.content - The content of the message
 * @param {string} props.avatar - Text or icon to show in the avatar
 */
const ChatMessage = ({ type, content, avatar }) => {
  const isUser = type === 'user';
  const messageClass = isUser ? 'user-message' : 'ai-message';
  
  return (
    <div className={`message ${messageClass}`}>
      {!isUser && <div className="message-avatar">{avatar || 'AI'}</div>}
      <div className="message-content">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </div>
      {isUser && <div className="message-avatar">{avatar || 'You'}</div>}
    </div>
  );
};

export default ChatMessage;
