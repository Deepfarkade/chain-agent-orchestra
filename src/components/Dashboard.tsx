import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUpIcon, 
  DollarSignIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon,
  DownloadIcon,
  CalendarIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { mockDashboardMetrics, mockDiscrepancyLogs } from '@/data/mockData';
import { DiscrepancyLog } from '@/types/supply-chain';

export function Dashboard() {
  const [metrics] = useState(mockDashboardMetrics);
  const [discrepancyLogs] = useState<DiscrepancyLog[]>(mockDiscrepancyLogs);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Chart data
  const overrideData = [
    { segment: 'Gold', ai: 8, human: 2 },
    { segment: 'Silver', ai: 15, human: 8 },
    { segment: 'Bronze', ai: 22, human: 12 }
  ];

  const pieData = [
    { name: 'Auto-Approved', value: metrics.ordersAutoApproved, color: 'hsl(var(--success))' },
    { name: 'Human Override', value: metrics.ordersOverridden, color: 'hsl(var(--warning))' }
  ];

  const trendData = [
    { date: 'Aug 1', overrides: 3 },
    { date: 'Aug 2', overrides: 5 },
    { date: 'Aug 3', overrides: 2 },
    { date: 'Aug 4', overrides: 7 },
    { date: 'Aug 5', overrides: 4 },
    { date: 'Aug 6', overrides: 6 }
  ];

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Order ID,AI Price,Human Price,Delta,Segment,Reason,Timestamp\n" +
      discrepancyLogs.map(log => 
        `${log.order_id},${log.ai_price},${log.human_price},${log.delta},${log.segment},"${log.reason}",${log.timestamp}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "discrepancy_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
          <p className="text-muted-foreground">AI vs Human Decision Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-primary">
            <CalendarIcon className="h-3 w-3 mr-1" />
            Last 30 Days
          </Badge>
          <Button onClick={exportCSV} variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{metrics.totalOrdersProcessed}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUpIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Auto-Approved</p>
                <p className="text-2xl font-bold text-success">{metrics.ordersAutoApproved}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircleIcon className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {((metrics.ordersAutoApproved / metrics.totalOrdersProcessed) * 100).toFixed(1)}% approval rate
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Human Overrides</p>
                <p className="text-2xl font-bold text-warning">{metrics.ordersOverridden}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <AlertTriangleIcon className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={metrics.overrideRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{metrics.overrideRate}% override rate</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Discrepancy</p>
                <p className="text-2xl font-bold text-destructive">
                  {formatCurrency(metrics.totalDiscrepancyValue)}
                </p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-full">
                <DollarSignIcon className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Avg: {formatCurrency(metrics.averageDiscrepancy)} per override
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI vs Human Pricing Bar Chart */}
        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">AI vs Human Decisions by Segment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overrideData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="segment" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="ai" fill="hsl(var(--chart-1))" name="AI Approved" />
                <Bar dataKey="human" fill="hsl(var(--chart-2))" name="Human Override" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Approval Distribution Pie Chart */}
        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Approval Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Override Trend Line Chart */}
        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Daily Override Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="overrides" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Discrepancy Details Table */}
        <Card className="bg-gradient-card shadow-custom-md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Discrepancies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Order</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Δ (₹)</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Segment</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {discrepancyLogs.slice(0, 5).map((log) => (
                    <tr key={log.order_id} className="border-b border-border">
                      <td className="py-2 font-mono text-xs">{log.order_id}</td>
                      <td className="py-2">
                        <span className={log.delta > 0 ? 'text-success' : 'text-destructive'}>
                          {log.delta > 0 ? '+' : ''}{formatCurrency(log.delta)}
                        </span>
                      </td>
                      <td className="py-2">
                        <Badge variant="outline" className="text-xs">{log.segment}</Badge>
                      </td>
                      <td className="py-2 text-muted-foreground truncate max-w-32">
                        {log.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}