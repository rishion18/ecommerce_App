import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/landingPage";
import ProductsPage from "./components/productsPage/ProductsPage";
import ProductDetailPage from "./components/productsPage/productDetailPage";
import NavBarLayout from "./components/layouts/NavBarLayout";
import CartPage from "./components/cart/cartPage";

function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<NavBarLayout><LandingPage/></NavBarLayout>
  },
  {
    path:'/:category',
    element:<NavBarLayout><ProductsPage/></NavBarLayout>
  },
  {
     path:'/:category/detail',
     element:<NavBarLayout><ProductDetailPage/></NavBarLayout>
  },
  {
     path:'/cart',
     element:<NavBarLayout><CartPage/></NavBarLayout>
  }
])

  return (
    <div className="w-screen h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
