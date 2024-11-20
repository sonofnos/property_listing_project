import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetails } from './components/PropertyDetails';
import { CommentsModal } from './components/CommentsModal';
import { NeighborhoodFilter } from './components/NeighborhoodFilter';
import { AddPropertyModal } from './components/AddPropertyModal';
import { Plus } from 'lucide-react';
import type { Property, PriceRange } from './types';

const initialProperties: Property[] = [
  {
    id: 1,
    title: "Modern 3 Bedroom Apartment in Lekki Phase 1",
    price: 2500000,
    size: 150,
    location: "Lekki Phase 1, Lagos",
    neighborhood: "Lekki",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=800",
    votes: 124,
    comments: 45,
    description: "Luxurious 3 bedroom apartment with excellent facilities including 24/7 power supply, security, and swimming pool. Close to Shoprite and major attractions."
  },
  {
    id: 2,
    title: "Cozy Studio Apartment in Victoria Island",
    price: 1800000,
    size: 65,
    location: "Victoria Island, Lagos",
    neighborhood: "Victoria Island",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&w=800",
    votes: 89,
    comments: 32,
    description: "Modern studio apartment in the heart of VI. Features include air conditioning, backup power, and excellent security. Walking distance to banks and restaurants."
  },
  {
    id: 3,
    title: "Premium 4 Bedroom Duplex in Ikoyi",
    price: 5000000,
    size: 300,
    location: "Ikoyi, Lagos",
    neighborhood: "Ikoyi",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&w=800",
    votes: 156,
    comments: 67,
    description: "Exclusive 4 bedroom duplex with BQ. Features include swimming pool, gym, 24/7 security, and premium finishes. Perfect for expatriates and executives."
  },
  {
    id: 4,
    title: "Affordable 2 Bedroom Flat in Yaba",
    price: 1200000,
    size: 90,
    location: "Yaba, Lagos",
    neighborhood: "Yaba",
    imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&w=800",
    votes: 78,
    comments: 28,
    description: "Well-maintained 2 bedroom apartment near UNILAG. Features include water heater, burglary proof, and good road network. Ideal for young professionals."
  },
  {
    id: 5,
    title: "Modern Office Space in Ikeja",
    price: 1500000,
    size: 120,
    location: "Ikeja, Lagos",
    neighborhood: "Ikeja",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&w=800",
    votes: 92,
    comments: 34,
    description: "Contemporary office space in a prime location. Features include dedicated parking, 24/7 power supply, and central air conditioning. Close to Airport and major highways."
  }
];

export default function App() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 10000000 });

  const neighborhoods = useMemo(() => {
    const counts = properties.reduce((acc, prop) => {
      acc[prop.neighborhood] = (acc[prop.neighborhood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, count]) => ({
      id: name.toLowerCase(),
      name,
      count,
    }));
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesNeighborhood =
        selectedNeighborhoods.length === 0 ||
        selectedNeighborhoods.includes(property.neighborhood);
      const matchesPrice =
        property.price >= priceRange.min && property.price <= priceRange.max;
      return matchesNeighborhood && matchesPrice;
    });
  }, [properties, selectedNeighborhoods, priceRange]);

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(neighborhood)
        ? prev.filter((n) => n !== neighborhood)
        : [...prev, neighborhood]
    );
  };

  const handleAddProperty = (newProperty: Omit<Property, 'id' | 'votes' | 'comments'>) => {
    const property: Property = {
      ...newProperty,
      id: properties.length + 1,
      votes: 0,
      comments: 0,
    };
    setProperties((prev) => [...prev, property]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Properties in Lagos
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>

        <NeighborhoodFilter
          neighborhoods={neighborhoods}
          selectedNeighborhoods={selectedNeighborhoods}
          onNeighborhoodChange={handleNeighborhoodChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onViewDetails={() => setSelectedProperty(property)}
              onShowComments={() => {
                setSelectedProperty(property);
                setShowComments(true);
              }}
            />
          ))}
        </div>

        {selectedProperty && !showComments && (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            onShowComments={() => setShowComments(true)}
          />
        )}

        {selectedProperty && showComments && (
          <CommentsModal
            property={selectedProperty}
            comments={[
              {
                id: 1,
                propertyId: selectedProperty.id,
                author: "John Doe",
                content: "Great location and amazing value for money!",
                createdAt: "2 days ago",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                id: 2,
                propertyId: selectedProperty.id,
                author: "Jane Smith",
                content: "The security in this area is top-notch. I've lived here for 2 years.",
                createdAt: "1 week ago",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
            ]}
            onClose={() => {
              setShowComments(false);
              setSelectedProperty(null);
            }}
            onAddComment={(content) => {
              console.log('New comment:', content);
            }}
          />
        )}

        {showAddModal && (
          <AddPropertyModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddProperty}
            neighborhoods={neighborhoods}
          />
        )}
      </main>
    </div>
  );
}