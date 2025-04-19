import React from 'react';
import { Outlet } from "react-router";
import Navbar from '../components/Navbar';

function LayOut(props) {
    return (
       <>
       <header>
<Navbar/>
       </header>
       <Outlet />
       <footer></footer>
       </>
    );
}

export default LayOut;