import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-md">
      <Link className="navbar-brand" to={"#"}>
        Sneaker City
      </Link>
      Sneaker City | A new online-only store for the latest in sneaker trends
      below.
    </nav>
  );
}
