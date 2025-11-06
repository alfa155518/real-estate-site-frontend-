export interface DashboardStats {
  totalProperties: number;
  totalUsers: number;
  totalRevenue: number;
  totalViews: number;
  propertiesChange: number;
  usersChange: number;
  revenueChange: number;
  viewsChange: number;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  currency: string;
  discount: string;
  type: 'sale' | 'rent';
  purpose: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  kitchens: number;
  balconies: number;
  area_total: string;
  features: string[];
  tags: string[];
  floor: number | null;
  total_floors: number | null;
  furnishing: string;
  status: string;
  is_featured: boolean;
  owner_id: number;
  agency_id?: number;
  location: {
    city: string;
    district: string;
    street: string;
    latitude: string;
    longitude: string;
    landmark?: string;
  };
  video_url?: string;
  videos?: File[];
  images?: File[];
}



export interface AdminTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface AdminTableProps<T> {
  data: T[];
  columns: AdminTableColumn<T>[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  children?: SidebarItem[];
}

export interface AdminNotification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface RecentActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'view';
}
