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
import { Close, Send, AttachFile, InsertPhoto, Videocam, VolumeUp, VolumeOff, Minimize } from '@mui/icons-material';
import styles from '../variables.modules.scss';
// Syntax highlighter (Prism) — install `react-syntax-highlighter` to enable
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = styled(Box)(({ theme, role, darkmode }) => {
  const isDarkMode = darkmode === 'true' || darkmode === true;
  // theme from user proposal
  const primary = '#22304A';
  const accent = '#09C6F9';
  const textColor = '#F5F7FA';

  return {
    padding: '12px 16px',
    borderRadius: role === 'user' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
    background: role === 'user' ? accent : (isDarkMode ? '#243957' : primary),
    color: role === 'user' ? '#031826' : textColor,
    fontSize: '0.95rem',
    lineHeight: 1.6,
    maxWidth: '85%',
    wordBreak: 'break-word',
    boxShadow: '0 10px 30px rgba(2,44,112,0.12)',
    transition: 'all 0.28s ease',
    marginBottom: 12,
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start'
  };
});

const Chat = ({ open, setOpen, darkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef(null);
  const listRef = useRef(null);

  // play short UI sounds using WebAudio; avoids bundling audio files
  const playSound = (type = 'send') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = type === 'receive' ? 660 : 880;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.19);
    } catch (e) {
      // ignore if audio context not available
    }
  };

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
      playSound('send');

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
      playSound('receive');
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

  // mark assistant messages as read when chat is visible and not minimized
  useEffect(() => {
    if (open && !minimized) {
      setMessages(prev => prev.map(m => m.role === 'assistant' ? { ...m, read: true } : m));
    }
  }, [open, minimized]);

  if (!open) return null;

  if (minimized) {
    const unread = messages.filter(m => m.role === 'assistant' && !m.read).length;
    return (
      <Box sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1400 }}>
        <Button onClick={() => setMinimized(false)} sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#22304A', color: '#F5F7FA', px: 2, py: 1.25, borderRadius: 28, boxShadow: '0 8px 20px rgba(2,44,112,0.14)' }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#09C6F9', color: '#082033', fontSize: 12 }}>SN</Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ fontSize: 13 }}>Portfolio Assistant</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(245,247,250,0.7)' }}>{unread ? `${unread} new` : 'open chat'}</Typography>
          </Box>
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 12, sm: 20 },
        bottom: { xs: 12, sm: 20 },
        width: { xs: 'calc(100% - 24px)', sm: 380 },
        maxWidth: 520,
        bgcolor: darkMode ? 'rgb(220,214,200)' : '#22304A',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(2,44,112,0.22)',
        zIndex: 1300,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh'
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0% { opacity: 0.2 } 50% { opacity: 1 } 100% { opacity: 0.2 } }
        .chat-scroll::-webkit-scrollbar { width: 10px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 8px; }
        .chat-header-title { font-weight: 700; }
      `}</style>
      <AppBar position="static" elevation={0} sx={{ bgcolor: darkMode ? 'rgb(220,214,200)' : '#22304A', boxShadow: 'none', px: 2, py: 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{
                background: `linear-gradient(90deg, #09C6F9 0%, #1E88E5 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: '1rem',
                overflowWrap: 'anywhere',
                lineHeight: 1
              }}>
                Portfolio Assistant
              </Typography>
              <Typography variant="caption" sx={{ color: darkMode ? '#0d252e' : '#e6f7f0' }}>
                Ask about projects, experience, or upload files
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title="Sanjay Nainwal">
                <Avatar sx={{ bgcolor: '#22304A', width: 36, height: 36, fontWeight: 700, color: '#F5F7FA' }}>SN</Avatar>
              </Tooltip>
              <Tooltip title={soundEnabled ? 'Sound on' : 'Sound off'}>
                <IconButton onClick={() => setSoundEnabled(s => !s)}>
                  {soundEnabled ? <VolumeUp sx={{ color: darkMode ? '#0d252e' : '#fff' }} /> : <VolumeOff sx={{ color: darkMode ? '#0d252e' : '#fff' }} />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Minimize">
                <IconButton onClick={() => setMinimized(true)}>
                  <Minimize sx={{ color: darkMode ? '#0d252e' : '#fff' }} />
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => setOpen(false)}>
                <Close sx={{ color: darkMode ? '#0d252e' : '#fff' }} />
              </IconButton>
            </Box>
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

        <Box component="form" onSubmit={handleSubmit} sx={{ borderTop: darkMode ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', p: 2 }}>
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
          <Box display="flex" gap={1} alignItems="center">
            <InputBase
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience, projects, or skills..."
              disabled={loading}
              sx={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)',
                background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
                color: darkMode ? '#0d252e' : '#e6f7f0',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
              }}
            />

            <Box display="flex" gap={1} alignItems="center">
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              <Tooltip title="Attach file">
                <IconButton onClick={triggerFileSelect}>
                  <AttachFile />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach image">
                <IconButton onClick={triggerFileSelect}>
                  <InsertPhoto />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach video">
                <IconButton onClick={triggerFileSelect}>
                  <Videocam />
                </IconButton>
              </Tooltip>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg,#09C6F9 0%, #1E88E5 100%)',
                  color: '#082033',
                  borderRadius: '999px',
                  padding: '10px 14px',
                  minWidth: 56,
                  height: 44,
                  boxShadow: '0 8px 28px rgba(14,120,200,0.18)'
                }}
              >
                <Send sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          </Box>

          {attachment && (
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Box sx={{ fontSize: '0.9rem' }}>{attachment.name}</Box>
              <Button size="small" onClick={() => setAttachment(null)}>Remove</Button>
            </Box>
          )}
        </Box>
      </Box>
  );
};

export default Chat;