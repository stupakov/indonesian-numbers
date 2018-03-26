
// TODO: rewrite this program in clojure

const digits = [
  "nol",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
]

// for numbers 0 < n <= 999
const divisors = [
   undefined,
  "puluh",
  "ratus",
  "ribu",
]

const thousands = [
  undefined,
  "ribu",
  "juta",
  "milyar",
]

const digit = (num) => {
  return digits[num];
}

const divisor = (num) => {
  return divisors[num];
}

const thousand = (num) => {
  return thousands[num];
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


// takes a number between 0 and 999,999,999,999 and returns
// a string with the name of that number in Bahasa Indonesia

const numToWords = (num) => {
  // special case for zero
  if (num === 0) {
    return "nol"
  }

  let substrings = [];
  let thousandsCount = 0;

  while(num > 0) {
    var lsds = num % 1000;
    num = Math.floor(num / 1000);

    if (lsds != 0) {
      if (thousand(thousandsCount) !== undefined) {
	substrings.push(thousand(thousandsCount));
      }
      substrings.push(... _numLessThanAThousandToWords(lsds).reverse());
    }
    thousandsCount += 1;
  }

  return combineDigits(substrings.reverse(), intraGroupReductions).join(" ");
}

const _arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const _numLessThanAThousandToWords = (num) => {
  var count = 0;
  var words = [];

  // process digits from least to most significant
  while (num > 0) {
    var lsd = num % 10;
    num = Math.floor(num / 10);

    if (lsd != 0) {
      if (divisor(count) !== undefined) {
        words.push(divisor(count))
      }
      words.push(digit(lsd))
    }

    count++;
  }

  if (_arraysEqual(words, ["satu"])) {
    return ["se"];
  }

  // returns array of words representing the number
  return combineDigits(words.reverse(), interGroupReductions);
}

// order matters. Apply the to ones first.
const interGroupReductions = [
  {
    from: ["satu", "puluh"],
      to: ["sepuluh"]
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
  },
  {
    from: ["satu", "ratus"],
      to: ["seratus"]
  },
];

const intraGroupReductions = [
  {
    from: ["se", "ribu"],
      to: ["seribu"]
  },
  {
    from: ["se", "juta"],
      to: ["sejuta"]
  },
  {
    from: ["se", "milyar"],
      to: ["semilyar"]
  },
  {
    from: ["se"],
      to: ["satu"]
  },
];

// export only for testing
const combineDigits = (list, reductions) => {
  // recursive.
  //
  // loop over reductions
  // if the "from" sequence exists in the list
  // replace it with the "to" sequence
  // finish if the previous iteration and next one are the same

  var applyingReductions = false;

  // use some so that we can stop iterating over the reductions once we find one to apply.
  // only apply one reduction per iteration so they get applied in the order they are defined
  reductions.some( (reduction) => {
    var indexOfReducibleSequence = findSubArray(list, reduction.from);

    if (indexOfReducibleSequence !== -1) {
      // replace the "from" with the "to"
      list.splice(indexOfReducibleSequence, reduction.from.length, ...reduction.to)

      applyingReductions = true;

      return true;
    }
  })

  if (applyingReductions) {
    // iterate again in case we need to apply another set of reductions
    return combineDigits(list, reductions);
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
  numToWords,
  combineDigits,
  findSubArray
};
