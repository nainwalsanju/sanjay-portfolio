import React from 'react';
import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ role, darkMode, children }) => {
  const isDarkMode = darkMode === 'true' || darkMode === true;
  // Theme colors with new gradient
  const userGradient = 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))';
  const assistantBgDark = '#2a2a2a';
  const assistantBgLight = '#f8f8f8';
  const textColor = role === 'assistant' ? (isDarkMode ? '#f8f8f8' : '#1f1f1f') : '#FFFFFF';

  return (
    <Box
      sx={{
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
      }}
    >
      {children}
    </Box>
  );
};

export const renderMessageContent = (msg) => {
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

export default MessageBubble;