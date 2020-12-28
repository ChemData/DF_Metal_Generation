function sum(input_array) {
  //Sum an array
  return input_array.reduce((a, b) => a + b, 0);
}

function weightedSum(values, weights) {
  /**Perform a weighted sum of some values.
  * @values {array} Values to sum.
  * @weights {array} The weights of those values.
  **/
  if (values.length != weights.length) {
    throw "The length of 'values' and 'weights' must be the same.";
  }
  weights = normalize(weights);
  output = 0;
  for (i=0; i < weights.length; i++) {
    output += values[i]*weights[i];
  }
  return output;  
}

function array_divide(input_array, divisor) {
  //Divide each value in an array by a value.
  let output = [];
  input_array.forEach(n_element => output = output.concat(n_element/divisor));
  return output;
}

function normalize(input_array) {
  //Normalize values in array so that they sum to 1.
  let s = sum(input_array);
  return array_divide(input_array, s);
}

function zip(array1, array2) {
  /** Interlace two arrays into a single array of n, len-2 arrays.
  * @array1 {array} First array to combine.
  * @array2 {array} Second array to combine.
  */
  if (array1.length != array2.length) {
    throw "The input arrays are not the same length."
  }
  let output = []
  for (i=0; i < array1.length; i++) {
    output = output.concat([[array1[i], array2[i]]]);
  }
  return output;
}
  
function unzip(input_array) {
  //Convert an array of len-2 arrays into 2 arrays
  //unzip([['a', 2], ['b', 4]] -> [['a', 'b'], [2, 4]]
  let output = [[], []];
  for (i=0; i < input_array.length; i++) {
    output[0] = output[0].concat(input_array[i][0]);
    output[1] = output[1].concat(input_array[i][1]);
  }
  return output;
}
  
function randomChoice(choices, probabilities=null, number=1, replace=false) {
  //Make a random selection from an array with the probabilities provided
  
  choices = [...choices];
  
  
  if (probabilities === null) {
    probabilities = Array(choices.length).fill(1/choices.length);
  } else {
    probabilities = [...probabilities];
  }
  
  if (Math.abs(1 - sum(probabilities)) > 0.0000000001) {
    console.log(choices, probabilities);
    throw `Probabilities must sum to 1 not ${sum(probabilities)}.`;
  }
  let picks = [];
  for (i=0; i< number; i++) {
    if (~replace) {
      probabilities = normalize(probabilities);
    }
    let cumsum = 0;
    pick = Math.random();
    for (j=0; j<choices.length; j++) {
      cumsum += probabilities[j];
      if (pick <= cumsum) {
        if (replace) {
          picks = picks.concat(choices[j]);
        } else {
          picks = picks.concat(choices.splice(j, 1)[0]);
          probabilities.splice(j, 1);
        }
        break;
      }
    }
  }
  return picks;
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function shuffle(input_array) {
  /**
  * Randomly shuffle an array
  **/
  let remaining = [...input_array];
  let output = [];
  for (i=0; i<input_array.length; i++) {
    let pick = randomInt(remaining.length);
    output = output.concat(remaining.splice(pick, 1)[0]);
  }
  return output
}

function range(lower, upper) {
  let output = [];
  for (i=lower; i<upper; i++) {
    output = output.concat(i);
  }
  return output;
}
  
function capitalize(input_string) {
  input_string = input_string.toLowerCase();
  return input_string.charAt(0).toUpperCase() + input_string.slice(1);
}

