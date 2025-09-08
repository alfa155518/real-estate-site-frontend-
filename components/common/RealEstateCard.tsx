'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Bed, Bath, Ruler, Heart, MessageSquareText  } from 'lucide-react';
import { RealEstate } from '@/types/real-estate';
import styles from '@/sass/components/common/RealEstateCard.module.scss';
import Link from 'next/link';

interface RealEstateCardProps {
  property: RealEstate;
  index: number;
}

const RealEstateCard = ({ property, index }: RealEstateCardProps) => {
  const primaryImage = property.images.find(img => img.is_primary) || property.images[0];
  const isDiscounted = property.discount > 0;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
    >
      <div className={styles.imageContainer}>
        <Link href={`/realstate/${property.id}`} className={styles.imageLink}>
          {primaryImage && (
            <Image
              src={primaryImage.image_url}
              alt={property.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3} // Only preload first 3 images
            />
          )}
        </Link>
        <div className={styles.badge}>
          {property.type === 'sale' ? 'بيع' : 'إيجار'}
        </div>
        <button className={styles.favoriteButton}>
          <Heart className={styles.heartIcon} />
        </button>
        <Link 
          href={`https://wa.me/201555187474?text=مرحباً، أنا مهتم بالعقار: ${encodeURIComponent(property.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <MessageSquareText className={styles.whatsappIcon} />
        </Link>
        
        <Link 
          href={`/realstate/${property.id}`}
          className={styles.detailsButton}
        >
          عرض التفاصيل
        </Link>
        {isDiscounted && (
          <div className={styles.discountBadge}>
            خصم {property.discount}%
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {property.discounted_price.toLocaleString('ar-EG')} ج.م
          </span>
          {isDiscounted && (
            <span className={styles.originalPrice}>
              {property.price.toLocaleString('ar-EG')} ج.م
            </span>
          )}
        </div>

        <h3 className={styles.title}>{property.title}</h3>

        <div className={styles.location}>
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Bed size={18} />
            <span>{property.bedrooms} غرف</span>
          </div>
          <div className={styles.detailItem}>
            <Bath size={18} />
            <span>{property.bathrooms} حمامات</span>
          </div>
          <div className={styles.detailItem}>
            <Ruler size={18} />
            <span>{property.area} م²</span>
          </div>
        </div>

        {property.features.length > 0 && (
          <div className={styles.features}>
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className={styles.feature}>
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RealEstateCard;
