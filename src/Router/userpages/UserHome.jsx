import React from "react";
import FoodItems from "../../components/user/PopularFoodItems";
import PopularRestaurants from "../../components/user/PopularRestaurants";
import OffersSection from "../../components/user/OffersSection";

function UserHome() {

  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>
<div
  className="grid lg:grid-cols-2 grid-cols-1 items-center px-10 gap-6 rounded-md bg-cover bg-center"
  style={{
    backgroundImage: "url('/bg.png')", // Make sure this image exists in your public folder
  }}
>            
        <div className="flex ">
            
            <img className="" src="/Hero2.png" alt="" />

            </div>
            
            <div>
            <p className="font-extralight">Order Restaurant food,  takeaway and groceries.</p>

            <h1 className="text-5xl font-bold">
  <span className="text-black">Feast Your Senses,</span><br />
  <span className="text-orange-500">Fast and Fresh</span>
</h1>
            </div>
           
        </div>
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
    </main>
    </>
  );
}

export default UserHome;
