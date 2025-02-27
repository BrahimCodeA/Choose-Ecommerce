import "./Header.scss";
import { BiSearchAlt } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiShoppingBasket } from "react-icons/ci";
import { useState } from "react";
import Search from "../Search/Search";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import AuthMenu from "../AuthMenu/AuthMenu";
import SliderNavTwo from "../SliderNavTwo/SliderNavTwo";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import useCart from "@/hooks/useCart";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState(false);
  const isDesktop = useIsDesktop();

  const { cart, user } = useCart();

  const toggleMenu = () => setOpenMenu((prev) => !prev);
  const toggleSearch = () => setOpenSearch((prev) => !prev);

  const renderMenuIcon = () =>
    !isDesktop &&
    (!openMenu ? (
      <RxHamburgerMenu className="menu-icon" onClick={toggleMenu} />
    ) : (
      <Navbar onCloseMenu={toggleMenu} />
    ));

  return (
    <header className="wrapper">
      <nav className="navbar-1">
        <a href="/" className="logo">
          CHOOSE
        </a>
        {isDesktop && <Navbar onCloseMenu={toggleMenu} />}

        <div className="icons">
          <BiSearchAlt className="search-icon" onClick={toggleSearch} />
          <AuthMenu />
          <Link to="/cart" className="panier-icon">
            <CiShoppingBasket />
            {user && cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </Link>
          {renderMenuIcon()}
        </div>
      </nav>

      <Search openSearch={openSearch} onCloseSearch={toggleSearch} />
      <SliderNavTwo />
    </header>
  );
}
