import React, { useRef, useEffect, useState } from 'react';
import './MainContainer.css';
import ConversationList from '../ConversationList/ConversationList';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatInput from '../ChatInput/ChatInput';
import { useChat } from '../../context/ChatContext';
import Feedback from '../Feedback/Feedback';

/**
 * MainContainer - The primary container component for ChatEase AI
 * 
 * This component serves as the structural foundation for the chat application,
 * organizing the layout for conversations, message display, and user input.
 */
const MainContainer = () => {
  const { 
    conversations, 
    activeConversationId, 
    activeConversation, 
    setActiveConversationId,
    createConversation, 
    renameConversation, 
    deleteConversation, 
    sendMessage,
    clearMessages,
    isLoading
  } = useChat();
  
  // State for controlling rename dialog
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  
  // Reference for the messages container to enable auto-scrolling
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);
  
  // Handle starting a new chat
  const handleNewChat = () => {
    createConversation('New Conversation');
  };
  
  // Handle renaming a conversation
  const handleRenameClick = () => {
    setNewTitle(activeConversation.title);
    setIsRenaming(true);
  };
  
  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      renameConversation(activeConversationId, newTitle.trim());
    }
    setIsRenaming(false);
  };
  
  // Handle deleting the current conversation
  const handleDeleteConversation = () => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(activeConversationId);
    }
  };
  
  return (
    <div className="chat-container">
      <ConversationList 
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        onDeleteConversation={deleteConversation}
      />

      <div className="chat-main">
        {isRenaming ? (
          <div className="rename-dialog">
            <form onSubmit={handleRenameSubmit}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new title"
                autoFocus
              />
              <div className="rename-actions">
                <button type="submit" className="btn">Save</button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setIsRenaming(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="chat-header">
            <h2>{activeConversation?.title}</h2>
            <div className="chat-actions">
              <button 
                className="action-btn" 
                title="Rename conversation"
                onClick={handleRenameClick}
              >
                <span className="action-icon">✏️</span>
              </button>
              <button 
                className="action-btn" 
                title="Clear conversation"
                onClick={clearMessages}
              >
                <span className="action-icon">🗑️</span>
              </button>
              <button 
                className="action-btn" 
                title="Delete conversation"
                onClick={handleDeleteConversation}
              >
                <span className="action-icon">❌</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="messages-container">
          {activeConversation?.messages?.map(message => (
            <ChatMessage 
              key={message.id}
              type={message.type}
              content={message.content}
              avatar={message.avatar}
            />
          ))}
          
          {isLoading && (
            <div className="typing-indicator">
              <span>AI is typing</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={sendMessage} ref={inputRef} />
      </div>
    </div>
  );
};

export default MainContainer;
