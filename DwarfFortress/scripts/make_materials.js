const METAL_NAMES = ['fertrin', 'obal', 'plectris', 'ris', 'murin', 'drack', 'felin', 'abal', 'torin',
          'paltrice', 'nortrum', 'palsium', 'galsic', 'bolium', 'ersic', 'los', 'amruth', 'othium',
          'actrin', 'shis', 'galtrium', 'ablore', 'efelsium', 'mathril', 'melinc', 'entraper',
          'tallis', 'unthorm', 'neplomb', 'larue', 'marenzium', 'ashtoom', 'plazit', 'sabber',
          'woser', 'yurime', 'pentorneem', 'listelrontin', 'ysaak', 'elaban', "groth'atul", 
          'relt', 'exalit', 'brack', 'nothalin', 'prothagon', 'estor', 'estar',
          'tynok', 'prexor', 'velsium', 'vor', 'toctium', 'trentin', "j'brar", 'klystun', 'bistung',
          'listel', 'gismun', 'effter', 'flilt', 'absoleen', 'beloc', 'fentilin', 'loxtin', 'roteen', 'vantin',
          'bostom', 'atalama', 'cartoleen', 'tep', 'bas', 'nibelum', 'vactoos', 'anitine'];


const ORE_NAMES = ['rentite', 'fentite', 'ossonite', 'palminite', 'palionite', 'festerite', 'malficite',
            'witterite', 'dristite', 'falatite', 'malfiotite', 'cositite', 'chthonicite',
            'orthosite', 'metasite', 'parasite', 'alactite', 'mothrosite', 'bilitite', 'eminite',
            'pectite', 'neofite', 'drektite', 'palatite', 'dufite', 'hellerite', 'hopelite', 'imogolite',
            'cosohedrite', 'sohite', 'benitite', 'acrotite', 'actorite', 'techtite', 'bectite', 'bestite',
            'anitite', 'kerolite', 'kegelite', 'kinoite', 'krotite', 'jaffeite', 'nsutite', 'masuite', 'nahcolite',
            'sellatite', 'sincosite', 'stellerite', 'weloganite', 'wardite'];
            

var GENNED_METALS = null;
var GENNED_ORES = null;
            
function generateMetals(number_of_metals, number_of_alloys=0, number_of_advanced_metals=0) {
  /**Generate and return some metals and their ores.
  *@number_of_metals {int} How many pure metals to generate.
  *@number_of_alloys {int} How many alloys to generate.
  *@number_of_advanced_metals {int} How many advanced metals to generate.
  **/
  let metal_names = shuffle(METAL_NAMES);
  let ore_names = shuffle(ORE_NAMES);
  let vanilla_include = document.getElementById('vanilla_include').value;
  
  //Make metals
  let metals = [];
  let metal_name;
  for (let i=0; i < number_of_metals; i++) {
    if (metal_names.length == 0) {
      throw new NotEnoughNames();
    }
    metal_name = metal_names.pop();
    metals = metals.concat(randomMetal(metal_name));
  }
  
  //Make ores
  let ores = [];
  let ores_for_metal;
  let is_native;
  let metal;
  let rarities;
  let name;
  let other_metal;
  let amount;
  for (let i=0; i<number_of_metals; i++) {
    is_native = false;
    metal = metals[i];
    // Determine the rarity
    if (metal.aesthetic_value < 6) {
      ores_for_metal = randomChoice([1, 2, 3], [.7, .2, .1])[0];
      rarities = randomChoice([1, 2, 3, 4], [.2, .2 ,.4, .2], ores_for_metal, true);
    } else if (metal.aesthetic_value < 30) {
      ores_for_metal = randomChoice([1, 2], [.7, .3])[0];
      rarities = randomChoice([2, 3, 4], [.2, .3, .5], ores_for_metal, true);
    } else {
      is_native = true;
      rarities = randomChoice([3, 4, 5, 6, 7], [.1, .2, .4, .2, .1], 1, true);
    }
    
    let rarity;
    for (let j=0; j<rarities.length; j++) {
      rarity = rarities[j];
      if (is_native) {
        name = null;
      } else {
        if (ore_names.length == 0) {
          throw new NotEnoughNames();
        }
        name = ore_names.pop();
      }
      
      // See if the ore should produce a second metal
      if ((!is_native) & (Math.random() < 0.3)) {
        other_metal = randomChoice(metals)[0];
        if (other_metal != metal) {
          amount = randomChoice([0.25, 0.5, 1])[0];
          ores = ores.concat(new Ore(name, rarity, [metal, other_metal], [1, amount], is_native));
        } else {
          ores = ores.concat(new Ore(name, rarity, [metal], null, is_native));
        }
      } else {
        ores = ores.concat(new Ore(name, rarity, [metal], null, is_native));
      }
    }
  }
  
  //Make alloys
  if (vanilla_include == 'all') {
    metals = metals.concat(VANILLA_BASIC);
  }

  let alloys = [];
  let positions;
  let alloy_metals;
  let amounts;
  for (let i=0; i<number_of_alloys; i++) {
    if (metals.length < 2) {
      throw new NotEnoughBasicMetals();
    }
    positions = shuffle(range(0, metals.length));
    alloy_metals = [metals[positions[0]], metals[positions[1]]];  // add  primary and secondary metal
    
    if ((Math.random() < 0.6) | (metals.length == 2)) {
      amounts = randomChoice([[1, 1], [2, 1], [3, 1], [3, 2]], normalize([3, 3, 2, 1]));
    } else {
      alloy_metals = alloy_metals.concat(metals[positions[2]]);  // maybe add another secondary metal
      amounts = randomChoice(
        [[1, 1, 1,], [2, 1, 1], [3, 1, 1], [2, 2, 1], [3, 2, 1], [3, 2, 2]],
        normalize([2, 3, 3, 1, 1, 1]));
    } 
    if (metal_names.length == 0) {
      throw new NotEnoughNames();
    }
    name = metal_names.pop();
    alloys = alloys.concat(makeAlloy(alloy_metals, amounts, name));
  }
  let basic_metals = [...metals];
  metals = metals.concat(alloys);
  if (vanilla_include == 'all') {
    metals = metals.concat(VANILLA_ALLOYS);
  }
  
  //make advanced metals
  for (let i=0; i<number_of_advanced_metals; i++) {
    let base_metal = randomChoice(basic_metals)[0];
    let length = randomChoice([1, 2, 3, 4, 5], [0.7, 0.2, 0.05, 0.04, 0.01])[0];
    let chain_names = metal_names.slice(0, length);
    if (metal_names.length - length < 0) {
      throw new NotEnoughNames();
    }
    metal_names = [...metal_names.slice(length)];
    chain_metals = generateAdvancedChain(base_metal, length, chain_names);
    metals = metals.concat(chain_metals)
  }
  if (vanilla_include == 'all') {
    metals = metals.concat(VANILLA_ADVANCED);
  }
  return [metals, ores];
}

function generateAdvancedChain(base_metal, length, chain_names) {
  /** Make an advanced metal production chain.
  
  Making steel first requires making pig iron using flux. This makes it harder to do which is neat.
  */
  const extra_ingredients = {
    'flux': 1.2,
    'cinnabar': 1.4,
    'gypsum': 2,
    'graphite': 2.3,
    'brimstone': 3,
    'realgar': 2.5,
    'orpiment': 2.6,
    'ilmenite': 1.7,
    'rutile': 2.3,
    'chromite': 1.6,
    'borax': 5
    };
  let output = [];
  let difficulty_bonus = 1;
  let precursor = base_metal;
  let extra_ingredient;
  for (let i=0; i<length; i++) {
    extra_ingredient = randomChoice(Object.keys(extra_ingredients))[0];
    difficulty_bonus *= extra_ingredients[extra_ingredient];
    if (i < length-1) {
      precursor = makeStepMetal(precursor, extra_ingredient, chain_names[i]);
      output = output.concat(precursor);
    } else {
      let final_metal = makeAdvancedMetal(precursor, extra_ingredient, difficulty_bonus, chain_names[chain_names.length -1 ]);
      output = output.concat(final_metal);
    }
  }
  return output;
}

function writeRawFiles(metals, ores, vanilla_include='all') {
  let metals_to_write, minerals_to_write, reactions_to_write;
  if (vanilla_include == 'all') {
    metals_to_write = INORGANIC_METAL;
    minerals_to_write = INORGANIC_STONE_MINERAL;
    reactions_to_write = REACTION_SMELTER;
  } else if (vanilla_include == 'basic') {
    metals_to_write = INORGANIC_METAL_BASIC;
    minerals_to_write = INORGANIC_STONE_MINERAL_BASIC;
    reactions_to_write = REACTION_SMELTER_BASIC;
  } else {
    metals_to_write = 'inorganic_metal\n\n[OBJECT:INORGANIC]\n\n';
    minerals_to_write = 'inorganic_stone_mineral\n\n[OBJECT:INORGANIC]\n\n';
    reactions_to_write = 'reaction_smelter\n\n[OBJECT:REACTION]\n\n';
  }
  metals_to_write += '\n\n##### New Metals #####\n';
  for (let i=0; i<metals.length; i++) {
    if (metals[i].from_vanilla) {
      continue;
    }
    metals_to_write += `\n\n${metals[i].rawText()}`;
  }
  
  minerals_to_write += '\n\n##### New Minerals #####\n';
  ores.forEach(ore => minerals_to_write += `\n\n${ore.rawText()}`);
  
  reactions_to_write += '\n\n##### New Reactions #####\n';
  let reaction_text;
  for (let i=0; i<metals.length; i++) {
    if (metals[i].from_vanilla){
      continue;
    }
    reaction_text = metals[i].reactionRawText();
    if (reaction_text != '') {
      reactions_to_write += `\n\n${reaction_text}`;
    }
  }

  let entity_raw, creature_raw, underground_raw, gems_raw;
  entity_raw = ENTITY_DEFAULT;
  creature_raw = CREATURE_STANDARD;
  underground_raw = CREATURE_SUBTERRANEAN;
  gems_raw = INORGANIC_STONE_GEM;
  
  // replace currencies
  let currency_metals = pickCurrencyMetals(metals);
  entity_raw = entity_raw.replaceAll('CURRENCY:COPPER', 'CURRENCY:'+currency_metals[0].toUpperCase());
  entity_raw = entity_raw.replaceAll('CURRENCY:SILVER', 'CURRENCY:'+currency_metals[1].toUpperCase());
  entity_raw = entity_raw.replaceAll('CURRENCY:GOLD', 'CURRENCY:'+currency_metals[2].toUpperCase());
  
  if (['basic', 'none'].includes(vanilla_include)) {    
    // replace reactions
    let remove_reactions = [
        'BRASS_MAKING2', 'BRONZE_MAKING', 'BRONZE_MAKING2', 'ELECTRUM_MAKING', 'ELECTRUM_MAKING2',
        'BILLON_MAKING', 'BILLON_MAKING2', 'PEWTER_FINE_MAKING', 'PEWTER_FINE_MAKING2', 'PEWTER_TRIFLE_MAKING',
        'PEWTER_TRIFLE_MAKING2', 'PEWTER_LAY_MAKING', 'PIG_IRON_MAKING', 'NICKEL_SILVER_MAKING',
        'BLACK_BRONZE_MAKING', 'STERLING_SILVER_MAKING', 'ROSE_GOLD_MAKING', 'BISMUTH_BRONZE_MAKING']
    for (let i=0; i<remove_reactions.length; i++) {
      let re = new RegExp(`\n\t\\[PERMITTED_REACTION:${remove_reactions[i]}\\]`, 'g');
      entity_raw = entity_raw.replaceAll(re, '');
    }
    
    let basic_replace = '';
    let advanced_replace = '';
    for (let i=0; i<metals.length; i++) {
      if (metals[i].from_vanilla) {
        continue;
      }
      basic_replace += metals[i].entityRawText(false);
      advanced_replace += metals[i].entityRawText(true);
    }
    
    //BRASS_MAKING is a stand in for basic reactions
    let re = new RegExp('\n\t\\[PERMITTED_REACTION:BRASS_MAKING\\]', 'g');
    entity_raw = entity_raw.replaceAll(re, basic_replace);
    
    // STEEL_MAKING is a stand in for advanced reactions
    re = new RegExp('\n\t\\[PERMITTED_REACTION:STEEL_MAKING\\]', 'g');
    entity_raw = entity_raw.replaceAll(re, advanced_replace);
    
    // Replace material for the Bronze Colossus
    let basic_metals = [];
    for (let i=0; i<metals.length; i++) {
      if (!metals[0].advanced){
        basic_metals = basic_metals.concat(metals[i].name);
      }
    }
    let replacement = randomChoice(basic_metals)[0];
    let upper_name = replacement.toUpperCase();
    let lower_name = replacement.toLowerCase();
    creature_raw = creature_raw.replace(/COLOSSUS_BRONZE/, `COLOSSUS_${upper_name}`);
    creature_raw = creature_raw.replaceAll(/bronze colossus/g, `${lower_name} colossus`);
    creature_raw = creature_raw.replace(/magic statue made of bronze/, `magic statue made of ${lower_name}`);
    creature_raw = creature_raw.replace(/TISSUE:BRONZE/, `TISSUE:${upper_name}`);
    creature_raw = creature_raw.replace(/TISSUE_NAME:bronze:bronze/, `TISSUE_NAME:${lower_name}:${lower_name}`);
    creature_raw = creature_raw.replace(/TISSUE_MATERIAL:INORGANIC:BRONZE/, `TISSUE_MATERIAL:INORGANIC:${upper_name}`);
    creature_raw = creature_raw.replace(/TISSUE_LAYER:BY_CATEGORY:ALL:BRONZE/, `TISSUE_LAYER:BY_CATEGORY:ALL:${upper_name}`);
    creature_raw = creature_raw.replace(/ITEMCORPSE:STATUE:NO_SUBTYPE:INORGANIC:BRONZE/, `ITEMCORPSE:STATUE:NO_SUBTYPE:INORGANIC:${upper_name}`);
    
    // Replace material for the iron man
    replacement = randomChoice(basic_metals)[0];
    upper_name = replacement.toUpperCase();
    lower_name = replacement.toLowerCase();
    underground_raw = underground_raw.replace(/ELEMENTMAN_IRON/, `ELEMENTMAN_${upper_name}`);
    underground_raw = underground_raw.replaceAll(/iron man/g, `${lower_name} man`);
    underground_raw = underground_raw.replaceAll(/iron men/g, `${lower_name} men`);
    underground_raw = underground_raw.replace(/A man-shaped creature made of iron/, `A man-shaped creature made of ${lower_name}`);
    underground_raw = underground_raw.replace(/TISSUE:IRON/, `TISSUE:${upper_name}`);
    underground_raw = underground_raw.replace(/TISSUE_NAME:iron:NP/, `TISSUE_NAME:${lower_name}:NP`);
    underground_raw = underground_raw.replace(/TISSUE_MATERIAL:INORGANIC:IRON/, `TISSUE_MATERIAL:INORGANIC:${upper_name}`);
    underground_raw = underground_raw.replace(/TISSUE_LAYER:BY_CATEGORY:ALL:IRON/, `TISSUE_LAYER:BY_CATEGORY:ALL:${upper_name}`);
    underground_raw = underground_raw.replace(/ITEMCORPSE:STATUE:NO_SUBTYPE:INORGANIC:IRON/, `ITEMCORPSE:STATUE:NO_SUBTYPE:INORGANIC:${upper_name}`);
    
    // Replace Malachite as the environment for CHRYSCOLLA
    replacement = randomChoice(ores)[0].name.toUpperCase();
    gems_raw = gems_raw.replace(/ENVIRONMENT_SPEC:MALACHITE/, `ENVIRONMENT_SPEC:${replacement}`);
  } else {
    // Add reactions for the new metals but dont delete the old
    let basic_replace = '\n\t[PERMITTED_REACTION:BRASS_MAKING]'
    let advanced_replace = '\n\t[PERMITTED_REACTION:STEEL_MAKING]'
    for (let i=0; i<metals.length; i++) {
      if (!metals[i].from_vanilla){
        basic_replace += metals[i].entityRawText(false);
        advanced_replace += metals[i].entityRawText(true);
      }
    }
    
    // BRASS_MAKING stands in for basic reactions
    entity_raw = entity_raw.replaceAll(/\n\t\[PERMITTED_REACTION:BRASS_MAKING\]/g, basic_replace);
    entity_raw = entity_raw.replaceAll(/\n\t\[PERMITTED_REACTION:STEEL_MAKING\]/g, advanced_replace);
  }
  
  return {'inorganic_metal.txt': metals_to_write, 'inorganic_stone_mineral.txt': minerals_to_write, 
  'reaction_smelter.txt':reactions_to_write, 'entity_default.txt':entity_raw,
  'creature_standard': creature_raw, 'creature_subterranean.txt': underground_raw, 'inorganic_stone_gem.txt':gems_raw};
 
}

function pickCurrencyMetals(metals) {
  //Pick replacements for copper, silver, and gold as the currency metals.
  let basic_metals = metals.filter(metal => !metal.advanced & metal.usable);
  let selected_colors = [];
  
  //pick a gold-like metal
  choices = basic_metals.filter(metal => metal.material_properties['MATERIAL_VALUE'] >= 25);
  if (choices.length == 0) {
    throw new CannotPickCurrencies();
  }
  let gold_like = randomChoice(choices)[0];
  selected_colors = selected_colors.concat(gold_like.color_name);
  
  //pick a silver-like metal
  choices = basic_metals.filter(metal => metal.material_properties['MATERIAL_VALUE'] < 25);
  choices = choices.filter(metal => metal.material_properties['MATERIAL_VALUE'] >= 10);
  choices = choices.filter(metal => !selected_colors.includes(metal.color_name));
  if (choices.length == 0) {
    throw new CannotPickCurrencies();
  }
  let silver_like = randomChoice(choices)[0];
  selected_colors = selected_colors.concat(silver_like.color_name);
  
  //pick a copper-like metal
  choices = basic_metals.filter(metal => metal.material_properties['MATERIAL_VALUE'] < 10);
  choices = choices.filter(metal => !selected_colors.includes(metal.color_name));
    if (choices.length == 0) {
    throw new CannotPickCurrencies();
  }
  let copper_like = randomChoice(choices)[0];
  
  return [copper_like.name, silver_like.name, gold_like.name];
}

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function downloadFiles() {
	let vanilla_include = document.getElementById('vanilla_include').value;
  let files;
  try {
    files = writeRawFiles(GENNED_METALS, GENNED_ORES, vanilla_include);
  } catch (e) {
    if (e instanceof CannotPickCurrencies) {
      alert("Suitable currency metals could not be found. Try again and maybe increase the number of basic metals.");
      return ;
    } else {
      throw e
    }
  }
  let file_names = Object.keys(files);
  let results_table = makeResultsTable(GENNED_METALS, GENNED_ORES);
  files['mod_overview.txt'] = results_table;
  file_names = file_names.concat('mod_overview.txt');
  file_names.forEach(file_name => downloadString(files[file_name], 'text', file_name));
}

