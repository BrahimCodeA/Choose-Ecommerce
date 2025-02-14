import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "@/pages/Home/Home";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Cart from "@/pages/Cart/Cart";
import Men from "@/pages/Men/Men";
import Women from "@/pages/Women/Women";
import Kid from "@/pages/Kid/Kid";
import ScrollUp from "@/components/ScrollUp/ScrollUp";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Add from "@/pages/admin/AddProduct/AddProduct";
import List from "@/pages/admin/ListProduct/ListProduct";
import AdminLayout from "@/pages/admin/AdminLayout/AdminLayout";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import Cookie from "./components/Cookie/Cookie";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="app-container">
      <ToastContainer />
      <Cookie />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/kid" element={<Kid />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/*"
          element={
            user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <>
                <Header />
                <NotFound />
                <Footer />
              </>
            )
          }
        >
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
        </Route>
      </Routes>

      <ScrollUp />
    </div>
  );
}

export default App;
