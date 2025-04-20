import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Outlet } from 'react-router';

function AdminPage(props) {
    return (
        
        <>
        <header>
            <AdminNavbar/>
        </header>
        <Outlet/>
        </>
    );
}

export default AdminPage;