function makeResultsTable(metals, ores) {
  //Return a string describing the metals and ores that were made
  let output = '###METALS###';
  let ingredient_string;
  for (let metal of metals) {
    if (metal.from_vanilla){
      continue;
    }
    output += `\n\n${capitalize(metal.name)}`;
    if (metal.usable) {
      output += `\n\tStrength: ${metal.strength()}`;
      output += `\n\tValue: ${metal.material_properties['MATERIAL_VALUE']}`;
    }
    output += `\n\tColor: ${capitalize(metal.material_properties['STATE_COLOR']['ALL_SOLID'].toLowerCase()).replace('_', ' ')}`;
    if (!metal.advanced) {
      if (metal.alloy) {
        ingredient_string = [];
        for (let i=0; i<metal.constituent_metals.length; i++) {
          ingredient_string = ingredient_string.concat(`${metal.constituent_amounts[i]} ${capitalize(metal.constituent_metals[i].name)}`);
        }
        ingredient_string = ingredient_string.join(' + ');
        output += `\n\tIngredients: ${ingredient_string}`;
      }
    } else {
      output += `\n\tIngredients: ${capitalize(metal.precursor.name)} + ${capitalize(metal.extra_ingredient)}`
    }
    }
  
  output += '\n\n\n###ORES###';
  for (let ore of ores) {
    output += `\n\n${capitalize(ore.name)}`;
    ingredient_string = []
    for (let i=0; i<ore.metals.length; i++) {
      ingredient_string = ingredient_string.concat(`${ore.metal_probs[i]} ${capitalize(ore.metals[i].name)}`);
    }
    output += `\n\tSmelts To: ${ingredient_string.join(', ')}`;
    let environments = {...ore.properties['ENVIRONMENT'], ...ore.properties['ENVIRONMENT_SPEC']};
    environments = Object.keys(environments);
    let environment_string = [];
    environments.forEach(ele => environment_string=environment_string.concat(capitalize(ele)));
    environment_string = environment_string.join(', ');
    
    output += `\n\tFound In: ${environment_string}`;
  }
  return output;
}

