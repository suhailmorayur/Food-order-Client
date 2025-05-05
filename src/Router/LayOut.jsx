import React from 'react';
import { Outlet } from "react-router";
import NavBar from '../components/NavBar.jsx';

function LayOut(props) {
    return (
       <>
       <header>
<NavBar/>
       </header>
       <Outlet />
       <footer></footer>
       </>
    );
}

export default LayOut;