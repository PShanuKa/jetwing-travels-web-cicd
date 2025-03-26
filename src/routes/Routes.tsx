import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, IRoute, privateRoutes, publicRoutes } from ".";
// import Default from "@/Layouts/Default";
import { useSelector } from "react-redux";
// import Logout from "@/pages/Auth/Logout";
// import { useEffect } from "react";
import DefaultLayout from "@/Layout/Default";

const AllRoutes = () => {
  const user = useSelector((state: any) => state.auth.userInfo);
  // const user = false
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route
          key={index}
          path={`/admin${route.path}`}
          element={user ? <Navigate to="/" /> : route.element}
        />
      ))}

      {privateRoutes.map((route: IRoute, index: number) => (
        <Route key={index} path={`/admin${route.path}`} element={!user ? <Navigate to="/admin/login" /> : <DefaultLayout>{route.element}</DefaultLayout>} />
      ))}

      {publicRoutes.map((route: IRoute, index: number) => (
        <Route key={index} path={`/${route.path}`} element={route.element} />
      ))}

      {/* <Route path="/admin/logout" element={<Logout />} /> */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AllRoutes;
