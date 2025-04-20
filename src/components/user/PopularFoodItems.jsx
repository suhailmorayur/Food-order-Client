import React, { useState, useRef } from "react";
import useFetchData from "../../hooks/useFetchData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../ProductCard";

function FoodItems() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null); // 👈 reference for scrolling

  const [products, loading, error] = useFetchData({
    method: "get",
    url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems`,
    transform: (data) => data.foodItems,
  });

  const handleToggle = () => {
    if (showAll) {
      // Scroll to top when collapsing
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  const visibleProducts = showAll ? products : products?.slice(0, 4);

  return (
    <div ref={containerRef} className="p-4">
      <h2 className="text-4xl text-center font-semibold mb-4 text-amber-600">Popular Food Items</h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={250} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 space-y-2">
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-100 px-2 py-1 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && products && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length > 3 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleToggle}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
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

export default FoodItems;
