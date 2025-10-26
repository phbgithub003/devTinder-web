import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Body() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  );
}
export default Body;