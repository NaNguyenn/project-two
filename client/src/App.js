import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Account from "./pages/Account"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Navbar from "./components/Navbar";

import "./style.scss";

//Outlet COMPONENT ALLOWS RENDERING CHILDREN ROUTES
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

//RENDER Layout TO EVERY ROUTE
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //FOR OUTLET
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      }
    ]
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        {/* PROVIDE router OBJECT TO THE APP */}
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
