
import { useState, useEffect } from 'react';
import { OrdersTable } from '@/components/OrdersTable';
import { AgentPersonaCard } from '@/components/AgentPersonaCard';
import { ChatPanel } from '@/components/ChatPanel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrainCircuitIcon, BarChart3Icon } from 'lucide-react';
import { supplyChainAgents, mockAgentResponses } from '@/data/mockData';
import { Agent, AgentResponse } from '@/types/supply-chain';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>(supplyChainAgents);
  const [agentResponses, setAgentResponses] = useState<AgentResponse[]>([]);
  const [processingOrderId, setProcessingOrderId] = useState<string>('');
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  const [aiRecommendation, setAiRecommendation] = useState<number>(0);
  const [governanceFlags, setGovernanceFlags] = useState<string[]>([]);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const runAgents = async (orderId: string) => {
    setProcessingOrderId(orderId);
    setCurrentOrderId(orderId);
    setAgentResponses([]);
    setGovernanceFlags([]);
    
    // Reset all agents to idle
    setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle' })));

    toast({
      title: "Agents Started",
      description: `Running supply chain analysis for ${orderId}`,
    });

    // Simulate sequential agent execution
    const responses = mockAgentResponses[orderId as keyof typeof mockAgentResponses] || [];
    
    for (let i = 0; i < agents.length; i++) {
      // Set current agent to thinking
      setAgents(prev => prev.map((agent, index) => ({
        ...agent,
        status: index === i ? 'thinking' : index < i ? 'completed' : 'idle'
      })));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      // Find response for current agent
      const response = responses.find(r => r.agent_id === agents[i].id);
      
      if (response) {
        // Update agent status based on response
        setAgents(prev => prev.map((agent, index) => ({
          ...agent,
          status: index === i ? (response.flagged ? 'flagged' : 'completed') : agent.status,
          flagged: index === i ? response.flagged : agent.flagged
        })));

        // Add response
        setAgentResponses(prev => [...prev, response]);

        // Collect governance flags
        if (response.flagged && response.flags) {
          setGovernanceFlags(prev => [...prev, ...response.flags]);
        }

        toast({
          title: `${response.name} Complete`,
          description: response.flagged ? "⚠️ Flagged for review" : "✅ Analysis complete",
          variant: response.flagged ? "destructive" : "default"
        });
      } else {
        // If no response, just mark as completed
        setAgents(prev => prev.map((agent, index) => ({
          ...agent,
          status: index === i ? 'completed' : agent.status
        })));
      }
    }

    // Calculate final AI recommendation (get from pricing agent)
    const pricingResponse = responses.find(r => r.agent_id === 'pricing');
    if (pricingResponse) {
      setAiRecommendation(pricingResponse.recommendation);
      setShowChatPanel(true);
      setProcessingOrderId('');

      toast({
        title: "Analysis Complete",
        description: `Final recommendation: ${formatCurrency(pricingResponse.recommendation)}`,
      });
    }
  };

  const handleApprove = () => {
    toast({
      title: "Order Approved",
      description: `Order ${currentOrderId} approved at AI recommended price`,
    });
    setShowChatPanel(false);
    resetAgents();
  };

  const handleOverride = (price: number, comment: string) => {
    const delta = price - aiRecommendation;
    toast({
      title: "Price Override",
      description: `Order ${currentOrderId} approved at ${formatCurrency(price)} (${delta > 0 ? '+' : ''}${formatCurrency(delta)} vs AI)`,
      variant: "destructive"
    });
    setShowChatPanel(false);
    resetAgents();
  };

  const resetAgents = () => {
    setAgents(supplyChainAgents);
    setAgentResponses([]);
    setCurrentOrderId('');
    setAiRecommendation(0);
    setGovernanceFlags([]);
  };

  const getRunningCount = () => {
    return agents.filter(agent => agent.status === 'thinking').length;
  };

  const getCompletedCount = () => {
    return agents.filter(agent => agent.status === 'completed' || agent.status === 'flagged').length;
  };

  const getFlaggedCount = () => {
    return agents.filter(agent => agent.flagged).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <BrainCircuitIcon className="h-10 w-10" />
                GenAI Supply Chain Decisioning
              </h1>
              <p className="text-xl text-white/90">
                Multi-Agent AI System for Order Approval & Premium Pricing
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/dashboard'}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <BarChart3Icon className="h-5 w-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Orders Table */}
        <OrdersTable 
          onRunAgents={runAgents} 
          processingOrderId={processingOrderId}
        />

        {/* Agent Status Summary */}
        {(processingOrderId || agentResponses.length > 0) && (
          <Card className="bg-gradient-card shadow-custom-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Agent Execution Status</h2>
                <div className="flex items-center gap-4">
                  {processingOrderId && (
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse w-3 h-3 bg-accent rounded-full" />
                      <span className="text-sm text-muted-foreground">
                        Processing {currentOrderId}
                      </span>
                    </div>
                  )}
                  <Badge variant="outline">
                    {getCompletedCount()}/{agents.length} Complete
                  </Badge>
                  {getFlaggedCount() > 0 && (
                    <Badge className="bg-warning text-warning-foreground">
                      {getFlaggedCount()} Flagged
                    </Badge>
                  )}
                </div>
              </div>
              
              {aiRecommendation > 0 && (
                <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Current AI Recommendation:
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(aiRecommendation)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on pricing agent analysis
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Agent Persona Cards */}
        {(processingOrderId || agentResponses.length > 0) && (
          <Card className="bg-gradient-card shadow-custom-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Agent Analysis Pipeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {agents.map((agent, index) => {
                  const response = agentResponses.find(r => r.agent_id === agent.id);
                  return (
                    <AgentPersonaCard
                      key={agent.id}
                      agent={agent}
                      response={response}
                      showDetails={true}
                    />
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Chat Panel */}
        {showChatPanel && (
          <ChatPanel
            orderId={currentOrderId}
            aiRecommendation={aiRecommendation}
            isVisible={showChatPanel}
            onApprove={handleApprove}
            onOverride={handleOverride}
            onClose={() => setShowChatPanel(false)}
            governanceFlags={governanceFlags}
          />
        )}
      </div>
    </div>
  );
}
