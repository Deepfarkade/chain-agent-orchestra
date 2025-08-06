import { Agent, AgentResponse, Order } from '@/types/supply-chain';

export const orders: Order[] = [
  {
    id: 'ORD001',
    customer: 'Tata Steel',
    material: 'Steel Pipes',
    quantity: 500,
    unit: 'tons',
    price: 45000,
    currency: 'INR',
    deliveryDate: '2024-07-15',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD002',
    customer: 'Reliance Industries',
    material: 'Aluminium Sheets',
    quantity: 200,
    unit: 'tons',
    price: 52000,
    currency: 'INR',
    deliveryDate: '2024-08-01',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD003',
    customer: 'Adani Group',
    material: 'Copper Cables',
    quantity: 300,
    unit: 'km',
    price: 75000,
    currency: 'INR',
    deliveryDate: '2024-07-22',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD004',
    customer: 'Vedanta Resources',
    material: 'Zinc Ingots',
    quantity: 400,
    unit: 'tons',
    price: 32000,
    currency: 'INR',
    deliveryDate: '2024-08-10',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD005',
    customer: 'JSW Steel',
    material: 'Iron Ore',
    quantity: 600,
    unit: 'tons',
    price: 28000,
    currency: 'INR',
    deliveryDate: '2024-07-29',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD006',
    customer: 'Hindalco Industries',
    material: 'Aluminium Coils',
    quantity: 250,
    unit: 'tons',
    price: 55000,
    currency: 'INR',
    deliveryDate: '2024-08-15',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD007',
    customer: 'Coal India',
    material: 'Coal',
    quantity: 700,
    unit: 'tons',
    price: 15000,
    currency: 'INR',
    deliveryDate: '2024-08-05',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD008',
    customer: 'Bharat Petroleum',
    material: 'Crude Oil',
    quantity: 350,
    unit: 'tons',
    price: 68000,
    currency: 'INR',
    deliveryDate: '2024-07-18',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD009',
    customer: 'Indian Oil Corporation',
    material: 'Petroleum Products',
    quantity: 450,
    unit: 'tons',
    price: 72000,
    currency: 'INR',
    deliveryDate: '2024-08-20',
    status: 'pending',
    flagged: false
  },
  {
    id: 'ORD010',
    customer: 'Oil and Natural Gas',
    material: 'Natural Gas',
    quantity: 550,
    unit: 'tons',
    price: 60000,
    currency: 'INR',
    deliveryDate: '2024-07-25',
    status: 'pending',
    flagged: false
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'flagged',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
      status: 'completed',
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
