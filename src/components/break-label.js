import React from "react";

const BreakLabel = ({ currentTimeBreak = 5, handleTime }) => (
  <div id="break-label" className="break-label__main--box">
    <h2>Break Length</h2>
    <div className="break-label__button--box">
      <button id="break-increment" value="ADD" onClick={e => handleTime(e)}>
        <i className="fas fa-arrow-up fa-2x" />
      </button>
      <div id="break-length" className="break-label__time__display--box">
        {currentTimeBreak}
      </div>
      <button id="break-decrement" value="REMOVE" onClick={e => handleTime(e)}>
        <i className="fas fa-arrow-down fa-2x" />
      </button>
    </div>
  </div>
);

export default BreakLabel;
