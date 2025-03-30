import React from "react";

function Navbar() {
  return <>
  <div className="flex justify-between border-2 border-gray-300 items-center px-10 h-[65px]">
  <div className="font-bold text-lg">ScheMax</div>
  <div className="flex font-semibold justify-evenly gap-10">
  <div>Home</div>
  <div>Pricing</div>
  <div>CLI</div>
  <div>About Us</div>
  </div>
  </div>
  </>;
}

export default Navbar;
