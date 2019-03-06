setMinutes = (
  pause,
  CountDownBreak,
  CountDownSession,
  StateMinutes,
  timerBreak,
  timerSession
) => {
  // eslint-disable-next-line
  let minutes;
  if ((pause && CountDownBreak) || (pause && CountDownSession) || pause) {
    console.log(" pause + break/session", StateMinutes);
    minutes = StateMinutes;
    this.setState(() => ({ pause: false }));
    return minutes;
  } else if (CountDownBreak) {
    console.log("break first level :", timerBreak);
    // console.log("PAUSE !!!, data fetched break first level");
    minutes = timerBreak;
    this.setState(() => ({ setTimeApp: this.convertSecond(timerBreak, 0) }));
    return minutes;
  } else if (CountDownSession) {
    console.log("session first level :", timerSession);
    // console.log("PAUSE !!!, data fetched session first level");
    minutes = timerSession;
    this.setState(() => ({
      setTimeApp: this.convertSecond(timerSession, 0)
    }));
    return minutes;
  } else {
    console.log("normal tour first session", minutes);
    // console.log("PAUSE !!!, data fetched normal tour");
    minutes = timerSession;
    return minutes;
  }
};

let {
  timerSession,
  timerBreak,
  pause,
  restartCountdownBreak,
  restartCountdownSession,
  setMinutes
} = this.state;
// console.log(timerSession + " ", "test");

let minutes = this.setMinutes(
  pause,
  restartCountdownBreak,
  restartCountdownSession,
  setMinutes,
  timerBreak,
  timerSession
);
// handleAddTimeBreak = () => {
//   if (!this.state.statusProcess) {
//     this.setState(prevState => ({
//       timerBreak:
//         prevState.timerBreak < 60
//           ? prevState.timerBreak + 1
//           : prevState.timerBreak
//     }));
//   }
// };
// handleRemoveTimeBreak = () => {
//   if (!this.state.statusProcess) {
//     this.setState(prevState => ({
//       timerBreak:
//         prevState.timerBreak > 1
//           ? prevState.timerBreak - 1
//           : prevState.timerBreak
//     }));
//   }
// };
// handleAddTimeSession = () => {
//   if (!this.state.statusProcess) {
//     this.setState(prevState => ({
//       timerSession:
//         prevState.timerSession < 60
//           ? prevState.timerSession + 1
//           : prevState.timerSession,
//       setTimeApp: this.displayTimerSession(
//         prevState.timerSession,
//         this.state.timerSession,
//         "ADD_SESSION"
//       ),
//       timer: this.state.timerSession * 60
//     }));
//   }
// };
// handleRemoveTimeSession = () => {
//   if (!this.state.statusProcess && this.state.timerSession > 0) {
//     this.setState(prevState => ({
//       timerSession:
//         prevState.timerSession > 1
//           ? prevState.timerSession - 1
//           : prevState.timerSession,
//       setTimeApp: this.displayTimerSession(
//         prevState.timerSession,
//         this.state.timerSession,
//         "REMOVE_SESSION"
//       ),
//       timer: this.state.timerSession * 60
//     }));
//   }
// };
// displayTimerSession = (ancientTime, actualTime, order) => {
//   // eslint-disable-next-line
//   let result;
//   switch (order) {
//     case "ADD_SESSION":
//       return (result =
//         ancientTime === 60
//           ? this.convertSecond(actualTime, 0)
//           : this.convertSecond(actualTime + 1, 0));
//     case "REMOVE_SESSION":
//       return (result =
//         ancientTime === 1
//           ? this.convertSecond(actualTime, 0)
//           : this.convertSecond(actualTime - 1, 0));
//     default:
//       return `00:00`;
//   }
// };
