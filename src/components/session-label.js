import React from "react";

const SessionLabel = ({ currentTimeSession = 25, handleTime }) => (
  <div id="session-label" className="session-label__main--box">
    <h2>Session Length</h2>
    <div className="session-label__button--box">
      <button id="session-increment" value="ADD" onClick={e => handleTime(e)}>
        <i className="fas fa-arrow-up fa-2x" />
      </button>
      <div id="session-length" className="session-label__time__display--box">
        {currentTimeSession}
      </div>
      <button
        id="session-decrement"
        value="REMOVE"
        onClick={e => handleTime(e)}
      >
        <i className="fas fa-arrow-down fa-2x" />
      </button>
    </div>
  </div>
);

export default SessionLabel;
