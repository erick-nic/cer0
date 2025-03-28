import React from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";
import LogoutButton from "./logout";
import { Button } from "./labels";

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
          Create
        </Link>
        <Link
          to="/users"
          onClick={toggleNav}>
          Users
        </Link>
        <Link
          to="/about"
          onClick={toggleNav}>
          About
        </Link>
        <Link
          to="/contacts"
          onClick={toggleNav}>
          Contacts
        </Link>
        <Link
          to="/login"
          onClick={toggleNav}
          className={style[ 'log-in' ]}>
          Log In
        </Link>
        <Link
          to="/signup"
          onClick={toggleNav}
          className={style[ 'sign-up' ]}>
          Sign Up
        </Link>
        <Button
          value={<FaX size={'13pt'} />}
          onClick={toggleNav}
          className={style[ 'menu-close' ]} />
        <LogoutButton />
      </nav >
      <Button
        className={style[ 'menu-bars' ]}
        onClick={toggleNav}
        value={<FaBars size={'13pt'} />}
      />
    </header>
  );
}

export default Navbar;  