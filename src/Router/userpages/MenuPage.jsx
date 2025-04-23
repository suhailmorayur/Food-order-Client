import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../../components/ProductCard";

function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [products, loading, error] = useFetchData({
    method: "get",
    url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems`,
    transform: (data) => data.foodItems,
  });

  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-4xl text-center font-semibold mb-6 text-amber-600">
        Browse Menu
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search food items..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={250} />
          ))}
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="text-red-500 space-y-2 text-center">
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-100 px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">No items found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default MenuPage;
