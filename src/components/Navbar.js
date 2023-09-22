import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="px-14 py-3 grid grid-cols-6">
        <div className="w-20 flex items-center justify-center">
          <img src="/images/logo.png" alt="Logo"/>
        </div>
        <div className="col-span-5 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold">Unsplash</h1>
        </div>
      </div>
      <div className="flex w-full p-0.5 bg-black"></div>
    </>
  );
};

export default Navbar;
