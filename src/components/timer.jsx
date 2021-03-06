import React, { useState, useEffect } from "react";
//this file has no css because all is integrated into style.css -- the main css page
//this is not a good practice but since only a few component requires css in this page, it is utilised

//btn appearance through bootstrap css
let btnCom = "btn col-5 btn-";
//timer component
const Timer = () => {
  //only allow counting when this true
  const [allowCount, setAllowCount] = useState(false);
  //initialise the counter
  const [counter, setCounter] = useState(0);
  //initialise the record list
  const [timestamps, setTimestamps] = useState([]);
  //displaying alert Function
  // const [displayAlert, setDisplayAlert] = useState(false);
  //counting function
  const AllowCount = () => {
    setAllowCount(!allowCount);
  };

  //default word
  let btnColor1 = allowCount ? "warning" : "success";
  let btnColor2 = allowCount ? "info" : "danger";

  //counting function
  useEffect(() => {
    //set up a counting variable
    let counting = undefined;
    //start counting when allowCount is true
    if (allowCount) {
      //set up looping function
      counting = setInterval(() => {
        setCounter((counter) => counter + 47);
      }, 47);
    }
    //stop timer when allowCount is false
    return () => clearInterval(counting);
  }, [allowCount]);

  //reset the timer function
  const ResetTimer = () => {
    setAllowCount(false);
    //reset counter
    setCounter(0);
    //delete all record
    setTimestamps([]);
  };
  //turn the counter into unit time
  const time = {
    hours: Math.floor(counter / (1000 * 60 * 60)),
    min: Math.floor((counter / (1000 * 60)) % 60),
    sec: Math.floor((counter / 1000) % 60),
    millisec: counter % 1000,
  };
  //fill in "0" when single digit
  if (time.min < 10) {
    time.min = "0" + String(time.min);
  }
  if (time.sec < 10) {
    time.sec = "0" + String(time.sec);
  }
  if (time.millisec < 10) {
    time.millisec = "00" + String(time.millisec);
  } else if (time.millisec < 100) {
    time.millisec = "0" + String(time.millisec);
  }
  //display only seconds and milliseconds / minutes if counter less than 1 minute / 1 hour
  let displayHours = parseInt(time.hours) !== 0 ? true : false;
  let displayMin =
    parseInt(time.hours) === 0 && parseInt(time.min) === 0 ? false : true;
  //record timestamp function
  const RecordTimestamp = (time, index) => {
    if (!allowCount) return;
    // if (timestamps.length > 49) {
    //   setDisplayAlert(true);
    //   return;
    // }
    let record = undefined;
    if (displayHours) {
      record = time.hours + " h " + time.min + " m " + time.sec + " s";
    } else if (displayMin) {
      record = time.min + " m " + time.sec + " s";
    } else {
      record = time.sec + " s " + time.millisec + " ms";
    }
    //make new array with inserted timestamp
    const newRecord = [...timestamps, { record }];
    //update the state with newRecord
    setTimestamps(newRecord);
  };
  const RemoveRecord = (index) => {
    const newRecord = [...timestamps];
    newRecord.splice(index, 1);
    setTimestamps(newRecord);
  };
  //code for alert box
  // {displayAlert && (
  //   <div className="alert-container">
  //     <div className="alert-box">
  //       <span>Max number or record reached! (50 max)</span>
  //       <span>Press reset to restart timer or delete existing record.</span>
  //     </div>
  //     <button
  //       className="btn"
  //       onClick={() => {
  //         setDisplayAlert(false);
  //       }}
  //     >
  //       X
  //     </button>
  //   </div>
  // )}
  return (
    <>
      <div className="display_timer">
        <div className="display_area_timer">
          <div className="display_container display_container_timer">
            {displayHours && (
              <span className="display_font display_counter">{time.hours}</span>
            )}
            {displayHours && (
              <span className="display_font display_counter col-auto">:</span>
            )}
            {displayMin && (
              <span className="display_font display_counter">{time.min}</span>
            )}
            {displayMin && (
              <span className="display_font display_counter col-auto">:</span>
            )}
            <span className="display_font display_counter">{time.sec}</span>
            <span className="display_font display_counter col-auto">.</span>
            <span
              className="display_font display_counter"
              style={{ fontSize: "5vw" }}
            >
              {time.millisec}
            </span>
          </div>
          <div className="display_record">
            RECORDED TIMESTAMP
            <div className="data_table">
              {timestamps.map((timestamp, index, key) => (
                <div className="record">
                  No.{index + 1}: {timestamp.record}
                  <button onClick={() => RemoveRecord(index)}>
                    <i class="glyphicon glyphicon-remove"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btn_bar_timer row justify-content-between">
          <button
            className={btnCom + btnColor2}
            onClick={() => (allowCount ? RecordTimestamp(time) : ResetTimer())}
          >
            {allowCount ? "RECORD" : "RESET"}
          </button>
          <button className={btnCom + btnColor1} onClick={() => AllowCount()}>
            {allowCount ? "STOP" : "START"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
