import { Helmet } from "react-helmet";

const Loader = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Loading...</title>
      </Helmet>

      <div className="h-screen flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 2 border-spacing-10 p-4 flex flex-col items-center justify-center">
          <img src="/assets/diligent_loader.jpg" alt="diligent_loader" />
          <img src="/assets/loading_spinner.png" alt="spinner" className="w-[60px] h-[60px] mt-4 animate-spin transition-all ease-out duration-700" />
        </div>
      </div>
    </>
  );
};

export default Loader;
