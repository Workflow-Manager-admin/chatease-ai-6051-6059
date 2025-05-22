import React from 'react';
import './ConversationList.css';

/**
 * ConversationItem - Component for a single conversation in the list
 */
const ConversationItem = ({ title, preview, active, onClick, onDelete, id }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div 
      className={`conversation-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-content">
        <div className="conversation-title">{title}</div>
        <div className="conversation-preview">{preview}</div>
      </div>
      <button 
        className="conversation-delete" 
        onClick={handleDelete}
        title="Delete conversation"
      >
        ×
      </button>
    </div>
  );
};

/**
 * ConversationList - Component to display and manage chat conversations
 * 
 * @param {Object} props
 * @param {Array} props.conversations - List of conversation objects
 * @param {number} props.activeConversationId - ID of the currently active conversation
 * @param {function} props.onSelectConversation - Callback when conversation is selected
 * @param {function} props.onNewChat - Callback when New Chat button is clicked
 * @param {function} props.onDeleteConversation - Callback when a conversation is deleted
 */
const ConversationList = ({ 
  conversations = [], 
  activeConversationId, 
  onSelectConversation = () => {},
  onNewChat = () => {},
  onDeleteConversation = () => {}
}) => {
  const handleDeleteConversation = (id) => {
    // Confirmation is handled in the MainContainer component
    onDeleteConversation(id);
  };
  
  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        <h2>Conversations</h2>
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New Chat
        </button>
      </div>
      
      <div className="conversation-list">
        {conversations.map((convo) => (
          <ConversationItem
            key={convo.id}
            id={convo.id}
            title={convo.title}
            preview={convo.preview}
            active={convo.id === activeConversationId}
            onClick={() => onSelectConversation(convo.id)}
            onDelete={handleDeleteConversation}
          />
        ))}
        
        {conversations.length === 0 && (
          <div className="empty-state">
            <p>No conversations yet</p>
            <button className="btn" onClick={onNewChat}>Start a new chat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
