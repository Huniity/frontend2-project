'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSend } from 'react-icons/fi';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type TripData = {
  ready: boolean;
  destination: string;
  numberOfDays: number;
  tripType: string;
  budgetLevel: string;
  numberOfPersons: number;
  departureCity: string;
};

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "Hey! I'm NomadIA. \nWhere in the world are you dreaming of going?",
};

const ChatBox = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripData, setTripData] = useState<TripData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!tripData) return;

    const generate = async () => {
      setIsGenerating(true);
      try {
        const res = await fetch('/api/generate-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: tripData.destination,
            numberOfDays: tripData.numberOfDays,
            tripType: tripData.tripType,
            budgetLevel: tripData.budgetLevel,
            numberOfPersons: tripData.numberOfPersons,
            departureCity: tripData.departureCity,
          }),
        });

        if (!res.ok) throw new Error('Generation failed');

        const data = await res.json();
        router.push(`/trips/${data.tripId}`);

      } catch (err) {
        console.error(err);
        setIsGenerating(false);
        setTripData(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: "Sorry, I couldn't generate your trip. Please try again 🙏",
          },
        ]);
      }
    };

    generate();
  }, [tripData, router]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (res.status === 429) throw new Error('rate_limit');
      if (!res.ok) throw new Error('api_error');

      const data = await res.json();

      const displayContent = data.message
        .replace(/```json[\s\S]*?```/g, '')
        .trim();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: displayContent || "Great, I have everything! Building your trip now...",
        },
      ]);

      if (data.tripData) {
        setTripData(data.tripData);
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown_error';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorMessage === 'rate_limit'
            ? "I'm a bit busy right now, try again in a few seconds 🙏"
            : "Sorry, something went wrong. Please try again later 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border border-white/15 rounded-2xl p-8 w-full max-w-2xl flex flex-col text-white h-150 bg-linear-to-br from-white/8 to-white/3 backdrop-blur-xl shadow-2xl mx-auto">
      <div className="mb-6 pb-6 border-b border-white/10 shrink-0">
        <h3 className="text-2xl font-made-outer-alt font-bold text-white">nomad.ia Assistant</h3>
        <p className="text-sm text-gray-400 font-made-outer mt-1">Plan your next adventure</p>
      </div>

      {/* Messages Container - Fixed Height with Scroll */}
      <div className="overflow-y-auto space-y-4 mb-6 flex-1 min-h-0 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-sm px-6 py-4 rounded-2xl font-made-outer text-base leading-relaxed transition-all duration-200 ${
              msg.role === 'user'
                ? 'bg-linear-to-br from-blue-500/70 to-blue-600/70 backdrop-blur-md border border-blue-400/30 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white/8 backdrop-blur-md border border-white/15 text-gray-100 hover:border-white/25 hover:bg-white/12'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 flex gap-2 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-linear-to-br from-gray-300 to-gray-500"
                  style={{ animation: 'bounce 1.4s infinite', animationDelay: `${i * 0.25}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Generating banner */}
        {isGenerating && (
          <div className="bg-linear-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/40 rounded-2xl px-6 py-4 text-base text-amber-200 font-made-outer flex items-center gap-3 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span>Building your trip to <span className="font-bold text-amber-100">{tripData?.destination}</span>... this may take a few seconds</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-white/10 pt-4 flex gap-3 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isGenerating ? 'Generating your trip...' :
            isLoading ? 'nomad.ia is thinking...' :
            'Tell me about your dream trip...'
          }
          aria-label="Message input"
          disabled={isLoading || isGenerating}
          className="flex-1 bg-white/6 backdrop-blur-md border border-white/15 rounded-xl px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 font-made-outer text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          disabled={isLoading || isGenerating || !input.trim()}
          className="bg-linear-to-br from-blue-500/70 to-blue-600/70 backdrop-blur-md border border-blue-400/30 rounded-xl px-5 py-3 hover:from-blue-500/90 hover:to-blue-600/90 hover:border-blue-400/50 transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          <FiSend size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;