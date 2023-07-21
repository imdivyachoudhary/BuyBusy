import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import MainBody from "./components/MainBody/MainBody";
import ProductsList from "./components/ProductsList/ProductsList";
import FilterBox from "./components/FilterBox/FilterBox";
import CustomProductContext from "./context/ProductContext";
import CustomAuthContext from "./context/AuthContext";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import CustomCartContext from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Page404 from "./components/pages/Page404";
import OrderDetail from "./components/Orders/OrderDetail";
import { useEffect } from "react";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: (
            <MainBody>
              <ProductsList />
              <FilterBox />
            </MainBody>
          ),
        },
        {
          path: "sign-in",
          element: (
            <MainBody>
              <SignIn />
            </MainBody>
          ),
        },
        {
          path: "sign-up",
          element: (
            <MainBody>
              <SignUp />
            </MainBody>
          ),
        },
        {
          path: "cart",
          element: (
            <MainBody>
              <Cart />
            </MainBody>
          ),
        },
        {
          path: "orders",
          element: (
            <MainBody><Orders /></MainBody>
          )
        },
        {
          path: "order-detail/:order_id",
          element : <MainBody><OrderDetail /></MainBody>
        }
      ],
    },
  ]);

  useEffect(()=>{
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "https://img.icons8.com/?size=1x&id=rBQmeaLgDfht&format=png";
  },[])

  return (
    <CustomAuthContext>
      <CustomProductContext>
        <CustomCartContext>
          <ToastContainer style={{ marginTop: "60px" }} />
          <RouterProvider router={browserRouter} />
        </CustomCartContext>
      </CustomProductContext>
    </CustomAuthContext>
  );
}

export default App;
