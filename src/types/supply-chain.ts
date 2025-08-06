export interface Order {
  id: string;
  customer: string;
  segment: 'Gold' | 'Silver' | 'Bronze';
  requestedDueDate: string;
  status: 'Pending' | 'Processing' | 'Approved' | 'Rejected';
  priority: 'Rush' | 'Normal';
  value: number;
  items: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'thinking' | 'completed' | 'flagged';
  recommendation?: number;
  reason?: string;
  flagged: boolean;
  executionTime?: number;
  confidence?: number;
}

export interface AgentResponse {
  agent_id: string;
  name: string;
  status: 'Completed' | 'Flagged' | 'Error';
  recommendation: number;
  reason: string;
  flagged: boolean;
  confidence: number;
  execution_time_ms: number;
  metadata?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
  orderId?: string;
}

export interface DiscrepancyLog {
  order_id: string;
  ai_price: number;
  human_price: number;
  delta: number;
  comment: string;
  segment: string;
  timestamp: string;
  reason?: string;
}

export interface DashboardMetrics {
  totalOrdersProcessed: number;
  ordersAutoApproved: number;
  ordersOverridden: number;
  totalDiscrepancyValue: number;
  averageDiscrepancy: number;
  overrideRate: number;
}