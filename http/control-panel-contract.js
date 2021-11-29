class ControlPanel {
  getRoutesConfigGate(prefix) {
    throw new Error('ControlPanel has no "getRoutesConfigGate" implementation');
  }
  getRoutesConfigMain(prefix) {
    throw new Error('ControlPanel has no "getRoutesConfigMain" implementation');
  }
}

module.exports = { ControlPanel };
