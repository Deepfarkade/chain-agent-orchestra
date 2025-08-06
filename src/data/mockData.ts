import { Agent, AgentResponse, Order } from '@/types/supply-chain';

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'Tata Steel',
    items: ['Steel Pipes', 'Steel Beams'],
    location: 'Mumbai, Maharashtra',
    quantity: 500,
    segment: 'Gold',
    requestedDueDate: '2024-07-15'
  },
  {
    id: 'ORD002',
    customer: 'Reliance Industries',
    items: ['Aluminium Sheets'],
    location: 'Gujarat, India',
    quantity: 200,
    segment: 'Silver',
    requestedDueDate: '2024-08-01'
  },
  {
    id: 'ORD003',
    customer: 'Adani Group',
    items: ['Copper Cables'],
    location: 'Ahmedabad, Gujarat',
    quantity: 300,
    segment: 'Bronze',
    requestedDueDate: '2024-07-22'
  },
  {
    id: 'ORD004',
    customer: 'Vedanta Resources',
    items: ['Zinc Ingots'],
    location: 'Bhubaneswar, Odisha',
    quantity: 400,
    segment: 'Gold',
    requestedDueDate: '2024-08-10'
  },
  {
    id: 'ORD005',
    customer: 'JSW Steel',
    items: ['Iron Ore'],
    location: 'Ballari, Karnataka',
    quantity: 600,
    segment: 'Silver',
    requestedDueDate: '2024-07-29'
  },
  {
    id: 'ORD006',
    customer: 'Hindalco Industries',
    items: ['Aluminium Coils'],
    location: 'Renukoot, Uttar Pradesh',
    quantity: 250,
    segment: 'Bronze',
    requestedDueDate: '2024-08-15'
  },
  {
    id: 'ORD007',
    customer: 'Coal India',
    items: ['Coal'],
    location: 'Kolkata, West Bengal',
    quantity: 700,
    segment: 'Gold',
    requestedDueDate: '2024-08-05'
  },
  {
    id: 'ORD008',
    customer: 'Bharat Petroleum',
    items: ['Crude Oil'],
    location: 'Chennai, Tamil Nadu',
    quantity: 350,
    segment: 'Silver',
    requestedDueDate: '2024-07-18'
  },
  {
    id: 'ORD009',
    customer: 'Indian Oil Corporation',
    items: ['Petroleum Products'],
    location: 'New Delhi, Delhi',
    quantity: 450,
    segment: 'Bronze',
    requestedDueDate: '2024-08-20'
  },
  {
    id: 'ORD010',
    customer: 'Oil and Natural Gas',
    items: ['Natural Gas'],
    location: 'Dehradun, Uttarakhand',
    quantity: 550,
    segment: 'Gold',
    requestedDueDate: '2024-07-25'
  }
];

export const supplyChainAgents: Agent[] = [
  {
    id: 'order-management',
    name: 'Order Management Agent',
    role: 'Order Processing & Validation',
    avatar: '📋',
    status: 'idle',
    flagged: false
  },
  {
    id: 'inventory',
    name: 'Inventory Agent',
    role: 'Stock & Material Planning',
    avatar: '📦',
    status: 'idle',
    flagged: false
  },
  {
    id: 'capacity',
    name: 'Capacity Agent',
    role: 'Production & Resource Planning',
    avatar: '⚙️',
    status: 'idle',
    flagged: false
  },
  {
    id: 'pricing',
    name: 'Pricing Agent',
    role: 'Dynamic Pricing & Market Analysis',
    avatar: '💰',
    status: 'idle',
    flagged: false
  },
  {
    id: 'governance',
    name: 'Tradeoff & Governance Agent',
    role: 'Policy & Compliance Check',
    avatar: '⚖️',
    status: 'idle',
    flagged: false
  },
  {
    id: 'optimization',
    name: 'Re-Optimization & Promise Agent',
    role: 'Delivery & Performance Optimization',
    avatar: '🎯',
    status: 'idle',
    flagged: false
  }
];

