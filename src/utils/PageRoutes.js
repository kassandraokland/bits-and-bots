import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import ProductPage from "../components/products/ProductPage";
import CartPage from "../components/cart/CartPage";
import CheckoutPage from "../components/cart/CheckoutPage";
import DetailsPage from "../components/products/DetailsPage";
import NavLayout from "../components/layout/Nav";


export default function MyRoutes () {

    return (
        <Router>
            <NavLayout/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="products/:id" element={<DetailsPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="cart/checkout" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
}

//                 <Route path="user/name" element={<MyProfilePage />} />
//                 <Route path="users" element={<ProfilesListPage />} />

//                <Route path="users" element={<ProfilesPage />} />
//<Route path="users/:name" element={<SpecificProfilePage />} />