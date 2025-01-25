import "./FilterProductMenu.scss";
import { Button } from "../ui/Button";

export const FilterProductMenu = ({
  onClose,
  onPromoFilterChange,
  onSearchChange,
}: {
  onClose: () => void;
  onPromoFilterChange: (isChecked: boolean) => void;
  onSearchChange: (searchQuery: string) => void;
}) => {
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>
    onPromoFilterChange(event.target.checked);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSearchChange(event.target.value);

  return (
    <div className="filter-product-menu">
      <h2>Les Filtres</h2>
      <Button className="filter-close-button" onClick={onClose}>
        Fermer
      </Button>

      <input
        className="filter-input"
        type="text"
        placeholder="Rechercher"
        onChange={handleSearch}
      />

      <div className="filter-checkboxes">
        <div className="filter-checkbox">
          <input type="checkbox" id="promo-checkbox" onChange={handleChecked} />
          <label htmlFor="promo-checkbox">En Promo</label>
        </div>
      </div>
    </div>
  );
};
