// import React, { useState } from "react";
// import useFetchData from "../../hooks/useFetchData";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import ProductCard from "../../components/ProductCard";

// function MenuPage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [products, loading, error] = useFetchData({
//     method: "get",
//     url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems`,
//     transform: (data) => data.foodItems,
//   });

//   const filteredProducts = products?.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h2 className="text-4xl text-center font-semibold mb-6 text-amber-600">
//         Browse Menu
//       </h2>

//       {/* Search Input */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search food items..."
//           className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//       </div>

//       {/* Loading Skeleton */}
//       {loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {[...Array(6)].map((_, i) => (
//             <Skeleton key={i} height={250} />
//           ))}
//         </div>
//       )}

//       {/* Error Handling */}
//       {error && (
//         <div className="text-red-500 space-y-2 text-center">
//           <p>Something went wrong. Please try again.</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-100 px-3 py-1 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Products Grid */}
//       {!loading && filteredProducts && (
//         <>
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 mt-8">No items found.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default MenuPage;

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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl text-center font-semibold mb-8 text-amber-600">
        Browse Menu
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search food items..."
            className="w-full px-6 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={250} borderRadius="12px" />
          ))}
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="text-red-500 text-center space-y-4">
          <p>Oops! Something went wrong. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-100 text-red-500 px-6 py-2 rounded-lg shadow-md hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
