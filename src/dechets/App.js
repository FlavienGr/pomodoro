import React from "react";
import BreakLabel from "./components/break-label";
import SessionLabel from "./components/session-label";
import TimerLabel from "./components/timer-label";
import alarmMp3 from "./assets/analog-watch-alarm_daniel-simion.mp3";
class App extends React.Component {
  state = {
    timerSession: 25,
    timerBreak: 5,
    setTimeApp: ``,
    timerState: "stopped",
    stopToChangeTime: false,
    jumpTime: "Session",
    timer: 1500,
    timeSpend: ""
  };
  handleAddTimeBreak = () => {
    if (this.state.timerState === "stopped") {
      this.setState(prevState => ({
        timerBreak:
          prevState.timerBreak < 60
            ? prevState.timerBreak + 1
            : prevState.timerBreak
      }));
    }
  };
  handleRemoveTimeBreak = () => {
    if (this.state.timerState === "stopped") {
      this.setState(prevState => ({
        timerBreak:
          prevState.timerBreak > 1
            ? prevState.timerBreak - 1
            : prevState.timerBreak
      }));
    }
  };
  handleAddTimeSession = () => {
    if (this.state.timerState === "stopped") {
      this.setState(prevState => ({
        timerSession:
          prevState.timerSession < 60
            ? prevState.timerSession + 1
            : prevState.timerSession,
        setTimeApp: this.displayTimerSession(
          prevState.timerSession,
          this.state.timerSession,
          "ADD_SESSION"
        ),
        timer: this.state.timerSession * 60
      }));
    }
  };
  handleRemoveTimeSession = () => {
    if (this.state.timerState === "stopped" && this.state.timerSession > 0) {
      this.setState(prevState => ({
        timerSession:
          prevState.timerSession > 1
            ? prevState.timerSession - 1
            : prevState.timerSession,
        setTimeApp: this.displayTimerSession(
          prevState.timerSession,
          this.state.timerSession,
          "REMOVE_SESSION"
        ),
        timer: this.state.timerSession * 60
      }));
    }
  };
  timerControl = () => {
    if (this.state.timerState === "stopped") {
      this.CountDown();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped", timeSpend: "" });
    }
  };
  displayTimerSession = (ancientTime, actualTime, order) => {
    // eslint-disable-next-line
    let result;
    switch (order) {
      case "ADD_SESSION":
        return (result =
          ancientTime === 60
            ? this.convertSecond(actualTime, 0)
            : this.convertSecond(actualTime + 1, 0));
      case "REMOVE_SESSION":
        return (result =
          ancientTime === 1
            ? this.convertSecond(actualTime, 0)
            : this.convertSecond(actualTime - 1, 0));
      default:
        return `00:00`;
    }
  };
  convertSecond = (minutes, seconds) => {
    const secondZero = seconds < 10 ? `${0}${seconds}` : seconds;
    const minutesZero = minutes < 10 ? `${0}${minutes}` : minutes;
    return `${minutesZero}:${secondZero}`;
  };
  CountDown = () => {
    let interval = 1000; // ms
    let time;
    time = setInterval(() => {
      this.decrementTimer();
      this.checkResultForSound();
      this.changeStatus();
      this.displayTime();
    }, interval);
    // if (this.state.timerState === "stopped") {
    //   clearInterval(time);
    //   this.setState(() => ({
    //     timeSpend: ""
    //   }));
    // } else if (this.state.stopToChangeTime) {
    //   console.log("nicke sa mère");
    //   console.log(this.state.stopToChangeTime, "1");
    //   clearInterval(time);
    //   this.setState(() => ({
    //     timeSpend: "",
    //     stopToChangeTime: false
    //   }));
    //   console.log(this.state.stopToChangeTime, "2");
    //   this.restart();
    // }

    console.log(this.state.stopToChangeTime, "verif");
    this.setState(() => ({
      timeSpend: time
    }));
  };
  decrementTimer = () => {
    this.setState(() => ({ timer: this.state.timer - 1 }));
    console.log(this.state.timer);
  };
  changeStatus = () => {
    let { timer, jumpTime } = this.state;
    if (timer === 0 && jumpTime === "Session") {
      console.log("premier passage");
      clearInterval(this.state.timeSpend);
      this.changeTimeAfterJump(this.state.timerBreak * 60, "Break");
    } else if (timer === 0 && jumpTime === "Break") {
      console.log("deuxieme passage");
      clearInterval(this.state.timeSpend);

      this.changeTimeAfterJump(this.state.timerSession * 60, "Session");
    }
  };
  changeTimeAfterJump = (time, action) => {
    console.log("ai-je été appelée ?", time, action);
    this.setState(() => ({
      jumpTime: action,
      timer: time,
      timeSpend: "",
      stopToChangeTime: true
    }));
  };
  checkResultForSound = () => {
    if (this.state.timer === 0) {
      console.log("putain c'est quoi ça");
      this.playSound();
    }
  };
  restart = () => {
    console.log(this.state.stopToChangeTime, "3");
    console.log(this.state.timer, "timer");
    this.CountDown();
  };
  playSound = () => {
    this.audioBeep.play();
    this.audioBeep.currentTime = 0;
    setTimeout(() => {
      this.audioBeep.pause();
    }, 2000);
  };
  correctDisplay = (minutes, seconds) => {
    const secondZero = seconds < 10 ? `${0}${seconds}` : seconds;
    const minutesZero = minutes < 10 ? `${0}${minutes}` : minutes;
    return `${minutesZero}:${secondZero}`;
  };
  displayTime = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    this.setState(() => ({
      setTimeApp: this.correctDisplay(minutes, seconds)
    }));
  };
  resetTimer = () => {
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;

    this.setState(() => ({
      timerSession: 25,
      timerBreak: 5,
      setTimeApp: ``,
      setMinutes: 25,
      statusProcess: false,
      counter: 59,
      pause: false,
      restartCountdownBreak: false,
      restartCountdownSession: false
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="time-manager">
            <BreakLabel
              addTime={this.handleAddTimeBreak}
              removeTime={this.handleRemoveTimeBreak}
              currentTimeBreak={this.state.timerBreak}
            />
            <SessionLabel
              addTime={this.handleAddTimeSession}
              removeTime={this.handleRemoveTimeSession}
              currentTimeSession={this.state.timerSession}
            />
          </div>
          <div className="time-display">
            <TimerLabel
              currentTimeApp={this.state.setTimeApp}
              playPomodoro={this.timerControl}
              resetPomodoro={this.resetTimer}
            />
          </div>
          <audio
            id="beep"
            preload="auto"
            src={alarmMp3}
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
