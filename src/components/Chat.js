import React, { useState } from 'react';
import { getDeepSeekResponse } from '../services/deepseek';
import { Box, Modal, IconButton, CircularProgress, styled } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import styles from '../variables.modules.scss';

const MessageBubble = styled(Box)(({ theme, role, darkmode }) => ({
  padding: '12px 16px',
  borderRadius: role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  background: role === 'user' 
    ? `linear-gradient(135deg, ${styles.purple}, ${styles.pink})`
    : darkmode === 'true' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.03)',
  color: role === 'user' ? '#fff' : darkmode === 'true' ? '#fff' : styles.dark,
  fontSize: '0.95rem',
  lineHeight: 1.6,
  maxWidth: '85%',
  wordBreak: 'break-word',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease'
}));

const Chat = ({ open, setOpen, darkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const userMessage = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      
      const result = await getDeepSeekResponse(input, messages);
      const MAX_WORDS = 400;
      const truncatedResponse = result.split(' ').slice(0, MAX_WORDS).join(' ') + 
        (result.split(' ').length > MAX_WORDS ? '...' : '');

      const aiMessage = { role: 'assistant', content: truncatedResponse };
      setMessages(prev => [...prev, aiMessage]);
      setInput('');
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', md: '600px' },
        bgcolor: darkMode ? 'background.paper' : 'common.white',
        borderRadius: '16px',
        boxShadow: 24,
        p: 2.5,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={1}>
          <Box sx={{ 
            background: `linear-gradient(135deg, ${styles.purple}, ${styles.g})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
            fontSize: '1.4rem'
          }}>
            Portfolio Assistant
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <Close sx={{ color: darkMode ? '#fff' : styles.dark }} />
          </IconButton>
        </Box>
        
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          p: 1.5,
          bgcolor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.03)',
          borderRadius: '12px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: `linear-gradient(135deg, ${styles.purple}, ${styles.pink})`,
            borderRadius: '4px',
          }
        }}>
          {messages.map((msg, i) => (
            <Box key={i} mb={2} sx={{ 
              textAlign: msg.role === 'user' ? 'right' : 'left',
              px: 1
            }}>
              <MessageBubble
                role={msg.role}
                darkmode={darkMode.toString()}
                sx={{
                  ml: msg.role === 'user' ? 'auto' : 0,
                  mr: msg.role === 'user' ? 0 : 'auto'
                }}
              >
                {msg.content}
              </MessageBubble>
            </Box>
          ))}
          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress size={24} sx={{ color: styles.purple }} />
            </Box>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={1} alignItems="center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience, projects, or skills..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '12px',
                border: 'none',
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                color: darkMode ? '#fff' : styles.dark,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: 'none',
                background: `linear-gradient(135deg, ${styles.purple}, ${styles.pink})`,
                color: 'white',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${styles.purple}33`
              }}
            >
              <Send sx={{ fontSize: '1.1rem' }} />
              <span>Send</span>
            </button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default Chat;