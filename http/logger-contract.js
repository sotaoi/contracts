class Logger {
  notice(...textArr) {
    throw new Error('Logger has missing "notice" implementation');
  }
  info(...textArr) {
    throw new Error('Logger has missing "info" implementation');
  }
  warn(...textArr) {
    throw new Error('Logger has missing "warn" implementation');
  }
  error(...textArr) {
    throw new Error('Logger has missing "error" implementation');
  }
  estack(err) {
    throw new Error('Logger has missing "estack" implementation');
  }
  wstack(err) {
    throw new Error('Logger has missing "wstack" implementation');
  }
}

module.exports = { Logger };
