const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		favorites: JSON.parse(localStorage.getItem("favorites")) || [],
	  },
	  actions: {
		// Action to add an item to favorites
		addToFavorites: (item) => {
		  const store = getStore();
		  const alreadyExists = store.favorites.some(
			(fav) => fav.id === item.id && fav.key === item.key
		  );
  
		  if (!alreadyExists) {
			const updatedFavorites = [
			  ...store.favorites,
			  {
				...item,
				url: `/databank/${item.key}/${item.id}`,
			  },
			];
			setStore({ favorites: updatedFavorites });
  
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			alert("Item has been added to Favorites!");
		  }
		},
  
		removeFromFavorites: (id) => {
		  const store = getStore();
		  const updatedFavorites = store.favorites.filter(
			(item) => item.id !== id
		  );
  
		  setStore({ favorites: updatedFavorites });
  
		  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		  alert("Item has been removed to Favorites!");
		},
  
		// Action to clear all favorites
		clearFavorites: () => {
		  setStore({ favorites: [] });
		  localStorage.removeItem("favorites");
		},
	  },
	};
  };
  
  export default getState;
  