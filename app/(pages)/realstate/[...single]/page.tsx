"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";
import ReviewListSection from "./ReviewListSection";
import PostReviewForm from "./PostReviewForm";
import RealEstateCard from "@/components/common/RealEstateCard";
import { SpinnerOne } from "@/components/ui/loader";
import usePropertyStore from "@/store/PropertyStore";
import PropertyGallery from "./PropertyGallery";
import Details from "./Details";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useRealEstateStore from "@/store/RealestateStore";
// Dynamically import Leaflet to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/ui/PropertyMap"), {
  ssr: false,
});

export default function SingleRealEstatePage() {
  const { property, initProperty } = usePropertyStore();
  const { properties } = useRealEstateStore();
  // Get property ID from URL params
  const { single } = useParams();
  const propertyId = Array.isArray(single)
    ? Number(single[0])
    : Number(single || "");

  // Initialize property
  useEffect(() => {
    initProperty(Array.isArray(single) ? single[1] : single || "");
  }, [initProperty, single]);

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center">
        {" "}
        <SpinnerOne text="جاري تحميل بيانات العقار" />
      </div>
    );
  }

  // Handle map coordinates
  const mapLat = property.location.latitude || property.latitude || 0;
  const mapLng = property.location.longitude || property.longitude || 0;

  return (
    <div className={styles.container}>
      {/* Gallery */}
      <PropertyGallery property={property} />
      {/* Details */}
      <Details property={property} />
      {/* Map Section */}
      <motion.section
        className={styles.mapSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.sectionTitle}>الموقع على الخريطة</h2>
        <div className={styles.mapContainer}>
          {mapLat && mapLng ? (
            <div>
              <div style={{ height: "500px" }}>
                <MapWithNoSSR
                  lat={typeof mapLat === "string" ? parseFloat(mapLat) : mapLat}
                  lng={typeof mapLng === "string" ? parseFloat(mapLng) : mapLng}
                  zoom={15}
                  propertyTitle={property.title}
                />
              </div>
              {property.location.landmark && (
                <div className={styles.landmark}>
                  <MapPin size={18} />
                  <span>قريب من: {property.location.landmark}</span>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.noMap}>
              <MapPin size={48} className={styles.noMapIcon} />
              <p>لا يتوفر موقع للعقار حالياً</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Similar Properties */}
      {properties.length > 0 && (
        <motion.section
          className={styles.similarProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>عقارات مشابهة</h2>
          <div className={styles.similarList}>
            {properties
              .filter(
                (p) =>
                  p.id !== propertyId &&
                  p.type === property.type &&
                  p.purpose === property.purpose
              )
              .slice(0, 5)
              .map((property, index) => (
                <div key={property.id}>
                  <RealEstateCard property={property} index={index} />
                </div>
              ))}
          </div>
        </motion.section>
      )}
      {/* Reviews Section */}
      <motion.section
        className={styles.reviewsSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <ReviewListSection propertyId={propertyId} />
        <PostReviewForm propertyId={propertyId} />
      </motion.section>
    </div>
  );
}
