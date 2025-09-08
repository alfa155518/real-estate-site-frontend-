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
<<<<<<< HEAD
              name="location"
              autoComplete="search"
=======
              name='location'
              autoComplete='search'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
              placeholder="ابحث عن موقع..."
              className={styles.searchInput}
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            {filters.location && (
              <button
                type="button"
<<<<<<< HEAD
                aria-label="Clear location"
=======
                aria-label='clear location'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
                name="minPrice"
                autoComplete="min-price"
=======
                name='min-price'
                autoComplete='min-price'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
                name="maxPrice"
                autoComplete="max-price"
=======
                name='max-price'
                autoComplete='max-price'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
                        value={filters.bedrooms}
                name="bedrooms"
                autoComplete="bedrooms"
=======
                value={filters.bedrooms}
                name='bedrooms'
                autoComplete='bedrooms'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
                autoComplete="bathrooms"
                name="bathrooms"
=======
                name='bathrooms'
                autoComplete='bathrooms'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
              aria-label="Reset filters"
=======
              aria-label='reset filters'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
              className={styles.resetButton}
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              مسح الفلاتر
            </button>
<<<<<<< HEAD
            <button type="submit" aria-label="Search" className={styles.searchButton}>
=======
            <button type="submit" aria-label='search' className={styles.searchButton}>
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
        aria-label="Toggle mobile filters"
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
                  aria-label="Close mobile filters"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className={styles.mobileFiltersBody}>
                {/* Price Range */}
                <div className={styles.filterGroup}>
<<<<<<< HEAD
                  <label htmlFor="minPrice">نطاق السعر</label>
                  <div className={styles.rangeInputs}>
                    <input
                      type="number"
                      name="minPrice"
=======
                  <label htmlFor='min-price'>نطاق السعر</label>
                  <div className={styles.rangeInputs}>
                    <input
                      type="number"
                      name='min-price'
                      autoComplete='min-price'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
                      placeholder="الحد الأدنى"
                      value={filters.minPrice}
                      onChange={(e) => handleInputChange('minPrice', e.target.value)}
                      min="0"
<<<<<<< HEAD
                      id="minPrice"
=======
                      id='min-price'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
                    />
                    <span>إلى</span>
                    <input
                      type="number"
<<<<<<< HEAD
                      name="maxPrice"
=======
                      name='max-price'
                      autoComplete='max-price'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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
<<<<<<< HEAD
                  <label htmlFor="bedrooms">عدد الغرف</label>
=======
                  <label htmlFor='bedrooms'>عدد الغرف</label>
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
                  <select
                    name='bedrooms'
                      autoComplete='bedrooms'
                    value={filters.bedrooms}
                    autoComplete="bedrooms"
                    name="bedrooms"
                    id="bedrooms"
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
<<<<<<< HEAD
                  <label htmlFor="bathrooms">عدد الحمامات</label>
=======
                  <label htmlFor='bathrooms'>عدد الحمامات</label>
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
                  <select
                    name='bathrooms'
                    autoComplete='bathrooms'
                    value={filters.bathrooms}
                    autoComplete="bathrooms"
                    name="bathrooms"
                    id="bathrooms"
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
<<<<<<< HEAD
                  aria-label="Reset filters"
=======
                  aria-label='reset filters'
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
                  className={styles.resetButton}
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                >
                  مسح الكل
                </button>
                <button
                  type="button"
<<<<<<< HEAD
                  aria-label="Apply filters"
=======
                  aria-label='apply filters'  
>>>>>>> 2555788f7c6cd2687527b06eb1055c9d230732d4
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