import "./Home.scss";
import { BestSellerSlider } from "@/components/BestSellerSlider/BestSellerSlider";
import { DiscountedProducts } from "@/components/DiscountedProducts/DiscountedProducts";
import CategoryPages from "@/components/CategoryLinks/CategoryLinks";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellerSlider />
      <div
        className="bestseller-discount-separator"
        style={{
          backgroundImage: "url('/assets/sneakers-cave.webp')",
        }}
      >
        <div className="text">Une collection unique</div>
      </div>
      <DiscountedProducts />
      <CategoryPages />
    </>
  );
}
