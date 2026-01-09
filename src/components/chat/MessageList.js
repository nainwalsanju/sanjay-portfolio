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

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, color: darkMode ? '#0d252e' : '#e6f7f0' }} className="chat-scroll">
      <List>
        {groups.map((group, gi) => (
          <Box key={gi} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: group.role === 'user' ? '#09C6F9' : '#22304A', color: '#F5F7FA', width: 36, height: 36 }}>{group.role === 'user' ? 'U' : 'A'}</Avatar>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: darkMode ? '#0d252e' : '#e6f7f0' }}>{group.role === 'user' ? 'You' : 'Assistant'}</Typography>
                  <Typography variant="caption" sx={{ color: darkMode ? 'rgba(13,37,56,0.7)' : 'rgba(230,247,240,0.8)' }}>{group.items[group.items.length - 1]?.time ? new Date(group.items[group.items.length - 1].time).toLocaleTimeString() : ''}</Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>
                  <MessageBubble role={group.role} darkMode={darkMode.toString()} sx={{ display: 'inline-block' }}>
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
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;