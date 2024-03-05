import React, { useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
function HistoryModal({ history, sethistory, historyData, sethistoryData }) {
  const user = localStorage.getItem("user");
  async function clearAudit() {
    try {
      const endpoint = `${
        import.meta.env.VITE_BACKEND_URI
      }/audit?email=${user}`;
      await axios.delete(endpoint);
      sethistoryData([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function clearSingleAudit(id) {
    try {
      const endpoint = `${import.meta.env.VITE_BACKEND_URI}/audit/${id}`;
      await axios.delete(endpoint);
      sethistoryData([...historyData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          history ? "flex z-50 bg-black bg-opacity-50 rounded-xl" : "hidden"
        } overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-[300px] h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-md">
            {/* Modal header */}
            <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t">
              <div className=" flex items-center justify-between gap-2">
                <MdOutlineHistory className=" text-xl" />
                <div>Recents</div>
              </div>

              <div className=" flex items-center justify-center">
                <h1
                  className=" text-gray-400 text-sm cursor-pointer hover:bg-gray-400 hover:text-white p-1 rounded-xl"
                  onClick={clearAudit}
                >
                  Clear all
                </h1>
                <div className=" flex items-center justify-end">
                  <button
                    type="button"
                    className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white`}
                    data-modal-hide="default-modal"
                    onClick={() => {
                      sethistory((prev) => !prev);
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {historyData.map((data) => (
              <div
                className=" text-black  pl-4 pr-4 flex items-center justify-between"
                key={data._id}
              >
                <h1 className=" text-center">{data.history} </h1>
                <div className=" mb-4">
                  <RxCross2 onClick={() => clearSingleAudit(data._id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryModal;
