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

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const isDesktop = useIsDesktop();

  const toggleSearch = () => setOpenSearch((prev) => !prev);
  const toggleMenu = () => setOpenMenu((prev) => !prev);

  const renderSearchIcon = () =>
    openSearch ? (
      <Search onCloseSearch={toggleSearch} />
    ) : (
      <BiSearchAlt className="search-icon" onClick={toggleSearch} />
    );

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
        <Link to="/" className="logo">
          CHOOSE
        </Link>
        {isDesktop && <Navbar onCloseMenu={toggleMenu} />}

        <div className="icons">
          {renderSearchIcon()}
          <AuthMenu />
          <Link to="/cart">
            <CiShoppingBasket className="panier-icon" />
          </Link>
          {renderMenuIcon()}
        </div>
      </nav>

      <SliderNavTwo />
    </header>
  );
}
