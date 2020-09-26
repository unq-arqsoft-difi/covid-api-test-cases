/* eslint-disable class-methods-use-this */
const Sequencer = require('@jest/test-sequencer').default;

// https://jestjs.io/docs/en/configuration#testsequencer-string
class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
