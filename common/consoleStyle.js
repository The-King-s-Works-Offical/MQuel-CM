class ConsoleStyle {
  constructor() {
    this.Reset = "\x1b[0m";
    this.Bright = "\x1b[1m";
    this.Dim = "\x1b[2m";
    this.Underscore = "\x1b[4m";
    this.Blink = "\x1b[5m";
    this.Reverse = "\x1b[7m";
    this.Hidden = "\x1b[8m";

    this.FgBlack = "\x1b[30m";
    this.FgRed = "\x1b[31m";
    this.FgGreen = "\x1b[32m";
    this.FgYellow = "\x1b[33m";
    this.FgBlue = "\x1b[34m";
    this.FgMagenta = "\x1b[35m";
    this.FgCyan = "\x1b[36m";
    this.FgWhite = "\x1b[37m";
    this.FgGray = "\x1b[90m";

    this.BgBlack = "\x1b[40m";
    this.BgRed = "\x1b[41m";
    this.BgGreen = "\x1b[42m";
    this.BgYellow = "\x1b[43m";
    this.BgBlue = "\x1b[44m";
    this.BgMagenta = "\x1b[45m";
    this.BgCyan = "\x1b[46m";
    this.BgWhite = "\x1b[47m";
    this.BgPurple = "\x1b[48m";
    this.BgGray = "\x1b[100m";
  }
  constructorLog(log) {
    return `\n${this.BgGreen}${this.FgWhite} CONSTRUCTOR : ${this.Reset} ${log} ${this.Reset}`;
  }
  log(log) {
    return `${this.BgCyan}${this.FgBlack} INFO : ${this.Reset} ${log} ${this.Reset}`;
  }
  error(log) {
    return `\n${this.BgRed}${this.FgWhite} ERROR : ${this.Reset} ${log} ${this.Reset}`;
  }
  warn(log) {
    return `\n${this.BgYellow}${this.FgBlack} WARNING : ${this.Reset} ${log} ${this.Reset}`;
  }
  object(obj) {
    return obj;
  }
  methodLog(log) {
    return `${this.BgGreen}${this.FgWhite} METHOD CONSTRUCTOR : ${this.Reset} ${log} ${this.Reset}`;
  }
  methodCommentLog(log) {
    return `${this.BgGray}${this.FgWhite} METHOD COMMENT : ${this.Reset} ${log} ${this.Reset}`;
  }
}

const cs = new ConsoleStyle();

module.exports = cs;
