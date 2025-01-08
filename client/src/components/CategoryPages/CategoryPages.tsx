import "./CategoryPages.scss";
import nike from "@/assets/Home-BS.png";

export default function CategoryPages() {
  return (
    <section className="category-pages">
      <div className="category">
        <img src={nike} alt="Sneakers Homme" />
        <div className="overlay">
          <h2>Homme</h2>
          <p>Jordan, Nike, et plus.</p>
          <a href="/Men" className="btn">
            Shop
          </a>
        </div>
      </div>
      <div className="category">
        <img src={nike} alt="Sneakers Femme" />
        <div className="overlay">
          <h2>Femme</h2>
          <p>Styles tendance.</p>
          <a href="/Women" className="btn">
            Shop
          </a>
        </div>
      </div>
      <div className="category">
        <img src={nike} alt="Sneakers Enfant" />
        <div className="overlay">
          <h2>Enfant</h2>
          <p>Pour les petits fans.</p>
          <a href="/Kids" className="btn">
            Shop
          </a>
        </div>
      </div>
    </section>
  );
}
