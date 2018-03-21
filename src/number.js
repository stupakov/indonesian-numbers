
// TODO: rewrite this program in clojure

const digits = {
  1: "satu",
  2: "dua",
  3: "tiga",
  4: "empat",
  5: "lima",
  6: "enam",
  7: "tujuh",
  8: "delapan",
  9: "sembilan",
}

const divisors = {
  0:  undefined,
  1: "puluh",
  2: "ratus",
  3: "ribu",
  5: "juta"
}

// 2,345,678
// 2
//  ,000,000
//   300
//    40
//     5
//      ,000
//       600 (6 x 100)
//        70 (7 x 10)
//         8

const digit = (num) => {
  return digits[num];
}

const number = (num) => {
  // special case for zero
  if (num === 0) {
    return "nol"
  }

  // console.log(">>>>>", num);

  var count = 0;
  var digits = [];

  while (num > 0) {
    var lsd = num % 10;
    num = Math.floor(num / 10);
    // console.log(digit(lsd), divisors[count]);

    if (lsd != 0) {
      if (divisors[count] !== undefined) {
        digits.push(divisors[count])
      }
      digits.push(digit(lsd))
    }

    count++;
  }

  return combineDigits(digits.reverse()).join(" ");
}

const reductions = [
  {
    from: ["satu", "puluh"],
      to: ["sepuluh"]
  },
  {
    from: ["satu", "ratus"],
      to: ["seratus"]
  },
  {
    from: ["satu", "ribu"],
      to: ["seribu"]
  },
  {
    from: ["satu", "juta"],
      to: ["sejuta"]
  },
  {
    from: ["sepuluh", "satu"],
      to: ["sebelas"]
  },
  {
    from: ["sepuluh", "dua"],
      to: ["dua", "belas"]
  },
  {
    from: ["sepuluh", "tiga"],
      to: ["tiga", "belas"]
  },
  {
    from: ["sepuluh", "empat"],
      to: ["empat", "belas"]
  },
  {
    from: ["sepuluh", "lima"],
      to: ["lima", "belas"]
  },
  {
    from: ["sepuluh", "enam"],
      to: ["enam", "belas"]
  },
  {
    from: ["sepuluh", "tujuh"],
      to: ["tujuh", "belas"]
  },
  {
    from: ["sepuluh", "delapan"],
      to: ["delapan", "belas"]
  },
  {
    from: ["sepuluh", "sembilan"],
      to: ["sembilan", "belas"]
  }
];

// export only for testing
const combineDigits = (list) => {
  // recursive.
  //
  // loop over reductions
  // if the "from" sequence exists in the list
  // replace it with the "to" sequence
  // finish if the previous iteration and next one are the same

  var applyingReductions = false;

  reductions.forEach( (reduction) => {
    var indexOfReducibleSequence = findSubArray(list, reduction.from);

    if (indexOfReducibleSequence !== -1) {
      // replace the "from" with the "to"
      list.splice(indexOfReducibleSequence, reduction.from.length, ...reduction.to)

      applyingReductions = true;
    }
  })

  if (applyingReductions) {
    // iterate again in case we need to apply another set of reductions
    return combineDigits(list);
  }

  // none were applied; return the list as-is.
  return list;
}

// export only for testing
const findSubArray = (array, query) => {
  const maxIndexToCheck = array.length - query.length + 1;

  for (var i=0; i<maxIndexToCheck; i++) {
    var queryPossiblyFound = true;
    for (var j=0; j<query.length; j++) {
      if(array[i+j] !== query[j]) {
        queryPossiblyFound = false;
        continue; // mismatch. abort checking this query
      }
    }
    if (queryPossiblyFound) {
      return i; // all characters of this query were found at index i of array
    }
  }

  return -1;
}

module.exports = {
  number,
  combineDigits,
  findSubArray
};
