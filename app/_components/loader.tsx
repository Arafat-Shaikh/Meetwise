import React from "react";

const Loader = ({ borderColor }: { borderColor: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`w-3 h-3 border-2 border-t-transparent rounded-full animate-spin ${borderColor}`}
      ></div>
    </div>
  );
};

export default Loader;
