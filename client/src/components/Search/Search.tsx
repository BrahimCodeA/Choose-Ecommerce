import "./Search.scss";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function Search({
  onCloseSearch,
}: {
  onCloseSearch: () => void;
}) {
  return (
    <div className="search-container show">
      <div className="header">
        <h2 className="logo">CHOOSE</h2>
        <Button onClick={onCloseSearch}>Fermer</Button>
      </div>
      <Input type="text" placeholder="Rechercher" />

      <div>
        <p>Les recherches les plus populaires...</p>
      </div>
    </div>
  );
}
