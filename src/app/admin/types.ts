import { IconType } from 'react-icons';

export interface NavItem {
  icon: IconType;
  label: string;
  id: string;
  path: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  jobRole: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface IFAQ {
  _id: string;
  question: string;
  answer: string;
  isArchived?: boolean;
  createdBy?: string;
  modifiedBy?: string;
}

export interface ISchedule {
  id: number;
  date: string;
  time: string;
  location: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  product: string;
  status: 'Pending' | 'Cancelled' | 'Completed';
  date: string;
}
