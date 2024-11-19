import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetails } from './components/PropertyDetails';
import { CommentsModal } from './components/CommentsModal';
import { NeighborhoodFilter } from './components/NeighborhoodFilter';
import { AddPropertyModal } from './components/AddPropertyModal';
import { Filter, TrendingUp, MessageSquareText, Plus } from 'lucide-react';
import type { Property, PriceRange, Comment } from './types';

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

// Rest of the App.tsx code remains the same