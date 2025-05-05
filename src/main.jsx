import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter , Routes,Route} from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import LayOut from './Router/LayOut.jsx';
import Home from './Router/Home.jsx';
import LoginPage from './Router/LoginPage.jsx';
import SignupPage from './Router/SignupPage.jsx';
import UserPage from './Router/userpages/UserPage.jsx';
import UserHome from './Router/userpages/UserHome.jsx';
import MenuPage from './Router/userpages/MenuPage.jsx';
import AddProduct from './Router/adminPages/AddProduct.jsx';
import AdminHome from './Router/adminPages/AdminHome.jsx';
import AdminPage from './Router/adminPages/AdminPage.jsx';
import FoodList from './Router/adminPages/FoodList.jsx';
import EditProduct from './Router/adminPages/EditProduct.jsx';
import AddRestaurant from './Router/adminPages/AddRestauarant.jsx';
import RestaurantList from './Router/adminPages/RestaurantList.jsx';
import EditRestaurant from './Router/adminPages/EditRestaurant.jsx';
import RestaurantFoods from './Router/adminPages/RestaurantFoods.jsx';
import ManageRestaurants from './Router/adminPages/ManageRestaurantsPage.jsx';
import ManageFoodItems from './Router/adminPages/ManageFoodItems.jsx';
import ViewUsers from './Router/adminPages/ViewUsers.jsx';
import InviteCodePage from './Router/adminPages/InviteCodePage.jsx';
import ManageCoupons from './Router/adminPages/ManageCoupons.jsx';
import Restaurants from './Router/userpages/Restaurants.jsx';
import FoodDetails from './Router/userpages/FoodDetails.jsx';
import CartPage from './Router/userpages/CartPage.jsx';
import ProfilePage from './Router/userpages/ProfilePage.jsx'
import Orders from './Router/userpages/Orders.jsx';
import ManageOrders from './Router/adminPages/ManageOrders.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ContactPage from './Router/userpages/ContactPage.jsx';
import ManageContacts from './Router/adminPages/ManageContacts.jsx';
import CouponPage from './Router/userpages/CouponPage.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

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
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="coupons" element={<CouponPage />} />

        <Route path="food/:id" element={<FoodDetails />} />

      </Route>

      <Route />
<Route  path="/admin/dashboard" element={<AdminPage />}>
<Route index element={<AdminHome/>} />
<Route path='manage-restaurants' element={<ManageRestaurants/>}/>
<Route path='manage-fooditems' element={<ManageFoodItems/>}/>
<Route path='orders' element={<ManageOrders/>}/>
<Route path='manage-contact-messages' element={<ManageContacts/>}/>

<Route path="add-restaurant" element={<AddRestaurant />} />

<Route path='addfoods' element={<AddProduct/>}/>
<Route path='footlist' element={<FoodList/>}/>
<Route path='view-users' element={<ViewUsers/>}/>
<Route path='invite-cods' element={<InviteCodePage/>}/>
<Route path='coupon-cods' element={<ManageCoupons/>}/>

  <Route path="edit-food/:id" element={<EditProduct />} />
  <Route path="restaurant-list" element={<RestaurantList />} />
  <Route path="edit-restaurant/:id" element={<EditRestaurant />} />
  <Route path="restaurants/:id/foods" element={<RestaurantFoods />} />

</Route>
    </Routes>
  </BrowserRouter>
</StrictMode>
</Provider>

)
