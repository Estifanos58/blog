import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
