import Navabar from "@/components/Navabar";
import React from "react";
import Weather from "./Weather";
import Currency from "./Currency";

const BothComponents = () => {
  return (
    <div className=" grid grid-col-0 mx-1 mb-5 gap-2 md:grid-cols-2 md:mx-5">
      <Weather />
      <Currency />
    </div>
  );
};

export default BothComponents;
