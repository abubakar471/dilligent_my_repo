import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const CheckoutFailed = () => {
  return (
    <div>
      <nav className="bg-black flex items-center sm:justify-between md:justify-between lg:justify-around py-4 md:px-10 sm:px-4">
        <div>
          <img
            src="/assets/logo.png"
            alt="kaiventurepartners"
            className="mix-blend-luminosity w-[320px]"
          />
        </div>
      </nav>

      <div className="w-[95%] 800px:w-[80%] md:w-[80%] lg:w-[80%] xl:w-[80%] mx-auto my-10">
        <h1 className="text-red-500 text-3xl">
          Subscription Failed! Try Again Later.
        </h1>
      </div>

      <div className="w-full flex items-center justify-center h-[400px]">
        <Link to="/" className="bg-blue-500 text-white p-2 rounded-md">Go To Dashboard</Link>
      </div>
    </div>
  );
};

export default CheckoutFailed;
