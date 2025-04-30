import React from 'react';
import { Outlet } from "react-router";
import UserNavbar from '../../components/user/UserNavbar';
import Footer from '../../components/user/Footer';
import BackToTopButton from '../../components/user/BackToTopButton';

function UserPage(props) {
    return (
        <>
        <header className='sticky top-0 z-50'>
            <UserNavbar/>
        </header>
        <Outlet/>
        <footer>
            <Footer/>
        </footer>
        <BackToTopButton/>
        </>
    );
}

export default UserPage;