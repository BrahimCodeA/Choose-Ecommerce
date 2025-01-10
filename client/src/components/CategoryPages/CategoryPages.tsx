import "./CategoryPages.scss";
import men from "@/assets/Home-Men.jpg";
import women from "@/assets/Home-Women.avif";
import kid from "@/assets/Home-Kid.jpg";
import Category from "./Category";

export default function CategoryPages() {
  return (
    <section className="category-pages">
      <Category
        imageSrc={men}
        altText="Sneakers Homme"
        title="Homme"
        description="Jordan, Nike, et plus."
        link="/Men"
      />
      <Category
        imageSrc={women}
        altText="Sneakers Femme"
        title="Femme"
        description="Styles tendance."
        link="/Women"
      />
      <Category
        imageSrc={kid}
        altText="Sneakers Enfant"
        title="Enfant"
        description="Pour les petits fans."
        link="/Kid"
      />
    </section>
  );
}
