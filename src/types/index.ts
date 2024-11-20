export interface Property {
  id: number;
  title: string;
  price: number;
  size: number;
  location: string;
  imageUrl: string;
  votes: number;
  comments: number;
  neighborhood: string;
  description?: string;
}

export interface Comment {
  id: number;
  propertyId: number;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}

export interface PriceRange {
  min: number;
  max: number;
}