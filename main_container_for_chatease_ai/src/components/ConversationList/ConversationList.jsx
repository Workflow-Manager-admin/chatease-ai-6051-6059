import React from 'react';
import './ConversationList.css';

/**
 * ConversationItem - Component for a single conversation in the list
 */
const ConversationItem = ({ title, preview, active, onClick }) => {
  return (
    <div 
      className={`conversation-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-title">{title}</div>
      <div className="conversation-preview">{preview}</div>
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
 */
const ConversationList = ({ 
  conversations = [], 
  activeConversationId, 
  onSelectConversation = () => {},
  onNewChat = () => {}
}) => {
  // If no conversations are provided, use sample data
  const sampleConversations = [
    { id: 1, title: 'General Assistant', preview: 'How can I help you today?' },
    { id: 2, title: 'Code Helper', preview: 'Let me help with that code...' },
    { id: 3, title: 'Creative Writing', preview: 'Here\'s a story idea for you...' }
  ];

  const displayConversations = conversations.length > 0 ? conversations : sampleConversations;
  
  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        <h2>Conversations</h2>
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New Chat
        </button>
      </div>
      
      <div className="conversation-list">
        {displayConversations.map((convo) => (
          <ConversationItem
            key={convo.id}
            title={convo.title}
            preview={convo.preview}
            active={convo.id === activeConversationId}
            onClick={() => onSelectConversation(convo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
