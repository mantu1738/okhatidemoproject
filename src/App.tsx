import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";

import { Login, RegisterForm, Profile } from "./Components";
import { RoutesPath } from "./constants/Routes";


export interface IState {
  auth: {
    isAuthenticated: boolean;
  };
}
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: IState) => state.auth.isAuthenticated);
  return isLoggedIn ? <>{children}</> : <Navigate to={RoutesPath.Login} />;
};
const PublicRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: IState) => state.auth.isAuthenticated);
  return isLoggedIn ? <Navigate to={RoutesPath.Profile} /> : <>{children}</>;
};

function App() {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        />
        <Route
          path={RoutesPath.Login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={RoutesPath.Profile}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;



