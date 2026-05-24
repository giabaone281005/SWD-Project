import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = HelpCircle, actionLink, actionText }) {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center max-w-lg mx-auto">
      <div className="p-4 rounded-full bg-primary-50 text-primary-500 mb-4">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title || 'No data found'}</h3>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-sm">{description || 'There are no items to display at the moment.'}</p>
      {actionLink && actionText && (
        <a
          href={actionLink}
          className="inline-flex items-center justify-center text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-xl shadow-md shadow-primary-500/10 transition-all duration-200"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}
