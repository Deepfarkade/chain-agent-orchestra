import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircleIcon, AlertTriangleIcon, ClockIcon, EyeIcon } from 'lucide-react';
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

  return (
    <Card className={getCardClassName()} onClick={() => response && setIsExpanded(true)}>
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

        {/* Response Summary */}
        {response && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Recommendation:</span>
              <span className="text-sm font-bold text-primary">
                {formatCurrency(response.recommendation)}
              </span>
            </div>
            
            {response.confidence && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <Badge variant="secondary" className="text-xs">
                  {(response.confidence * 100).toFixed(0)}%
                </Badge>
              </div>
            )}

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {response.reason}
              </p>
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
                onClick={(e) => e.stopPropagation()}
              >
                <EyeIcon className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Recommendation</label>
                    <span className="font-bold text-primary">
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
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Reasoning</label>
                  <p className="text-sm bg-muted/50 p-4 rounded-lg">{response.reason}</p>
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