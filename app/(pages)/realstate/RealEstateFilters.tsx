'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Home, Building, MapPin, DollarSign, Bed, Bath, Sliders } from 'lucide-react';
import { useState } from 'react';
import styles from '@/sass/pages/real-estate/realEstateFilters.module.scss';

export type FilterType = {
  type: 'all' | 'sale' | 'rent';
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
};

const initialFilters: FilterType = {
  type: 'all',
  location: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
};

export interface RealEstateFiltersProps {
  onSearch: (filters: Omit<FilterType, 'location'>) => void;
  className?: string;
}

const RealEstateFilters = ({ onSearch, className = '' }: RealEstateFiltersProps) => {
  const [filters, setFilters] = useState<FilterType>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleInputChange = (field: keyof FilterType, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? '' : Number(value)
    }));
  };

  const handleTypeChange = (type: 'all' | 'sale' | 'rent') => {
    setFilters(prev => ({
      ...prev,
      type
    }));
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== 'location' && value !== '' && value !== 'all'
  );

  const getSearchFilters = (filters: FilterType) => {
    const { location, ...searchFilters } = filters;
    return searchFilters;
  };

  const applyFilters = () => {
    onSearch(getSearchFilters(filters));
    setIsMobileFiltersOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(getSearchFilters(filters));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onSearch(getSearchFilters(initialFilters));
  };

  return (
    <div className={`${styles.filtersContainer} ${className}`} dir="rtl">
      <form onSubmit={handleSubmit} className={styles.filtersForm}>
        <motion.div 
          className={styles.mainFilters}
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 'auto' }}
        >
          {/* Property Type Tabs */}
          <motion.div 
            className={styles.propertyTypeTabs}
            initial={false}
          >
            {[
              { value: 'all', label: 'الكل', icon: <Home size={18} /> },
              { value: 'sale', label: 'للبيع', icon: <Building size={18} /> },
              { value: 'rent', label: 'للايجار', icon: <MapPin size={18} /> },
            ].map((tab) => (
              <motion.button
                key={tab.value}
                aria-label={tab.label}
                type="button"
                className={`${styles.tabButton} ${filters.type === tab.value ? styles.active : ''}`}
                onClick={() => handleTypeChange(tab.value as 'all' | 'sale' | 'rent')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Location Search */}
          <motion.div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              name='location'
              autoComplete='search'
              placeholder="ابحث عن موقع..."
              className={styles.searchInput}
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            {filters.location && (
              <button
                type="button"
                aria-label='clear location'
                className={styles.clearButton}
                onClick={() => setFilters({ ...filters, location: '' })}
              >
                <X size={16} />
              </button>
            )}
          </motion.div>

          {/* Price Range */}
          <div className={styles.rangeContainer}>
            <div className={styles.rangeInput}>
              <DollarSign size={16} className={styles.rangeIcon} />
              <input
                type="number"
                name='min-price'
                autoComplete='min-price'
                placeholder="الحد الأدنى"
                value={filters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                min="0"
              />
            </div>
            <div className={styles.rangeInput}>
              <DollarSign size={16} className={styles.rangeIcon} />
              <input
                type="number"
                name='max-price'
                autoComplete='max-price'
                placeholder="الحد الأقصى"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                min={filters.minPrice || '0'}
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className={styles.roomFilters}>
            <div className={styles.roomInput}>
              <Bed size={16} className={styles.roomIcon} />
              <select
                value={filters.bedrooms}
                name='bedrooms'
                autoComplete='bedrooms'
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className={styles.roomSelect}
              >
                <option value="">عدد الغرف</option>
                {[1, 2, 3, 4, 5, '6+'].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === '6+' ? 'أكثر' : 'غرفة'}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.roomInput}>
              <Bath size={16} className={styles.roomIcon} />
              <select
                value={filters.bathrooms}
                name='bathrooms'
                autoComplete='bathrooms'
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className={styles.roomSelect}
              >
                <option value="">عدد الحمامات</option>
                {[1, 2, 3, 4, '5+'].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === '5+' ? 'أكثر' : 'حمام'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              aria-label='reset filters'
              className={styles.resetButton}
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              مسح الفلاتر
            </button>
            <button type="submit" aria-label='search' className={styles.searchButton}>
              بحث
              <Search size={18} />
            </button>
          </div>
        </motion.div>
      </form>

      {/* Mobile Filters Toggle */}
      <button
        aria-label='mobile filters toggle'
        className={styles.mobileFilterToggle}
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
      >
        <Sliders size={20} />
        <span>الفلاتر</span>
      </button>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            className={styles.mobileFiltersOverlay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileFiltersContent}>
              <div className={styles.mobileFiltersHeader}>
                <h3>فلاتر البحث</h3>
                <button
                  aria-label='close mobile filters'
                  className={styles.closeButton}
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className={styles.mobileFiltersBody}>
                {/* Price Range */}
                <div className={styles.filterGroup}>
                  <label htmlFor='min-price'>نطاق السعر</label>
                  <div className={styles.rangeInputs}>
                    <input
                      type="number"
                      name='min-price'
                      autoComplete='min-price'
                      placeholder="الحد الأدنى"
                      value={filters.minPrice}
                      onChange={(e) => handleInputChange('minPrice', e.target.value)}
                      min="0"
                      id='min-price'
                    />
                    <span>إلى</span>
                    <input
                      type="number"
                      name='max-price'
                      autoComplete='max-price'
                      placeholder="الحد الأقصى"
                      value={filters.maxPrice}
                      onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                      min={filters.minPrice || '0'}
                      id='max-price'
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div className={styles.filterGroup}>
                  <label htmlFor='bedrooms'>عدد الغرف</label>
                  <select
                    name='bedrooms'
                      autoComplete='bedrooms'
                    value={filters.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    id='bedrooms'
                  >
                    <option value="">الكل</option>
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === '6+' ? 'أكثر' : 'غرفة'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div className={styles.filterGroup}>
                  <label htmlFor='bathrooms'>عدد الحمامات</label>
                  <select
                    name='bathrooms'
                    autoComplete='bathrooms'
                    value={filters.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    id='bathrooms'
                  >
                    <option value="">الكل</option>
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === '5+' ? 'أكثر' : 'حمام'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.mobileFiltersFooter}>
                <button
                  type="button"
                  aria-label='reset filters'
                  className={styles.resetButton}
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                >
                  مسح الكل
                </button>
                <button
                  type="button"
                  aria-label='apply filters'  
                  className={styles.applyButton}
                  onClick={applyFilters}
                >
                  تطبيق الفلاتر
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealEstateFilters;