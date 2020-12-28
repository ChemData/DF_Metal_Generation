const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class Metal {
  
	constructor(name, advanced=false, usable=false, allow_from_ores=true, constituent_metals=[], from_vanilla=false) {
	this.name = name;
	this.strength_value = 0;
	this.aesthetic_value = 0;
	this.material_properties = {};
	this.advanced = advanced;
	this.usable = usable;
	this.allow_from_ores = allow_from_ores;
	
	let lower_name = this.name.toLowerCase();
	this.material_properties['STATE_NAME_ADJ'] = {
	  'ALL_SOLID':lower_name,
	  'LIQUID':'molten '+lower_name,
	  'GAS':'boiling '+lower_name};
	this.material_properties['USE_MATERIAL_TEMPLATE'] = 'METAL_TEMPLATE'
	
	this.alloy = false;
	this.constituent_metals = [];
	this.constituent_amounts = [];
	if (constituent_metals.length > 0) {
	  this.alloy = true;
	  for (let i = 0; i < constituent_metals.length; i++) {
	    this.constituent_metals = this.constituent_metals.concat(constituent_metals[i][0]);
		this.constituent_amounts = this.constituent_amounts.concat(constituent_metals[i][1]);
		}
	}
  this.from_vanilla = from_vanilla
	this.precursor = null;
	this.extra_ingredient = null;
	
	}
		
	randomPhysicalProperties() {
		/**
		*Generate physical properties for the Metal.
		*/
    let tensile_yield = pickNormal(TENSILE_YIELD_DIST);
    let tensile_strength = pickNormal(TENSILE_STRENGTH_DIST);
    let G = pickNormal(G_DIST);
    let K = pickNormal(K_DIST);
    let new_properties = this.materialCalcs(G, K, tensile_yield, tensile_strength);
    this.material_properties = {...this.material_properties, ...new_properties};
    this.material_properties['MELTING_POINT'] = pickNormal(MELTING_DIST);
    this.material_properties['BOILING_POINT'] = pickNormal(BOILING_DIST);
    this.material_properties['SOLID_DENSITY'] = pickSkewNormal(DENSITY_DIST);
    this.material_properties['LIQUID_DENSITY'] = pickSkewNormal(LIQUID_DENSITY_MULT_DIST) * 
      this.material_properties['SOLID_DENSITY'];
    this.material_properties['MOLAR_MASS'] = pickNormal(MOLAR_MASS_DIST);
    this.material_properties['SPEC_HEAT'] = pickNormal(SPEC_HEAT_DIST);
    
    // Convert to DF units
    this.material_properties['MELTING_POINT'] = 
      this.material_properties['MELTING_POINT'] * 9 / 5 + 9508.33;
    this.material_properties['BOILING_POINT'] = 
      this.material_properties['BOILING_POINT'] *9 / 5 + 9508.33;
    this.material_properties['SOLID_DENSITY'] = 
      this.material_properties['SOLID_DENSITY'] * 1000;
    this.material_properties['LIQUID_DENSITY'] = 
      this.material_properties['LIQUID_DENSITY'] * 1000;
    this.material_properties['MOLAR_MASS'] =
      this.material_properties['MOLAR_MASS'] * 1000;
	}

  materialCalcs(G, K, tensile_yield, tensile_strength, shear_yield=null,
    shear_strength=null, compressive_yield=null, compressive_strength=null) {
    /**
    *Fill out the material properties of a metal from some basic inputs.
    */
    let E = 9 * K * G / (3 * K + G);  //Young's modulus
    
    if (shear_yield === null) {
      shear_yield = tensile_yield;
    }
    if (shear_strength === null) {
      shear_strength = tensile_strength;
    }
    if (compressive_yield === null) {
      compressive_yield = tensile_yield * 3.5;
    }
    if (compressive_strength === null) {
      compressive_strength = tensile_strength * 3.5;
    }
    let bending_yield = Math.min(tensile_yield, compressive_yield);
    let bending_strength = Math.min(tensile_strength, compressive_strength);
    
    // calculate stains at yield (sar)
    let compressive_sar = compressive_yield * 100 / K;
    let tensile_sar = tensile_yield * 100 / E;
    let shear_sar = shear_yield * 100 / G;
    let bending_sar = shear_yield * 100 / G * Math.min(1, shear_yield / bending_yield);
    
    let values = {};
    values['IMPACT_YIELD'] = values['COMPRESSIVE_YIELD'] = compressive_yield * 1000;
    values['IMPACT_FRACTURE'] = values['COMPRESSIVE_FRACTURE'] = compressive_strength * 1000;
    values['IMPACT_STRAIN_AT_YIELD'] = values['COMPRESSIVE_STRAIN_AT_YIELD'] = compressive_sar;
    values['TENSILE_YIELD'] = tensile_yield * 1000;
    values['TENSILE_FRACTURE'] = tensile_strength * 1000;
    values['TENSILE_STRAIN_AT_YIELD'] = tensile_sar;
    values['TORSION_YIELD'] = shear_yield * 1000;
    values['TORSION_FRACTURE'] = shear_strength * 1000;
    values['TORSION_STRAIN_AT_YIELD'] = shear_sar;
    values['SHEAR_YIELD'] = shear_yield * 1000;
    values['SHEAR_FRACTURE'] = shear_strength * 1000;
    values['SHEAR_STRAIN_AT_YIELD'] = shear_sar;
    values['BENDING_YIELD'] = bending_yield * 1000;
    values['BENDING_FRACTURE'] = bending_strength * 1000;
    values['BENDING_STRAIN_AT_YIELD'] = bending_sar;
    values['K'] = K;
    values['G'] = G;
    values['E'] = E;
    
    return values;
  }
  
  addUseFlags() {
    //Add the appropriate flags to a metal.
    if (this.usable) {
      this.material_properties['ITEMS_METAL'] = true;
      this.material_properties['ITEMS_HARD'] = true;
      this.material_properties['ITEMS_BARRED'] = true;
      this.material_properties['ITEMS_SCALED'] = true;
      this.material_properties['MAX_EDGE'] = 10000;
    }
    if (this.strength() >= 1) {
      this.material_properties['ITEMS_WEAPON'] = true;
      this.material_properties['ITEMS_WEAPON_RANGED'] = true;
      this.material_properties['ITEMS_AMMO'] = true;
      this.material_properties['ITEMS_DIGGER'] = true;
      this.material_properties['ITEMS_ARMOR'] = true;
    }
    if (this.strength() > 1.7) {
      this.material_properties['ITEMS_ANVIL'] = true;
    }
  }

  calculateValue(known_aesthetic_value=null) {
    /**Determine the strength-value and total value of a metal. The strength and aesthetic value
    *must already be known.
    */
    if (this.strength() >= 1) {
      this.strength_value = 9.58 * this.strength() - 7.64; // Thisequation is given by an OLS fit of the useful vanilla metals
    } else {
      this.strength_value = 0;
    }
    
    if (known_aesthetic_value === null) {
      this.aesthetic_value = pickLognormal(VALUE_DIST);
    } else {
      this.aesthetic_value = known_aesthetic_value;
    }
    
    let value = this.aesthetic_value + this.strength_value;
    if (value < 20) {
      value = Math.round(value);
    } else {
      value = 5 * Math.round(value / 5);
    }
    value = Math.max(value, 2);
    this.material_properties['MATERIAL_VALUE'] = value;      
  }
  
  determineAppearance() {
    //Determine the color of the metal
    let color;
    if (this.alloy === false) {
      if (this.aesthetic_value < 6) {
        color = pickMetalColor('basic');
      } else if (this.aesthetic_value < 30) {
        color = pickMetalColor('fancy');
      } else {
        color = pickMetalColor('rare');
      }
    } else {
      color = pickAlloyColor(this.constituent_metals[0].color_name)
    }
    this.color_name = color[0];
    this.material_properties['DISPLAY_COLOR'] = color[1];
    this.material_properties['BUILD_COLOR'] = color[1];
    this.material_properties['STATE_COLOR'] = {'ALL_SOLID': color[2]};
  }
  
  strength(){
    //Determine the strength value of the metal. This is a simplified picture of how strong it is.
    return (this.material_properties['COMPRESSIVE_FRACTURE'] +
      this.material_properties['TENSILE_FRACTURE'] + 
      this.material_properties['SHEAR_FRACTURE']) / 1000000;
  }
  
  rawText() {
    //Return this metal formated for inclusion in a raw file.
    if (this.vanilla) {
      return ''
    }
    let order = [
      'USE_MATERIAL_TEMPLATE',
      'STATE_NAME_ADJ',
      'DISPLAY_COLOR',
      'BUILD_COLOR',
      'MATERIAL_VALUE',
      'SPEC_HEAT',
      'MELTING_POINT',
      'BOILING_POINT',
      'SOLID_DENSITY',
      'LIQUID_DENSITY',
      'MOLAR_MASS',
      'IMPACT_YIELD',
      'IMPACT_FRACTURE',
      'IMPACT_STRAIN_AT_YIELD',
      'COMPRESSIVE_YIELD',
      'COMPRESSIVE_FRACTURE',
      'COMPRESSIVE_STRAIN_AT_YIELD',
      'TENSILE_YIELD',
      'TORSION_FRACTURE',
      'TORSION_STRAIN_AT_YIELD',
      'SHEAR_YIELD',
      'SHEAR_FRACTURE',
      'SHEAR_STRAIN_AT_YIELD',
      'BENDING_YIELD',
      'BENDING_FRACTURE',
      'BENDING_STRAIN_AT_YIELD',
      'MAX_EDGE',
      'ITEMS_WEAPON',
      'ITEMS_WEAPON_RANGED',
      'ITEMS_AMMO',
      'ITEMS_DIGGER',
      'ITEMS_ARMOR',
      'ITEMS_ANVIL',
      'ITEMS_HARD',
      'ITEMS_METAL',
      'ITEMS_BARRED',
      'ITEMS_SCALED',
      'STATE_COLOR']
      
    let output = '[INORGANIC:' + this.name.toUpperCase() + ']';
    for (i=0; i < order.length; i++) { 
      let property = order[i];
      let value = this.material_properties[property];
      if (property in this.material_properties) {
        if (typeof value === 'boolean') {
          output += `\n\t[${property}]`;
        } else if (typeof value === 'object') {
          unpack_dict(value).forEach(line => 
            output += `\n\t[${property}:${line}]`);
        } else if (~(typeof value === 'boolean')) {
          if (typeof value === 'number') {
            output += `\n\t[${property}:${Math.round(value)}]`;
          } else {
            output += `\n\t[${property}:${value}]`;
          }
        }
       }
    }
    return output
  }

  reactionRawText() {
    //Return a string describing the production of an alloy.
    if (this.vanilla) {
      return '';
    }
    let output = '';
    if (this.alloy) {
      // Make the reaction from ore
      output += `\n\n[REACTION:${this.name.toUpperCase()}_MAKING]`;
      output += `\n[NAME:make ${this.name.toLowerCase()} bars (use ore)]`;
      output += `\n[BUILDING:SMELTER:NONE]`;
      for (i = 0; i < this.constituent_metals.length; i++) {
        var metal = this.constituent_metals[i];
        output += `\n[REAGENT:${LETTERS[i]}:${this.constituent_amounts[i]}:METAL_ORE:${metal.name.toUpperCase()}]`;
      }
      output += `\n[PRODUCT:100:${sum(this.constituent_amounts) * 4}:BAR:NO_SUBTYPE:METAL:${this.name.toUpperCase()}]`;
      output += `[PRODUCT_DIMENSION:150]\n[FUEL]\n[SKILL:SMELT]`;
      
      // Make the reaction from bars
      output += `\n\n[REACTION:${this.name.toUpperCase()}_MAKING2]`;
      output += `\n[NAME:make ${this.name.toLowerCase()} bars (use bars)]`;
      output += `\n[BUILDING:SMELTER:NONE]`;
      for (i = 0; i < this.constituent_metals.length; i++) {
        var metal = this.constituent_metals[i];
        output += `\n[REAGENT:${LETTERS[i]}:${this.constituent_amounts[i] * 150}:BAR:NO_SUBTYPE:METAL:${metal.name.toUpperCase()}]`;
      }
      output += `\n[PRODUCT:100:${sum(this.constituent_amounts)}:BAR:NO_SUBTYPE:METAL:${this.name.toUpperCase()}]`;
      output += `[PRODUCT_DIMENSION:150]\n[FUEL]\n[SKILL:SMELT]`;
      return output
      }
      if (this.advanced) {
        output += `\n\n[REACTION:${this.name.toUpperCase()}_MAKING]`;
        output += `\n[NAME:make ${this.name.toLowerCase()} bars]`;
        output += `\n[BUILDING:SMELTER:NONE]`;
        output += `\n[REAGENT:A:150:BAR:NO_SUBTYPE:METAL:${this.precursor.name.toUpperCase()}]`;
        if (this.extra_ingredient == 'flux') {
          output += `\n[REAGENT:B:1:BOULDER:NO_SUBTYPE:NONE:NONE][REACION_CLASS:FLUX]`;
        } else {
            output += `\n[REAGENT:B:1:BOULDER:NO_SUBTYPE:INORGANIC:${this.extra_ingredient.toUpperCase()}]`;
        }
        output += `\n[PRODUCT:100:1:BAR:NO_SUBTYPE:METAL:${this.name.toUpperCase()}]`;
        output += `[PRODUCT_DIMENSION:150]\n[FUEL]\n[SKILL:SMELT]`;
        return output;
      } else {
        return ''
      }
    }
  
  entityRawText(advanced) {
  //Return a string describing the reaction(s) to make this metal for inclusion in the entity_default raw file.
    if (this.vanilla) {
      return '';
    }
    if (~advanced & this.advanced) {
      return '';
    }
    if (advanced & ~this.advanced) {
      return '';
    }
    var output = `\n\t[PERMITTED_REACTION:${this.name.toUpperCase()}_MAKING]`;
    if (this.allow_from_ores) {
      output += `\n\t[PERMITTED_REACTION:${this.name.toUpperCase()}_MAKING2]`;
    }
    return output
  }   
}

class Ore {

  constructor(name, rarity, metals, metal_probs, native_ore) {
    this.name = name;
    this.rarity = Math.round(rarity);
    if (typeof(metals) === Metal) {
      metals = [metals];
    }
    this.metals = metals;
    if (metal_probs === null) {
      metal_probs = new Array(metals.length);
      metal_probs.fill(1)
    }
    this.metal_probs = metal_probs;
    this.native_ore = native_ore;
    
    if (this.native_ore & (this.metals.length > 1)) {
      throw "A native ore can only produce a single metal.";
    }
    this.properties = {};
    this.addProperties();
    this.determineLocation();
  }
  
  addProperties() {
    this.properties['IS_STONE'] = true;
    this.properties['ITEM_SYMBOL'] = "'*'";
    this.properties['TILE'] = 156; //Could also use 139
    this.properties['METAL_ORE'] = [];
    let metal_name, metal_prob
    for (let i=0; i<this.metals.length; i++) {
      metal_name = this.metals[i].name.toUpperCase();
      metal_prob = Math.round(this.metal_probs[i] * 100)
      this.properties['METAL_ORE'] = this.properties['METAL_ORE'].concat(`${metal_name}:${metal_prob}`);
    }
    
    this.properties['STATE_NAME_ADJ'] = {};
    
    if (this.native_ore) {
      let metal_name = this.metals[0].name;
      this.name = `native_${metal_name}`;
      let simple_name = `native ${metal_name}`;
      this.properties['STATE_NAME_ADJ']['ALL_SOLID'] = simple_name;
      this.properties['STATE_NAME_ADJ']['LIQUID'] = `molten ${simple_name}`;
      this.properties['STATE_NAME_ADJ']['GAS'] = `boiling ${simple_name}`;
      this.properties['ITEMS_HARD'] = true;
      this.properties['DISPLAY_COLOR'] = this.metals[0].material_properties['DISPLAY_COLOR'];
      this.properties['MAX_EDGE'] = 1000  //you can't make weapons out of unsmelted native ores
      let metal_props_names = [
        'SPEC_HEAT', 'MATERIAL_VALUE', 'MELTING_POINT', 'BOILING_POINT', 'SOLID_DENSITY', 'LIQUID_DENSITY',
        'MOLAR_MASS', 'IMPACT_YIELD', 'IMPACT_FRACTURE', 'IMPACT_STRAIN_AT_YIELD', 'COMPRESSIVE_YIELD',
        'COMPRESSIVE_FRACTURE', 'COMPRESSIVE_STRAIN_AT_YIELD', 'TENSILE_YIELD', 'TENSILE_FRACTURE',
        'TORSION_STRAIN_AT_YIELD', 'TENSILE_STRAIN_AT_YIELD', 'TORSION_YIELD', 'TORSION_FRACTURE',
        'SHEAR_YIELD', 'SHEAR_FRACTURE', 'SHEAR_STRAIN_AT_YIELD', 'BENDING_YIELD', 'BENDING_FRACTURE',
        'BENDING_STRAIN_AT_YIELD', 'DISPLAY_COLOR'];
      for (i=0; i<metal_props_names.length; i++) {
        let prop = metal_props_names[i];
        if (prop in this.metals[0].material_properties) {
          this.properties[prop] = this.metals[0].material_properties[prop];
        }
      }
    } else {
      this.properties['USE_MATERIAL_TEMPLATE'] = 'STONE_TEMPLATE';
      this.properties['DISPLAY_COLOR'] = pickOreColor();
      this.properties['MATERIAL_VALUE'] = 2;
      this.properties['SOLID_DENSITY'] = 5000;
      this.properties['MELTING_POINT'] = 12736;
      this.properties['STATE_NAME_ADJ']['ALL_SOLID'] = this.name.toLowerCase();
    }
  }
  
  determineLocation() {
    const massive_locs = ['IGNEOUS_ALL', 'ALL_STONE'];
    const major_locs = ['SEDIMENTARY', 'IGNEOUS_EXTRUSIVE', 'IGNEOUS_INTRUSIVE', 'METAMORPHIC'];
    const minor_locs = ['GRANITE', 'LIMESTONE', 'GABBRO', 'OLIVINE', 'SHALE', 'QUARTZITE', 'DOLOMITE',
    'GNEISS', 'QUARTZITE', 'MARBLE', 'SCHIST', 'KIMBERLITE', 'MICROCLINE'];
    
    this.properties['ENVIRONMENT'] = {};
    this.properties['ENVIRONMENT_SPEC'] = {};
    
    let picks;
    let number;
    if (this.rarity == 1) {
      picks = randomChoice(major_locs, null)[0];
      this.properties['ENVIRONMENT'][picks] = 'CLUSTER:100';
    } else if (this.rarity == 2) {
      if (Math.random() < 0.5) {
        picks = randomChoice(major_locs, null, 2, false);
        picks.forEach(pick => this.properties['ENVIRONMENT'][pick] = 'VEIN:100');
      } else {
        picks = randomChoice(massive_locs, null, 1, false);
      }
      picks.forEach(pick =>this.properties['ENVIRONMENT'][pick] = 'VEIN:100');
    } else if (this.rarity == 3) {
      picks = randomChoice(major_locs, null, 1, false);
      picks.forEach(pick =>this.properties['ENVIRONMENT'][pick] = 'VEIN:100');
    } else if (this.rarity == 4) {
      number = randomChoice([1, 2, 3, 4], null, 1, false)[0];
      picks = randomChoice(minor_locs, null, number, false);
      picks.forEach(pick => this.properties['ENVIRONMENT_SPEC'][pick] = 'VEIN:100');
    } else if (this.rarity == 5) {
      picks = randomChoice(minor_locs, null, 1, false);
      picks.forEach(pick => this.properties['ENVIRONMENT_SPEC'][pick] = 'CLUSTER_SMALL:100');
    } else if (this.rarity == 6) {
      number = randomChoice([1, 2], null, 1, false)[0];
      picks = randomChoice(minor_locs, null, number, false);
      picks.forEach(pick => this.properties['ENVIRONMENT_SPEC'][pick] = 'CLUSTER_SMALL:100');
    } else if (this.rarity == 7) {
      picks = randomChoice(minor_locs, null, 1, false);
      picks.forEach(pick => this.properties['ENVIRONMENT_SPEC'][pick] = 'CLUSTER_ONE:100');
    }
    if (this.rarity != 7) {
      if (this.native) {
        if (Math.random() < 0.7) {
          this.properties['ENVIRONMENT']['ALLUVIAL'] = 'CLUSTER_SMALL:100';
        }
      } else {
        if (Math.random() < 0.3) {
          this.properties['ENVIRONMENT']['ALLUVIAL'] = 'CLUSTER_SMALL:100';
        }
      }
    }
  }
  
  rawText() {
  // Return a string for inclusion in a raw file.
    let order = [
      'USE_MATERIAL_TEMPLATE',
      'STONE_NAME',
      'STATE_NAME',
      'STATE_NAME_ADJ',
      'DISPLAY_COLOR',
      'TILE',
      'ENVIRONMENT',
      'ENVIRONMENT_SPEC',
      'ITEM_SYMBOL',
      'METAL_ORE',
      'MATERIAL_VALUE',
      'SPEC_HEAT',
      'MELTING_POINT',
      'BOILING_POINT',
      'SOLID_DENSITY',
      'LIQUID_DENSITY',
      'MOLAR_MASS',
      'IMPACT_YIELD',
      'IMPACT_FRACTURE',
      'IMPACT_STRAIN_AT_YIELD',
      'COMPRESSIVE_YIELD',
      'COMPRESSIVE_FRACTURE',
      'COMPRESSIVE_STRAIN_AT_YIELD',
      'TENSILE_YIELD',
      'TORSION_FRACTURE',
      'TORSION_STRAIN_AT_YIELD',
      'SHEAR_YIELD',
      'SHEAR_FRACTURE',
      'SHEAR_STRAIN_AT_YIELD',
      'BENDING_YIELD',
      'BENDING_FRACTURE',
      'BENDING_STRAIN_AT_YIELD',
      'ITEMS_HARD',
      'IS_STONE'];
    let output = `[INORGANIC:${this.name.toUpperCase()}]`;
    let prop;
    for (i=0; i<order.length; i++) {
      prop = order[i];
      if (prop in this.properties) {
        let value = this.properties[prop];
        if ((typeof(value) == 'boolean') & (value)) {
          output += `\n\t[${prop}]`;
        } else if (Array.isArray(value)) {
          value.forEach(arr_piece => output += `\n\t[${prop}:${arr_piece}]`);
        } else if (typeof(value) ==  'object') {
          unpack_dict(value).forEach(line => output += `\n\t[${prop}:${line}]`);
        } else if (typeof(value) != 'bool') {
          if (typeof(value) == 'number') {
            output += `\n\t[${prop}:${Math.round(value)}]`;
          } else {
            output += `\n\t[${prop}:${value}]`;
          }
        }
      }
    }
    return output
  }

}

