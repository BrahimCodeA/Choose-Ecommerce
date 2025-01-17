import "./FilterProductMenu.scss";
import { Button } from "../ui/Button";

export const FilterProductMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="filter-product-menu">
      <h2>Filtres</h2>
      <Button className="filter-close-button" onClick={onClose}>
        Fermer
      </Button>
      <input className="filter-input" type="text" placeholder="Rechercher" />
      <div className="filter-checkboxes">
        <div className="filter-checkbox">
          <input type="checkbox" id="promo-checkbox" />
          <label htmlFor="promo-checkbox">En Promo</label>
        </div>
      </div>
    </div>
  );
};
