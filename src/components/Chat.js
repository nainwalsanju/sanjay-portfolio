import React, { useState, useRef, useEffect } from 'react';
import { getDeepSeekResponse } from '../services/deepseek';
import {
  Box,
  IconButton,
  CircularProgress,
  styled,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { Close, Send, AttachFile } from '@mui/icons-material';
import styles from '../variables.modules.scss';
// Syntax highlighter (Prism) — install `react-syntax-highlighter` to enable
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = styled(Box)(({ theme, role, darkmode }) => {
  const isDarkMode = darkmode === 'true' || darkmode === true;
  // Theme colors with new gradient
  const userGradient = 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))';
  const assistantBgDark = '#2a2a2a';
  const assistantBgLight = '#f8f8f8';
  const textColor = role === 'assistant' ? (isDarkMode ? '#f8f8f8' : '#1f1f1f') : '#FFFFFF';

  return {
    padding: '14px 18px',
    borderRadius: role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
    background: role === 'user' ? userGradient : (isDarkMode ? assistantBgDark : assistantBgLight),
    color: textColor,
    fontSize: '0.95rem',
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0.01em',
    maxWidth: '85%',
    wordBreak: 'break-word',
    boxShadow: role === 'user' 
      ? '0 8px 24px rgba(9,198,249,0.2)' 
      : '0 8px 24px rgba(34,48,74,0.15)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: 12,
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
    '& pre': {
      margin: '8px 0',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    '& code': {
      fontFamily: '"Roboto Mono", monospace',
      fontSize: '0.9em'
    },
    '& p:first-of-type': {
      marginTop: 0
    },
    '& p:last-of-type': {
      marginBottom: 0
    }
  };
});

