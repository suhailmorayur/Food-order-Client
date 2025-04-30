// import React, { useState } from "react";
// import useFetchData from "../../hooks/useFetchData";
// import { motion, AnimatePresence } from "framer-motion";
// import Skeleton from "react-loading-skeleton";
// import { useNavigate } from "react-router";
// import "react-loading-skeleton/dist/skeleton.css";

// function Restaurants() {
//   const [search, setSearch] = useState("");
//   const [openRestaurant, setOpenRestaurant] = useState(null);

//   const [restaurants, loading, error] = useFetchData({
//     method: "get",
//     url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants`,
//     transform: (data) => data.restaurants,
//   });

//   const handleToggleFoods = (id) => {
//     setOpenRestaurant((prev) => (prev === id ? null : id));
//   };

//   const filtered = restaurants?.filter((r) =>
//     r.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-4xl text-center font-semibold text-amber-600 mb-6">
//         Restaurants
//       </h2>

//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search restaurants..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full sm:w-1/2 px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//       </div>

//       {loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {[...Array(6)].map((_, i) => (
//             <Skeleton key={i} height={250} />
//           ))}
//         </div>
//       )}

//       {!loading && filtered?.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filtered.map((restaurant) => (
//             <div
//               key={restaurant._id}
//               className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
//             >
//               <img
//                 src={restaurant.image || "/default-restaurant.jpg"}
//                 alt={restaurant.name}
//                 className="h-40 w-full object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {restaurant.name}
//                 </h3>
//                 <p className="text-gray-500 mb-4">{restaurant.location}</p>

//                 <button
//                   onClick={() => handleToggleFoods(restaurant._id)}
//                   className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
//                 >
//                   {openRestaurant === restaurant._id ? "Hide Foods" : "View Foods"}
//                 </button>
//               </div>

//               <AnimatePresence>
//                 {openRestaurant === restaurant._id && (
//                   <motion.div
//                     className="p-4 border-t bg-gray-50"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <RestaurantFoods restaurantId={restaurant._id} />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       )}

//       {!loading && filtered?.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">No restaurants found.</p>
//       )}
//     </div>
//   );
// }

// function RestaurantFoods({ restaurantId }) {
//   const [foods, loading, error] = useFetchData({
//     method: "get",
//     url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/restaurant/${restaurantId}`,
//     transform: (data) => data.foodItems,
//   });

//   const navigate = useNavigate();

//   if (loading) return <p>Loading food items...</p>;
//   if (error) return <p className="text-red-500">Failed to load food items.</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
//       {foods.map((food) => (
//         <div
//           key={food._id}
//           className="p-3 border rounded shadow bg-white flex flex-col sm:flex-row gap-4"
//         >
//           <img
//             src={food.image || "/default-food.jpg"}
//             alt={food.name}
//             className="w-full sm:w-24 h-24 object-cover rounded"
//           />
//           <div className="flex-1">
//             <h4 className="text-md font-bold">{food.name}</h4>
//             <p className="text-sm text-gray-600">{food.description}</p>
//             <p className="text-orange-600 font-semibold mt-1">₹{food.price}</p>
//             <button
//               onClick={() => navigate(`/user/dashboard/food/${food._id}`)}
//               className="mt-2 bg-blue-800 hover:bg-black text-white px-3 py-1 rounded text-sm"
//             >
//               View Food
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Restaurants;

import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import "react-loading-skeleton/dist/skeleton.css";

function Restaurants() {
  const [search, setSearch] = useState("");
  const [openRestaurant, setOpenRestaurant] = useState(null);

  const [restaurants, loading, error] = useFetchData({
    method: "get",
    url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/restaurants`,
    transform: (data) => data.restaurants,
  });

  const handleToggleFoods = (id) => {
    setOpenRestaurant((prev) => (prev === id ? null : id));
  };

  const filtered = restaurants?.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl text-center font-semibold text-amber-600 mb-6">
        Restaurants
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-6 py-3 border border-amber-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
        />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={250} borderRadius={12} />
          ))}
        </div>
      )}

      {!loading && filtered?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((restaurant) => (
            <motion.div
              key={restaurant._id}
              className="border border-amber-400 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={restaurant.image || "/default-restaurant.jpg"}
                alt={restaurant.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-2xl font-bold text-gray-800">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">{restaurant.location}</p>
                <button
                  onClick={() => handleToggleFoods(restaurant._id)}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
                >
                  {openRestaurant === restaurant._id ? "Hide Foods" : "View Foods"}
                </button>
              </div>

              <AnimatePresence>
                {openRestaurant === restaurant._id && (
                  <motion.div
                    className="p-4 border-t bg-gray-50"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <RestaurantFoods restaurantId={restaurant._id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filtered?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No restaurants found.</p>
      )}
    </div>
  );
}

function RestaurantFoods({ restaurantId }) {
  const [foods, loading, error] = useFetchData({
    method: "get",
    url: `${import.meta.env.VITE_REACT_APP_API_URL}/api/fooditems/restaurant/${restaurantId}`,
    transform: (data) => data.foodItems,
  });

  const navigate = useNavigate();

  if (loading) return <p>Loading food items...</p>;
  if (error) return <p className="text-red-500">Failed to load food items.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
      {foods.map((food) => (
        <div
          key={food._id}
          className="p-4 border rounded-xl shadow-md bg-white flex flex-col sm:flex-row gap-4 hover:shadow-xl transition-all duration-300"
        >
          <img
            src={food.image || "/default-food.jpg"}
            alt={food.name}
            className="w-full sm:w-32 h-32 object-cover rounded-xl"
          />
          <div className="flex-1">
            <h4 className="text-lg font-bold">{food.name}</h4>
            <p className="text-sm text-gray-600">{food.description}</p>
            <p className="text-orange-600 font-semibold mt-2">₹{food.price}</p>
            <button
              onClick={() => navigate(`/user/dashboard/food/${food._id}`)}
              className="mt-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm"
            >
              View Food
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;
