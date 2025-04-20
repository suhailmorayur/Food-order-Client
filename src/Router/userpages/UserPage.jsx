import React from 'react';
import { Outlet } from "react-router";
import UserNavbar from '../../components/user/UserNavbar';

function UserPage(props) {
    return (
        <>
        <header className='sticky top-0 z-50'>
            <UserNavbar/>
        </header>
        <Outlet/>
        <footer></footer>
        </>
    );
}

export default UserPage;