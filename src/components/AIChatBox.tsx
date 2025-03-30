
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, ArrowDown, Lightbulb, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { aiService } from '@/services/aiService';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatBoxProps {
  productName?: string;
  productId?: string;
  currentPrice?: number;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AIChatBox = ({ 
  productName, 
  productId,
  currentPrice,
  isOpen, 
  onClose, 
  className 
}: AIChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Initialize chat with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: '1',
        content: productName 
          ? `Hello! I'm your AI shopping assistant. I can help you decide if now is a good time to buy ${productName} or if you should wait for a better price. What would you like to know?`
          : "Hello! I'm your AI shopping assistant. I can help you find the best deals, compare prices, or give advice on when to buy. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [messages.length, productName]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      let response: string;
      
      // If we have product context, use the personalized advice
      if (productName && currentPrice) {
        response = await aiService.getPersonalizedAdvice(
          productName,
          currentPrice,
          userMessage.content
        );
      } else {
        // Generic AI response based on predefined options
        const responses = [
          "Based on historical price data, this product is currently at a good price point. It's about 15% lower than its average price over the last 3 months.",
          "I'd recommend waiting if you can. Looking at price trends, this product typically goes on sale during end-of-month promotions.",
          "There are similar products with better ratings at the same price point. Would you like me to suggest alternatives?",
          "This is actually the lowest price this product has been in the last 6 months! It's a great time to buy.",
          "While this store has it for $199, I found the same model on another site for $179. Would you like me to share that link?"
        ];
        
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response', error);
      toast({
        title: "Error",
        description: "Couldn't get a response from the AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-0 right-4 w-96 bg-white shadow-lg rounded-t-lg overflow-hidden z-50 border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-teal p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-medium">AI Shopping Assistant</h3>
        </div>
        <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="h-80 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-brand-purple text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs">
                    {message.sender === 'bot' ? 'AI Assistant' : 'You'}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 text-gray-800">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span className="flex space-x-1">
                    <span className="animate-pulse">•</span>
                    <span className="animate-pulse delay-150">•</span>
                    <span className="animate-pulse delay-300">•</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask me about prices, deals, or alternatives..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Suggested Questions */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 flex items-center">
            <Lightbulb className="h-3 w-3 mr-1" />
            Suggested Questions
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              'Is this a good price?',
              'When will it be cheaper?',
              'Alternatives?',
              'Price history?'
            ].map((question) => (
              <Button 
                key={question}
                variant="outline"
                size="sm"
                className="text-xs py-1 h-auto"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;
