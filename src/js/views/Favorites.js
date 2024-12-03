import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import InnerNavbar from "../component/innerNavbar";

const Favorites = () => {
  const { store } = useContext(Context);
  const [favorites, setFavorites] = useState(store.favorites);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(store.favorites);
  }, [store.favorites]);

  return (
    <div
      className="bg-black text-white"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div className="container">
        <InnerNavbar pageName={"Favorites"} />

        <div style={{ marginTop: "100px" }} className="row g-3">
          {favorites.map((item, idx) => (
            <div
              key={item?.uid || idx}
              className="col-md-3 px-4"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(item.url, {
                  state: { image: item.image },
                })
              }
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />

              <p className="text-center text-white fs-5">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;