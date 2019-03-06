import React from "react";

const TimerLabel = ({
  currentTimeApp,
  playPomodoro,
  resetPomodoro,
  jumpTime
}) => (
  <div className="time-label__main--box">
    <div id="timer-label" className="time-label__display--box">
      <h2>{jumpTime}</h2>
      <div id="time-left" className="time-label__display">
        {currentTimeApp()}
      </div>
    </div>
    <div className="time-label__time__button--box">
      <button id="start_stop" onClick={() => playPomodoro()}>
        <i className="far fa-play-circle fa-2x" />
        <i className="far fa-pause-circle fa-2x" />
      </button>
      <button id="reset" onClick={() => resetPomodoro()}>
        <i className="fas fa-sync fa-2x" />
      </button>
    </div>
  </div>
);

export default TimerLabel;
