import React from 'react';

function Home(props) {
    return (
   
    <section className="relative h-screen overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/90 via-[#f7c548]/90 to-[#f7c548]/90" />
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food collage"
        className="object-cover w-full h-full mix-blend-multiply"
      />
    </div>

   

    {/* Main Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl font-poppins drop-shadow-lg">
        Savor the Flavor,
        <br />
        Delivered to Your Doorstep
      </h1>
      
      <p className="mb-8 text-xl text-yellow-100 md:text-2xl font-nunito max-w-2xl">
        Discover 1000+ restaurants delivering comfort to your nest
      </p>

      <button className="px-8 py-4 mb-8 text-lg font-medium text-white transition-all duration-300 bg-orange-500 rounded-full font-montserrat hover:bg-orange-600 hover:scale-105">
        Order Now →
      </button>

      {/* Features Grid */}
      <div className="grid gap-6 mt-8 md:grid-cols-3">
        {[
          { icon: '⚡', text: 'Instant order tracking' },
          { icon: '👨🍳', text: 'Top-rated local restaurants' },
          { icon: '🛡️', text: 'Secure payment' },
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <span className="text-2xl">{feature.icon}</span>
            <span className="text-yellow-50 font-nunito">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute bottom-0 right-0 z-10 hidden w-1/3 md:block">
      <img
        src="/delivery-bike.png" // Replace with your asset
        alt="Delivery"
        className="animate-float"
      />
    </div>
  </section>
    );
}

export default Home;