function makeMetalsPress() {
  let n_basic = parseInt(document.getElementById('basic_metals').value);
	let n_alloys = parseInt(document.getElementById('alloys').value);
	let n_advanced = parseInt(document.getElementById('advanced_metals').value);
	let vanilla_include = document.getElementById('vanilla_include').value;
  
  let genned;
  try {
    genned = generateMetals(n_basic, n_alloys, n_advanced);
  } catch(e) {
    if (e instanceof NotEnoughNames){
      alert("There are not enough names to assign to the generated metals.");
      return;
    } else if (e instanceof NotEnoughBasicMetals){
      alert("There are not enough basic metals to generate alloys. Add a few more.");
      return;
    }
  }
  GENNED_METALS = genned[0];
  GENNED_ORES = genned[1];
  
  // Make the basic table
  let ore_string = '';
  let table = [['Basic Metal', 'Strength', 'Density (g/mL)', 'Value', 'Color', 'Ores']];
  for (let metal of GENNED_METALS) {
    if ((metal.advanced) | (metal.alloy)) {
      continue;}
    
    // Get ores for the generated metals
    let producing_ores = [];
    for (let ore of GENNED_ORES) {
      let metal_index = ore.metals.indexOf(metal);
      if (metal_index  > -1) {
        producing_ores = producing_ores.concat(`${capitalize(ore.name).replace('_', ' ')} (${ore.metal_probs[metal_index]})`);
      }
    }
    
    // Get ores for the vanilla metals
    if (metal.from_vanilla) {
      producing_ores = metal.ores;
    }
    
    ore_string = producing_ores.join(', ');
        
    let new_row = [
      capitalize(metal.name),
      metal.strength().toFixed(2),
      `${(metal.material_properties['SOLID_DENSITY']/1000).toFixed(1)}`,
      metal.material_properties['MATERIAL_VALUE'],
      capitalize(metal.material_properties['STATE_COLOR']['ALL_SOLID'].toLowerCase()).replace('_', ' '),
      ore_string
      ];
    
    table = table.concat([new_row]);
  }
  deleteTable('basic_table');
  makeTable(table, 'basic_table');
  
  // Alloys
  let ingredient_string = '';
  table = [['Alloy', 'Strength', 'Density (g/mL)', 'Value', 'Color', 'Ingredients']];
  for (let metal of GENNED_METALS) {
    if (!metal.alloy) {
      continue;}
         
    ingredient_string = '';
    if (metal.alloy) {
      let ingredients = [];
      for (let i=0; i<metal.constituent_amounts.length; i++) {
        ingredients = ingredients.concat(
          `${metal.constituent_amounts[i]} ${capitalize(metal.constituent_metals[i].name)}`);
      }
      ingredient_string = ingredients.join(' + ');
    }
    
    let new_row = [
      capitalize(metal.name),
      metal.strength().toFixed(2),
      `${(metal.material_properties['SOLID_DENSITY']/1000).toFixed(1)}`,
      metal.material_properties['MATERIAL_VALUE'],
      capitalize(metal.material_properties['STATE_COLOR']['ALL_SOLID'].toLowerCase()).replace('_', ' '),
      ingredient_string
      ];
    
    table = table.concat([new_row]);
  }
  deleteTable('alloy_table');
  makeTable(table, 'alloy_table');
  
  // Advanced Metals
  table = [['Advanced Metal', 'Strength', 'Density (g/mL)', 'Value', 'Color', 'Ingredients']];
  for (let metal of GENNED_METALS) {
    if ((!metal.advanced) | (!metal.usable)) {
      continue;}
    
    let cur_metal = metal;
    let ingredients = [];
    
    while (true) {     
      if (cur_metal.precursor.usable) {
        ingredients = ingredients.concat(`${capitalize(cur_metal.precursor.name)} + ${capitalize(cur_metal.extra_ingredient)}`);
      } else {
        ingredients = ingredients.concat(`${capitalize(cur_metal.precursor.name)}* + ${capitalize(cur_metal.extra_ingredient)}`);
      }
      cur_metal = cur_metal.precursor
      if (cur_metal.precursor === null) {
        break;
      }
    }
    ingredients.reverse();
    let ingredient_string = ingredients.join(' => ');
    
    let new_row = [
      capitalize(metal.name),
      metal.strength().toFixed(2),
      `${(metal.material_properties['SOLID_DENSITY']/1000).toFixed(1)}`,
      metal.material_properties['MATERIAL_VALUE'],
      capitalize(metal.material_properties['STATE_COLOR']['ALL_SOLID'].toLowerCase()).replace('_', ' '),
      ingredient_string
      ];

    table = table.concat([new_row]);

  }
  deleteTable('advanced_table');
  makeTable(table, 'advanced_table');
  
  document.getElementById("not_usable").style.opacity = "1";
}

function makeTable(input_data, table_id) {
  let table = document.getElementById(table_id);
  for (let row_data of input_data) {
    let row = table.insertRow();
    for (col_index in row_data) {
      let cell = row.insertCell();
      let text = document.createTextNode(row_data[col_index]);
      cell.appendChild(text);
    }
  }
}

function deleteTable(table_id) {
  let table = document.getElementById(table_id);
  while (true) {
    try{
      table.deleteRow(0);
    } catch (DOMException) {
      break
    }
  }  
}

class NotEnoughNames extends Error {
  constructor(message) {
    super(message);
    this.name = "NotEnoughNames";
  }
}  

class CannotPickCurrencies extends Error {
  constructor(message) {
    super(message);
    this.name = "CannotPickCurrencies";
  }
}

class NotEnoughBasicMetals extends Error {
  constructor(message) {
    super(message);
    this.name = "NotEnoughBasicMetals";
  }
}  


