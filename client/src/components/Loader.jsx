import { Helmet } from "react-helmet";

const Loader = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Loading...</title>
      </Helmet>

      <div className="h-screen flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 border-2 border-spacing-10 border-gray-700 p-4 animate-pulse">
          KAI Venture Partners
        </div>
      </div>
    </>
  );
};

export default Loader;
