import React from "react";
import { IconType } from "react-icons/lib";
import { LinkProps } from "react-router-dom";

interface BackButtonProps extends LinkProps {
  destination?: string;
}

declare const BackButton: React.FC<BackButtonProps>;

export default BackButton;
