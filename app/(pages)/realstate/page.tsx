'use client';

import { motion } from 'framer-motion';
import { Home, Building2 } from 'lucide-react';

import { useState, useMemo } from 'react';
import { RealEstate } from '@/types/real-estate';
import styles from '@/sass/pages/real-estate/realEstatePage.module.scss';

// Mock data - replace with your actual data fetching
import {realEstateData} from '@/data/real-estate';
import RealEstateFilters, { FilterType } from './RealEstateFilters';
import RealEstateList from './RealEstateList';

// Define the shape of the raw data from JSON
interface RawRealEstateData {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  discounted_price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  images: Array<{
    id: number;
    image_url: string;
    is_primary: boolean;
  }>;
  features: string[];
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

// Process the raw data to ensure it matches our types
const processRealEstateData = (data: RawRealEstateData[]): RealEstate[] => {
  return data.map(item => ({
    ...item,
    type: (item.type === 'sale' || item.type === 'rent' ? item.type : 'sale') as 'sale' | 'rent',
    is_featured: item.is_featured || false
  }));
};

export default function AllRealEstate() {
  const [properties, setProperties] = useState<RealEstate[]>(() => 
    processRealEstateData(realEstateData)
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: Omit<FilterType, 'location'>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = realEstateData.filter(property => {
        // Type filter
        if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
          return false;
        }
        
        // Price range filter
        if (filters.minPrice && property.price < filters.minPrice) return false;
        if (filters.maxPrice && property.price > filters.maxPrice) return false;
        
        // Bedrooms filter
        if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
        
        // Bathrooms filter
        if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
        
        return true;
      });
      
      setProperties(processRealEstateData(filtered));
      setLoading(false);
    }, 800);
  };

  // Memoize featured properties to avoid recalculating on every render
  const featuredProperties = useMemo(() => 
    properties.filter(prop => prop.is_featured).slice(0, 4),
    [properties]
  );

  return (
    <div className={styles.pageContainer} dir="rtl">
      {/* Hero Section */}
      <motion.section 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ابحث عن منزل أحلامك
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            اكتشف مجموعة واسعة من العقارات المناسبة لك ولعائلتك
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section 
        className={styles.searchSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className={styles.searchContainer}>
          <RealEstateFilters onSearch={handleSearch} />
        </div>
      </motion.section>

      {/* Property Listings */}
      <section className={styles.listingsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Home className={styles.sectionIcon} />
            أحدث العقارات
          </h2>
        </div>
        
        <RealEstateList 
          properties={properties} 
          loading={loading} 
        />
      </section>

      {/* Featured Properties */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} />
            عقارات مميزة
          </h2>
        </div>
        
        <RealEstateList 
          properties={featuredProperties} 
          loading={loading}
        />
      </section>
    </div>
  );
}