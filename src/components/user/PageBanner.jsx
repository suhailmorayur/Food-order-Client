import { useLocation } from "react-router"; // ✅ Correct import
import { motion, useScroll, useTransform } from "framer-motion";

const banners = {
  "/user/dashboard/menu": {
    title: "Browse Menu",
    subtitle: "Discover delicious meals",
  },
  "/user/dashboard/restaurants": {
    title: "Restaurants",
    subtitle: "Find your favorite place to eat",
  },
  "/user/dashboard/coupons": {
    title: "Coupons & Deals",
    subtitle: "Save big with exclusive offers",
  },
  "/user/dashboard/profile": {
    title: "Your Profile",
    subtitle: "Manage your account and settings",
  },
  "/user/dashboard/orders": {
    title: "Your Orders",
    subtitle: "Track your orders and history",
  },
  "/user/dashboard/contact": {
    title: "Contact Us",
    subtitle: "We’re here to help",
  },
  "/user/dashboard/cart": {
    title: "Your Cart",
    subtitle: "Manage your cart items",
  },
};

const defaultImage = "/bg5.jpg"; 

export default function PageBanner() {
  const location = useLocation();
  const { pathname } = location;

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  if (pathname === "/user/dashboard") return null;

  const bannerData = banners[pathname] || {};
  const {
    title = "Welcome",
    subtitle = "",
  } = bannerData;

  return (
    <motion.div
      style={{ opacity }}
      className="relative w-full h-64 md:h-72 lg:h-95"
    >
      <img
        src={defaultImage}
        alt={title}
        className="w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center pt-40 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg md:text-xl">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
