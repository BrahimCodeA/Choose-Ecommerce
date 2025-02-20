import "./CategoryLinks.scss";
import men from "@/assets/Home-Men.webp";
import women from "@/assets/Home-Women.webp";
import kid from "@/assets/Home-Kid.webp";
import Category from "./Category";

export default function CategoryPages() {
  return (
    <section className="category-pages">
      <Category
        imageSrc={men}
        altText="Sneakers Homme"
        title="Homme"
        description="Jordan, Nike, et plus."
        link="/men"
      />
      <Category
        imageSrc={women}
        altText="Sneakers Femme"
        title="Femme"
        description="Styles tendance."
        link="/women"
      />
      <Category
        imageSrc={kid}
        altText="Sneakers Enfant"
        title="Enfant"
        description="Pour les petits fans."
        link="/kid"
      />
    </section>
  );
}
