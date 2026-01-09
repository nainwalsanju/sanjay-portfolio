import React, { forwardRef } from 'react';
import { Box, List, Avatar, Typography } from '@mui/material';
import MessageBubble, { renderMessageContent } from './MessageBubble';

const MessageList = forwardRef(({ messages, darkMode, loading }, ref) => {
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

  const groups = buildGroups(messages);

  // Theme-aware colors
  const userAvatarColor = '#09C6F9';
  const assistantAvatarColor = '#22304A';
  const avatarTextColor = '#F5F7FA';
  const textColor = darkMode ? '#F8F9FA' : '#1A2634';
  const timeColor = darkMode ? 'rgba(248,249,250,0.7)' : 'rgba(26,38,52,0.7)';
  const loadingBg = darkMode ? '#2a3a4a' : '#e8f4f8';
  const loadingDot = '#09C6F9';

  return (
    <Box sx={{ 
      flex: 1, 
      overflowY: 'auto', 
      p: 1.5,
      color: textColor 
    }} className="chat-scroll">
      <List sx={{ p: 0 }}>
        {groups.map((group, gi) => {
          const isUser = group.role === 'user';
          return (
            <Box key={gi} sx={{ 
              display: 'flex', 
              gap: 0.75, 
              mb: 1, 
              alignItems: 'flex-start',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              width: '100%'
            }}>
              {/* For user messages: message first, then avatar */}
              {isUser ? (
                <>
                  {/* Message Content - on the left */}
                  <Box sx={{ flex: 1, minWidth: 0, order: 1 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 0.75, 
                      alignItems: 'center', 
                      mb: 0.25,
                      justifyContent: 'flex-end'
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: textColor, 
                        fontSize: '0.75rem',
                        fontWeight: 600 
                      }}>You</Typography>
                      <Typography variant="caption" sx={{ 
                        color: timeColor,
                        fontSize: '0.65rem'
                      }}>{group.items[group.items.length - 1]?.time ? new Date(group.items[group.items.length - 1].time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</Typography>
                    </Box>
                    <Box sx={{ mt: 0.25 }}>
                      <MessageBubble role={group.role} darkMode={darkMode.toString()} sx={{ display: 'inline-block', width: '100%' }}>
                        {group.items.map((msg, idx) => (
                          <Box key={msg.id || idx} sx={{ mt: idx === 0 ? 0 : 0.75 }}>
                            {renderMessageContent(msg)}
                            {msg.file && (
                              <Box mt={0.75}>
                                {msg.file.type?.startsWith('image/') && (
                                  <img src={msg.file.url} alt={msg.file.name} style={{ maxWidth: '200px', borderRadius: 6 }} />
                                )}
                                {msg.file.type?.startsWith('video/') && (
                                  <video src={msg.file.url} controls style={{ maxWidth: '240px', borderRadius: 6 }} />
                                )}
                                {!msg.file.type?.startsWith('image/') && !msg.file.type?.startsWith('video/') && (
                                  <Box>
                                    <a href={msg.file.url} download={msg.file.name} style={{ fontSize: '0.8rem' }}>{msg.file.name}</a>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </MessageBubble>
                    </Box>
                  </Box>
                  
                  {/* Avatar - on the right */}
                  <Avatar sx={{ 
                    bgcolor: userAvatarColor, 
                    color: avatarTextColor, 
                    width: 32, 
                    height: 32,
                    fontSize: '0.75rem',
                    flexShrink: 0,
                    order: 2
                  }}>U</Avatar>
                </>
              ) : (
                <>
                  {/* Avatar - on the left */}
                  <Avatar sx={{ 
                    bgcolor: assistantAvatarColor, 
                    color: avatarTextColor, 
                    width: 32, 
                    height: 32,
                    fontSize: '0.75rem',
                    flexShrink: 0
                  }}>A</Avatar>
                  
                  {/* Message Content - on the right */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 0.75, 
                      alignItems: 'center', 
                      mb: 0.25,
                      justifyContent: 'flex-start'
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: textColor, 
                        fontSize: '0.75rem',
                        fontWeight: 600 
                      }}>Assistant</Typography>
                      <Typography variant="caption" sx={{ 
                        color: timeColor,
                        fontSize: '0.65rem'
                      }}>{group.items[group.items.length - 1]?.time ? new Date(group.items[group.items.length - 1].time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</Typography>
                    </Box>
                    <Box sx={{ mt: 0.25 }}>
                      <MessageBubble role={group.role} darkMode={darkMode.toString()} sx={{ display: 'inline-block', width: '100%' }}>
                        {group.items.map((msg, idx) => (
                          <Box key={msg.id || idx} sx={{ mt: idx === 0 ? 0 : 0.75 }}>
                            {renderMessageContent(msg)}
                            {msg.file && (
                              <Box mt={0.75}>
                                {msg.file.type?.startsWith('image/') && (
                                  <img src={msg.file.url} alt={msg.file.name} style={{ maxWidth: '200px', borderRadius: 6 }} />
                                )}
                                {msg.file.type?.startsWith('video/') && (
                                  <video src={msg.file.url} controls style={{ maxWidth: '240px', borderRadius: 6 }} />
                                )}
                                {!msg.file.type?.startsWith('image/') && !msg.file.type?.startsWith('video/') && (
                                  <Box>
                                    <a href={msg.file.url} download={msg.file.name} style={{ fontSize: '0.8rem' }}>{msg.file.name}</a>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </MessageBubble>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          );
        })}
      </List>
      {loading && (
        <Box display="flex" justifyContent="flex-start" mt={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6 }} />
            <Box sx={{ bgcolor: loadingBg, p: 1, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', px: 0.5 }}>
                <Box sx={{ width: 4, height: 4, bgcolor: loadingDot, borderRadius: '50%', animation: 'blink 1s infinite' }} />
                <Box sx={{ width: 4, height: 4, bgcolor: loadingDot, borderRadius: '50%', animation: 'blink 1s 0.2s infinite' }} />
                <Box sx={{ width: 4, height: 4, bgcolor: loadingDot, borderRadius: '50%', animation: 'blink 1s 0.4s infinite' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;