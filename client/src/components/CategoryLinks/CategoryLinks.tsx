import "./CategoryLinks.scss";
import Category from "./Category";

export default function CategoryPages() {
  return (
    <section className="category-pages">
      <Category
        imageSrc="/assets/Home-Men.webp"
        altText="Sneakers Homme"
        title="Homme"
        description="Jordan, Nike, et plus."
        link="/men"
      />
      <Category
        imageSrc="/assets/Home-Women.webp"
        altText="Sneakers Femme"
        title="Femme"
        description="Styles tendance."
        link="/women"
      />
      <Category
        imageSrc="/assets/Home-Kid.webp"
        altText="Sneakers Enfant"
        title="Enfant"
        description="Pour les petits fans."
        link="/kid"
      />
    </section>
  );
}
