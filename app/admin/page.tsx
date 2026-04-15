import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(45231.89),
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '356',
      change: '+15.2%',
      trend: 'up',
      icon: ShoppingBag,
    },
    {
      title: 'Customers',
      value: '2,420',
      change: '+5.4%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-1.1%',
      trend: 'down',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline py-2 px-4 text-sm">Download Report</button>
          <button className="btn-primary py-2 px-4 text-sm">Settings</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isUp = stat.trend === 'up';
          return (
            <div 
              key={i} 
              className="bg-white dark:bg-surface-card-dark rounded-2xl p-6 border border-border-light dark:border-border-dark shadow-sm bg-gradient-to-br from-transparent to-black/[0.02] dark:to-white/[0.02]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-surface-light dark:bg-surface-dark rounded-xl">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                  isUp 
                    ? 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400' 
                    : 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {isUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted text-sm font-medium mb-1">{stat.title}</h3>
              <p className="font-display text-2xl font-bold text-foreground-light dark:text-foreground-dark">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders (Placeholder) */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-card-dark rounded-2xl border border-border-light dark:border-border-dark">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <h2 className="font-bold text-foreground-light dark:text-foreground-dark">Recent Orders</h2>
            <button className="text-accent text-sm font-medium">View All</button>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-surface-light dark:bg-surface-dark">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg font-semibold">Order</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 rounded-r-lg font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                      <td className="px-4 py-4 font-medium text-foreground-light dark:text-foreground-dark">
                        #ORD-00{item}
                      </td>
                      <td className="px-4 py-4">Customer Name {item}</td>
                      <td className="px-4 py-4 text-muted">2 hours ago</td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        {formatPrice(129.00 * item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products (Placeholder) */}
        <div className="bg-white dark:bg-surface-card-dark rounded-2xl border border-border-light dark:border-border-dark">
          <div className="p-6 border-b border-border-light dark:border-border-dark">
            <h2 className="font-bold text-foreground-light dark:text-foreground-dark">Top Products</h2>
          </div>
          <div className="p-6 space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-surface-light dark:bg-surface-dark flex items-center justify-center border border-border-light dark:border-border-dark shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-muted" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground-light dark:text-foreground-dark line-clamp-1">
                    Premium Sample Product {item}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">{45 * item} sales</p>
                </div>
                <div className="text-sm font-bold text-accent">
                  {formatPrice(89.00)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
