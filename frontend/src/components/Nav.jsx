import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
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
        <div className="border-y-2 flex mx-5 justify-center gap-6 items-center px-4 md:px-16">
          {/*  */}
          <div className="flex px-7 divide-x divide-black text-sm">
            {["Home", "About", "My Blog", "Contact"].map((item, idx) => (
              <div
                key={idx}
                className="px-16 py-4 text-center hover:text-purple-600 transition-colors cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
          {/*  */}
          <div className="flex divide-x divide-black text-sm">
            {/* Search Icon */}
            <div className="px-4 flex items-center justify-center cursor-pointer">
              <FiSearch className="text-lg" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 px-6 py-4">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaPinterest />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
