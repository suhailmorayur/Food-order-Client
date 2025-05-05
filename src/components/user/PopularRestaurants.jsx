import React, { useState, useRef } from "react";
import useFetchData from "../../hooks/useFetchData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RestaurantCard from "./RestaurantCard.jsx";

function PopularRestaurants() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);

  const [products, loading, error] = useFetchData({
    method: "get",
    url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants`,
    transform: (data) => data.restaurants,
  });

  const handleToggle = () => {
    if (showAll && containerRef.current && window.scrollY > 400) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  const visibleProducts = showAll ? products : products?.slice(0, 4);

  return (
    <div ref={containerRef} className="p-4">
      <h2 className="text-4xl text-center font-semibold mb-4 text-amber-600">
        Popular Restaurants
      </h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={250} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 space-y-2 text-center">
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-100 px-3 py-2 rounded text-red-700 hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && products?.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No restaurants found.
        </p>
      )}

      {!loading && products && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="transform transition duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg rounded-lg"
              >
                <RestaurantCard product={product} />
              </div>
            ))}
          </div>

          {products.length > 4 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleToggle}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PopularRestaurants;
