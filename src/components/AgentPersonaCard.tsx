
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircleIcon, AlertTriangleIcon, ClockIcon, EyeIcon, BrainIcon, TargetIcon, FileTextIcon } from 'lucide-react';
import { Agent, AgentResponse } from '@/types/supply-chain';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AgentPersonaCardProps {
  agent: Agent;
  response?: AgentResponse;
  showDetails?: boolean;
}

export function AgentPersonaCard({ agent, response, showDetails = false }: AgentPersonaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (agent.status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-success" />;
      case 'flagged':
        return <AlertTriangleIcon className="h-5 w-5 text-warning animate-pulse" />;
      case 'thinking':
        return <ClockIcon className="h-5 w-5 text-accent animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-muted" />;
    }
  };

  const getCardClassName = () => {
    let baseClass = "transition-smooth hover:shadow-custom-md cursor-pointer ";
    
    switch (agent.status) {
      case 'thinking':
        return baseClass + "agent-thinking border-accent/50";
      case 'completed':
        return baseClass + "agent-completed border-success/30 bg-gradient-to-br from-white to-success/5";
      case 'flagged':
        return baseClass + "agent-flagged border-warning/50 bg-gradient-to-br from-white to-warning/5";
      default:
        return baseClass + "bg-gradient-card";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const shouldShowPrice = agent.id === 'pricing' && response?.recommendation;

  return (
    <Card className={getCardClassName()}>
      <div className="p-6">
        {/* Agent Avatar and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl bg-muted/50 rounded-full p-3 flex items-center justify-center">
              {agent.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{agent.name}</h3>
              <p className="text-xs text-muted-foreground">{agent.role}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusIcon()}
            {agent.status === 'thinking' && (
              <div className="text-xs text-accent font-medium animate-pulse">Processing...</div>
            )}
          </div>
        </div>

        {/* Progress Bar for Thinking State */}
        {agent.status === 'thinking' && (
          <div className="mb-4">
            <Progress value={65} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Analyzing data...</p>
          </div>
        )}

        {/* Detailed Response Information */}
        {response && showDetails && (
          <div className="space-y-4">
            {/* Price Recommendation - Only for Pricing Agent */}
            {shouldShowPrice && (
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                <span className="text-sm font-medium text-foreground">Recommendation:</span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(response.recommendation)}
                </span>
              </div>
            )}
            
            {/* Thinking Process */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <BrainIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-blue-800 mb-1">Thinking</div>
                  <p className="text-xs text-blue-700 line-clamp-2">{response.thinking}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <TargetIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-green-800 mb-1">Focus</div>
                  <p className="text-xs text-green-700 line-clamp-2">{response.focus}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <FileTextIcon className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-purple-800 mb-1">Summary</div>
                  <p className="text-xs text-purple-700 line-clamp-2">{response.summary}</p>
                </div>
              </div>
            </div>

            {/* Confidence and Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <Badge variant="secondary" className="text-xs">
                {(response.confidence * 100).toFixed(0)}%
              </Badge>
            </div>

            {response.flagged && (
              <Badge className="w-full justify-center bg-warning text-warning-foreground">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Flagged for Review
              </Badge>
            )}
          </div>
        )}

        {/* View Details Button */}
        {response && (
          <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4 text-xs"
              >
                <EyeIcon className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-2xl">{agent.avatar}</span>
                  {agent.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <span className="capitalize">{response.status}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Execution Time</label>
                    <span>{response.execution_time_ms}ms</span>
                  </div>
                  {shouldShowPrice && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Recommendation</label>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(response.recommendation)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Confidence</label>
                        <div className="flex items-center gap-2">
                          <Progress value={response.confidence * 100} className="flex-1 h-2" />
                          <span className="text-sm">{(response.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Detailed Thinking Process */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <BrainIcon className="h-4 w-4" />
                      Thinking Process
                    </label>
                    <p className="text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">{response.thinking}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TargetIcon className="h-4 w-4" />
                      Focus Area
                    </label>
                    <p className="text-sm bg-green-50 p-4 rounded-lg border border-green-200">{response.focus}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4" />
                      Summary
                    </label>
                    <p className="text-sm bg-purple-50 p-4 rounded-lg border border-purple-200">{response.summary}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Detailed Reasoning</label>
                    <p className="text-sm bg-muted/50 p-4 rounded-lg">{response.reason}</p>
                  </div>
                </div>

                {response.metadata && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Additional Data</label>
                    <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-auto">
                      {JSON.stringify(response.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
}
