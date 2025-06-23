import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ArrowLeftCircleIcon } from "lucide-react";

const BackButton = ({ to = "/funcionario/" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className="absolute w-8 h-8 top-4 left-0 p-0"
      onClick={() => navigate(to)}
    >
      <ArrowLeftCircleIcon className="w-full h-full text-gray-700" />
    </Button>
  );
};

export default BackButton;
