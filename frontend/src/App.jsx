import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Auth } from "./pages/auth";
import Layout from "./pages/Layout";
import CreateOrUpdate from "./pages/create";
import Detail from "./pages/detail";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./store/store";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import About from "./pages/about";

function App() {
  const [loading, setIsLoading] = useState(true);
  const { setUser } = useStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/me`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        // No need to do anything; user remains unauthenticated
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-3xl">Loading ...</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <CreateOrUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
