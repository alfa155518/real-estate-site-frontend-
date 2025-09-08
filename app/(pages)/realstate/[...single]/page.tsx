'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Star, MapPin, Bed, Bath, Ruler, Heart, ArrowLeft, ArrowRight, MessageSquareText } from 'lucide-react';
import styles from '@/sass/pages/single-realestate/singleRealEstate.module.scss';
import { realEstateData } from '@/data/real-estate';
import { reviews as allReviews } from '@/data/reviews';
import ReviewCard from '@/components/common/ReviewCard';
import type { Review } from '@/types/reviews';
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import Leaflet to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('@/components/ui/PropertyMap'),
  { ssr: false }
);

// Types
interface ReviewFormData {
  rating: number;
  comment: string;
}

interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

// Using the imported Review type from types/reviews.ts
// It has the following structure:
// interface Review {
//   review_id: number;
//   property_id: number;
//   user_id: number;
//   name: string;
//   rating: number;
//   comment: string;
//   reviewed_at: string;
//   helpful_votes: number;
// }

interface RealEstate {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  discounted_price: number;
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  images: PropertyImage[];
  features: string[];
  created_at: string;
  updated_at: string;
}


export default function SingleRealEstatePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State for UI elements
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<RealEstate | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: ''
    }
  });
  
  // Watch the rating value to update the UI
  const ratingValue = watch('rating', 0);

  // Calculate average rating
  const averageRating = useMemo(() => {
    const validReviews = reviews.filter(review => review && review.rating !== undefined);
    return validReviews.length > 0 
      ? validReviews.reduce((acc, review) => acc + (review.rating || 0), 0) / validReviews.length 
      : 0;
  }, [reviews]);

  // Get property ID from URL params
  const { single } = useParams();
  const propertyId = Array.isArray(single) ? single[0] : single || '';

  // Find property from realEstateData and its reviews
  useEffect(() => {
    if (!propertyId) return;
    
    const id = parseInt(propertyId, 10);
    const foundProperty = realEstateData.find(property => property.id === id);
    
    if (foundProperty) {
      // Ensure the property has the correct type
      const typedProperty: RealEstate = {
        ...foundProperty,
        type: foundProperty.type as 'sale' | 'rent',
        images: foundProperty.images || []
      };
      
      setProperty(typedProperty);
      
      // Set primary image as the first image if available
      if (typedProperty.images && typedProperty.images.length > 0) {
        const primaryImage = typedProperty.images.find(img => img.is_primary) || typedProperty.images[0];
        const primaryIndex = typedProperty.images.findIndex(img => img.id === primaryImage.id);
        if (primaryIndex !== -1) {
          setCurrentImageIndex(primaryIndex);
        }
      }
      
      // Filter reviews for this property
      const propertyReviews = allReviews.filter(review => review.property_id === id);
      setReviews(propertyReviews);
    }
    
    setIsLoadingReviews(false);
  }, [propertyId]);

  if (!property) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>جاري تحميل بيانات العقار...</p>
          {!propertyId && <p>خطأ: لم يتم العثور على معرف العقار</p>}
        </div>
      </div>
    );
  }

  const { 
    images = [], 
    title, 
    location, 
    price = 0, 
    discounted_price = 0, 
    description, 
    bedrooms = 0, 
    bathrooms = 0,
    area = 0, 
    features = [],
    latitude = 0,
    longitude = 0
  } = property;
  
  // Calculate discount percentage
  const discountPercentage = price > 0 ? Math.round(((price - (discounted_price || price)) / price) * 100) : 0;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i < count ? '#FFD700' : 'none'} 
          color="#FFD700" 
        />
      );
    }
    return stars;
  };

  const handleReviewSubmit = async (formData: ReviewFormData) => {
    if (!property) return;
    
    try {
      setIsFormSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview: Review = {
        review_id: Date.now(),
        property_id: property.id,
        user_id: 0, // Default user ID, replace with actual user ID
        name: 'مستخدم جديد',
        rating: formData.rating,
        comment: formData.comment,
        reviewed_at: new Date().toISOString(),
        helpful_votes: 0
      };
      
      setReviews([newReview, ...reviews]);
      reset();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.gallery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.slide}>
          <Image 
            src={images[currentImageIndex]?.image_url || '/images/placeholder.jpg'} 
            alt={title} 
            priority
            width={450}
            height={450}
          />
          <div className={styles.navigation}>
            <button onClick={prevImage} aria-label="Previous image">
              <ArrowRight size={24} />
            </button>
            <button onClick={nextImage} aria-label="Next image">
              <ArrowLeft size={24} />
            </button>
          </div>
        </div>
        
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <Image
              width={80}
              height={60}
              key={img.id}
              src={img.image_url}
              alt={`${title} - ${index + 1}`}
              className={index === currentImageIndex ? styles.active : ''}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      </motion.div>

      <div className={styles.details}>
        <div className={styles.mainInfo}>
          <motion.h1 
            className={`${styles.title} animateFadeIn`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.div 
            className={styles.location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin size={18} />
            <span>{location}</span>
          </motion.div>
          
          <motion.div 
            className={styles.price}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {discountPercentage > 0 && (
              <span className={styles.original}>{price.toLocaleString('ar-EG')} ر.س</span>
            )}
            <span>{discounted_price.toLocaleString('ar-EG')} ج.م</span>
            <span style={{ fontSize: '1rem', marginRight: '0.5rem' }}>
              {property.type === 'rent' ? '/ شهرياً' : ''}
            </span>
          </motion.div>
          
          <motion.div 
            className={styles.features}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.feature}>
              <Bed size={20} />
              <span>{bedrooms} غرف نوم</span>
            </div>
            <div className={styles.feature}>
              <Bath size={20} />
              <span>{bathrooms} حمامات</span>
            </div>
            <div className={styles.feature}>
              <Ruler size={20} />
              <span>{area.toLocaleString('ar-EG')} م²</span>
            </div>
            <div className={styles.feature}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{new Date(property.created_at).toLocaleDateString('ar-EG')}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className={`${styles.button}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={ 'Add to favorites'}
            >
              <Heart size={20} />
               إضافة للمفضلة
            </button>
            {/* <button className={styles.button}>
              <Share2 size={20} />
              مشاركة
            </button> */}
          </motion.div>
          
          <motion.div 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3>تفاصيل العقار</h3>
            <p>{description}</p>
            
            <h3>المميزات</h3>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                   {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className={styles.sidebar}>
          <motion.div 
            className={styles.contactCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3> تواصل مع المالك</h3>

            
            <Link
              href={`https://wa.me/201555187474?text=مرحباً، أنا مهتم بالعقار: ${encodeURIComponent(property.title)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
               <MessageSquareText  />
              تواصل عبر واتساب
            </Link>
          </motion.div>
          
          <motion.div 
            className={styles.safetyTips}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>نصائح الأمان</h3>
            <ul>
              <li>• لا تدفع أي مبالغ مالية قبل رؤية العقار</li>
              <li>• قابل البائع في مكان عام</li>
              <li>• تحقق من صحة المستندات القانونية</li>
              <li>• لا تشارك معلوماتك المصرفية مع أحد</li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className={styles.mapContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>الموقع على الخريطة</h2>
        <div className={styles.map}>
          <MapWithNoSSR 
            lat={latitude} 
            lng={longitude} 
            zoom={15}
            propertyTitle={title}
          />
        </div>
      </motion.div>
      
      <div className={styles.reviewsSection}>
        <div className={styles.header}>
          <h2>التقييمات والآراء</h2>
          {!isLoadingReviews && (
            <div className={styles.rating}>
              <div className={styles.stars}>
                {renderStars(Math.round(averageRating))}
              </div>
              <span className={styles.count}>
                ({reviews.length} {reviews.length === 1 ? 'تقييم' : 'تقييمات'})
              </span>
            </div>
          )}
        </div>
        
        <div className={styles.reviews}>
          {isLoadingReviews ? (
            <div className={styles.loading}>جاري تحميل التقييمات...</div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))
          ) : (
            <p className={styles.noReviews}>لا توجد تقييمات حتى الآن</p>
          )}
        </div>
        
        <motion.div 
          className={styles.addReview}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>أضف تقييمك</h3>
          <form onSubmit={handleSubmit(handleReviewSubmit)}>
            <div className={styles.formGroup}>
              <label>التقييم</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={28}
                    fill={star <= ratingValue ? '#FFD700' : 'none'}
                    color={star <= ratingValue ? '#FFD700' : '#ddd'}
                    onClick={() => setValue('rating', star, { shouldValidate: true })}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
                <input
                  type="hidden"
                  {...register('rating', { required: 'الرجاء تحديد التقييم' })}
                />
              </div>
              {errors.rating && (
                <p className={styles.error}>{errors.rating.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="comment">تعليقك</label>
              <textarea
                id="comment"
                {...register('comment', { 
                  required: 'الرجاء إدخال تعليقك',
                  minLength: {
                    value: 10,
                    message: 'يجب أن يكون التعليق 10 أحرف على الأقل'
                  }
                })}
                placeholder="اكتب تعليقك هنا..."
                className={errors.comment ? styles.inputError : ''}
              />
              {errors.comment && (
                <p className={styles.error}>{errors.comment.message}</p>
              )}
            </div>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}