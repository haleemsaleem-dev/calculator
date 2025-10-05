import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-xl shadow-md w-72">
        <div className="bg-gray-800 text-white text-right p-3 rounded mb-3 text-xl">
          {input || "0"}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-400 p-3 rounded"
          >
            AC
          </button>
          <button onClick={handleDelete} className="bg-yellow-400 p-3 rounded">
            DEL
          </button>
          <button
            onClick={() => handleClick("/")}
            className="bg-blue-400 p-3 rounded"
          >
            /
          </button>

          <button
            onClick={() => handleClick("7")}
            className="bg-gray-200 p-3 rounded"
          >
            7
          </button>
          <button
            onClick={() => handleClick("8")}
            className="bg-gray-200 p-3 rounded"
          >
            8
          </button>
          <button
            onClick={() => handleClick("9")}
            className="bg-gray-200 p-3 rounded"
          >
            9
          </button>
          <button
            onClick={() => handleClick("*")}
            className="bg-blue-400 p-3 rounded"
          >
            ×
          </button>

          <button
            onClick={() => handleClick("4")}
            className="bg-gray-200 p-3 rounded"
          >
            4
          </button>
          <button
            onClick={() => handleClick("5")}
            className="bg-gray-200 p-3 rounded"
          >
            5
          </button>
          <button
            onClick={() => handleClick("6")}
            className="bg-gray-200 p-3 rounded"
          >
            6
          </button>
          <button
            onClick={() => handleClick("-")}
            className="bg-blue-400 p-3 rounded"
          >
            −
          </button>

          <button
            onClick={() => handleClick("1")}
            className="bg-gray-200 p-3 rounded"
          >
            1
          </button>
          <button
            onClick={() => handleClick("2")}
            className="bg-gray-200 p-3 rounded"
          >
            2
          </button>
          <button
            onClick={() => handleClick("3")}
            className="bg-gray-200 p-3 rounded"
          >
            3
          </button>
          <button
            onClick={() => handleClick("+")}
            className="bg-blue-400 p-3 rounded"
          >
            +
          </button>

          <button
            onClick={() => handleClick("0")}
            className="col-span-2 bg-gray-200 p-3 rounded"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            className="bg-gray-200 p-3 rounded"
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className="bg-green-400 p-3 rounded"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
