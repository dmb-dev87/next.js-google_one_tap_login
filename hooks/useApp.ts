import { AppContext } from "../context/app/AppContext";
import { useContext } from "react";

const useApp = () => {
  const context = useContext(AppContext);
  return context;
};

export default useApp;
