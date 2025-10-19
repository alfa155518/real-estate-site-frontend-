"use client";
import Hero from "./Hero";
import RealEstateSlider from "./RealEstateSlider";
import Reviews from "./Reviews";
import SomeRealStateItems from "./SomeRealStateItems";
import Statistics from "./Statistics";


export default function Home() {
  return (
    <div>
      <Hero />
      <Statistics />
      <RealEstateSlider />
      <SomeRealStateItems />
      <Reviews />
    </div>
  );
}
