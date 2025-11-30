import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  MessageSquareText,
  Layers,
  Calendar,
  User,
  CheckCircle,
  Share2,
  Phone,
  Mail,
  AlertCircle,
  Home as HomeIcon,
  Building,
  ChefHat,
  Building2,
  Globe,
} from "lucide-react";
import ReactPlayer from "react-player";
import { Property } from "@/types/propertyStore";
import {
  getPropertyTypeLabel,
  getPurposeLabel,
  getFurnishingLabel,
  PropertyType,
  PurposeType,
  FurnishingType,
} from "@/utils/propertyHelpers";
import useProperty from "@/hooks/useProperty";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";

export default function Details({ property }: { property: Property }) {
  // Use property custom hook
  const { activeTab, setActiveTab, handleShareProperty, formattedAddress } =
    useProperty(property);

  return (
    <section className={styles.details}>
      <div className={styles.mainInfo}>
        <div className={styles.headerRow}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {property.title}
          </motion.h1>
          <span
            className={`${styles.status} ${
              property.status === "available" ? styles.available : ""
            }`}
          >
            {property.status === "available" ? "متاح" : "غير متاح"}
          </span>
        </div>

        <motion.div
          className={styles.location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MapPin size={24} className={styles.locationIcon} />
          <span>{formattedAddress}</span>
        </motion.div>

        <motion.div
          className={styles.priceSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {Number(property.discount) > 0 ? (
            <div className={styles.priceWithDiscount}>
              {Number(property?.discounted_price) > 0 && (
                <>
                  <span className={styles.originalPrice}>
                    {property.discounted_price} ج.م
                  </span>
                  <span className={styles.discountBadgeInline}>
                    خصم {property.discount_percentage}
                  </span>
                </>
              )}

              <span className={styles.discountedPrice}>
                {property.price} ج.م
              </span>
            </div>
          ) : (
            <span className={styles.price}>
              {property.price} ج.م
              {property.type === "rent" && (
                <span className={styles.pricePeriod}>/ شهرياً</span>
              )}
            </span>
          )}

          <div className={styles.propertyType}>
            <Building size={27} />
            <span>
              {getPropertyTypeLabel(property.property_type as PropertyType)}
            </span>
            {property.purpose && (
              <span className={styles.purpose}>
                {property.purpose === "residential" ? "سكني" : "تجاري"}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.features}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.feature}>
            <Bed size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>{property.bedrooms}</span>
              <span className={styles.featureLabel}>غرف نوم</span>
            </div>
          </div>

          <div className={styles.feature}>
            <Bath size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>{property.bathrooms}</span>
              <span className={styles.featureLabel}>حمامات</span>
            </div>
          </div>
          <div className={styles.feature}>
            <ChefHat size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>{property.kitchens}</span>
              <span className={styles.featureLabel}>مطبخ</span>
            </div>
          </div>
          <div className={styles.feature}>
            <Building2 size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>{property.balconies}</span>
              <span className={styles.featureLabel}>شرفه</span>
            </div>
          </div>

          <div className={styles.feature}>
            <Ruler size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>{property.area_total}</span>
              <span className={styles.featureLabel}>متر مربع</span>
            </div>
          </div>

          {property.living_rooms > 0 && (
            <div className={styles.feature}>
              <HomeIcon size={20} className={styles.featureIcon} />
              <div className={styles.featureContent}>
                <span className={styles.featureValue}>
                  {property.living_rooms}
                </span>
                <span className={styles.featureLabel}>صالة</span>
              </div>
            </div>
          )}

          {property.floor && (
            <div className={styles.feature}>
              <Layers size={20} className={styles.featureIcon} />
              <div className={styles.featureContent}>
                <span className={styles.featureValue}>
                  {property.floor}{" "}
                  {property.total_floors ? `من ${property.total_floors}` : ""}
                </span>
                <span className={styles.featureLabel}>الطابق</span>
              </div>
            </div>
          )}

          <div className={styles.feature}>
            <Calendar size={20} className={styles.featureIcon} />
            <div className={styles.featureContent}>
              <span className={styles.featureValue}>
                {new Date(property.created_at).toLocaleDateString("ar-EG")}
              </span>
              <span className={styles.featureLabel}>تاريخ الإضافة</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className={styles.button} aria-label="إضافة للمفضلة">
            اضافة لقائمة المفضله
            <Heart size={20} className={styles.heartIcon} />
          </button>

          <button
            className={`${styles.button} ${styles.shareButton}`}
            onClick={() => handleShareProperty()}
            aria-label="مشاركة العقار"
          >
            <Share2 size={20} />
            مشاركة
          </button>
        </motion.div>

        {/* Tabs Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "details" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            تفاصيل العقار
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "features" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("features")}
          >
            المميزات
          </button>
          {property.videos?.length && (
            <button
              className={`${styles.tab} ${
                activeTab === "video" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("video")}
            >
              فيديو
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Details Tab */}
          {activeTab === "details" && (
            <motion.div
              className={styles.description}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>وصف العقار</h2>
              <p>{property.description || "لا يوجد وصف متوفر حالياً."}</p>

              <h2>تفاصيل إضافية</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>نوع العقار:</span>
                  <span className={styles.detailValue}>
                    {getPropertyTypeLabel(
                      property.property_type as PropertyType
                    )}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>الغرض:</span>
                  <span className={styles.detailValue}>
                    {getPurposeLabel(property.purpose as PurposeType)}
                  </span>
                </div>
                {property.floor !== null && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>الطابق:</span>
                    <span className={styles.detailValue}>
                      {property.floor}{" "}
                      {property.total_floors
                        ? `من ${property.total_floors}`
                        : ""}
                    </span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>التشطيب:</span>
                  <span className={styles.detailValue}>
                    {getFurnishingLabel(property.furnishing as FurnishingType)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>تاريخ الإضافة:</span>
                  <span className={styles.detailValue}>
                    {new Date(property.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>عدد المشاهدات:</span>
                  <span className={styles.detailValue}>
                    {property.views.toLocaleString("ar-EG")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <motion.div
              className={styles.featuresSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>مميزات العقار</h2>
              {property.features.length > 0 ? (
                <div className={styles.featuresGrid}>
                  {property.features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <CheckCircle size={24} className={styles.featureCheck} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noFeatures}>
                  <AlertCircle size={24} />
                  <p>لا توجد مميزات مضافة لهذا العقار حالياً.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Video Tab */}
          {activeTab === "video" && property.videos && (
            <motion.div
              className={styles.videoSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>فيديو العقار</h2>
              <div className={styles.videoContainer}>
                {property.videos.map((video, index) => (
                  <ReactPlayer
                    key={index}
                    src={video.video_url}
                    className={styles.videoPlayer}
                    controls={true}
                    loop={true}
                    width="100%"
                    height="100%"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className={styles.sidebar}>
        {/* Owner Contact Card */}
        <motion.div
          className={styles.contactCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.ownerHeader}>
            <div className={styles.ownerAvatar}>
              <User size={24} />
            </div>
            <div>
              <h3>المالك: {property.owner.name}</h3>
              <p className={styles.ownerType}>
                {property.owner.type === "individual"
                  ? "مالك خاص"
                  : "شركة عقارية"}
              </p>
            </div>
          </div>

          <div className={styles.contactButtons}>
            <h4>تواصل معنا عبر:</h4>
            <p className={styles.contactButton}>
              <Phone size={18} />
              اتصل الآن: {property.owner.phone}
            </p>

            <a
              href={`https://wa.me/${
                property.owner.phone
              }?text=مرحباً، أنا مهتم بالعقار: ${encodeURIComponent(
                property.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactButton} ${styles.whatsappButton}`}
            >
              <MessageSquareText size={18} />
              واتساب
            </a>

            <a
              href={`mailto:${
                property.owner.email
              }?subject=استفسار عن العقار: ${encodeURIComponent(
                property.title
              )}`}
              className={styles.contactButton}
            >
              <Mail size={18} />
              بريد إلكتروني
            </a>
          </div>

          {property.agency && (
            <motion.div
              className={styles.agencySection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4>معلومات الوكيل العقاري</h4>
              <div className={styles.agencyInfo}>
                <div className={styles.agencyHeader}>
                  <Building2 size={24} className={styles.agencyIcon} />
                  <h5>{property.agency.name}</h5>
                </div>

                <div className={styles.agencyDetails}>
                  {property.agency.phone && (
                    <div className={styles.detailItem}>
                      <Phone size={16} className={styles.detailIcon} />
                      <a href={`tel:${property.agency.phone}`}>
                        {property.agency.phone}
                      </a>
                    </div>
                  )}

                  {property.agency.website && (
                    <div className={styles.detailItem}>
                      <Globe size={16} className={styles.detailIcon} />
                      <a
                        href={
                          property.agency.website.startsWith("http")
                            ? property.agency.website
                            : `https://${property.agency.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {property.agency.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          className={styles.safetyTips}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h6>نصائح الأمان</h6>
          <ul>
            <li>
              <AlertCircle size={20} className={styles.tipIcon} />
              <span>
                لا تدفع أي مبالغ مالية قبل رؤية العقار والتأكد من صحة المستندات
              </span>
            </li>
            <li>
              <AlertCircle size={20} className={styles.tipIcon} />
              <span>قابل البائع في مكان عام أو مكتب عقاري معتمد</span>
            </li>
            <li>
              <AlertCircle size={20} className={styles.tipIcon} />
              <span>تحقق من صحة المستندات القانونية للعقار</span>
            </li>
            <li>
              <AlertCircle size={20} className={styles.tipIcon} />
              <span>لا تشارك معلوماتك المصرفية أو الشخصية الحساسة</span>
            </li>
            <li>
              <AlertCircle size={20} className={styles.tipIcon} />
              <span>احرص على توقيع عقد واضح يحدد جميع البنود والشروط</span>
            </li>
          </ul>

          <div className={styles.reportLink}>
            <AlertCircle size={20} className={styles.reportIcon} />
            <a href="/support" target="_blank" rel="noopener noreferrer">
              الإبلاغ عن إساءة استخدام
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
