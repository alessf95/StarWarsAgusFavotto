import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InnerNavbar from "../component/innerNavbar";

const imageMapping = {
  films: [
    "https://starwars-visualguide.com/assets/img/films/1.jpg",
    "https://starwars-visualguide.com/assets/img/films/2.jpg",
    "https://starwars-visualguide.com/assets/img/films/3.jpg",
    "https://starwars-visualguide.com/assets/img/films/4.jpg",
    "https://starwars-visualguide.com/assets/img/films/5.jpg",
    "https://starwars-visualguide.com/assets/img/films/6.jpg",
  ],

  people: [
    "https://starwars-visualguide.com/assets/img/characters/1.jpg",
    "https://starwars-visualguide.com/assets/img/characters/2.jpg",
    "https://starwars-visualguide.com/assets/img/characters/3.jpg",
    "https://starwars-visualguide.com/assets/img/characters/4.jpg",
    "https://starwars-visualguide.com/assets/img/characters/5.jpg",
    "https://starwars-visualguide.com/assets/img/characters/6.jpg",
    "https://starwars-visualguide.com/assets/img/characters/7.jpg",
    "https://starwars-visualguide.com/assets/img/characters/8.jpg",
    "https://starwars-visualguide.com/assets/img/characters/9.jpg",
    "https://starwars-visualguide.com/assets/img/characters/10.jpg",
  ],

  planets: [
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/planets/2.jpg",
    "https://starwars-visualguide.com/assets/img/planets/3.jpg",
    "https://starwars-visualguide.com/assets/img/planets/4.jpg",
    "https://starwars-visualguide.com/assets/img/planets/5.jpg",
    "https://starwars-visualguide.com/assets/img/planets/6.jpg",
    "https://starwars-visualguide.com/assets/img/planets/7.jpg",
    "https://starwars-visualguide.com/assets/img/planets/8.jpg",
    "https://starwars-visualguide.com/assets/img/planets/9.jpg",
    "https://starwars-visualguide.com/assets/img/planets/10.jpg",
  ],

  species: [
    "https://starwars-visualguide.com/assets/img/species/1.jpg",
    "https://starwars-visualguide.com/assets/img/species/2.jpg",
    "https://starwars-visualguide.com/assets/img/species/3.jpg",
    "https://starwars-visualguide.com/assets/img/species/4.jpg",
    "https://starwars-visualguide.com/assets/img/species/5.jpg",
    "https://starwars-visualguide.com/assets/img/species/6.jpg",
    "https://starwars-visualguide.com/assets/img/species/7.jpg",
    "https://starwars-visualguide.com/assets/img/species/8.jpg",
    "https://starwars-visualguide.com/assets/img/species/9.jpg",
    "https://starwars-visualguide.com/assets/img/species/10.jpg",
  ],

  starships: [
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
  ],

  vehicles: [
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/vehicles/4.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/vehicles/6.jpg",
    "https://starwars-visualguide.com/assets/img/vehicles/7.jpg",
    "https://starwars-visualguide.com/assets/img/vehicles/8.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
    "https://starwars-visualguide.com/assets/img/placeholder.jpg",
  ],
};

const DataBankItem = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${key}`);
        const data = await res.json();

        const dataList = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.result)
          ? data.result
          : [];

        const mergedData = dataList.map((item, idx) => ({
          ...item,
          name: item?.properties?.title || item?.name || `Unnamed ${key}`,
          image: imageMapping[key] ? imageMapping[key][idx] : null,
        }));

        setItemData(mergedData);
      } catch (err) {
        console.error("Error fetching item data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return (
    <div
      className="bg-black"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <InnerNavbar pageName={key || "Loading"} />

        {loading ? (
          <div className="loading" style={{ marginTop: "150px" }}>
            <p className="fs-3 text-white text-center">Loading...</p>
          </div>
        ) : (
          <div style={{ marginTop: "100px" }} className="row g-3">
            {itemData.map((item, idx) => (
              <div
                key={item?.uid || idx}
                className="col-md-3 px-4"
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/databank/${key}/${item?.uid}`, {
                    state: { image: item?.image },
                  })
                }
              >
                <img
                  src={
                    item?.image ||
                    "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                  }
                  alt={item?.name || "Unknown"}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
                <p className="text-center text-white fs-5">
                  {item?.name || "No Name Available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataBankItem;
