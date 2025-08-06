import { Order, Agent, DiscrepancyLog, DashboardMetrics } from '@/types/supply-chain';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'Tata Steel Ltd.',
    segment: 'Gold',
    requestedDueDate: '2024-08-15',
    status: 'Pending',
    priority: 'Rush',
    value: 2500000,
    items: ['Steel Coils', 'Reinforcement Bars']
  },
  {
    id: 'ORD-2024-002',
    customer: 'Mahindra & Mahindra',
    segment: 'Gold',
    requestedDueDate: '2024-08-20',
    status: 'Processing',
    priority: 'Normal',
    value: 1800000,
    items: ['Auto Components', 'Sheet Metal']
  },
  {
    id: 'ORD-2024-003',
    customer: 'Reliance Industries',
    segment: 'Gold',
    requestedDueDate: '2024-08-12',
    status: 'Pending',
    priority: 'Rush',
    value: 3200000,
    items: ['Petrochemical Equipment', 'Pipes']
  },
  {
    id: 'ORD-2024-004',
    customer: 'L&T Construction',
    segment: 'Silver',
    requestedDueDate: '2024-08-25',
    status: 'Pending',
    priority: 'Normal',
    value: 950000,
    items: ['Construction Materials', 'Steel Beams']
  },
  {
    id: 'ORD-2024-005',
    customer: 'BHEL Power',
    segment: 'Silver',
    requestedDueDate: '2024-08-18',
    status: 'Approved',
    priority: 'Normal',
    value: 1200000,
    items: ['Power Equipment', 'Turbine Parts']
  }
];

export const supplyChainAgents: Agent[] = [
  {
    id: 'order-mgmt',
    name: 'Order Management Agent',
    role: 'Order Validation & Prioritization',
    avatar: '📋',
    status: 'idle',
    flagged: false
  },
  {
    id: 'inventory',
    name: 'Inventory Agent',
    role: 'Stock Availability & Allocation',
    avatar: '📦',
    status: 'idle',
    flagged: false
  },
  {
    id: 'capacity',
    name: 'Capacity Agent',
    role: 'Production Capacity Analysis',
    avatar: '⚙️',
    status: 'idle',
    flagged: false
  },
  {
    id: 'pricing',
    name: 'Pricing Agent',
    role: 'Dynamic Pricing & Profitability',
    avatar: '💰',
    status: 'idle',
    flagged: false
  },
  {
    id: 'governance',
    name: 'Tradeoff & Governance Agent',
    role: 'Policy Compliance & Risk Assessment',
    avatar: '⚖️',
    status: 'idle',
    flagged: false
  },
  {
    id: 'optimization',
    name: 'Re-Optimization & Promise Agent',
    role: 'Delivery Promise & Route Optimization',
    avatar: '🚚',
    status: 'idle',
    flagged: false
  },
  {
    id: 'hil',
    name: 'Human-in-Loop Agent',
    role: 'Final Review & Approval',
    avatar: '👨‍💼',
    status: 'idle',
    flagged: false
  }
];

export const mockDiscrepancyLogs: DiscrepancyLog[] = [
  {
    order_id: 'ORD-2024-001',
    ai_price: 2800000,
    human_price: 2500000,
    delta: 300000,
    comment: 'Customer relationship consideration',
    segment: 'Gold',
    timestamp: '2024-08-06T10:30:00Z',
    reason: 'Strategic pricing for key account'
  },
  {
    order_id: 'ORD-2024-003',
    ai_price: 3500000,
    human_price: 3200000,
    delta: 300000,
    comment: 'Market competition adjustment',
    segment: 'Gold',
    timestamp: '2024-08-06T11:15:00Z',
    reason: 'Competitive pricing pressure'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalOrdersProcessed: 127,
  ordersAutoApproved: 95,
  ordersOverridden: 32,
  totalDiscrepancyValue: 8500000,
  averageDiscrepancy: 265625,
  overrideRate: 25.2
};

// Mock agent responses for simulation
export const mockAgentResponses = {
  'ORD-2024-001': [
    {
      agent_id: 'order-mgmt',
      name: 'Order Management Agent',
      status: 'Completed' as const,
      recommendation: 2500000,
      reason: 'High priority order from Gold tier customer. Rush delivery required.',
      flagged: false,
      confidence: 0.95,
      execution_time_ms: 1200
    },
    {
      agent_id: 'inventory',
      name: 'Inventory Agent',
      status: 'Completed' as const,
      recommendation: 2600000,
      reason: 'Steel coils in limited stock (15% remaining). Premium pricing recommended.',
      flagged: false,
      confidence: 0.88,
      execution_time_ms: 1800
    },
    {
      agent_id: 'capacity',
      name: 'Capacity Agent',
      status: 'Completed' as const,
      recommendation: 2700000,
      reason: 'Production line at 85% capacity. Rush order requires overtime costs.',
      flagged: false,
      confidence: 0.92,
      execution_time_ms: 2100
    },
    {
      agent_id: 'pricing',
      name: 'Pricing Agent',
      status: 'Completed' as const,
      recommendation: 2800000,
      reason: 'Market demand high (+12%). Steel prices trending up. Optimal margin: 18%.',
      flagged: false,
      confidence: 0.94,
      execution_time_ms: 1500
    },
    {
      agent_id: 'governance',
      name: 'Tradeoff & Governance Agent',
      status: 'Flagged' as const,
      recommendation: 2750000,
      reason: 'Price exceeds customer budget guidelines by 11%. Risk of order cancellation.',
      flagged: true,
      confidence: 0.87,
      execution_time_ms: 2500
    },
    {
      agent_id: 'optimization',
      name: 'Re-Optimization & Promise Agent',
      status: 'Completed' as const,
      recommendation: 2650000,
      reason: 'Optimized delivery route saves 3 days. Can reduce price while maintaining margin.',
      flagged: false,
      confidence: 0.90,
      execution_time_ms: 3200
    },
    {
      agent_id: 'hil',
      name: 'Human-in-Loop Agent',
      status: 'Completed' as const,
      recommendation: 2700000,
      reason: 'Balanced recommendation considering all factors. Awaiting human approval.',
      flagged: false,
      confidence: 0.91,
      execution_time_ms: 500
    }
  ]
};