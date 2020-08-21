import React from "react";
import "./style.css";
import { useState,useEffect } from "react";
import Calculator from "../Calculator/Calculator";
function CalculatorTheme() {
  const [time, setTime] = useState(new Date());
  useEffect(()=>{
     setTime(new Date()); 
  },[new Date().getMinutes()]);
  return (
    <div className="Theme">
      <div className="Top">
        <div className="time">
          {time.getHours().toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}
        </div>
      </div>
      <Calculator></Calculator>
    </div>
  );
}
export default CalculatorTheme;
