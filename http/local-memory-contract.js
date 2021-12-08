class LocalMemoryContract {
  async set(key, value) {
    throw new Error('LocalMemory has missing "set" implementation');
  }
  async get(key) {
    throw new Error('LocalMemory has missing "get" implementation');
  }
  async remove(key) {
    throw new Error('LocalMemory has missing "remove" implementation');
  }
}

module.exports = { LocalMemoryContract };
