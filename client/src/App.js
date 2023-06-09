import { Route, Routes } from "react-router-dom";
import Header from "./components/nav/Header";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import RegisterComplete from "./Pages/auth/RegisterComplete";
import { useDispatch, useSelector } from "react-redux"; // useDispatch hooks
import { useEffect } from "react";
import authh from "./firebase";
import Logout from "./Pages/auth/Logout";
import { currentUser } from "./function/auth";
import History from "./Pages/user/History";
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import CategoryCreate from "./Pages/admin/category/CategoryCreate";
import CategoryUpdate from "./Pages/admin/category/CategoryUpdate";
import SubCreate from "./Pages/admin/sub/SubCreate";
import SubUpdate from "./Pages/admin/sub/SubUpdate"
import ProductCreate from "./Pages/admin/product/ProductCreate";
import LoadingToRedirect from "./components/routes/LoadingToRedirect";
import AllProducts from "./Pages/admin/product/AllProducts";
import ProductUpdate from "./Pages/admin/product/ProductUpdate";
import Product from "./Pages/Product";
import CategoryHome from "./Pages/category/CategoryHome";
import SubHome from "./Pages/sub/SubHome";
import Shop from "./Pages/Shop";


function App() {
  const dispatch = useDispatch();
  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = authh.onAuthStateChanged(async (user) => {
      // const email = sessionStorage.setItem("email", user.email);
      if (user) {
        // Token generated by firebase
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user App.js", user);

        // dispatch({
        //   type: "LOGGD_IN_USER",
        //   payload: {
        //     email: user.email,
        //   },
        // });

        await currentUser(idTokenResult.token)
          .then((res) => {
            console.log("Current User", res);
            // dispatch is used to display data in redux

            dispatch({
              type: "LOGGD_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log("error of token: ", err));
      }
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registe/complete" element={<RegisterComplete />} />

        {/* User Routes */}
        <Route path="/user/history" element={ <UserRoutes> <History /> </UserRoutes> } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={ <AdminRoutes> <AdminDashboard /> </AdminRoutes> } />
        <Route path="/admin/category" element={ <AdminRoutes> <CategoryCreate/> </AdminRoutes> } />
        <Route path="/admin/category/:slug" element={ <AdminRoutes> <CategoryUpdate/> </AdminRoutes> } />
        <Route path="/admin/sub" element={ <AdminRoutes> <SubCreate/> </AdminRoutes> } />
        <Route path="/admin/sub/:slug" element={ <AdminRoutes> <SubUpdate/> </AdminRoutes> } />
        <Route path="/admin/product" element={ <AdminRoutes> <ProductCreate/> </AdminRoutes> } />
        <Route path="/admin/products" element={ <AdminRoutes> <AllProducts/> </AdminRoutes> } />
        <Route path="/admin/product/:slug" element={ <AdminRoutes> <ProductUpdate/> </AdminRoutes> } />
        
        {/* Home Page Routes */}
        <Route path="/product/:slug" element={<Product/>} />
        <Route path="/category/:slug" element={<CategoryHome/>} />
        <Route path="/sub/:slug" element={<SubHome/>} />
        <Route path="/shop" element={<Shop/>} />
      </Routes>
    </>
  );
}

export default App;
