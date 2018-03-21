var {numToWords, combineDigits, findSubArray} = require('../src/number');

describe("numToWords()", function() {
  it("returns the number in indonesian", function() {
    expect(numToWords(0)).toEqual("nol");
    expect(numToWords(1)).toEqual("satu");
    expect(numToWords(2)).toEqual("dua");
    expect(numToWords(3)).toEqual("tiga");
    expect(numToWords(4)).toEqual("empat");
    expect(numToWords(5)).toEqual("lima");
    expect(numToWords(6)).toEqual("enam");
    expect(numToWords(7)).toEqual("tujuh");
    expect(numToWords(8)).toEqual("delapan");
    expect(numToWords(9)).toEqual("sembilan");

    expect(numToWords(10)).toEqual("sepuluh");
    expect(numToWords(11)).toEqual("sebelas");
    expect(numToWords(12)).toEqual("dua belas");
    expect(numToWords(19)).toEqual("sembilan belas");

    expect(numToWords(20)).toEqual("dua puluh");
    expect(numToWords(21)).toEqual("dua puluh satu");
    expect(numToWords(34)).toEqual("tiga puluh empat");

    expect(numToWords(100)).toEqual("seratus");
    expect(numToWords(101)).toEqual("seratus satu");
    expect(numToWords(110)).toEqual("seratus sepuluh");
    expect(numToWords(111)).toEqual("seratus sebelas");
    expect(numToWords(112)).toEqual("seratus dua belas");
    expect(numToWords(120)).toEqual("seratus dua puluh");
    expect(numToWords(121)).toEqual("seratus dua puluh satu");

    expect(numToWords(200)).toEqual("dua ratus");
    expect(numToWords(221)).toEqual("dua ratus dua puluh satu");

    expect(numToWords(1000)).toEqual("seribu");
    expect(numToWords(1001)).toEqual("seribu satu");
    expect(numToWords(1100)).toEqual("seribu seratus");
    expect(numToWords(1101)).toEqual("seribu seratus satu");
    expect(numToWords(1110)).toEqual("seribu seratus sepuluh");
    expect(numToWords(1111)).toEqual("seribu seratus sebelas");
    expect(numToWords(1112)).toEqual("seribu seratus dua belas");
    expect(numToWords(1120)).toEqual("seribu seratus dua puluh");
    expect(numToWords(1121)).toEqual("seribu seratus dua puluh satu");
    expect(numToWords(1200)).toEqual("seribu dua ratus");
    expect(numToWords(1221)).toEqual("seribu dua ratus dua puluh satu");

    expect(numToWords(2000)).toEqual("dua ribu");
    expect(numToWords(2001)).toEqual("dua ribu satu");
    expect(numToWords(2010)).toEqual("dua ribu sepuluh");
    expect(numToWords(5000)).toEqual("lima ribu");
    expect(numToWords(9999)).toEqual("sembilan ribu sembilan ratus sembilan puluh sembilan");

    // expect(numToWords(10000)).toEqual("sepuluh ribu");
    // expect(numToWords(10001)).toEqual("sepuluh ribu satu");
    // expect(numToWords(10010)).toEqual("sepuluh ribu sepuluh");
    // expect(numToWords(10100)).toEqual("sepuluh ribu seratus");
    // expect(numToWords(11000)).toEqual("sebelas ribu");
  });
});


describe("combineDigits()", () => {
  it("returns the unchanged list if there is no simplification", () => {
    expect(combineDigits(["seratus"])).toEqual(["seratus"]);
    expect(combineDigits(["dua", "puluh"])).toEqual(["dua", "puluh"]);
  });

  it("returns the simplified version of the given set of digits", () => {
    expect(combineDigits(["satu", "puluh"])).toEqual(["sepuluh"]);
    expect(combineDigits(["satu", "ratus"])).toEqual(["seratus"]);
    expect(combineDigits(["satu", "ribu"])).toEqual(["seribu"]);
    expect(combineDigits(["satu", "juta"])).toEqual(["sejuta"]);

    expect(combineDigits(["sepuluh", "satu"])).toEqual(["sebelas"]);
    expect(combineDigits(["sepuluh", "dua"])).toEqual(["dua", "belas"]);
    expect(combineDigits(["sepuluh", "tiga"])).toEqual(["tiga", "belas"]);
    expect(combineDigits(["sepuluh", "empat"])).toEqual(["empat", "belas"]);
    expect(combineDigits(["sepuluh", "lima"])).toEqual(["lima", "belas"]);
    expect(combineDigits(["sepuluh", "enam"])).toEqual(["enam", "belas"]);
    expect(combineDigits(["sepuluh", "tujuh"])).toEqual(["tujuh", "belas"]);
    expect(combineDigits(["sepuluh", "delapan"])).toEqual(["delapan", "belas"]);
    expect(combineDigits(["sepuluh", "sembilan"])).toEqual(["sembilan", "belas"]);

    expect(combineDigits(["satu", "puluh", "dua"])).toEqual(["dua", "belas"]);
  });
});


describe("findSubArray()", () => {
  it("returns -1 if the query is not in the array", () => {
    expect(findSubArray([1,2], [0])).toEqual(-1);
    expect(findSubArray([1,2,3], [1,3])).toEqual(-1);
    expect(findSubArray([1,2,3], [3,3])).toEqual(-1);
  })

  it("returns -1 even if the query is 'located' beyond the end of the array", () => {
    expect(findSubArray([1,2,3], [3,undefined])).toEqual(-1);
  })

  it("returns the index locating the query if it is found in the array", () => {
    expect(findSubArray([1,2], [1])).toEqual(0);
    expect(findSubArray([1,2], [2])).toEqual(1);
    expect(findSubArray([1,2,3], [2,3])).toEqual(1);
  })

  describe("when the query appears multiple times in the array", () => {
    it("returns the index of the first occurrence of the query in the array", () => {
      expect(findSubArray([1,2,2], [2])).toEqual(1);
      expect(findSubArray([1,2,3,2,3], [2,3])).toEqual(1);
    })
  })
});
