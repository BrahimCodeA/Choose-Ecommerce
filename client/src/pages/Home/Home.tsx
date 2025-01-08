import "./Home.scss";
import HeroComponent from "@/components/Hero/Hero";
import { BestSellerSlider } from "@/components/BestSellerSlider/BestSellerSlider";
import { DiscountedProducts } from "@/components/DiscountedProducts/DiscountedProducts";
import CategoryPages from "@/components/CategoryPages/CategoryPages";

export default function Home() {
  return (
    <>
      <HeroComponent />
      <BestSellerSlider />
      <div className="bestseller-discount-separator"></div>
      <DiscountedProducts />
      <CategoryPages />
    </>
  );
}
