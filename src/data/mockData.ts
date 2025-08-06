import { Order, Agent, DiscrepancyLog, DashboardMetrics } from '@/types/supply-chain';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'Tata Steel Ltd.',
    items: ['Steel Coils', 'Reinforcement Bars'],
    location: 'Mumbai, Maharashtra',
    quantity: 500,
    segment: 'Gold',
    requestedDueDate: '2024-08-15'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Mahindra & Mahindra',
    items: ['Auto Components', 'Sheet Metal'],
    location: 'Chennai, Tamil Nadu',
    quantity: 300,
    segment: 'Gold',
    requestedDueDate: '2024-08-20'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Reliance Industries',
    items: ['Petrochemical Equipment', 'Pipes'],
    location: 'Jamnagar, Gujarat',
    quantity: 750,
    segment: 'Gold',
    requestedDueDate: '2024-08-12'
  },
  {
    id: 'ORD-2024-004',
    customer: 'L&T Construction',
    items: ['Construction Materials', 'Steel Beams'],
    location: 'Hyderabad, Telangana',
    quantity: 200,
    segment: 'Silver',
    requestedDueDate: '2024-08-25'
  },
  {
    id: 'ORD-2024-005',
    customer: 'BHEL Power',
    items: ['Power Equipment', 'Turbine Parts'],
    location: 'Bhopal, Madhya Pradesh',
    quantity: 150,
    segment: 'Silver',
    requestedDueDate: '2024-08-18'
  },
  {
    id: 'ORD-2024-006',
    customer: 'JSW Steel',
    items: ['Iron Ore', 'Coking Coal'],
    location: 'Vijayanagar, Karnataka',
    quantity: 1200,
    segment: 'Gold',
    requestedDueDate: '2024-08-22'
  },
  {
    id: 'ORD-2024-007',
    customer: 'SAIL',
    items: ['Hot Rolled Coils', 'Wire Rods'],
    location: 'Bokaro, Jharkhand',
    quantity: 800,
    segment: 'Silver',
    requestedDueDate: '2024-08-28'
  },
  {
    id: 'ORD-2024-008',
    customer: 'Hindalco Industries',
    items: ['Aluminium Sheets', 'Foil Stock'],
    location: 'Renukoot, Uttar Pradesh',
    quantity: 350,
    segment: 'Gold',
    requestedDueDate: '2024-08-16'
  },
  {
    id: 'ORD-2024-009',
    customer: 'Vedanta Limited',
    items: ['Copper Cathodes', 'Zinc Ingots'],
    location: 'Tuticorin, Tamil Nadu',
    quantity: 600,
    segment: 'Silver',
    requestedDueDate: '2024-08-30'
  },
  {
    id: 'ORD-2024-010',
    customer: 'ArcelorMittal Nippon',
    items: ['Galvanized Sheets', 'Cold Rolled Coils'],
    location: 'Hazira, Gujarat',
    quantity: 450,
    segment: 'Gold',
    requestedDueDate: '2024-08-14'
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
      thinking: 'Evaluating the proximity of the request date to today\'s date to determine if it qualifies as a rush order.',
      focus: 'Checking the Request Date against today\'s date.',
      summary: 'The request date is within 4 days from today, qualifying it as a rush order.',
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
      thinking: 'To fulfill the requirement for Steel Coils and Reinforcement Bars, the raw material needed is Steel-6061. I checked the sourcing table for availability.',
      focus: 'The relevant row in the sourcing table for this decision is the one with Steel-6061 located in Mumbai, which has a stock quantity of 300 and is pegged to a high-priority order.',
      summary: 'This is the only viable option because the Steel-6061 required for the order is only available in Mumbai with a sufficient quantity of 300 units. However, it is pegged to a high-priority order, necessitating a penalty cost of ₹5000 for re-assignment.',
      reason: 'Steel coils in limited stock (15% remaining). Premium pricing recommended due to supply constraints.',
      flagged: false,
      confidence: 0.88,
      execution_time_ms: 1800
    },
    {
      agent_id: 'capacity',
      name: 'Capacity Agent',
      status: 'Completed' as const,
      recommendation: 2700000,
      thinking: 'Finding capacity borrowing options to meet the rush order timeline while evaluating production constraints.',
      focus: 'Analyzing production line utilization and overtime requirements for urgent delivery.',
      summary: 'Production line at 85% capacity. Rush order requires overtime costs and capacity reallocation from other orders.',
      reason: 'Production line at 85% capacity. Rush order requires overtime costs and expedited processing.',
      flagged: false,
      confidence: 0.92,
      execution_time_ms: 2100
    },
    {
      agent_id: 'pricing',
      name: 'Pricing Agent',
      status: 'Completed' as const,
      recommendation: 2800000,
      thinking: 'Analyzing market conditions, steel price trends, and optimal profit margins for Gold segment customer.',
      focus: 'Current market demand is high (+12%) with steel prices trending upward. Calculating optimal margin for profitability.',
      summary: 'Market conditions favor premium pricing. Steel prices have increased 12% this quarter. Recommended margin: 18% ensures competitiveness while maximizing profit.',
      reason: 'Market demand high (+12%). Steel prices trending up. Optimal margin: 18%. Premium justified by market conditions.',
      flagged: false,
      confidence: 0.94,
      execution_time_ms: 1500
    },
    {
      agent_id: 'governance',
      name: 'Tradeoff & Governance Agent',
      status: 'Flagged' as const,
      recommendation: 2750000,
      thinking: 'Evaluates trade-offs, checks governance rules, and recommends a final price.',
      focus: 'The plan is flagged because it does not meet the governance rule of having maximum 10% variance from customer budget guidelines.',
      summary: 'The plan is flagged because pricing exceeds customer budget variance limits. The penalty cost of ₹5000 is within the acceptable limit but price variance requires review.',
      reason: 'Price exceeds customer budget guidelines by 11%. Risk of order cancellation. Governance review required.',
      flagged: true,
      confidence: 0.87,
      execution_time_ms: 2500
    },
    {
      agent_id: 'optimization',
      name: 'Re-Optimization & Promise Agent',
      status: 'Completed' as const,
      recommendation: 2650000,
      thinking: 'Re-optimization is required after the rejection of the initial governance approval. The promise date is set based on the availability of alternative supply sources.',
      focus: 'The price includes a penalty cost of ₹5000 for the Strategic+ segment, added to the initially recommended price of ₹2600000.',
      summary: 'Re-optimization completed. Alternative routing identified that reduces costs while maintaining delivery promise. Price optimization achieved through supply chain efficiency.',
      reason: 'Optimized delivery route saves 3 days. Alternative supply source reduces penalty costs while maintaining margin.',
      flagged: false,
      confidence: 0.90,
      execution_time_ms: 3200
    }
  ]
};