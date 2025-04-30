import React from "react";
import FoodItems from "../../components/user/PopularFoodItems";
import PopularRestaurants from "../../components/user/PopularRestaurants";
import OffersSection from "../../components/user/OffersSection";
import AboutUs from "../../components/user/AboutUs";
import HowItWorks from "../../components/user/HowItworks";
import WhyChooseUs from "../../components/user/WhyChooseUs ";
import CallToAction from "../../components/user/CallToAction";
import FoodBackgroundCTA from "../../components/user/FoodBackgroundCTA";
import Footer from "../../components/user/Footer";
import BackToTopButton from "../../components/user/BackToTopButton";

function UserHome() {
  const handleScrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section>
          <div
            className="grid lg:grid-cols-2 grid-cols-1 items-center px-10 gap-6 rounded-md bg-cover bg-center"
            style={{
              backgroundImage: "url('/bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="flex justify-center lg:justify-start">
              <img className="w-full max-w-xs" src="/Hero2.png" alt="Food and Restaurant" />
            </div>

            <div>
              <p className="font-extralight text-white">Order Restaurant food, takeaway and groceries.</p>

              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                <span className="text-black">Feast Your Senses,</span><br />
                <span className="text-orange-500">Fast and Fresh</span>
              </h1>

              {/* Buttons for Foods and Restaurants */}
              <div className="mt-6 space-x-4 flex justify-center lg:justify-start">
                <button
                  onClick={() => handleScrollToSection("food-section")}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition-all duration-300"
                >
                  Browse Foods
                </button>
                <button
                  onClick={() => handleScrollToSection("restaurant-section")}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition-all duration-300"
                >
                  Browse Restaurants
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us-section">
          <AboutUs />
        </section>

        {/* Food Items Section */}
        <section id="food-section">
          <FoodItems />
        </section>

        {/* Popular Restaurants Section */}
        <section id="restaurant-section">
          <PopularRestaurants />
        </section>

        <section>
          <OffersSection />
        </section>

        <section>
          <HowItWorks />
        </section>

        <section>
          <WhyChooseUs />
        </section>

        <section>
          <CallToAction />
        </section>

        <section>
          <FoodBackgroundCTA />
        </section>

     
      </main>
    </>
  );
}

export default UserHome;
