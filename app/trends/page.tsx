'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { chartData, recentMeals } from '@/lib/mockData';
import { Moon, Egg, AlertCircle } from 'lucide-react';

export default function Trends() {
  const insights = [
    {
      icon: <Moon className="text-sky" size={24} />,
      text: "You comfort-eat 3x more often after 9pm than before.",
      color: "bg-sky/10 border-sky/20"
    },
    {
      icon: <Egg className="text-leaf" size={24} />,
      text: "Eggs in the morning correlate with your highest-mood days.",
      color: "bg-leaf/10 border-leaf/20"
    },
    {
      icon: <AlertCircle className="text-berry" size={24} />,
      text: "'Guilty' shows up most on Sundays — worth noticing.",
      color: "bg-berry/10 border-berry/20"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6 pb-24">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">Your patterns</h1>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-mist mb-8">
        <h2 className="font-semibold text-ink mb-6 text-lg">Last 14 Days</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDE5D8" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#3A322B', opacity: 0.5 }}
                tickFormatter={(value) => value.split(' ')[0]} // Just show Mon, Tue etc
                interval="preserveStartEnd"
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#3A322B', opacity: 0.5 }}
                domain={[0, 10]}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#D9695F', opacity: 0.5 }}
                domain={[0, 5]}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
                itemStyle={{ fontWeight: 600 }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="mood" 
                name="Mood score"
                stroke="#7BA05B" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="comfortEats" 
                name="Comfort eating (count)"
                stroke="#D9695F" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="flex flex-col gap-3 mb-10">
        <h2 className="font-serif text-xl font-bold text-ink mb-2">Key Insights</h2>
        {insights.map((insight, idx) => (
          <div key={idx} className={`flex items-start gap-4 p-4 rounded-2xl border ${insight.color}`}>
            <div className="mt-0.5">{insight.icon}</div>
            <p className="text-ink text-sm font-medium leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>

      {/* Recent Logs */}
      <div>
        <h2 className="font-serif text-xl font-bold text-ink mb-4">Recent Logs</h2>
        <div className="flex flex-col gap-3">
          {recentMeals.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-2xl border border-mist shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-ink text-base">{meal.food}</span>
                <span className="text-xs font-medium text-ink/40">{meal.time}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.tags.map((tag, idx) => (
                  <span key={idx} className="bg-mist/50 text-ink text-xs px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