function randomMetal(name) {
  //Make a basic metal with random properties
  let new_metal = new Metal(name, false, true, true, []);
  new_metal.randomPhysicalProperties();
  new_metal.addUseFlags();
  new_metal.calculateValue();
  new_metal.determineAppearance();
  return new_metal
}

function makeAlloy(metals, amounts, name) {
  /**Generate a Metal which is an alloy.
  * @metals {array} List of Metals that the alloy is made of.
  * @amounts {array} Amount of each Metal in the alloy.
  * @name {string} Name of the alloy.
  */
  let output_alloy = new Metal(name, false, true, true, zip(metals, amounts));
  let G = weightedSum(metals.map(metal => metal.material_properties['G']), amounts) * pickNormal(ALLOY_MULTIPLIER);
  let K = weightedSum(metals.map(metal => metal.material_properties['K']), amounts) * pickNormal(ALLOY_MULTIPLIER);
  let tensile_yield = weightedSum(metals.map(metal => metal.material_properties['TENSILE_YIELD']), amounts) * pickNormal(ALLOY_MULTIPLIER)/1000;
  let tensile_fracture = weightedSum(metals.map(metal => metal.material_properties['TENSILE_FRACTURE']), amounts) * pickNormal(ALLOY_MULTIPLIER)/1000;
  let properties = output_alloy.materialCalcs(G, K, tensile_yield, tensile_fracture);
  
  properties['LIQUID_DENSITY'] = weightedSum(metals.map(metal => metal.material_properties['LIQUID_DENSITY']), amounts);
  properties['SOLID_DENSITY'] = weightedSum(metals.map(metal => metal.material_properties['SOLID_DENSITY']), amounts);
  properties['MOLAR_MASS'] = weightedSum(metals.map(metal => metal.material_properties['MOLAR_MASS']), amounts);
  properties['MELTING_POINT'] = weightedSum(metals.map(metal => metal.material_properties['MELTING_POINT']), amounts);
  properties['BOILING_POINT'] = weightedSum(metals.map(metal => metal.material_properties['BOILING_POINT']), amounts);
  
  output_alloy.material_properties = {...output_alloy.material_properties, ...properties};
  output_alloy.addUseFlags();
  let aesthetic_value = weightedSum(metals.map(metal => metal.aesthetic_value), amounts);
  output_alloy.calculateValue(aesthetic_value);
  output_alloy.determineAppearance();
  return output_alloy;
}

