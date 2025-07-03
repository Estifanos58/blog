import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import axios from "axios";

const NavData = [
  {
    id: 1,
    title: "Home",
    href: "/"
  },
  {
    id: 2,
    title: "About",
    href: "/about"
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact"
  }
]

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleLogOut = async() => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{withCredentials: true});

    if(response.status === 200 ){
      setUser(null);
    }
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Tagline */}
      <div className="text-center text-sm lg:text-2xl tracking-[0.3em] mt-8 uppercase">
        Everything is personal. Including this blog.
      </div>

      {/* Title */}
      <h1 className="text-5xl font-serif lg:text-9xl font-bold text-center my-6">
        Train of Thought
      </h1>

      {/* Navigation */}
        <div className="border-y-2 flex md:mx-5 justify-center md:gap-6 items-center px-4 md:px-16">
          {/*  */}
          <div className="flex md:px-4 lg:px-7 divide-x divide-black text-sm">
            {NavData.map((item, idx) => (
              <div
                key={idx}
                className="px-3 md:px-5 lg:px-16 py-4 text-center hover:text-purple-600 transition-colors cursor-pointer"
              >
                
                <a href={item.href}>{item.title}</a>
              </div>
            ))}
          </div>
          {/*  */}
          <div className="flex divide-x divide-black text-sm">
            <div>
              {user?.firstName ? 
                <div className="flex gap-2 items-center">
                  <h1>Welcome {user.firstName}</h1>
                  <button className="border-2 px-5 py-2 rounded-3xl hover:border-gray-100 transition" onClick={handleLogOut}>
                SignOut
              </button>
                </div>  
               :
              <button className="border-2 px-5 py-2 rounded-3xl hover:border-gray-100 transition" onClick={()=>navigate('/auth')}>
                SignIn
              </button>
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
