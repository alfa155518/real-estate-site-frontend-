interface Slider {
    id: number;
    images: string[];
    name: string;
}
export interface SlidersStore {
    sliders: Slider;
    isLoading: boolean;
    defaultSlide: string;
    handleGetSlider: (sliderID: number) => Promise<void>;
}