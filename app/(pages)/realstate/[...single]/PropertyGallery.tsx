import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PropertyProps } from "@/types/propertyStore";
import useProperty from "@/hooks/useProperty";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";
export default function PropertyGallery({ property }: PropertyProps) {
  // Custom hook of property
  const { currentImageIndex, nextImage, prevImage, goToImage, discount } =
    useProperty(property);

  return (
    <section className={styles.galleryContainer}>
      <motion.div
        className={styles.gallery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.slide}>
          <Image
            src={
              property.images.length > 0 &&
              property.images[currentImageIndex]?.image_url
                ? property.images[currentImageIndex].image_url
                : "/images/default-property.webp"
            }
            alt={property.title}
            width={800}
            height={500}
            className={styles.mainImage}
            priority
          />
          {property.images.length > 1 && (
            <div className={styles.navigation}>
              <button
                onClick={prevImage}
                className={styles.navButton}
                aria-label="الصورة السابقة"
              >
                <ArrowRight size={24} />
              </button>
              <button
                onClick={nextImage}
                className={styles.navButton}
                aria-label="الصورة التالية"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
          )}

          {property.discount && discount > 0 && (
            <div className={styles.discountBadge}>
              خصم {discount.toLocaleString("ar-EG")}%
            </div>
          )}
        </div>

        {property.images.length > 1 && (
          <div className={styles.thumbnails}>
            {property.images.map((img, index) => (
              <div
                key={img.id}
                className={`${styles.thumbnail} ${
                  index === currentImageIndex ? styles.active : ""
                }`}
                onClick={() => goToImage(index)}
              >
                <Image
                  src={img.image_url}
                  alt={`${property.title} - ${index + 1}`}
                  fill
                  className={styles.thumbnailImage}
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
