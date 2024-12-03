import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import InnerNavbar from "../component/innerNavbar";

const ItemDetails = () => {
  const { key, id } = useParams();
  const location = useLocation();
  const { store, actions } = useContext(Context);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = store.favorites.some(
    (fav) => fav.id === id && fav.key === key
  );

  const [favoriteState, setFavoriteState] = useState(isFavorite);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${key}/${id}`);
        const data = await response.json();
        setItemDetails(data.result.properties || data.result);
      } catch (err) {
        console.error("Error fetching item details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [key, id]);

  const imageSrc =
    location.state?.image ||
    "https://starwars-visualguide.com/assets/img/placeholder.jpg";

  const handleToggleFavorite = () => {
    const itemToToggle = {
      id,
      key,
      name: itemDetails?.title || itemDetails?.name,
      image: imageSrc,
      details: itemDetails,
    };

    if (favoriteState) {
      actions.removeFromFavorites(id);
    } else {
      actions.addToFavorites(itemToToggle);
    }

    setFavoriteState(!favoriteState); // Toggle the state
  };

  if (loading) {
    return (
      <div
        className="bg-black d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <p className="fs-3 text-white">Loading...</p>
      </div>
    );
  }

  if (!itemDetails) {
    return (
      <div
        className="bg-black d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <p className="fs-3 text-white">No details available.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div className="container">
        <InnerNavbar pageName={itemDetails?.name} />

        <div
          className="row"
          style={{
            background: "#FEEE01",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            marginBottom: "20px",
            padding: "20px",
            marginTop: "100px",
          }}
        >
          <div className="col-md-4">
            <img
              src={imageSrc}
              alt={itemDetails.name || "Item Image"}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="col-md-8">
            <h1 className="mb-4 text-black">
              Name: {itemDetails.title || itemDetails.name}
            </h1>
            <h4 className="fs-4 text-black fw-bold mb-2">Details</h4>
            <ul className="list-unstyled text-black">
              {Object.entries(itemDetails).map(([key, value], idx) => (
                <li key={idx} className="mb-2">
                  <strong className="text-capitalize">
                    {key.replace("_", " ")}:
                  </strong>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end">
          <button
            className="btn btn-warning"
            style={{ background: "#FEEE01", borderColor: "#FEEE01" }}
            onClick={handleToggleFavorite}
          >
            {favoriteState ? "Remove From Favorites" : "Add To Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;