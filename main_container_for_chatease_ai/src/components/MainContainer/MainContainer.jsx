import React from 'react';
import './MainContainer.css';

/**
 * MainContainer - The primary container component for ChatEase AI
 * 
 * This component serves as the structural foundation for the chat application,
 * organizing the layout for conversations, message display, and user input.
 */
const MainContainer = () => {
  return (
    <div className="chat-container">
      {/* Sidebar for conversation list */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>Conversations</h2>
          <button className="new-chat-btn">
            <span>+</span> New Chat
          </button>
        </div>
        
        <div className="conversation-list">
          {/* Placeholder for conversation items */}
          <div className="conversation-item active">
            <div className="conversation-title">General Assistant</div>
            <div className="conversation-preview">How can I help you today?</div>
          </div>
          <div className="conversation-item">
            <div className="conversation-title">Code Helper</div>
            <div className="conversation-preview">Let me help with that code...</div>
          </div>
          <div className="conversation-item">
            <div className="conversation-title">Creative Writing</div>
            <div className="conversation-preview">Here's a story idea for you...</div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        <div className="chat-header">
          <h2>General Assistant</h2>
          <div className="chat-actions">
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
            </button>
          </div>
        </div>
        
        <div className="messages-container">
          {/* AI message */}
          <div className="message ai-message">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <p>Hello! I'm ChatEase AI, your helpful assistant. How can I help you today?</p>
            </div>
          </div>
          
          {/* User message */}
          <div className="message user-message">
            <div className="message-content">
              <p>Can you tell me more about how you can assist me with my tasks?</p>
            </div>
            <div className="message-avatar">You</div>
          </div>
          
          {/* AI response */}
          <div className="message ai-message">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <p>Of course! I can help you with a variety of tasks including:</p>
              <ul>
                <li>Answering questions on various topics</li>
                <li>Assisting with writing and content creation</li>
                <li>Helping solve problems and brainstorming ideas</li>
                <li>Providing explanations on complex topics</li>
                <li>Organizing information and creating summaries</li>
              </ul>
              <p>Feel free to ask anything, and I'll do my best to assist you!</p>
            </div>
          </div>
        </div>
        
        <div className="chat-input-area">
          <form className="chat-form">
            <textarea 
              className="chat-input" 
              placeholder="Message ChatEase AI..."
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
      </div>
    </div>
  );
};

export default MainContainer;
