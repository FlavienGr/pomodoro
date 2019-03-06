import React from "react";
import BreakLabel from "./components/break-label";
import SessionLabel from "./components/session-label";
import TimerLabel from "./components/timer-label";

class App extends React.Component {
  state = {
    timerSession: 25,
    timerBreak: 5,
    timerState: "stopped",
    timeToPause: "",
    timer: 1500,
    jumpTime: "Session",
    interval: ""
  };

  setTimeBreak = e => {
    const action = e.currentTarget.value;
    const time = this.state.timerBreak;
    const nameStatus = "Session";
    const nameState = "timerBreak";
    this.handleTimeBreakAndSession(nameState, time, action, nameStatus);
  };
  setTimeSession = e => {
    const action = e.currentTarget.value;
    const time = this.state.timerSession;
    const nameStatus = "Break";
    const nameState = "timerSession";
    this.handleTimeBreakAndSession(nameState, time, action, nameStatus);
  };
  handleTimeBreakAndSession = (nameState, time, action, nameStatus) => {
    if (this.state.timerState === "stopped") {
      if (this.state.jumpTime === nameStatus) {
        if (action === "ADD" && time !== 60) {
          this.setState(() => ({
            [nameState]: time + 1
          }));
        } else if (action === "REMOVE" && time !== 1) {
          this.setState(() => ({
            [nameState]: time - 1
          }));
        }
      } else {
        if (action === "ADD" && time !== 60) {
          this.setState(() => ({
            [nameState]: time + 1,
            timer: time * 60 + 60
          }));
        } else if (action === "REMOVE" && time !== 1) {
          this.setState(() => ({
            [nameState]: time - 1,
            timer: time * 60 - 60
          }));
        }
      }
    }
  };
  timerControl = () => {
    if (this.state.timerState === "stopped") {
      this.countdown();
      this.setState(() => ({
        timerState: "running"
      }));
    } else {
      clearInterval(this.state.interval);
      this.setState(() => ({
        timerState: "stopped"
      }));
    }
  };
  decrementTimer = () => {
    this.setState(() => ({ timer: this.state.timer - 1 }));
  };
  countdown = () => {
    let timer = setInterval(() => {
      this.decrementTimer();
      this.checkZero();
    }, 1000);

    this.setState(() => ({
      interval: timer
    }));
  };
  checkZero = () => {
    let { timer } = this.state;
    this.playSound(timer);
    if (timer < 0) {
      this.changeStatusWhenZero();
    }
  };
  changeStatusWhenZero = () => {
    let { jumpTime } = this.state;
    if (jumpTime === "Session") {
      clearInterval(this.state.interval);
      this.countdown();
      this.handleStatusSwift(this.state.timerBreak * 60, "Break");
    } else {
      clearInterval(this.state.interval);
      this.countdown();
      this.handleStatusSwift(this.state.timerSession * 60, "Session");
    }
  };
  handleStatusSwift = (time, action) => {
    this.setState(() => ({
      timer: time,
      jumpTime: action
    }));
  };

  playSound = timer => {
    if (timer === 0) {
      this.audioBeep.play();
    }
  };

  clockify = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    const mins = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secs = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${mins}:${secs}`;
  };
  resetTimer = () => {
    clearInterval(this.state.interval);
    this.setState(() => ({
      timerSession: 25,
      timerBreak: 5,
      timerState: "stopped",
      timer: 1500,
      jumpTime: "Session",
      interval: ""
    }));
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="time-manager">
            <BreakLabel
              handleTime={this.setTimeBreak}
              currentTimeBreak={this.state.timerBreak}
            />
            <SessionLabel
              handleTime={this.setTimeSession}
              currentTimeSession={this.state.timerSession}
            />
          </div>
          <div className="time-display">
            <TimerLabel
              currentTimeApp={this.clockify}
              playPomodoro={this.timerControl}
              resetPomodoro={this.resetTimer}
              jumpTime={this.state.jumpTime}
            />
          </div>
          <audio
            id="beep"
            preload="auto"
            src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
            ref={audio => {
              this.audioBeep = audio;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
