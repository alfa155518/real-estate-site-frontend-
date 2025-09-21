import { Metadata } from "next";
import Features from "./Features";
import FeaturesSlider from "./FeaturesSlider";

export const metadata: Metadata = {
  title: "من نحن | تعرف على رؤيتنا ورسالتنا في منصتنا العقارية",
  description: "تعرف على قصة منصتنا العقارية، رؤيتنا في تقديم أفضل الخدمات، وكيف نساعدك في العثور على عقار أحلامك بسهولة وثقة.",
  keywords: ["من نحن", "عن الشركة", "رؤية المنصة", "رسالتنا", "قيمتنا", "عقارات"],
};

export default function Page() {
return (
<div>
    <Features />
    <FeaturesSlider />
</div>
)
}