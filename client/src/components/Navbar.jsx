import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="flex items-center sm:justify-between md:justify-between lg:justify-around py-10 md:px-10 sm:px-4">
      <div>
        <img
          src="/assets/logo.png"
          alt="kaiventurepartners"
          className="mix-blend-color-dodge"
        />
      </div>

      <div className="hidden md:block lg:block">
        <div className="flex items-center gap-x-2">
          <Link to={isSignedIn ? "/dashboard" : "/signin"}>
            <button className="p-2 rounded-md font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
