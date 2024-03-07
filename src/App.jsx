import { Outlet } from "react-router-dom";
import TheFooter from "./components/TheFooter";

const App = () => {
  return (
    <>
      <Outlet />
      <TheFooter />
    </>
  );
};

export default App;
