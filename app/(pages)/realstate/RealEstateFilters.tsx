import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Home,
  Building,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Sliders,
} from "lucide-react";
import { Controller } from "react-hook-form";
import useRealestate from "@/hooks/useRealestate";
import styles from "@/sass/pages/real-estate/realEstateFilters.module.scss";

const RealEstateFilters = () => {
  // ** RealEstate filters logic custom hook
  const {
    register,
    handleSubmit,
    setValue,
    control,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    filters,
    handleTypeChange,
    onSubmit,
    applyFilters,
    resetFilters,
  } = useRealestate();

  return (
    <div className={styles.filtersContainer} dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filtersForm}>
        <motion.div
          className={styles.mainFilters}
          initial={false}
          animate={{ height: "auto" }}
        >
          {/* Property Type Tabs */}
          <motion.div className={styles.propertyTypeTabs} initial={false}>
            {[
              { value: "all", label: "الكل", icon: <Home size={18} /> },
              { value: "sale", label: "للبيع", icon: <Building size={18} /> },
              { value: "rent", label: "للايجار", icon: <MapPin size={18} /> },
            ].map((tab) => (
              <motion.button
                key={tab.value}
                aria-label={tab.label}
                type="button"
                className={`${styles.tabButton} ${
                  filters.type === tab.value ? styles.active : ""
                }`}
                onClick={() =>
                  handleTypeChange(tab.value as "all" | "sale" | "rent")
                }
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
              id="location"
              type="text"
              autoComplete="search"
              placeholder="ابحث عن موقع مثل الجيزه"
              className={styles.searchInput}
              {...register("location")}
            />
            {filters.location && (
              <button
                type="button"
                aria-label="Clear location"
                className={styles.clearButton}
                onClick={() => setValue("location", "")}
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
                id="minPrice"
                type="number"
                autoComplete="min-price"
                placeholder="الحد الأدنى"
                {...register("minPrice")}
                min="0"
              />
            </div>
            <div className={styles.rangeInput}>
              <DollarSign size={16} className={styles.rangeIcon} />
              <input
                id="maxPrice"
                type="number"
                autoComplete="max-price"
                placeholder="الحد الأقصى"
                {...register("maxPrice")}
                min="0"
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className={styles.roomFilters}>
            <div className={styles.roomInput}>
              <Bed size={16} className={styles.roomIcon} />
              <label htmlFor="bedrooms" className={styles.roomLabel}>
                عدد الغرف
              </label>
              <select
                id="bedrooms"
                autoComplete="bedrooms"
                {...register("bedrooms")}
                className={styles.roomSelect}
              >
                <option value="">اختر</option>
                {[1, 2, 3, 4, 5, "6+"].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === "6+" ? "أكثر" : "غرفة"}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.roomInput}>
              <Bath size={16} className={styles.roomIcon} />
              <label htmlFor="bathrooms" className={styles.roomLabel}>
                عدد الحمامات
              </label>
              <select
                id="bathrooms"
                autoComplete="bathrooms"
                {...register("bathrooms")}
                className={styles.roomSelect}
              >
                <option value="">اختر</option>
                {[1, 2, 3, 4, "5+"].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === "5+" ? "أكثر" : "حمام"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              aria-label="Reset filters"
              className={`${styles.searchButton} ${styles.resetButton}`}
              onClick={resetFilters}
            >
              إعادة تعيين
              <X size={16} />
            </button>
            <button
              type="submit"
              aria-label="Search"
              className={styles.searchButton}
            >
              بحث
              <Search size={18} />
            </button>
          </div>
        </motion.div>
      </form>

      {/* Mobile Filters Toggle */}
      <button
        aria-label="Toggle mobile filters"
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
                  aria-label="Close mobile filters"
                  className={styles.closeButton}
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className={styles.mobileFiltersBody}>
                {/* Price Range */}
                <div className={styles.filterGroup}>
                  <label htmlFor="minPriceMobile">نطاق السعر</label>
                  <div className={styles.rangeInputs}>
                    <Controller
                      name="minPrice"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="minPriceMobile"
                          type="number"
                          placeholder="الحد الأدنى"
                          {...field}
                          min="0"
                        />
                      )}
                    />
                    <span>إلى</span>
                    <Controller
                      name="maxPrice"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="maxPriceMobile"
                          type="number"
                          placeholder="الحد الأقصى"
                          {...field}
                          min={filters.minPrice || "0"}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div className={styles.filterGroup}>
                  <label htmlFor="bedroomsMobile">عدد الغرف</label>
                  <Controller
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                      <select
                        id="bedroomsMobile"
                        {...field}
                        autoComplete="bedrooms"
                      >
                        <option value="">الكل</option>
                        {[1, 2, 3, 4, 5, "6+"].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === "6+" ? "أكثر" : "غرفة"}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Bathrooms */}
                <div className={styles.filterGroup}>
                  <label htmlFor="bathroomsMobile">عدد الحمامات</label>
                  <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                      <select
                        id="bathroomsMobile"
                        {...field}
                        autoComplete="bathrooms"
                      >
                        <option value="">الكل</option>
                        {[1, 2, 3, 4, "5+"].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === "5+" ? "أكثر" : "حمام"}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className={styles.mobileFiltersFooter}>
                <button
                  type="button"
                  aria-label="Reset filters"
                  className={`${styles.resetButton} ${styles.mobileButton}`}
                  onClick={resetFilters}
                >
                  إعادة تعيين
                </button>
                <button
                  type="button"
                  aria-label="Apply filters"
                  className={`${styles.applyButton} ${styles.mobileButton}`}
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
