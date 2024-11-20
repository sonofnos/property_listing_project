import React from 'react';
import { X, Maximize2, MapPin, Calendar, User } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  onShowComments: () => void;
}

export function PropertyDetails({ property, onClose, onShowComments }: PropertyDetailsProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative h-72">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold">{formatPrice(property.price)}</span>
              <span className="text-sm">/mo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Maximize2 className="w-5 h-5" />
              <span>{property.size}m²</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Available Now</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">
              {property.description || `Beautiful ${property.size}m² property located in the heart of ${property.neighborhood}, 
              Lagos. This property offers modern amenities and is perfect for both professionals and families. 
              Close to local markets, schools, and transportation hubs.`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShowComments}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Comments ({property.comments})
            </button>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <User className="w-5 h-5" />
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}