class SocketContract {
  connect(url, options) {
    throw new Error('SocketContract has missing "connect" implementation');
  }

  io() {
    throw new Error('SocketContract has missing "io" implementation');
  }
}

module.exports = { SocketContract };
