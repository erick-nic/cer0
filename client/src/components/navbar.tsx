import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/components/navbar.module.css";
import LogoutButton from "./logout";
import { Button } from "./labels";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const navRef = React.useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    navRef.current?.classList.toggle(style[ 'nav-toggle' ]);
  }

  return (
    <header>
      <Link to="/" className={style[ 'app-name' ]}>Cer0</Link>
      <nav ref={navRef}>
        <Link
          to="/products"
          onClick={toggleNav}>
          Products
        </Link>
        <Link
          to="/users"
          onClick={toggleNav}>
          Users
        </Link>
        <Link
          to="/login"
          onClick={toggleNav}
          className={style[ 'log-in' ]}>
          Login
        </Link>
        <Link
          to="/signup"
          onClick={toggleNav}
          className={style[ 'sign-up' ]}>
          Sign up
        </Link>
        <LogoutButton />
        <Button
          value={<X />}
          onClick={toggleNav}
          className={style[ 'menu-close' ]} />
      </nav >
      <Button
        className={style[ 'menu-bars' ]}
        onClick={toggleNav}
        value={<Menu />}
      />
    </header>
  );
}

export default Navbar;  