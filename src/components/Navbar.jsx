import React from "react";
import photo from "../assets/logo.jpg";

function Navbar() {
  return <>
  <div className="flex justify-between border-2 border-gray-300 items-center px-10 h-[65px]">
  {/* <div className="font-bold text-lg">ScheMax</div> */}
  <img src={photo} alt="SQLMax" className="h-[150px] top-[-7px] absolute" />
  <div className="flex font-semibold ml-[900px] justify-evenly gap-10">
  <div>Home</div>
  <div>Pricing</div>
  <div>CLI</div>
  <div>About Us</div>
  </div>
  </div>
  </>;
}

export default Navbar;
