const format = (answer, guess) => {
  var correct="";
  var incorrect=guess;
  var complete=false;
  var matchesSoFar = true;

  for (var i=0; i<guess.length; i++) {
    if(guess.substring(0,i+1) !== answer.substring(0,i+1)) {
      matchesSoFar = false;
    }

    if (matchesSoFar) {
      correct = guess.substring(0,i+1);
      incorrect = guess.substring(i+1);
    } else {
      break;
    }
  }

  if (answer.length === i) {
    complete = true;
  }

  return {
    correct,
    incorrect,
    complete
  }
}

module.exports = {format};
