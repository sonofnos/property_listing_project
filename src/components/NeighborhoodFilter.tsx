import React from 'react';

interface NeighborhoodFilterProps {
  neighborhoods: Array<{ id: string; name: string; count: number }>;
  selectedNeighborhoods: string[];
  onNeighborhoodChange: (neighborhood: string) => void;
}

export function NeighborhoodFilter({ 
  neighborhoods,
  selectedNeighborhoods,
  onNeighborhoodChange
}: NeighborhoodFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="font-semibold text-gray-900 mb-3">Neighborhoods</h2>
      <div className="flex flex-wrap gap-2">
        {neighborhoods.map((hood) => (
          <button
            key={hood.id}
            onClick={() => onNeighborhoodChange(hood.name)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              selectedNeighborhoods.includes(hood.name)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {hood.name}
            <span className="ml-1 text-gray-500">({hood.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}