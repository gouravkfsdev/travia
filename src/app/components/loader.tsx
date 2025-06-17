import React from "react";

interface LoaderProps {
  size?: string;
  color?: string; // dynamic color class (e.g., 'border-white', 'border-red-600')
}

const Loader: React.FC<LoaderProps> = ({
  size = "h-6 w-6",
  color = "border-white",
}) => {
  return (
    <div
      className={`border-4 border-t-transparent ${color} rounded-full animate-spin ${size}`}
    ></div>
  );
};

export default Loader;
