import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AI_SUGGESTED_PROMPTS, getAIAnswer } from '../data/aiResponses';
import { MessageSquareCode, Sparkles, Send, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';

export function AskGrowwView() {
  const { openLesson, navigateTo } = useApp();

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      topic: 'Welcome to Ask Groww',
      simpleExplanation: "Hi! I'm your educational financial assistant. I help you understand investing concepts, demystify jargon, and learn how to evaluate financial tools—without risky stock tips or sales pitches.",
      example: "Ask me questions like 'Explain SIP like I'm 20', 'What is P/E ratio?', or 'Why do markets fall?'.",
      whyItMatters: "Financial understanding gives you the confidence to build wealth on your own terms.",
      commonMistake: "Never blindly follow social media stock tips. Always understand what you invest in.",
      learnMore: "Click any suggested prompt below to start!"
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (queryText) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = getAIAnswer(text);
      setMessages(prev => [...prev, { sender: 'ai', ...answer }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 860, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* Top Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #0E1318 0%, #1A222C 100%)',
        color: '#FFFFFF',
        padding: '24px 28px',
        border: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{
            background: 'rgba(0, 208, 156, 0.2)',
            color: '#00D09C',
            border: '1px solid rgba(0, 208, 156, 0.4)',
            fontSize: 11,
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: 9999
          }}>
            AI LEARNING ASSISTANT
          </span>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>Structured • Jargon-Free • Educational</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
          Ask Groww AI ✨
        </h1>
        <p style={{ fontSize: 14, color: '#CBD5E1', marginTop: 4, maxWidth: 620, lineHeight: 1.5 }}>
          Have a question about a financial term, market concept, or budgeting rule? Ask below for simple analogies and clear takeaways.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
          Suggested Questions
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AI_SUGGESTED_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-color)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-main)',
                transition: 'var(--transition)'
              }}
              className="groww-card-interactive"
            >
              💬 {p}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Thread */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, index) => {
          if (msg.sender === 'user') {
            return (
              <div
                key={index}
                style={{
                  alignSelf: 'flex-end',
                  background: 'var(--primary-dark)',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: '16px 16px 4px 16px',
                  maxWidth: '75%',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                {msg.text}
              </div>
            );
          }

          // Structured AI Response
          return (
            <div
              key={index}
              className="groww-card"
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                padding: '24px',
                border: '1.5px solid var(--primary-border)',
                background: '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #00D09C 0%, #00B386 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 14
                }}>
                  AI
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>
                    {msg.topic}
                  </h3>
                  <span style={{ fontSize: 11, color: 'var(--text-light)' }}>Groww Financial Knowledge Engine</span>
                </div>
              </div>

              {/* Structured Blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, lineHeight: 1.5 }}>
                
                {/* 1. Simple Explanation */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary-dark)', textTransform: 'uppercase', marginBottom: 2 }}>
                    SIMPLE EXPLANATION
                  </div>
                  <div style={{ color: 'var(--text-main)' }}>
                    {msg.simpleExplanation}
                  </div>
                </div>

                {/* 2. Example / Analogy */}
                {msg.example && (
                  <div style={{ background: 'var(--primary-light)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#008765', textTransform: 'uppercase', marginBottom: 2 }}>
                      💡 REAL-WORLD EXAMPLE
                    </div>
                    <div style={{ color: '#0E2922' }}>
                      {msg.example}
                    </div>
                  </div>
                )}

                {/* 3. Why It Matters */}
                {msg.whyItMatters && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: 2 }}>
                      ⭐ WHY IT MATTERS
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      {msg.whyItMatters}
                    </div>
                  </div>
                )}

                {/* 4. Common Mistake */}
                {msg.commonMistake && (
                  <div style={{ background: '#FFFBEB', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #FCD34D' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: 2 }}>
                      ⚠️ COMMON MISTAKE
                    </div>
                    <div style={{ color: '#78350F' }}>
                      {msg.commonMistake}
                    </div>
                  </div>
                )}

                {/* 5. Learn More Action */}
                {msg.learnMore && (
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10, fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>📚 {msg.learnMore}</span>
                    <button
                      onClick={() => navigateTo('learn')}
                      style={{ color: 'var(--primary-dark)', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      Open Learn Hub
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', width: 'fit-content', fontSize: 13, color: 'var(--text-muted)' }}>
            ✨ Groww AI is structuring your answer...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div style={{
        position: 'sticky',
        bottom: 80,
        background: '#FFFFFF',
        padding: '12px',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <input
          type="text"
          placeholder="Ask any investing question (e.g. 'What is diversification?', 'Explain compounding')..."
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 14,
            fontFamily: 'inherit',
            padding: '8px 12px'
          }}
        />

        <button
          className="btn-primary"
          onClick={() => handleSend()}
          style={{ padding: '10px 18px', borderRadius: 'var(--radius-lg)' }}
        >
          <span>Ask</span>
          <Send size={15} />
        </button>
      </div>

      {/* Trust & AI Disclaimer */}
      <div style={{ fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <ShieldCheck size={14} color="#00B386" />
        <span>Educational assistant only. Does not provide personalized financial or stock-picking advice.</span>
      </div>

    </div>
  );
}
