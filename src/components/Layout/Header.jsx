import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        paddingX: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink to="/">Hello There !!</NavLink>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <li
            style={{
              listStyleType: "none",
            }}
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            style={{
              listStyleType: "none",
            }}
          >
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li
            style={{
              listStyleType: "none",
            }}
          >
            <NavLink to="/rq">FetchRQ</NavLink>
          </li>
          <li
            style={{
              listStyleType: "none",
            }}
          >
            <NavLink to="/infinite">Infinite Scrolling</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
