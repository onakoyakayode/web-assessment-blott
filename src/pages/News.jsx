import React, { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import logo from "../assets/blott-logo.png";

const News = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  console.log(data);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);

  const totalPages = data ? Math.ceil(data?.length / itemsPerPage) : 0;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-4 md:px-12 py-6 !w-full relative">
      <img
        src={logo}
        alt="blott logo"
        className=" mx-auto mb-5 w-[121px] h-[29px] sm:w-[121px] sm:h-[29px] lg:w-[200px] lg:h-[48.2px] object-cover"
      />
      <h1 className="news-heading uppercase text-2xl md:text-5xl font-medium mb-5">
        News
      </h1>
      <div className="w-full h-full">
        {loading ? (
          <div
            className="flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <span className="animate-pulse text-gray-300">Loading news...</span>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6 lg:gap-6">
            {currentItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white w-full p-0 lg:p-4 hover:bg-[#2A283E] cursor-pointer rounded-lg flex flex-row lg:flex-col gap-4 lg:gap-0 min-h-[132px] sm:min-h-[150px]"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.headline}
                  className="w-[120px] h-[120px] sm:w-[125px] sm:h-[125px] md:w-[160px] md:h-[160px] lg:w-full lg:h-full object-cover mb-2"
                />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="uppercase text-xs">{item.source}</p>
                    <p className="text-xs">{formatDate(item.datetime)}</p>
                  </div>
                  <>
                    <h2 className="text-lg lg:text-xl font-medium leading-[24px] font-rubik break-words line-clamp-2 lg:line-clamp-3 h-auto lg:h-20">
                      {item.headline}
                    </h2>
                  </>
                </div>
              </a>
            ))}
          </ul>
        )}
      </div>
      {!loading && !error && (
        <div className="flex justify-start items-center mt-8 space-x-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="!px-3 py-2 border rounded disabled:opacity-50 text-black"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`!px-3 py-2 border rounded ${
                currentPage === i + 1
                  ? " !text-white font-bold"
                  : "text-gray-500"
              } !bg-transparent focus:outline-none focus:ring-0 focus:border-none border-0`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="!px-3 py-2 border rounded disabled:opacity-50 text-black"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
