import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import Button from "../Button";

const Calculator = () => {
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
  const keys = [
    { content: "9", type: "digit" },
    { content: "8", type: "digit" },
    { content: "7", type: "digit" },
    { content: "/", type: "operator" },
    { content: "6", type: "digit" },
    { content: "5", type: "digit" },
    { content: "4", type: "digit" },
    { content: "+", type: "operator" },
    { content: "3", type: "digit" },
    { content: "2", type: "digit" },
    { content: "1", type: "digit" },
    { content: "-", type: "operator" },
    { content: "0", type: "digit" },
    { content: ".", type: "digit" },
    { content: "*", type: "operator" },
  ];
  const operations = ["*", "+", "-", "%", "/"];


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
          console.log(event.key);
        handleDigitInput(event.key);
        return;
      }
      if (event.keyCode === 13) {
        handleEvaluation();
      }
    }
  const handleDigitInput = (input) =>{
    const lastInput = data[data.length - 1];
    //Check the first number if zero
    if (data.length == 0 && input === "0") return;
    if (operations.includes(lastInput) && operations.includes(input)) return;
    setData(data + input);
  };
  
  const handleClearInput = (input)=>{
      setData("")
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
  
  
  keys.forEach((item) => {
    calcBtns.push(
      <Button
        onButtonClick={handleDigitInput}
        content={item.content}
        type={item.type}
      ></Button>
    );
  });
  
  return(
      <div>
    <div className="display">{data}</div>
  <div className="digits">
      {calcBtns}
      <Button
        onButtonClick={handleClearInput}
        content="C"
        type="modifier"
      ></Button>
    <Button
        onButtonClick={(e) => {
         if(data.length > 0)
            setData(data.substr(0,data.length-1));
        }}
        content= "AC"
        type="modifier"
      ></Button>
    <Button
        onButtonClick={handleEvaluation}
        content= "="
        type="digit"
      ></Button>
    </div>
    <div className="bottom" />

    </div>
  );
};

export default Calculator;
