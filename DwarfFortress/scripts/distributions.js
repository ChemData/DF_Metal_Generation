//  normal distributions (mean, std, min)
const TENSILE_YIELD_DIST = [78, 90, 10];  // in MPa
const TENSILE_STRENGTH_DIST = [178.5, 139, 10];  // in MPa
const K_DIST = [98, 74, 3];  // in GPa
const G_DIST = [45, 20, 2];  // in GPa
const MELTING_DIST = [1300, 400, 300];  // in K
const BOILING_DIST = [2700, 700, 1200];  // in K
const MOLAR_MASS_DIST = [111, 30, 10];  // in g/mol
const SPEC_HEAT_DIST = [300, 100, 100];  // unknown units
const ALLOY_MULTIPLIER = [1, 0.7, 0.1];  // unitless (used to modify an alloy's mechanical properties)

// skew normal distributions (mean, std, skew, min)
const DENSITY_DIST = [5, 9, 0.5, 4];  // in g/mL
const LIQUID_DENSITY_MULT_DIST = [1, 0.07, null, -1.7];

// lognormal (sigma, scale, min)
const VALUE_DIST = [1, 8, null];


function pickNormal(params) {
  let mean = params[0];
  let standard_dev = params[1];
  let min = params[2];
	let u1 = Math.random();
	let u2 = Math.random();
	let value = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * standard_dev + mean;
  if (min === null) {
    return value;
  }
  return Math.max(value, min);
}

function pickSkewNormal(params) {
  let mean = params[0];
  let standard_dev = params[1];
  let skew = params[2];
  let min = params[3];
	let x1 = pickNormal([0, 1, null]);
	let x2 = pickNormal([0, 1, null]);
	let value = (skew * Math.abs(x1) + x2) / Math.sqrt(1 + skew**2) * standard_dev + mean;
    if (min === null) {
    return value;
  }
  return Math.max(value, min);
}

function pickLognormal(params) {
  let sigma = params[0];
  let scale = params[1];
  let min = params[2];
	let value = Math.exp(pickNormal([Math.log(scale), sigma, null]));
  if (min === null) {
    return value;
  }
  return Math.max(value, min);
}

  
