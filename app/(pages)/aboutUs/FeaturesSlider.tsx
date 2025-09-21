'use client';


import 'swiper/css';
import 'swiper/css/pagination';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import styles from '@/sass/pages/about-us/features-slider.module.scss';
import SectionName from '@/components/common/SectionName';

const featureImages:string[] = [
    "/images/about-us/properties-for-sale-1.webp",
    "/images/about-us/properties-for-sale-2.webp",
    "/images/about-us/properties-for-sale-3.webp",
    "/images/about-us/apartment-for-sale-4.webp",
    "/images/about-us/apartment-for-sale-5.webp",
    "/images/about-us/apartment-for-sale-6.webp",
    "/images/about-us/apartment-for-sale-7.webp",
    "/images/about-us/apartment-for-sale-8.webp",
    "/images/about-us/apartment-for-sale-9.webp",
]

export default function FeaturesSlider() {
     const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };
return (
<section className={styles.featuresSlider}>
              <SectionName title="
              اروع العقارات
              " subtitle="
              اكتشف اروع العقارات المتاحة الآن
              "/>

          <Swiper
        pagination={pagination}
        dir='rtl'
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
      >
        <div className="swiper-pagination" />
            {
            featureImages.map((featureImage) => (
                <SwiperSlide key={featureImage} className={styles.swiperSlide}>
                    <Image src={featureImage} alt={featureImage} width={300} height={300} />
                </SwiperSlide>
            ))
        }
      </Swiper>
</section>
)
}