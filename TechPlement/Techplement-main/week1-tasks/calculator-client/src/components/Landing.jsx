import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center p-12 bg-white rounded-lg shadow-lg mx-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to CalcApp!
        </h1>
        <p className="text-gray-600 mb-8">
          The smart solution for your everyday calculations.
        </p>
        <Link
          to={"/login"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Get started</span>
          <ArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
