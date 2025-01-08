import { links, brands } from "@/constants/navbarData";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

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
            <Link to={link.link} onClick={onCloseMenu}>
              {link.title} {<IoIosArrowForward className="arrow-link" />}
            </Link>
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
