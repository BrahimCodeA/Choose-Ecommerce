import "./FilterProductMenu.scss";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";
import { useState } from "react";

export const FilterProductMenu = ({
  onClose,
  onPromoFilterChange,
  onSearchChange,
  onSortChange,
}: {
  onClose: () => void;
  onPromoFilterChange: (isChecked: boolean) => void;
  onSearchChange: (searchQuery: string) => void;
  onSortChange: (sortOrder: "Croissant" | "Décroissant") => void;
}) => {
  const [selectedSortOrder, setSelectedSortOrder] = useState("");
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>
    onPromoFilterChange(event.target.checked);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSearchChange(event.target.value);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value;
    setSelectedSortOrder(newSortOrder);
    onSortChange(newSortOrder as "Croissant" | "Décroissant");
  };

  return (
    <div className="filter-product-menu">
      <h2>CHOOSE</h2>
      <Button
        className="filter-close-button"
        onClick={onClose}
        title={"Fermer"}
      />

      <Input
        className="filter-input"
        type="text"
        placeholder="Recherchez une sneakers..."
        onChange={handleSearch}
      />

      <div className="filter-checkbox">
        <Checkbox
          type="checkbox"
          id="promo-checkbox"
          onChange={handleChecked}
        />
        <Label className="promo-checkbox" title={"En Promo"} />
      </div>

      <Select
        className="filter-select"
        placeholder="Trier par"
        value={selectedSortOrder}
        options={[
          { value: "Croissant", label: "Croissant" },
          { value: "Décroissant", label: "Décroissant" },
        ]}
        onChange={handleSortChange}
      />
    </div>
  );
};
