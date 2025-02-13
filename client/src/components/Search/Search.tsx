import "./Search.scss";
import { Button } from "../ui/Button";
import { ProductSearch } from "@/components/ProductSearch/ProductSearch";
import { useState } from "react";
import { Input } from "../ui/Input";

export default function Search({
  onCloseSearch,
  openSearch,
}: {
  onCloseSearch: () => void;
  openSearch: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`search-container ${openSearch ? "show" : ""}`}>
      <div className="header">
        <h2 className="logo">CHOOSE</h2>
        <Button onClick={onCloseSearch}>Fermer</Button>
      </div>

      <Input
        type="text"
        placeholder="Rechercher"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery.trim() === "" ? (
        <p>Votre sneakers de rêves ici...</p>
      ) : (
        <ProductSearch
          searchQuery={searchQuery}
          onCloseSearch={onCloseSearch}
        />
      )}
    </div>
  );
}
