
"use client";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';

import styles from '@/sass/pages/home/realestate-slider.module.scss';

// import required modules
import { Autoplay,EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import SectionName from '@/components/common/SectionName';


const images:string[] = [
    "/images/home/realEstateSlides/slide-1.webp",
    "/images/home/realEstateSlides/slide-2.webp",
    "/images/home/realEstateSlides/slide-3.webp",
    "/images/home/realEstateSlides/slide-4.webp",
    "/images/home/realEstateSlides/slide-5.webp",
    "/images/home/realEstateSlides/slide-6.webp",
    "/images/home/realEstateSlides/slide-7.webp",
    "/images/home/realEstateSlides/slide-8.webp",
]

export default function RealEstateSlider() {
  return (
    <section className={styles.realEstateSlider}>
        <SectionName title="العقارات المميزة في عالم العقارات"/>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
        modules={[Autoplay,EffectCoverflow]}
      >
       {
        images.map((image:string , index:number) => (
            <SwiperSlide key={index} className={styles.realEstateSliderSlide}>
                <Image src={image} alt={`slide-${index + 1}`} width={300} height={300} priority={true}/>
            </SwiperSlide>
        ))
       }
      </Swiper>
    </section>
  );
}
