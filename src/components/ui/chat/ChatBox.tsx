'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'How can I help you plan your next adventure?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: input },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'I can help with that!' },
    ]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6 w-full flex flex-col h-full text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg font-made-outer text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600/80 text-white'
                  : 'bg-white/10 border border-white/15 text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 font-made-outer text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center"
        >
          <FiSend size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;