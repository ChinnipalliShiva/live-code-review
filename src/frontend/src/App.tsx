import React from "react";
import AppRoutes from "./routes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return <AppRoutes isLoggedIn={isLoggedIn} />;
};

export default App;
