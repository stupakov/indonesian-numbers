var {number, combineDigits, findSubArray} = require('../src/number');

describe("number()", function() {
  it("returns the number in indonesian", function() {
    expect(number(0)).toEqual("nol");
    expect(number(1)).toEqual("satu");
    expect(number(2)).toEqual("dua");
    expect(number(3)).toEqual("tiga");
    expect(number(4)).toEqual("empat");
    expect(number(5)).toEqual("lima");
    expect(number(6)).toEqual("enam");
    expect(number(7)).toEqual("tujuh");
    expect(number(8)).toEqual("delapan");
    expect(number(9)).toEqual("sembilan");

    expect(number(10)).toEqual("sepuluh");
    expect(number(11)).toEqual("sebelas");
    expect(number(12)).toEqual("dua belas");
    expect(number(19)).toEqual("sembilan belas");

    expect(number(20)).toEqual("dua puluh");
    expect(number(21)).toEqual("dua puluh satu");
    expect(number(34)).toEqual("tiga puluh empat");

    expect(number(100)).toEqual("seratus");
    expect(number(101)).toEqual("seratus satu");
    expect(number(110)).toEqual("seratus sepuluh");
    expect(number(111)).toEqual("seratus sebelas");
    expect(number(112)).toEqual("seratus dua belas");
    expect(number(120)).toEqual("seratus dua puluh");
    expect(number(121)).toEqual("seratus dua puluh satu");
    
    expect(number(200)).toEqual("dua ratus");
    expect(number(221)).toEqual("dua ratus dua puluh satu");
    
    expect(number(1000)).toEqual("seribu");
    expect(number(1100)).toEqual("seribu seratus");
    expect(number(1101)).toEqual("seribu seratus satu");
    expect(number(1110)).toEqual("seribu seratus sepuluh");
    expect(number(1111)).toEqual("seribu seratus sebelas");
    expect(number(1112)).toEqual("seribu seratus dua belas");
    expect(number(1120)).toEqual("seribu seratus dua puluh");
    expect(number(1121)).toEqual("seribu seratus dua puluh satu");
    expect(number(1200)).toEqual("seribu dua ratus");
    expect(number(1221)).toEqual("seribu dua ratus dua puluh satu");

    expect(number(2000)).toEqual("dua ribu");
    expect(number(5000)).toEqual("lima ribu");
    expect(number(9999)).toEqual("sembilan ribu sembilan ratus sembilan puluh sembilan");

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
