import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'table':
        return (
          <div className="space-y-4 w-full animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            {[...Array(count)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-150 rounded-lg w-full"></div>
            ))}
          </div>
        );
      case 'detail':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 rounded-3xl w-full"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded-xl w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-xl w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-150 rounded-xl w-full"></div>
                <div className="h-4 bg-gray-150 rounded-xl w-full"></div>
                <div className="h-4 bg-gray-150 rounded-xl w-2/3"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-2xl w-full mt-8"></div>
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
                <div className="aspect-[4/3] bg-gray-200 w-full"></div>
                <div className="p-5 flex-1 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded-lg w-16"></div>
                    <div className="h-4 bg-gray-250 rounded-lg w-12"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded-lg w-5/6"></div>
                  <div className="h-4 bg-gray-150 rounded-lg w-1/2"></div>
                  <div className="flex justify-between pt-4 border-t border-gray-50 mt-4">
                    <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
}