const Chat = ({ open, setOpen, darkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const listRef = useRef(null);

  // No sound effects

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // build groups of consecutive messages with same role for collapsed rendering
  const buildGroups = (msgs) => {
    const groups = [];
    msgs.forEach((m) => {
      if (!groups.length || groups[groups.length - 1].role !== m.role) {
        groups.push({ role: m.role, items: [m] });
      } else {
        groups[groups.length - 1].items.push(m);
      }
    });
    return groups;
  };

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
      setMessages(prev => [...prev, userMessage]);
      const result = await getDeepSeekResponse(annotatedMessage, messages);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachment({ name: file.name, type: file.type, size: file.size, url });
    // clear input so re-selecting same file works
    e.target.value = null;
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const renderMessageContent = (msg) => {
    const text = msg.content || '';

    // Render markdown and code blocks via react-markdown + Prism
    return (
      <Box sx={{ '& pre': { margin: 0 } }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline) {
                return (
                  <SyntaxHighlighter
                    language={match ? match[1] : ''}
                    style={atomDark}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
              return <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }} {...props}>{children}</code>;
            }
          }}
        >
          {text}
        </ReactMarkdown>
      </Box>
    );
  };

  // mark assistant messages as read when chat is visible
  useEffect(() => {
    if (open) {
      setMessages(prev => prev.map(m => m.role === 'assistant' ? { ...m, read: true } : m));
    }
  }, [open]);

  if (!open) return null;

    // Chat is always shown when open

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 12, sm: 20 },
        bottom: { xs: 12, sm: 20 },
        width: { xs: 'calc(100% - 24px)', sm: 380 },
        maxWidth: 520,
        bgcolor: darkMode ? '#F8F9FA' : '#1A2634',
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
        @keyframes fadeIn { 
          from { 
            opacity: 0; 
            transform: translateY(12px); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }
        @keyframes blink { 
          0% { opacity: 0.2; transform: scale(0.9) } 
          50% { opacity: 1; transform: scale(1.1) } 
          100% { opacity: 0.2; transform: scale(0.9) } 
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(9,198,249,0.4) }
          70% { box-shadow: 0 0 0 6px rgba(9,198,249,0) }
          100% { box-shadow: 0 0 0 0 rgba(9,198,249,0) }
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .chat-scroll::-webkit-scrollbar { 
          width: 8px; 
        }
        .chat-scroll::-webkit-scrollbar-track { 
          background: transparent; 
          margin: 4px;
        }
        .chat-scroll::-webkit-scrollbar-thumb { 
          background: rgba(9,198,249,0.2); 
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: all 0.2s;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(9,198,249,0.4);
          border: 1px solid transparent;
        }
        .message-enter {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .typing-indicator {
          animation: blink 1.4s infinite;
        }
      `}</style>
      <AppBar position="static" elevation={0} sx={{ 
        bgcolor: darkMode ? '#F8F9FA' : '#1A2634', 
        boxShadow: 'none', 
        px: 2, 
        py: 1,
        borderBottom: darkMode ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)'
      }}>
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            minHeight: '52px',
            p: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box 
                component="img"
                src={require('../assets/img/self.png')}
                alt="Sanjay Nainwal"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <Box>
                <Typography sx={{
                  background: '-webkit-linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}>
                  Ask me about Sanjay
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={() => setOpen(false)}
              size="small"
              sx={{
                color: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                padding: '4px',
                '&:hover': {
                  color: darkMode ? 'rgba(0,0,0,0.7)' : '#fff',
                  background: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          </Toolbar>
        </AppBar>

  <Box sx={{ flex: 1, overflowY: 'auto', p: 2, color: darkMode ? '#0d252e' : '#e6f7f0' }} ref={listRef} className="chat-scroll">
          <List>
            {buildGroups(messages).map((group, gi) => (
              <Box key={gi} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: group.role === 'user' ? '#09C6F9' : '#22304A', color: '#F5F7FA', width: 36, height: 36 }}>{group.role === 'user' ? 'U' : 'A'}</Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ color: darkMode ? '#0d252e' : '#e6f7f0' }}>{group.role === 'user' ? 'You' : 'Assistant'}</Typography>
                      <Typography variant="caption" sx={{ color: darkMode ? 'rgba(13,37,56,0.7)' : 'rgba(230,247,240,0.8)' }}>{group.items[group.items.length - 1]?.time ? new Date(group.items[group.items.length - 1].time).toLocaleTimeString() : ''}</Typography>
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                      <MessageBubble role={group.role} darkmode={darkMode.toString()} sx={{ display: 'inline-block' }}>
                        {group.items.map((msg, idx) => (
                          <Box key={msg.id || idx} sx={{ mt: idx === 0 ? 0 : 1 }}>
                            {renderMessageContent(msg)}
                            {msg.file && (
                              <Box mt={1}>
                                {msg.file.type?.startsWith('image/') && (
                                  <img src={msg.file.url} alt={msg.file.name} style={{ maxWidth: '280px', borderRadius: 8 }} />
                                )}
                                {msg.file.type?.startsWith('video/') && (
                                  <video src={msg.file.url} controls style={{ maxWidth: '360px', borderRadius: 8 }} />
                                )}
                                {!msg.file.type?.startsWith('image/') && !msg.file.type?.startsWith('video/') && (
                                  <Box>
                                    <a href={msg.file.url} download={msg.file.name}>{msg.file.name}</a>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </MessageBubble>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </List>
          {loading && (
            <Box display="flex" justifyContent="flex-start" mt={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8 }} />
                <Box sx={{ bgcolor: '#243957', p: 1.25, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', gap: 0.6, alignItems: 'center', px: 0.5 }}>
                    <Box sx={{ width: 6, height: 6, bgcolor: '#09C6F9', borderRadius: '50%', animation: 'blink 1s infinite' }} />
                    <Box sx={{ width: 6, height: 6, bgcolor: '#09C6F9', borderRadius: '50%', animation: 'blink 1s 0.2s infinite' }} />
                    <Box sx={{ width: 6, height: 6, bgcolor: '#09C6F9', borderRadius: '50%', animation: 'blink 1s 0.4s infinite' }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            borderTop: darkMode ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)',
            p: 1.5,
            backgroundColor: darkMode ? '#f8f8f8' : '#1f1f1f'
          }}
        >
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
          <Box sx={{ position: 'relative' }}>
            <InputBase
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              placeholder="ask about projects, experience, skills..."
              disabled={loading}
              multiline
              maxRows={4}
              sx={{
                width: '100%',
                padding: '10px 84px 10px 14px', // Space for buttons
                borderRadius: '12px',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
                background: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.03)',
                color: darkMode ? '#1A2634' : '#F8F9FA',
                boxShadow: darkMode 
                  ? 'inset 0 1px 2px rgba(0,0,0,0.03)' 
                  : 'inset 0 1px 2px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                '&:hover': {
                  borderColor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.12)',
                  background: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.05)'
                },
                '&.Mui-focused': {
                  borderColor: '#09C6F9',
                  boxShadow: '0 0 0 1px rgba(9,198,249,0.2)'
                }
              }}
            />
            
            <Box sx={{ 
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              gap: 0.5,
              alignItems: 'center'
            }}>
              <Tooltip title="Add attachment">
                <IconButton 
                  onClick={triggerFileSelect}
                  size="small"
                  sx={{
                    color: darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
                    padding: '6px',
                    '&:hover': {
                      color: '#09C6F9',
                      background: darkMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'
                    }
                  }}
                >
                  <AttachFile sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>

              <Button
                type="submit"
                disabled={loading}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  padding: 0,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,255,164,0.2)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(166,104,255,0.25)'
                  }
                }}
              >
                <Send sx={{ fontSize: 18 }} />
              </Button>
            </Box>
          </Box>

          {attachment && (
            <Box mt={1} display="flex" alignItems="center" gap={1} sx={{
              background: darkMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '0.75rem'
            }}>
              <AttachFile sx={{ fontSize: 14, color: '#09C6F9' }} />
              <Box sx={{ 
                flex: 1,
                color: darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {attachment.name}
              </Box>
              <IconButton 
                size="small" 
                onClick={() => setAttachment(null)}
                sx={{
                  padding: '2px',
                  color: darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
                  '&:hover': {
                    color: '#09C6F9',
                    background: 'rgba(9,198,249,0.08)'
                  }
                }}
              >
                <Close sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
  );
};

export default Chat;