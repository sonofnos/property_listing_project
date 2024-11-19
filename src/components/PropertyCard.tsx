import React from 'react';
import { Naira, MapPin, Maximize2, ThumbsUp, MessageCircle } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps extends Property {
  onViewDetails: () => void;
  onShowComments: () => void;
}

export function PropertyCard({ 
  title, 
  price, 
  size, 
  location, 
  imageUrl, 
  votes, 
  comments,
  onViewDetails,
  onShowComments
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium text-gray-700 backdrop-blur-sm">
          Direct from owner
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Naira className="w-4 h-4" />
            <span>{price.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            <span>{size}m²</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <ThumbsUp className="w-4 h-4" />
              <span>{votes}</span>
            </button>
            <button 
              onClick={onShowComments}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </button>
          </div>
          <button 
            onClick={onViewDetails}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}