function makeStepMetal(precursor, extra_ingredient, name) {
  /**Generate a Metal which is one step on the way to making an advanced metal
  * @precursor {Metal} The metal which is needed to make the step metal.
  * @extra_ingredient {string} The ingredient which is added to make the step metal.
  * @name {string} What to call the step metal.
  */
  var step_metal = new Metal(name, true, false, false);
  step_metal.material_properties = JSON.parse(JSON.stringify(precursor.material_properties));
  
  step_metal.precursor = precursor;
  step_metal.extra_ingredient = extra_ingredient;
  step_metal.color_name = precursor.color_name;
  return step_metal
}

function makeAdvancedMetal(precursor, extra_ingredient, bonus, name) {
  /**Create an advanced Metal which sits at the end of a product chain (e.g. steel).
  * @precursor {Metal} THe metal which the advanced metal is made from.
  * @extra_ingredient {string} The special ingredient which must be used to make this metal.
  * @bonus (float) How much to improve the physical properties of this metal by.
  * @name {string} The name of the advanced metal.
  **/
  let adv_metal = new Metal(name, true, true, false);
  adv_metal.precursor = precursor;
  adv_metal.extra_ingredient = extra_ingredient;
  adv_metal.randomPhysicalProperties();
  
  multiplier = Math.log(bonus) + 2;
  let G = precursor.material_properties['G'] * multiplier;
  let K = precursor.material_properties['K'] * multiplier;
  let tensile_yield = precursor.material_properties['TENSILE_YIELD'] * multiplier/1000;
  let tensile_fracture = precursor.material_properties['TENSILE_FRACTURE'] * multiplier/1000;
  let properties = adv_metal.materialCalcs(G, K, tensile_yield, tensile_fracture);
  
  adv_metal.material_properties = {...adv_metal.material_properties, ...properties};
  adv_metal.addUseFlags();
  adv_metal.calculateValue(adv_metal.aesthetic_value);
  adv_metal.determineAppearance();
  
  return adv_metal;
}

function unpack_dict(input_dict) {
//Unpack a dictionary of properties into a series of strings.

  let output = [];
  let to_add;
  for (const [name, value] of Object.entries(input_dict)) {
    if (typeof(value) === 'object') {
      to_add = unpack_dict(value);
    } else {
      to_add = [`${value}`];
    }
    to_add.forEach(x => output = output.concat(`${name}:${x}`));
  }
  return output
}

