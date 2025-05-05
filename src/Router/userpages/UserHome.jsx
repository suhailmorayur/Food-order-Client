import React from "react";
import FoodItems from "../../components/user/PopularFoodItems";
import PopularRestaurants from "../../components/user/PopularRestaurants";
import OffersSection from "../../components/user/OffersSection";
import AboutUs from "../../components/user/AboutUs";
import HowItWorks from "../../components/user/HowItworks";
import WhyChooseUs from "../../components/user/WhyChooseUs ";
import FoodBackgroundCTA from "../../components/user/FoodBackgroundCTA";
import Hero from "../../components/user/Hero";


function UserHome() {

  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>

           <Hero/>

        </section>

<section>
  <AboutUs/>
</section>

        <section>
            <FoodItems/>
        </section>

<section>
    <PopularRestaurants/>
</section>
<section>

    <OffersSection/>
</section>

<section>
  <HowItWorks/>
</section>
<section>
  <WhyChooseUs/>
</section>
<section>
  <FoodBackgroundCTA/>
</section>

    </main>
    </>
  );
}

export default UserHome;
