export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Psychologist {
  id: string;
  name: string;
  prefix: string;
  slug: string;
  initials: string;
  avatarColor: string;
  primarySpecialty: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  neighborhood: string;
  address: string;
  education: Education[];
  cedula: string;
  yearsExperience: number;
  pricePerSession: number;
  offersOnline: boolean;
  offersInPerson: boolean;
  bio: string;
  languages: string[];
  nextAvailable: string;
  verified: boolean;
  tags: string[];
  phone: string;
  reviews: Review[];
}