// Mock agent responses for each order
export const mockAgentResponses: Record<string, AgentResponse[]> = {
  'ORD001': [
    {
      agent_id: 'order-management',
      name: 'Order Management Agent',
      status: 'Completed',
      thinking: 'Analyzing order details for ORD001. Customer Tata Steel is a Gold tier customer with historical volume of 2.5M tons annually. Current order for 500 tons of steel pipes aligns with their usual requirements.',
      focus: 'Validating order specifications, customer tier verification, and ensuring all mandatory fields are complete for processing pipeline.',
      summary: 'Order validated successfully. Gold tier customer with excellent payment history. All specifications meet standard requirements.',
      recommendation: 45000,
      confidence: 0.95,
      execution_time_ms: 850,
      flagged: false,
      reason: 'Standard order processing completed without issues'
    },
    {
      agent_id: 'inventory',
      name: 'Inventory Agent',
      status: 'Completed',
      thinking: 'Current steel pipe inventory shows 2,847 tons available across 3 warehouses. Raw material availability is sufficient. Lead time for additional manufacturing is 7-10 days if needed.',
      focus: 'Inventory availability check, raw material sufficiency analysis, and warehouse capacity optimization for fulfillment.',
      summary: 'Sufficient inventory available. No supply constraints identified. Raw materials adequately stocked.',
      recommendation: 45000,
      confidence: 0.88,
      execution_time_ms: 1200,
      flagged: false,
      reason: 'Inventory levels are adequate for immediate fulfillment'
    },
    {
      agent_id: 'capacity',
      name: 'Capacity Agent',
      status: 'Completed',
      thinking: 'Current production capacity utilization at 78%. Available slots in next 2 weeks can accommodate this order. Machine downtime scheduled for next month may impact future orders but not this one.',
      focus: 'Production scheduling, capacity utilization analysis, and resource allocation for optimal delivery timeline.',
      summary: 'Production capacity available. Can be scheduled for delivery within requested timeframe.',
      recommendation: 45500,
      confidence: 0.82,
      execution_time_ms: 1350,
      flagged: false,
      reason: 'Production capacity is available within timeline'
    },
    {
      agent_id: 'pricing',
      name: 'Pricing Agent',
      status: 'Completed',
      thinking: 'Market analysis shows steel prices have increased 8% in last quarter. Competitor pricing ranges from ₹43,000-₹48,000 per ton. Customer price sensitivity analysis indicates acceptable range up to ₹47,000.',
      focus: 'Dynamic pricing based on market conditions, competitor analysis, customer price elasticity, and profit margin optimization.',
      summary: 'Optimal pricing point identified considering market conditions and customer segment. Price recommendation balances profitability with competitiveness.',
      recommendation: 46000,
      confidence: 0.91,
      execution_time_ms: 1800,
      flagged: false,
      reason: 'Price optimized based on market analysis and customer tier'
    },
    {
      agent_id: 'governance',
      name: 'Tradeoff & Governance Agent',
      status: 'Flagged',
      thinking: 'Pricing recommendation of ₹46,000 exceeds customer budget guidelines by 8.2%. Corporate policy requires management approval for prices above ₹45,000 for this customer segment.',
      focus: 'Policy compliance verification, budget constraint analysis, and risk assessment for pricing deviations.',
      summary: 'Price exceeds established guidelines. Management approval required before proceeding.',
      recommendation: 45000,
      confidence: 0.75,
      execution_time_ms: 950,
      flagged: true,
      flags: ['Exceeds budget guidelines by 8.2%', 'Requires management approval', 'Customer price tolerance threshold exceeded'],
      reason: 'Governance policies require review for pricing above threshold'
    },
    {
      agent_id: 'optimization',
      name: 'Re-Optimization & Promise Agent',
      status: 'Completed',
      thinking: 'Analyzing delivery optimization options. Standard delivery timeline is 14 days. Express option available for 10 days with 5% premium. Customer location proximity allows for cost-effective logistics.',
      focus: 'Delivery timeline optimization, logistics cost analysis, and service level commitment assessment.',
      summary: 'Standard delivery timeline recommended. Logistics network can support efficient delivery.',
      recommendation: 46000,
      confidence: 0.87,
      execution_time_ms: 1100,
      flagged: false,
      reason: 'Delivery promise can be met within standard timeline'
    }
  ],
  'ORD002': [
    {
      agent_id: 'order-management',
      name: 'Order Management Agent',
      status: 'Completed',
      thinking: 'Processing order ORD002 for Reliance Industries. Silver tier customer with moderate order volume. Aluminium sheets order for 200 tons.',
      focus: 'Order validation, customer classification verification, and specification compliance check.',
      summary: 'Order processed successfully. Silver tier customer with standard requirements.',
      recommendation: 52000,
      confidence: 0.89,
      execution_time_ms: 720,
      flagged: false,
      reason: 'Standard order processing completed'
    },
    {
      agent_id: 'inventory',
      name: 'Inventory Agent',
      status: 'Completed',
      thinking: 'Aluminium sheet inventory currently at 450 tons. Quality grade requested is in stock. No immediate supply chain constraints.',
      focus: 'Material availability verification and quality grade confirmation.',
      summary: 'Required materials available in sufficient quantities.',
      recommendation: 52000,
      confidence: 0.93,
      execution_time_ms: 980,
      flagged: false,
      reason: 'Inventory sufficient for fulfillment'
    },
    {
      agent_id: 'capacity',
      name: 'Capacity Agent',
      status: 'Completed',
      thinking: 'Current aluminium processing capacity at 85%. Available production window in week 3. Minor scheduling adjustment needed.',
      focus: 'Production scheduling and resource allocation optimization.',
      summary: 'Production slot available with minor scheduling adjustments.',
      recommendation: 52500,
      confidence: 0.84,
      execution_time_ms: 1450,
      flagged: false,
      reason: 'Capacity available with schedule optimization'
    },
    {
      agent_id: 'pricing',
      name: 'Pricing Agent',
      status: 'Completed',
      thinking: 'Aluminium market prices have been volatile, showing 12% increase over 6 months. Silver tier customer deserves competitive pricing while maintaining healthy margins.',
      focus: 'Market-driven pricing strategy with customer tier considerations.',
      summary: 'Competitive pricing strategy recommended based on market conditions.',
      recommendation: 53000,
      confidence: 0.88,
      execution_time_ms: 1650,
      flagged: false,
      reason: 'Price reflects current market conditions'
    },
    {
      agent_id: 'governance',
      name: 'Tradeoff & Governance Agent',
      status: 'Completed',
      thinking: 'Pricing within acceptable range for Silver tier customer. No policy violations detected. Standard approval process applies.',
      focus: 'Compliance verification and policy adherence check.',
      summary: 'All governance requirements met. No flags raised.',
      recommendation: 53000,
      confidence: 0.92,
      execution_time_ms: 880,
      flagged: false,
      reason: 'Complies with all governance policies'
    },
    {
      agent_id: 'optimization',
      name: 'Re-Optimization & Promise Agent',
      status: 'Completed',
      thinking: 'Standard 12-day delivery achievable. Customer location has good logistics connectivity. No special handling requirements.',
      focus: 'Delivery optimization and logistics coordination.',
      summary: 'Efficient delivery schedule confirmed within standard timeline.',
      recommendation: 53000,
      confidence: 0.90,
      execution_time_ms: 1200,
      flagged: false,
      reason: 'Delivery commitment achievable'
    }
  ]
  // Add similar detailed responses for other orders...
};

