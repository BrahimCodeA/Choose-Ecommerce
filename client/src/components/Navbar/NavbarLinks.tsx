import { links, brands } from "@/constants/navbarData";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom"; // Importer NavLink

export default function NavbarLinks({
  onCloseMenu,
}: {
  onCloseMenu: () => void;
}) {
  return (
    <>
      <ul className="links-pages">
        {links.map((link, index) => (
          <li key={index} className="link">
            <NavLink
              to={link.link}
              onClick={onCloseMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.title} <IoIosArrowForward className="arrow-link" />
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="icon-brands">
        {brands.map((brand, index) => (
          <li key={index} className="brand">
            {brand.brandIcon} {brand.brandName}
          </li>
        ))}
      </ul>
    </>
  );
}
