import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter , Routes,Route} from "react-router";

import App from './App.jsx'
import LayOut from './Router/LayOut.jsx';
import Home from './Router/Home.jsx';
import LoginPage from './Router/LoginPage.jsx';
import SignupPage from './Router/SignupPage.jsx';
import UserPage from './Router/userpages/UserPage.jsx';
import AdminNavbar from './components/admin/AdminNavbar.jsx';
import UserHome from './Router/userpages/UserHome.jsx';
import MenuPage from './Router/userpages/MenuPage.jsx';
import AddProduct from './Router/adminPages/AddProduct.jsx';
import AdminHome from './Router/adminPages/AdminHome.jsx';
import AdminPage from './Router/adminPages/AdminPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      <Route path="/user/dashboard" element={<UserPage />}>
        <Route index element={<UserHome />} />
        <Route path='menu' element={<MenuPage/>} />

      </Route>

      <Route />
<Route  path="/admin/dashboard" element={<AdminPage />}>
<Route path='addfoods' element={<AddProduct/>}/>

</Route>
    </Routes>
  </BrowserRouter>
</StrictMode>

)
