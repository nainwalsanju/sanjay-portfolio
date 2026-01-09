import React, { useState, useRef, useEffect } from 'react';
import { getDeepSeekResponse } from '../services/deepseek';
import { Box } from '@mui/material';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

const Chat = ({ open, setOpen, darkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      // Include a short attachment annotation so the assistant knows a file was attached.
      const annotatedMessage = attachment ? `${input}\n\n[Attached file: ${attachment.name} (${attachment.type || 'unknown'})]` : input;
      const now = Date.now();
      const userMessage = { id: now, role: 'user', content: annotatedMessage, time: new Date().toISOString(), status: 'sent' };
      if (attachment) userMessage.file = attachment;
      
      // Create updated messages array for API call
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      const result = await getDeepSeekResponse(annotatedMessage, updatedMessages);
      const MAX_WORDS = 400;
      const truncatedResponse = result.split(' ').slice(0, MAX_WORDS).join(' ') +
        (result.split(' ').length > MAX_WORDS ? '...' : '');
      const aiMessage = { id: now + 1, role: 'assistant', content: truncatedResponse, time: new Date().toISOString() };
      // mark user's message as delivered/read
      setMessages(prev => {
        const updated = prev.map(m => m.id === userMessage.id ? { ...m, status: 'delivered' } : m);
        return [...updated, aiMessage];
      });
      setInput('');
      setAttachment(null);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  // mark assistant messages as read when chat is visible
  useEffect(() => {
    if (open) {
      setMessages(prev => prev.map(m => m.role === 'assistant' ? { ...m, read: true } : m));
    }
  }, [open]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 12, sm: 20 },
        bottom: { xs: 12, sm: 20 },
        width: { xs: 'calc(100% - 24px)', sm: 380 },
        maxWidth: 520,
        bgcolor: darkMode ? '#1A2634' : '#F8F9FA',
        borderRadius: '24px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        zIndex: 1300,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
      }}
    >
      <style>{`
        @keyframes blink {
          0% { opacity: 0.2; transform: scale(0.9) }
          50% { opacity: 1; transform: scale(1.1) }
          100% { opacity: 0.2; transform: scale(0.9) }
        }
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
          margin: 2px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(9,198,249,0.2);
          border-radius: 10px;
          border: 1px solid transparent;
          background-clip: padding-box;
          transition: all 0.2s;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(9,198,249,0.4);
          border: 1px solid transparent;
        }
      `}</style>
      <ChatHeader darkMode={darkMode} onClose={() => setOpen(false)} />
      <MessageList ref={listRef} messages={messages} darkMode={darkMode} loading={loading} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        loading={loading}
        attachment={attachment}
        setAttachment={setAttachment}
        darkMode={darkMode}
      />
    </Box>
  );
};

export default Chat;