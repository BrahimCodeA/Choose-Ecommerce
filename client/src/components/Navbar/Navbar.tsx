import "./Navbar.scss";
import { RxCross1 } from "react-icons/rx";
import NavbarLinks from "./NavbarLinks";

export default function Navbar({ onCloseMenu }: { onCloseMenu: () => void }) {
  return (
    <div className="menu-container">
      <div className="icon-menu-closed" onClick={onCloseMenu}>
        <RxCross1 />
      </div>
      <NavbarLinks onCloseMenu={onCloseMenu} />
    </div>
  );
}
