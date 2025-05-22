import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Chat context
const ChatContext = createContext();

// Initial AI greeting message
const initialAIGreeting = {
  id: 1,
  type: 'ai',
  content: 'Hello! I\'m ChatEase AI, your helpful assistant. How can I help you today?',
  avatar: 'AI',
  timestamp: new Date().toISOString()
};

// Conversation template
const createNewConversation = (id, title = 'New Conversation') => ({
  id,
  title,
  preview: initialAIGreeting.content,
  messages: [initialAIGreeting],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

// Provider component
export const ChatProvider = ({ children }) => {
  // Load conversations from localStorage or use default
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem('chatease_conversations');
    if (savedConversations) {
      try {
        return JSON.parse(savedConversations);
      } catch (error) {
        console.error('Error parsing saved conversations:', error);
        return [createNewConversation(1, 'General Assistant')];
      }
    }
    // Default first conversation
    return [createNewConversation(1, 'General Assistant')];
  });

  // Active conversation ID
  const [activeConversationId, setActiveConversationId] = useState(() => {
    const savedId = localStorage.getItem('chatease_active_conversation_id');
    return savedId ? parseInt(savedId, 10) : (conversations[0]?.id || 1);
  });

  // Loading state for AI responses
  const [isLoading, setIsLoading] = useState(false);

  // Feedback message for user actions
  const [feedback, setFeedback] = useState(null);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('chatease_conversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('Error saving conversations:', error);
    }
  }, [conversations]);

  // Save active conversation ID to localStorage
  useEffect(() => {
    localStorage.setItem('chatease_active_conversation_id', activeConversationId);
  }, [activeConversationId]);

  // Get the currently active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Show feedback message for a specified duration
  const showFeedback = (message, type = 'info', duration = 3000) => {
    setFeedback({ message, type, id: Date.now() });
    setTimeout(() => setFeedback(null), duration);
  };

  // Create a new conversation
  const createConversation = (title = 'New Conversation') => {
    // Generate a new unique ID
    const maxId = Math.max(0, ...conversations.map(c => c.id));
    const newId = maxId + 1;
    
    // Create the conversation
    const newConversation = createNewConversation(newId, title);
    
    // Add it to the list
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newId);
    
    showFeedback(`Created new conversation: ${title}`, 'success');
    return newId;
  };

  // Rename a conversation
  const renameConversation = (id, newTitle) => {
    setConversations(conversations.map(conv => 
      conv.id === id 
        ? { ...conv, title: newTitle, updatedAt: new Date().toISOString() } 
        : conv
    ));
    
    showFeedback(`Renamed conversation to: ${newTitle}`, 'success');
  };

  // Delete a conversation
  const deleteConversation = (id) => {
    // Find the conversation to delete for the feedback message
    const convoToDelete = conversations.find(c => c.id === id);
    
    // Remove the conversation
    setConversations(conversations.filter(conv => conv.id !== id));
    
    // If we're deleting the active conversation, switch to another one
    if (id === activeConversationId) {
      // Find another conversation to set as active
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      if (remainingConversations.length > 0) {
        setActiveConversationId(remainingConversations[0].id);
      } else {
        // If no conversations left, create a new one
        const newId = createConversation();
        setActiveConversationId(newId);
      }
    }
    
    showFeedback(`Deleted conversation: ${convoToDelete?.title || 'Untitled'}`, 'info');
  };

  // Send a new message
  const sendMessage = (content) => {
    if (!content.trim()) return;
    
    // Create a copy of the conversations to modify
    const updatedConversations = [...conversations];
    const conversationIndex = updatedConversations.findIndex(c => c.id === activeConversationId);
    
    if (conversationIndex === -1) return;
    
    // Get the current conversation
    const conversation = updatedConversations[conversationIndex];
    
    // Create the new user message
    const newUserMessage = {
      id: conversation.messages.length + 1,
      type: 'user',
      content,
      avatar: 'You',
      timestamp: new Date().toISOString()
    };
    
    // Add the user message
    conversation.messages.push(newUserMessage);
    conversation.preview = content;
    conversation.updatedAt = new Date().toISOString();
    
    // Update the conversations list
    setConversations(updatedConversations);
    
    // Simulate AI response
    setIsLoading(true);
    
    setTimeout(() => {
      const aiResponse = {
        id: conversation.messages.length + 1,
        type: 'ai',
        content: `I received your message: "${content}". This is a placeholder response. In a complete implementation, this would be generated by an AI model.`,
        avatar: 'AI',
        timestamp: new Date().toISOString()
      };
      
      // Update conversation with AI response
      const updatedWithAIResponse = [...conversations];
      const convoIndex = updatedWithAIResponse.findIndex(c => c.id === activeConversationId);
      
      if (convoIndex !== -1) {
        updatedWithAIResponse[convoIndex].messages.push(aiResponse);
        updatedWithAIResponse[convoIndex].updatedAt = new Date().toISOString();
        setConversations(updatedWithAIResponse);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Clear all messages in the current conversation
  const clearMessages = () => {
    setConversations(conversations.map(conv => 
      conv.id === activeConversationId 
        ? {
            ...conv,
            messages: [initialAIGreeting],
            preview: initialAIGreeting.content,
            updatedAt: new Date().toISOString()
          }
        : conv
    ));
    
    showFeedback('Conversation cleared', 'info');
  };

  // Export the context value
  const contextValue = {
    conversations,
    activeConversationId,
    activeConversation,
    isLoading,
    feedback,
    setActiveConversationId,
    createConversation,
    renameConversation,
    deleteConversation,
    sendMessage,
    clearMessages,
    showFeedback
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the Chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
