"use client";
import { useEffect } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

// import required modules
import { Autoplay, EffectCoverflow } from "swiper/modules";
import SectionName from "@/components/common/SectionName";
import useSlidersStore from "@/store/SlidersStore";
import styles from "@/sass/pages/home/realestate-slider.module.scss";

export default function RealEstateSlider() {
  const { handleGetSlider, sliders, isLoading, defaultSlide } =
    useSlidersStore();

  useEffect(() => {
    async function fetchData() {
      await handleGetSlider(2);
    }
    fetchData();
  }, [handleGetSlider]);

  return (
    <section className={styles.realEstateSlider}>
      <SectionName title="العقارات المميزة في عالم العقارات" />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, EffectCoverflow]}
      >
        {isLoading || sliders.id === 0 ? (
          <SwiperSlide className={styles.swiperSlide}>
            <Image
              src={defaultSlide}
              alt={`default_slide`}
              className="m-auto"
              width={1920}
              height={200}
              sizes="(max-width: 768px) 100vw, 
                  (max-width: 1200px) 100vw, 
                  100vw"
              priority={true}
            />
          </SwiperSlide>
        ) : (
          sliders.images.map((image: string, index: number) => (
            <SwiperSlide key={index} className={styles.realEstateSliderSlide}>
              <Image
                src={image}
                alt={`slide-${index + 1}`}
                width={300}
                height={300}
                priority={true}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
