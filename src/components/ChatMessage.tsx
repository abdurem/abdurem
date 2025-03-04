'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  content: string;
  isUser?: boolean;
}

export const ChatMessage = ({ content, isUser = false }: ChatMessageProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MessageContent = () => (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return (
              <code
                className={`${match ? `language-${match[1]}` : ''} ${!className?.includes('language-') ? 'bg-gray-800 rounded px-1' : ''}`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {children}
            </a>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  if (!mounted) {
    return (
      <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`inline-block rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-[#2A2B32] text-white' 
            : 'bg-[#383838] text-[#ececf1]'
        }`}>
          <MessageContent />
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`inline-block rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-[#2A2B32] text-white' 
            : 'bg-[#383838] text-[#ececf1]'
        }`}>
          <MessageContent />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 