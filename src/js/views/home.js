import React from "react";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="bg-black d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <Link to={"/databank"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png"
          alt="site_logo"
        />
      </Link>
    </div>
  );
};
