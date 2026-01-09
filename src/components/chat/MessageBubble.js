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
  const linkColor = role === 'user' ? '#FFFFFF' : (isDarkMode ? '#09C6F9' : '#0066CC');
  const linkHoverColor = role === 'user' ? '#E0E0E0' : (isDarkMode ? '#07B0E0' : '#004499');

  return (
    <Box
      sx={{
        padding: '12px 16px',
        borderRadius: role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: role === 'user' ? userGradient : (isDarkMode ? assistantBgDark : assistantBgLight),
        color: textColor,
        fontSize: '0.85rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0.01em',
        maxWidth: '85%',
        wordBreak: 'break-word',
        boxShadow: role === 'user'
          ? '0 8px 24px rgba(9,198,249,0.2)'
          : '0 8px 24px rgba(34,48,74,0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginBottom: 8,
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        '& pre': {
          margin: '8px 0',
          borderRadius: '8px',
          overflow: 'hidden',
          fontSize: '0.8em'
        },
        '& code': {
          fontFamily: '"Roboto Mono", monospace',
          fontSize: '0.85em',
          background: 'rgba(0,0,0,0.06)',
          padding: '2px 4px',
          borderRadius: 3
        },
        '& p': {
          margin: '4px 0'
        },
        '& p:first-of-type': {
          marginTop: 0
        },
        '& p:last-of-type': {
          marginBottom: 0
        },
        '& ul, & ol': {
          margin: '4px 0',
          paddingLeft: '20px'
        },
        '& li': {
          margin: '2px 0'
        },
        '& strong': {
          fontWeight: 600
        },
        '& a': {
          color: linkColor,
          fontWeight: 600,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: linkHoverColor,
            opacity: 0.9
          }
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
            return <code {...props}>{children}</code>;
          },
          a({ node, href, children, ...props }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          }
        }}
      >
        {text}
      </ReactMarkdown>
    </Box>
  );
};

export default MessageBubble;