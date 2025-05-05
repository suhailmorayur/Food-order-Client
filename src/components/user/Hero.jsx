import React from 'react';
import { useNavigate } from 'react-router';
function Hero(props) {
    const navigate = useNavigate();
    const handilestart  = () =>{
navigate ('/user/dashboard/menu')
   }
    return (
        <div>
                      <div className="hidden lg:block">
          <div
  className="grid lg:grid-cols-2 grid-cols-1 items-center px-10 gap-6 rounded-md bg-cover bg-center "


>       
            
            <div className="flex flex-col items-center lg:items-start gap-5">

            <h1 className="lg:text-7xl text-3xl font-bold">
  <span className="text-black ">Feast Your Senses,</span><br />
  <span className="text-orange-500">Fast and Fresh</span>
</h1>
<p className="font-medium lg:text-xl">Our job is to filling your tummy with delicious food and  with fast and free delivery</p>
<div>
<button onClick={handilestart} className="bg-orange-500 text-white py-3 px-5 hover:bg-orange-300 rounded-lg ">Get Start</button>

</div>
            </div>

            <div className=" hidden lg:block ">
            
            <img className="" src="/Component 1.png" alt="" />

            </div>
           
        </div>
          </div>


{/* mobile */}

<div
  className="grid lg:grid-cols-2 grid-cols-1 items-center px-10 gap-6 rounded-md bg-center 
             bg-no-repeat h-80 bg-cover lg:hidden"
  style={{
    backgroundImage: 'url("/bg_2.jpg")',
  
  }}
>
  <div className="flex flex-col items-center lg:items-start gap-5">
    <h1 className="lg:text-7xl text-3xl font-bold">
      <span className="text-white">Feast Your Senses,</span><br />
      <span className="text-orange-500">Fast and Fresh</span>
    </h1>
    <p className="font-medium text-white lg:text-xl">
      Our job is to filling your tummy with delicious food and with fast and free delivery
    </p>
    <div>
      <button className="bg-orange-500 text-white py-3 px-5 hover:bg-orange-300 rounded-lg">
        Get Start
      </button>
    </div>
  </div>

  <div className="hidden lg:block">
    <img className="" src="/Component 1.png" alt="" />
  </div>
</div>
        </div>
    );
}

export default Hero;