// Dashboard metrics
export const mockDashboardMetrics = {
  totalOrdersProcessed: 167,
  ordersAutoApproved: 125,
  ordersOverridden: 42,
  totalDiscrepancyValue: 2850000,
  averageDiscrepancy: 67857,
  overrideRate: 25.1
};

// Discrepancy logs for dashboard
export const mockDiscrepancyLogs = [
  {
    order_id: 'ORD001',
    ai_price: 46000,
    human_price: 45000,
    delta: -1000,
    comment: 'Price reduced due to customer tier policy',
    segment: 'Gold',
    timestamp: '2024-08-06T10:30:00Z',
    reason: 'Budget compliance override'
  },
  {
    order_id: 'ORD003',
    ai_price: 75000,
    human_price: 73500,
    delta: -1500,
    comment: 'Market adjustment for competitive positioning',
    segment: 'Bronze',
    timestamp: '2024-08-06T09:15:00Z',
    reason: 'Market competitiveness'
  },
  {
    order_id: 'ORD005',
    ai_price: 28000,
    human_price: 29200,
    delta: 1200,
    comment: 'Premium added for expedited delivery',
    segment: 'Silver',
    timestamp: '2024-08-06T08:45:00Z',
    reason: 'Service level upgrade'
  },
  {
    order_id: 'ORD008',
    ai_price: 68000,
    human_price: 66800,
    delta: -1200,
    comment: 'Volume discount applied',
    segment: 'Silver',
    timestamp: '2024-08-05T16:20:00Z',
    reason: 'Volume incentive'
  },
  {
    order_id: 'ORD010',
    ai_price: 60000,
    human_price: 61500,
    delta: 1500,
    comment: 'Risk premium for supply chain constraints',
    segment: 'Gold',
    timestamp: '2024-08-05T14:10:00Z',
    reason: 'Supply risk mitigation'
  }
];
