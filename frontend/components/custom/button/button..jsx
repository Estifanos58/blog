import React from "react";

const FancyButton = ({ title}) => {
  return (
    <button>
      <a
        href="/post"
        className="group inline-block float-right bg-transparent border-2 border-black text-white font-bold tracking-wider m-0 outline-none overflow-visible py-[1.25em] px-8 relative text-center no-underline transition-all duration-300 ease-in-out select-none text-[13px] hover:bg-black hover:text-white"
      >
        <span className="absolute h-0.5 w-[1.5625rem] top-[-2px] left-[0.625rem] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0"></span>
        <span className="block text-left transition-all duration-300 ease-in-out uppercase no-underline text-black text-[1.125em] leading-[1.33333em] pl-8 group-hover:text-white group-hover:pl-6">
          {title}
        </span>
        <span className="absolute h-0.5 w-[1.5625rem] right-[1.875rem] bottom-[-2px] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0"></span>
        <span className="absolute h-0.5 w-[0.625rem] right-[0.625rem] bottom-[-2px] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0"></span>
        <span className="absolute w-[1.5625rem] h-0.5 bg-black top-1/2 left-6 -translate-y-1/2 origin-center transition-all duration-300 linear group-hover:w-[0.9375rem] group-hover:bg-white"></span>
      </a>
    </button>
  );
};

export default FancyButton;
