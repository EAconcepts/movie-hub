import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchMovie = (e) => {
    setSearchText(e.target.value)
  };
  return (
    <nav className="w-full flex flex-row bg-[#000000] text-white h-[80px] items-center md:h-[112px] justify-center gap-x-[24px]">
      <div className="hidden sm:flex flex-row sm:gap-x-[10px] lg:gap-x-[16px] md:mt-[36px] font-poppins md:text-[12px] lg:text-[16px] font-[600] leading-[24px]">
        <NavLink to="/" className=" ">
          Home
        </NavLink>
        <NavLink to="#" className="">
          Genre
        </NavLink>
        <NavLink to="#" className=" ">
          Country
        </NavLink>
      </div>
      <form className="lg:w-[416px] ml-4 md:w-[320px] w-[190px] sm:w-[220px] h-[38px] md:h-[48px] rounded-[25px] px-[16px] md:px-[24px] bg-white md:mt-[24px]">
        <input
          className="w-[90%] md:mt-[10px] mt-[6px]  focus-visible:outline-none text-black "
          type="search"
          placeholder="search movies..."
          value={searchText}
          onChange={handleSearchMovie}
        />
      </form>
      <div className="hidden md:flex flex-row sm:gap-x-[10px] lg:gap-x-[16px] mt-[36px] font-poppins md:text-[12px] lg:text-[16px] font-[600] leading-[24px]">
        <NavLink to="#" className=" ">
          Movies
        </NavLink>
        <NavLink to="#" className="">
          Series
        </NavLink>
        <NavLink to="#" className="">
          Animation
        </NavLink>
      </div>
      <div className="flex flex-row items-center sm:gap-x-[10px] lg:gap-x-[16px] md:mt-[36px] font-poppins text-[10px] md:text-[12px] lg:text-[16px] font-[600] leading-[24px]">
        <NavLink to="/login" className=" ">
          Login /SignUp
        </NavLink>
      </div>
      <div className="hidden md:flex flex-row sm:gap-x-[10px] lg:gap-x-[16px] mt-[36px]">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.18038 13.9231V14.5385C9.18038 15.1913 8.9507 15.8174 8.54188 16.279C8.13305 16.7407 7.57857 17 7.00041 17C6.42224 17 5.86776 16.7407 5.45894 16.279C5.05011 15.8174 4.82044 15.1913 4.82044 14.5385V13.9231M12.8482 12.6704C11.9735 11.4615 11.3559 10.8462 11.3559 7.51346C11.3559 4.46154 9.97572 3.37423 8.83976 2.84615C8.68886 2.77615 8.54682 2.61538 8.50084 2.44038C8.30158 1.67462 7.74296 1 7.00041 1C6.25785 1 5.6989 1.675 5.50168 2.44115C5.45569 2.61808 5.31366 2.77615 5.16276 2.84615C4.02543 3.375 2.6466 4.45846 2.6466 7.51346C2.6449 10.8462 2.02735 11.4615 1.15264 12.6704C0.790219 13.1712 1.10768 13.9231 1.74157 13.9231H12.2626C12.8931 13.9231 13.2086 13.1688 12.8482 12.6704Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </nav>
  );
};

export default TopNav;
