import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

interface BackButtonProps extends Omit<LinkProps, "to"> {
  destination?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ destination = "/", ...rest }) => {
  return (
    <div className="flex">
      <Link to={destination} className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit" {...rest}>
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;