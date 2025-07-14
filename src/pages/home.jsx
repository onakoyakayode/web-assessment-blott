import { useEffect } from "react";
import blottImge from "../assets/blott.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/news");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  const gotoNewsPage = () => {
    navigate("/news");
  };
  return (
    <div className="bg-black h-dvh text-white p-4 lg:pt-31 lg:pb-27 lg:px-[279px] w-full">
      <div className="flex flex-col items-start justify-center gap-y-5 lg:gap-y-[50px] mb-50 lg:!mb-61">
        <h3 className="text-2xl lg:text-5xl">Blott Studio</h3>
        <h1 className="text-4xl !lg:text-9xl font-bold tracking-wide leading-[1.5]">
          Web Assessment
        </h1>
        <h5 className="text-[#828282] font-semibold text-2xl lg:text-5xl">
          Finance Digest
        </h5>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3 lg:gap-0">
        <img src={blottImge} alt="Blott logo" className="" />
        <button
          onClick={gotoNewsPage}
          className="!bg-[#55ACEE] text-white h-12 w-full lg:h-[85px] lg:w-[328px] rounded-2xl lg:!rounded-full !font-bold text-xl !lg:text-4xl hover:opacity-85"
        >
          Ready
        </button>
      </div>
    </div>
  );
};

export default HomePage;
