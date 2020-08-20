import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import "./calstyle.css";

function Calculator() {
  const [data, setData] = useState("");
  const calcBtns = [];
  const availableKeys = [
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
    "*",
    "+",
    "-",
    "%",
    "/",
  ];
  const operations = ["*", "+", "-", "%", "/"];
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "%"].forEach((item) => {
    calcBtns.push(
      <button
        className="digit-button"
        onClick={(e) => {
          handleDigitInput(e.target.value);
        }}
        value={item}
        key={item}
      >
        {item}
      </button>
    );
  });

  const opBtns = [];
  ["+", "-", "*", "/"].forEach((item) => {
    opBtns.push(
      <button
        className="digit-button"
        onClick={(e) => {
          handleDigitInput(e.target.value);
        }}
        value={item}
        key={item}
      >
        {item}
      </button>
    );
  });

  useEffect(() => {
    document.addEventListener("keydown", hanldeKeyDown);
    return () => {
      document.removeEventListener("keydown", hanldeKeyDown);
    };
  });

  function hanldeKeyDown(event) {
    if (availableKeys.includes(event.key)) {
      handleDigitInput(event.key);
      return;
    }
    if (event.keyCode == 13) {
      handleEvaluation();
    }
  }
  function handleDigitInput(input) {
    const lastInput = data[data.length - 1];
    //Check the first number if zero
    if (data.length == 0 && input === "0") return;
    if (operations.includes(lastInput) && operations.includes(input)) return;
    setData(data + input);
  }
  function handleEvaluation() {
    if (data != null && data.length > 0) {
      const lastInput = data[data.length - 1];
      if (operations.includes(lastInput)) {
        return;
      }
      console.log("data" + data);
      const result = eval(data);
      setData(result);
    }
  }
  return (
    <div class="wrapper">
      <div class="show-input">{data}</div>
      <div class="digits">{calcBtns}</div>
      <div class="modifiers subgrid">
        <button
          onClick={() => {
            if (data.length > 0) setData(data.substring(0, data.length - 1));
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setData("");
          }}
        >
          AC
        </button>
      </div>
      <div class="operations subgrid">
        {opBtns}
        <button
          onClick={(e) => {
            handleEvaluation();
          }}
          value="="
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
