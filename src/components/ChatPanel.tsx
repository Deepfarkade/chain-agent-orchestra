import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckIcon, MessageSquareIcon, SendIcon, UserIcon, BotIcon } from 'lucide-react';
import { ChatMessage } from '@/types/supply-chain';

interface ChatPanelProps {
  orderId: string;
  aiRecommendation: number;
  isVisible: boolean;
  onApprove: () => void;
  onOverride: (price: number, comment: string) => void;
  onClose: () => void;
}

export function ChatPanel({ 
  orderId, 
  aiRecommendation, 
  isVisible, 
  onApprove, 
  onOverride, 
  onClose 
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [overridePrice, setOverridePrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (isVisible && messages.length === 0) {
      // Initialize with AI recommendation
      const initialMessage: ChatMessage = {
        id: 'ai-initial',
        sender: 'ai',
        message: `Based on the analysis from all agents, I recommend pricing this order at ${formatCurrency(aiRecommendation)}. This considers inventory levels, capacity constraints, market conditions, and compliance requirements.

Would you like to approve this recommendation or discuss any adjustments?`,
        timestamp: new Date().toISOString(),
        orderId
      };
      setMessages([initialMessage]);
    }
  }, [isVisible, aiRecommendation, orderId, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString(),
      orderId
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        message: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        orderId
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('lower') || lowerInput.includes('reduce') || lowerInput.includes('budget')) {
      return `I understand your concern about the pricing. The current recommendation of ${formatCurrency(aiRecommendation)} is based on current market conditions and capacity constraints. 

If we reduce the price, we could consider:
- Extending the delivery timeline by 3-5 days
- Using alternative materials that meet quality standards
- Optimizing the production schedule

What would be your target price range?`;
    }
    
    if (lowerInput.includes('competitor') || lowerInput.includes('market')) {
      return `Based on current market analysis, our pricing is competitive within the industry range. The recommendation considers:

- Current steel market prices (+12% from last quarter)
- Production capacity utilization (85%)
- Customer segment (Gold tier pricing)

Would you like me to provide a detailed competitive analysis?`;
    }
    
    if (lowerInput.includes('approve') || lowerInput.includes('accept')) {
      return `Thank you for the approval! I'll process this order at ${formatCurrency(aiRecommendation)}. The order will be forwarded to production planning and the customer will receive confirmation within 2 hours.`;
    }
    
    return `I understand your question about "${userInput}". Let me analyze this in the context of the current order requirements and market conditions. 

Based on the agent analysis, the key factors influencing this pricing are inventory availability, production capacity, and customer segment. Would you like me to elaborate on any specific aspect?`;
  };

  const handleOverrideSubmit = () => {
    const price = parseFloat(overridePrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }
    
    onOverride(price, inputMessage || 'Manual price override');
    setShowOverrideForm(false);
    setOverridePrice('');
    setInputMessage('');
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-custom-lg border-accent/20 bg-gradient-card">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="h-5 w-5 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">Human-in-Loop Review</h3>
              <p className="text-xs text-muted-foreground">Order: {orderId}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className={message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                  {message.sender === 'user' ? <UserIcon className="h-4 w-4" /> : <BotIcon className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 max-w-[280px] ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`p-3 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-muted text-foreground mr-4'
                }`}>
                  {message.message}
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <BotIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* AI Recommendation Summary */}
        <div className="px-4 py-2 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">AI Recommendation:</span>
            <Badge className="bg-gradient-primary">{formatCurrency(aiRecommendation)}</Badge>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border space-y-3">
          {!showOverrideForm ? (
            <>
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask questions or provide feedback..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={onApprove}
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  size="sm"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Approve AI Price
                </Button>
                <Button 
                  onClick={() => setShowOverrideForm(true)}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  Override Price
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Override Price (₹)</label>
                <Input
                  type="number"
                  value={overridePrice}
                  onChange={(e) => setOverridePrice(e.target.value)}
                  placeholder="Enter new price..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Reason</label>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Reason for override..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleOverrideSubmit} className="flex-1" size="sm">
                  Submit Override
                </Button>
                <Button 
                  onClick={() => setShowOverrideForm(false)} 
                  variant="outline" 
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}