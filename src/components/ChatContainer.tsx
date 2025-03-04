'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { initialMessages, responseMessages, systemPrompt, Message } from '@/data/portfolio-content';
import { getAIResponse } from '@/utils/openrouter';

const PulsingArrow = () => (
  <motion.div
    initial={{ opacity: 0.5, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1
    }}
    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-gray-400"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-6 h-6"
    >
      <path d="M12 4l8 8-8 8-8-8 8-8z" />
    </svg>
  </motion.div>
);

const LoadingMessage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex w-full justify-start"
  >
    <motion.div 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut"
      }}
      className="inline-block rounded-lg px-4 py-2 bg-[#383838] text-[#ececf1]"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </motion.div>
  </motion.div>
);

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [showInputHint, setShowInputHint] = useState(true);
  const [isInitialView, setIsInitialView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => {
      if (!isLoading) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener('click', handleClick);
    // Focus on mount
    inputRef.current?.focus();

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isLoading]);

  useEffect(() => {
    // Hide the input hint after 5 seconds
    const timer = setTimeout(() => {
      setShowInputHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setShowInputHint(false);
    setIsInitialView(false);
    setIsLoading(true);
    setStreamingMessage('');

    const newMessages = [...messages, { content: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue('');

    // Keep focus on the input
    inputRef.current?.focus();

    try {
      const aiMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...newMessages.map(msg => ({
          role: msg.isUser ? ('user' as const) : ('assistant' as const),
          content: msg.content
        }))
      ];

      let fullResponse = '';
      await getAIResponse(aiMessages, (chunk) => {
        fullResponse += chunk;
        setStreamingMessage(fullResponse);
      });
      
      setMessages([...newMessages, { content: fullResponse, isUser: false }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages([
        ...newMessages,
        { 
          content: "I apologize, but I encountered an error. Please try again.",
          isUser: false
        }
      ]);
    } finally {
      setIsLoading(false);
      setStreamingMessage('');
      // Ensure focus remains on input after loading completes
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#212121]">      
      <AnimatePresence>
        {!isInitialView && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto">
              {messages.map((message, index) => (
                <div key={index} className="py-3">
                  <ChatMessage
                    content={message.content}
                    isUser={message.isUser}
                  />
                </div>
              ))}
              {isLoading && streamingMessage && (
                <div className="py-3">
                  <ChatMessage content={streamingMessage} isUser={false} />
                </div>
              )}
              {isLoading && !streamingMessage && (
                <div className="py-3">
                  <LoadingMessage />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <motion.footer
        initial={false}
        animate={{
          bottom: isInitialView ? "50%" : 0,
          marginBottom: isInitialView ? "-80px" : 0,
          position: isInitialView ? "fixed" : "relative",
          width: "100%"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`border-t border-gray-900/50 bg-[#212121] pt-2 pb-6`}
      >
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 relative">
          {showInputHint && <PulsingArrow />}
          <motion.div
            initial={{ scale: 1 }}
            animate={showInputHint ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4 relative bg-[#2A2B32] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-900/50"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my skills, projects, or contact info..."
              className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`p-2 mr-1 ${isLoading ? 'text-gray-600' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.footer>
    </div>
  );
}; 