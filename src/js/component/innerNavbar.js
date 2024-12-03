import React from "react";
import { Link, NavLink } from "react-router-dom";

const InnerNavbar = ({ pageName }) => {
  return (
    <nav
      className="w-100 d-flex align-items-center justify-content-between gap-5 py-2"
      style={{ height: "120px" }}
    >
      {/* left (Logo) */}
      <div>
        <Link to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png"
            alt="logo"
            width={"200"}
          />
        </Link>
      </div>

      {/* Middle */}
      <NavLink to={"/favorites"} className={"text-decoration-none"}>
        <p
          className="text-medium fs-5"
          style={{
            color: "#FEEE01",
            textTransform: "capitalize",
          }}
        >
          Favorites
        </p>
      </NavLink>

      {/* Right (Page name) */}
      <div>
        <p
          className="fs-2 fw-bold"
          style={{ color: "#FEEE01", textTransform: "capitalize" }}
        >
          {pageName}
        </p>
      </div>
    </nav>
  );
};

export default InnerNavbar;