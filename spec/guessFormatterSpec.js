const {format} = require('../src/guessFormatter');

describe("GuessFormatter", () => {
  it("returns the guess formatted correctly", () => {
    expect(format("a", "")).toEqual({correct: "", incorrect: "", complete: false})
    expect(format("a", "b")).toEqual({correct: "", incorrect: "b", complete: false})
    expect(format("one two three", "one")).toEqual({correct: "one", incorrect: "", complete: false})
    expect(format("one two three", "onz")).toEqual({correct: "on", incorrect: "z", complete: false})
    expect(format("one two three", "blah")).toEqual({correct: "", incorrect: "blah", complete: false})
    expect(format("one", "one")).toEqual({correct: "one", incorrect: "", complete: true})
  })
})
