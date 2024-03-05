import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdOutlineHistory } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import HistoryModal from "./HistoryModal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
function Calculator() {
  let [history, sethistory] = useState(false);
  let [historyData, sethistoryData] = useState([]);
  let data = useRef("");
  let user = localStorage.getItem("user");
  function onClickHistory() {
    sethistory((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${
          import.meta.env.VITE_BACKEND_URI
        }/audit?email=${user}`;
        const response = await axios.get(endpoint);
        sethistoryData([...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, historyData);
  async function calculation(button, expression) {
    event.preventDefault();
    try {
      const endpoint = `${import.meta.env.VITE_BACKEND_URI}/audit`;
      let sanitizedExpression = expression.current.value.replace(
        /(\d+)%/g,
        (_, p1) => `${parseFloat(p1) / 100}`
      );
      if (button === "=") {
        let response = eval(sanitizedExpression);
        let dataToPush = sanitizedExpression + "=" + response;
        await axios.post(endpoint, { email: user, history: dataToPush });
        sethistoryData((prev) => [
          { history: sanitizedExpression + "=" + response },
          ...prev,
        ]);
        data.current.value = response;
      } else if (button === "C") {
        data.current.value = "";
      } else if (button === "back") {
        let len = data.current.value.length;

        data.current.value = data.current.value.slice(0, len - 1);
      } else if (button === "+/-") {
        let currentValue = data.current.value;
        let lastNumber = currentValue.match(/(-?\d*\.?\d+)[^.\d]*$/);

        if (lastNumber) {
          let toggledSign = parseFloat(lastNumber[1]) * -1;
          data.current.value = currentValue.replace(
            /(-?\d*\.?\d+)[^.\d]*$/,
            toggledSign
          );
        }
      } else {
        data.current.value += button;
      }
    } catch (error) {
      data.current.value = "ERROR";
    }
  }
  let buttons = [
    "C",
    "()",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    "+/-",
    "0",
    ".",
    "=",
  ];
  return user === null || user === undefined || !user ? (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center p-12 bg-white rounded-lg shadow-lg mx-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Please Login to use the CalcApp
        </h1>
        <p className="text-gray-600 mb-8">
          The smart solution for your everyday calculations.
        </p>
        <Link
          to={"/login"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Login</span>
          <ArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  ) : (
    <div className={`flex items-center justify-center mt-6`}>
      <div
        className={`h-[570px] w-[300px]  border-2 border-gray-200 rounded-lg bg-[#ffff] shadow-xl `}
      >
        <div className=" grid grid-row-12 h-full relative">
          <div className=" row-span-4">
            <textarea
              type="text"
              ref={data}
              className=" h-[95%] w-[90%] ml-[5%] mt-3 mr-6 border-2 border-gray-300 p-1 rounded-2xl focus:outline-none text-xl font-sans font-semibold text-gray-600  appearance-none resize-none p-3"
              readOnly
            />
          </div>

          <div className=" row-span-2 flex items-center justify-between">
            <div
              className={`text-2xl ml-3 cursor-pointer`}
              onClick={onClickHistory}
            >
              <MdOutlineHistory />
            </div>
            <div
              className=" text-2xl mr-3 cursor-pointer"
              onClick={() => calculation("back", data)}
            >
              <IoMdArrowBack />
            </div>
          </div>
          <div className=" row-span-6 flex flex-wrap ml-4 mr-3 gap-4 mb-3">
            {buttons.map((symbol) => (
              <>
                {symbol === "()" ? (
                  <div
                    className=" w-[50px] border-2 border-gray-300 flex items-center justify-center rounded-2xl cursor-pointer"
                    style={{ boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)" }}
                    onClick={() => calculation("back", data)}
                  >
                    <IoMdArrowBack
                      className={`text-lg font-sans font-semibold`}
                    />
                  </div>
                ) : (
                  <div
                    key={symbol}
                    className={`${
                      symbol === "=" ? "bg-blue-400" : ""
                    } w-[55px] border-2 border-gray-300 flex items-center justify-center rounded-2xl`}
                    style={{ boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.2)" }}
                    onClick={() => calculation(symbol, data)}
                  >
                    <button
                      className={`text-lg font-sans font-semibold h-full w-full`}
                    >
                      {symbol}
                    </button>
                  </div>
                )}
              </>
            ))}
          </div>

          <HistoryModal
            history={history}
            sethistory={sethistory}
            historyData={historyData}
            sethistoryData={sethistoryData}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
