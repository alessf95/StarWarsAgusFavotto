import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InnerNavbar from "../component/innerNavbar";

const DataBank = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Image Links
  const imgLinks = [
    "https://starwars-visualguide.com/assets/img/categories/films.jpg",
    "https://starwars-visualguide.com/assets/img/categories/character.jpg",
    "https://starwars-visualguide.com/assets/img/categories/planets.jpg",
    "https://starwars-visualguide.com/assets/img/categories/species.jpg",
    "https://starwars-visualguide.com/assets/img/categories/starships.jpg",
    "https://starwars-visualguide.com/assets/img/categories/vehicles.jpg",
  ];

  useEffect(() => {
    fetch("https://www.swapi.tech/api")
      .then((res) => res.json())
      .then((data) => {
        const mergedData = Object.keys(data.result).map((key, idx) => ({
          name: key,
          url: data.result[key],
          image: imgLinks[idx],
        }));
        setData(mergedData);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="bg-black"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="container">
        {/* Navbar */}
        <InnerNavbar pageName={"DataBank"} />

        {loading ? (
          <div className="loading" style={{ marginTop: "150px" }}>
            <p className="fs-3 text-white text-center">Loading...</p>
          </div>
        ) : (
          <div
            className="row"
            style={{
              marginTop: "120px",
            }}
          >
            {data &&
              data.map((item, idx) => (
                <div
                  key={idx}
                  className="col-md-4 px-4 mb-5"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/databank/${item.name}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                  <p
                    className="fs-2 text-capitalize fw-bold text-center"
                    style={{
                      color: "#FEEE01",
                    }}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataBank;