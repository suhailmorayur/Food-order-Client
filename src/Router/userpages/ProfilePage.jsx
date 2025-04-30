// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const ProfilePage = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch user data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/profile`,{withCredentials:true});
//         const userData = res.data.data;
//         setUser({
//           ...userData,
//           address: {
//             street: userData?.address?.street || "",
//             city: userData?.address?.city || "",
//             state: userData?.address?.state || "",
//             postalCode: userData?.address?.postalCode || "",
//             country: userData?.address?.country || "",
//           },
//         });
//       } catch (err) {
//         toast.error("Failed to fetch profile");
//       }
//     };

//     fetchProfile();
//   }, []);

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/update-user`, user ,{withCredentials:true});
//       toast.success("Profile updated successfully");
//     } catch (err) {
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ JSX
//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">👤 Edit Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="block font-medium">Name</label>
//           <input
//             type="text"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             className="w-full border p-2 rounded-md"
//             required
//           />
//         </div>

//         {/* Email (read only) */}
//         <div>
//           <label className="block font-medium">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             disabled
//             className="w-full border p-2 rounded-md bg-gray-100"
//           />
//         </div>

//         {/* Mobile */}
//         <div>
//           <label className="block font-medium">Mobile</label>
//           <input
//             type="text"
//             value={user.mobile}
//             onChange={(e) => setUser({ ...user, mobile: e.target.value })}
//             className="w-full border p-2 rounded-md"
//           />
//         </div>

//         {/* Address */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Street</label>
//             <input
//               type="text"
//               value={user.address.street}
//               onChange={(e) =>
//                 setUser({ ...user, address: { ...user.address, street: e.target.value } })
//               }
//               className="w-full border p-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">City</label>
//             <input
//               type="text"
//               value={user.address.city}
//               onChange={(e) =>
//                 setUser({ ...user, address: { ...user.address, city: e.target.value } })
//               }
//               className="w-full border p-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">State</label>
//             <input
//               type="text"
//               value={user.address.state}
//               onChange={(e) =>
//                 setUser({ ...user, address: { ...user.address, state: e.target.value } })
//               }
//               className="w-full border p-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Postal Code</label>
//             <input
//               type="text"
//               value={user.address.postalCode}
//               onChange={(e) =>
//                 setUser({ ...user, address: { ...user.address, postalCode: e.target.value } })
//               }
//               className="w-full border p-2 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Country</label>
//             <input
//               type="text"
//               value={user.address.country}
//               onChange={(e) =>
//                 setUser({ ...user, address: { ...user.address, country: e.target.value } })
//               }
//               className="w-full border p-2 rounded-md"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           {loading ? "Saving..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Importing the CSS

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/profile`, { withCredentials: true });
        const userData = res.data.data;
        setUser({
          ...userData,
          address: {
            street: userData?.address?.street || "",
            city: userData?.address?.city || "",
            state: userData?.address?.state || "",
            postalCode: userData?.address?.postalCode || "",
            country: userData?.address?.country || "",
          },
        });
      } catch (err) {
        toast.error("Failed to fetch profile"); // Using React Toastify
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/update-user`, user, { withCredentials: true });
      toast.success("Profile updated successfully"); // Using React Toastify
    } catch (err) {
      toast.error("Failed to update profile"); // Using React Toastify
    } finally {
      setLoading(false);
    }
  };

  // ✅ JSX
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">👤 Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Email (read only) */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium">Mobile</label>
          <input
            type="text"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Street</label>
            <input
              type="text"
              value={user.address.street}
              onChange={(e) =>
                setUser({ ...user, address: { ...user.address, street: e.target.value } })
              }
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              value={user.address.city}
              onChange={(e) =>
                setUser({ ...user, address: { ...user.address, city: e.target.value } })
              }
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              value={user.address.state}
              onChange={(e) =>
                setUser({ ...user, address: { ...user.address, state: e.target.value } })
              }
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Postal Code</label>
            <input
              type="text"
              value={user.address.postalCode}
              onChange={(e) =>
                setUser({ ...user, address: { ...user.address, postalCode: e.target.value } })
              }
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Country</label>
            <input
              type="text"
              value={user.address.country}
              onChange={(e) =>
                setUser({ ...user, address: { ...user.address, country: e.target.value } })
              }
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
