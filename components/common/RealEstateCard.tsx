"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  MessageSquareText,
  Warehouse,
  ChefHat,
  HdmiPort,
} from "lucide-react";
import { RealEstateCardProps } from "@/types/real-estate";
import styles from "@/sass/components/common/RealEstateCard.module.scss";
import Link from "next/link";

const RealEstateCard = ({ property, index }: RealEstateCardProps) => {
  const primaryImage =
    property.images.find((img) => img.is_primary) || property.images[0];

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
      <div className={styles.imageContainer}>
        <Link
          href={`/realstate/${property.id}/${property.slug}`}
          className={styles.imageLink}
        >
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
          {property.type === "sale" ? "بيع" : "إيجار"}
        </div>
        <button className={styles.favoriteButton} aria-label="إضافة للمفضلة">
          <Heart className={styles.heartIcon} />
        </button>
        <Link
          href={`https://wa.me/201555187474?text=مرحباً، أنا مهتم بالعقار: ${encodeURIComponent(
            property.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
          aria-label="تواصل عبر واتساب"
        >
          <MessageSquareText className={styles.whatsappIcon} />
        </Link>

        <Link
          href={`/realstate/${property.id}/${property.slug}`}
          className={styles.detailsButton}
        >
          عرض التفاصيل
        </Link>
        {property.discounted_price && (
          <div className={styles.discountBadge}>
            خصم {property.discount_percentage}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{property.price} ج.م</span>
          {property.discounted_price && (
            <span className={styles.originalPrice}>
              {property.discounted_price} ج.م
            </span>
          )}
        </div>

        <h3 className={styles.title}>{property.title}</h3>

        <div className={styles.location}>
          <MapPin size={16} />
          <span>{`${property.location.city}, ${property.location.district}, ${property.location.street}`}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Bed size={18} />
            <span>{property.bedrooms} غرف نوم </span>
          </div>
          <div className={styles.detailItem}>
            <Bath size={18} />
            <span>{property.bathrooms} حمام</span>
          </div>
          <div className={styles.detailItem}>
            <Ruler size={18} />
            <span>{property.area_total} م²</span>
          </div>
          <div className={styles.detailItem}>
            <Warehouse size={18} />
            <span>{property.living_rooms} غرف معيشه </span>
          </div>
          <div className={styles.detailItem}>
            <ChefHat size={18} />
            <span>{property.kitchens} مطبخ</span>
          </div>
          <div className={styles.detailItem}>
            <HdmiPort size={18} />
            <span>{property.balconies} شرفة</span>
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
