import React, { useState } from "react";
import Clock from "./components/clock";
import Timer from "./components/timer";
import "bootstrap/dist/css/bootstrap.css";

//true for Clock, false for Timer
export default function App() {
  const [mode, setMode] = useState(true);

  return (
    <>
      <nav>
        <div className="row w-100">
          <button onClick={() => setMode(true)} className="btn col col-6">
            Clock
          </button>
          <button onClick={() => setMode(false)} className="btn col col-6">
            Timer
          </button>
        </div>
      </nav>
      <div>
        {mode && <Clock />}
        {!mode && <Timer />}
      </div>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals