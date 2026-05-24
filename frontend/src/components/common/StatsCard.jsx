import React from 'react';

export default function StatsCard({ title, value, change, icon: Icon, color }) {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-emerald-50 text-emerald-600',
          changeText: 'text-emerald-600',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 text-amber-600',
          changeText: 'text-amber-600',
        };
      case 'red':
        return {
          bg: 'bg-rose-50 text-rose-600',
          changeText: 'text-rose-600',
        };
      case 'blue':
      default:
        return {
          bg: 'bg-blue-50 text-primary-600',
          changeText: 'text-primary-600',
        };
    }
  };

  const classes = getColorClasses();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between">
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">{value}</h3>
        {change && (
          <div className="flex items-center gap-1">
            <span className={`text-xs font-bold ${classes.changeText}`}>{change}</span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        )}
      </div>
      <div className={`p-4 rounded-xl ${classes.bg} flex items-center justify-center shrink-0`}>
        {Icon && <Icon className="h-6 w-6" />}
      </div>
    </div>
  );
}
