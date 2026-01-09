import React, { useRef } from 'react';
import { Box, InputBase, Button, IconButton, Tooltip } from '@mui/material';
import { Send, AttachFile, Close } from '@mui/icons-material';

const ChatInput = ({ input, setInput, onSubmit, loading, attachment, setAttachment, darkMode }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachment({ name: file.name, type: file.type, size: file.size, url });
    // clear input so re-selecting same file works
    e.target.value = null;
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
        p: 1.5,
        backgroundColor: darkMode ? '#1A2634' : '#F8F9FA'
      }}
    >
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <Box sx={{ position: 'relative' }}>
        <InputBase
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              onSubmit(e);
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
            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
            color: darkMode ? '#F8F9FA' : '#1A2634',
            boxShadow: darkMode
              ? 'inset 0 1px 2px rgba(0,0,0,0.1)'
              : 'inset 0 1px 2px rgba(0,0,0,0.03)',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            '&:hover': {
              borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)'
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
                color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                padding: '6px',
                '&:hover': {
                  color: '#09C6F9',
                  background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
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
          background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          borderRadius: '8px',
          padding: '4px 8px',
          fontSize: '0.75rem'
        }}>
          <AttachFile sx={{ fontSize: 14, color: '#09C6F9' }} />
          <Box sx={{
            flex: 1,
            color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
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
              color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
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
  );
};

export default ChatInput;