//Keys are the color names, values are ('foreground color:background color:foreground bright/dark', 'NAME')
const METAL_COLORS = {
    'silver1': ['7:7:1', 'SILVER'],
    'silver2': ['7:3:0', 'SILVER'],
    'gray': ['0:7:1', 'GRAY'],
    'taupe_gray1': ['0:7:1', 'TAUPE_GRAY'],
    'taupe_gray2': ['7:3:0', 'TAUPE_GRAY'],
    'white1': ['3:7:0', 'WHITE'],
    'black1': ['0:7:0', 'BLACK'],
    'brass': ['6:6:1', 'BRASS'],
    'gold': ['6:6:1', 'GOLD'],
    'copper': ['6:4:0', 'COPPER'],
    'bronze': ['6:4:0', 'BRONZE'],
    'white2': ['7:7:1', 'WHITE'],
    'ochre': ['6:6:1', 'OCHRE'],
    'pale_brown': ['7:3:0', 'PALE_BROWN'],
    'black2': ['5:6:0', 'BLACK'],
    'tan': ['6:6:1', 'TAN'],
    'heliotrope': ['5:5:1', 'HELIOTROPE'],
    'pink': ['5:5:1', 'PINK'],
    'pale_blue': ['3:7:0', 'PALE_BLUE'],
    'red_purple': ['4:5:0', 'RED_PURPLE'],
    
    'amber': ['6:5:0', 'AMBER'],
    'ash_gray': ['0:7:1', 'ASH_GRAY'],
    'rust': ['6:4:0', 'RUST'],
    'dark_chestnut': ['6:0:0', 'DARK_CHESTNUT'],
    'taupe_dark': ['7:3:0', 'TAUPE_DARK'],
    'green': ['2:0:1', 'GREEN'],
    'dark_green': ['2:0:0', 'DARK_GREEN'],
    'plum': ['5:0:0', 'PLUM'],
    'charcoal': ['0:7:0', 'CHARCOAL'],
    'sepia': ['6:6:1', 'SEPIA'],
    'dark_brown': ['6:0:0', 'DARK_BROWN']
};

//Alloy colors
const ALLOY_COLORS = {
  "silver1": {
    "silver1": 10.0, 
    "silver2": 5.0,
    "gray": 5.0,
    "taupe_gray1": 5.0,
    "taupe_gray2": 5.0,
    "white1": 1.0, 
    "black1": 0.1,
    "brass": 0.1,
    "gold": 0.1, 
    "copper": 0.1,
    "bronze": 0.1, 
    "white2": 1.0, 
    "ochre": 0.1,
    "pale_brown": 0.1,
    "black2": 0.1,
    "tan": 0.1,
    "amber": 0.1,
    "ash_gray": 5,
    "taupe_dark": 0.2,
    "charcoal": 3,
    "sepia": 0.5,
    "dark_brown": 0.5},
  "silver2": {
    "silver1": 5.0,
    "silver2": 10.0,
    "gray": 5.0,
    "taupe_gray1": 5.0,
    "taupe_gray2": 5.0, 
    "white1": 1.0, 
    "black1": 0.1, 
    "brass": 0.1, 
    "gold": 0.1,
    "copper": 0.1,
    "bronze": 0.1, 
    "white2": 1.0,
    "ochre": 0.1, 
    "pale_brown": 0.1,
    "black2": 0.1,
    "tan": 0.1,
    "amber": 0.1,
    "ash_gray": 5,
    "taupe_dark": 0.2,
    "charcoal": 3,
    "sepia": 0.5,
    "dark_brown": 0.5}, 
  "gray": {
    "silver1": 5.0, 
    "silver2": 5.0,
    "gray": 10.0,
    "taupe_gray1": 5.0, 
    "taupe_gray2": 5.0, 
    "white1": 1.0, 
    "black1": 0.1,
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1,
    "bronze": 0.1,
    "white2": 1.0,
    "ochre": 0.1, 
    "pale_brown": 0.1, 
    "black2": 0.1,
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "taupe_gray1": {
    "silver1": 1.0,
    "silver2": 1.0,
    "gray": 5.0,
    "taupe_gray1": 10.0,
    "taupe_gray2": 5.0, 
    "white1": 1.0, 
    "black1": 0.1, 
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1, 
    "bronze": 0.1, 
    "white2": 1.0, 
    "ochre": 0.1, 
    "pale_brown": 0.1,
    "black2": 0.1,
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "taupe_gray2": {
    "silver1": 1.0,
    "silver2": 1.0,
    "gray": 1.0,
    "taupe_gray1": 5.0,
    "taupe_gray2": 10.0,
    "white1": 1.0,
    "black1": 0.1,
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1,
    "bronze": 0.1,
    "white2": 1.0, 
    "ochre": 0.1,
    "pale_brown": 0.1, 
    "black2": 0.1, 
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "white1": {
    "silver1": 3.0,
    "silver2": 3.0, 
    "gray": 3.0, 
    "taupe_gray1": 3.0, 
    "taupe_gray2": 3.0,
    "white1": 10.0,
    "black1": 0.1, 
    "brass": 0.1, 
    "gold": 0.1,
    "copper": 0.1,
    "bronze": 0.1,
    "white2": 1.0,
    "ochre": 0.1, 
    "pale_brown": 0.1,
    "black2": 0.1,
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "black1": {
    "silver1": 2.0,
    "silver2": 2.0,
    "gray": 2.0,
    "taupe_gray1": 2.0,
    "taupe_gray2": 2.0, 
    "white1": 2.0,
    "black1": 10.0,
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1, 
    "bronze": 0.1, 
    "white2": 2.0, 
    "ochre": 0.1, 
    "pale_brown": 0.1, 
    "black2": 0.1,
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "brass": {
    "silver1": 0.1,
    "silver2": 0.1,
    "gray": 0.1,
    "taupe_gray1": 0.1,
    "taupe_gray2": 0.1,
    "white1": 0.1, 
    "black1": 4.0,
    "brass": 10.0,
    "gold": 5.0, 
    "copper": 5.0, 
    "bronze": 5.0, 
    "white2": 0.1,
    "ochre": 4.0, 
    "pale_brown": 0.1, 
    "black2": 0.1,
    "tan": 5.0, 
    "heliotrope": 3.0,
    "pink": 2.0,
    "red_purple": 1.0,
    "amber": 2,
    "rust": 5,
    "sepia": 3,
    "dark_brown": 3},
  "gold": {
    "silver1": 0.1, 
    "silver2": 0.1, 
    "gray": 0.1, 
    "taupe_gray1": 0.1, 
    "taupe_gray2": 0.1,
    "white1": 0.1, 
    "black1": 2.0, 
    "brass": 5.0, 
    "gold": 10.0,
    "copper": 5.0,
    "bronze": 5.0,
    "white2": 0.1,
    "ochre": 3.0,
    "pale_brown": 0.1,
    "black2": 0.1, 
    "tan": 5.0,
    "heliotrope": 3.0,
    "pink": 2.0, 
    "red_purple": 1.0,
    "amber": 4,
    "rust": 3,
    "charcoal": 2,
    "sepia": 1},
  "copper": {
    "silver1": 0.1,
    "silver2": 0.1,
    "gray": 0.1,
    "taupe_gray1": 0.1,
    "taupe_gray2": 0.1,
    "white1": 0.1,
    "black1": 2.0,
    "brass": 5.0,
    "gold": 5.0, 
    "copper": 10.0,
    "bronze": 5.0, 
    "white2": 0.1, 
    "ochre": 3.0, 
    "pale_brown": 0.1, 
    "black2": 0.1,
    "tan": 5.0, 
    "heliotrope": 3.0, 
    "pink": 2.0,
    "red_purple": 1.0,
    "amber": 4,
    "rust": 3,
    "charcoal": 2,
    "sepia": 1}, 
  "bronze": {
    "silver1": 0.1, 
    "silver2": 0.1, 
    "gray": 0.1,
    "taupe_gray1": 0.1, 
    "taupe_gray2": 0.1, 
    "white1": 0.1,
    "black1": 2.0,
    "brass": 5.0, 
    "gold": 5.0,
    "copper": 5.0, 
    "bronze": 10.0,
    "white2": 0.1,
    "ochre": 4.0,
    "pale_brown": 0.1, 
    "black2": 0.1,
    "tan": 5.0,
    "heliotrope": 3.0, 
    "pink": 1.0,
    "red_purple": 1.0,
    "amber": 4,
    "rust": 3,
    "charcoal": 2,
    "sepia": 1}, 
  "white2": {
    "silver1": 5.0, 
    "silver2": 5.0,
    "gray": 3.0,
    "taupe_gray1": 3.0,
    "taupe_gray2": 3.0,
    "white1": 5.0, 
    "black1": 0.0,
    "brass": 3.0, 
    "gold": 1.0,
    "copper": 1.0,
    "bronze": 2.0,
    "white2": 10.0,
    "ochre": 2.0,
    "pale_brown": 4.0, 
    "black2": 0.0, 
    "tan": 0.5, 
    "heliotrope": 0.2,
    "pink": 0.1,
    "pale_blue": 0.3, 
    "red_purple": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5,
    "green": 0.1,
    "dark_green": 0.1,
    "plum": 0.1
    },
  "ochre": {
    "silver1": 0.1, 
    "silver2": 0.1, 
    "gray": 0.1,
    "taupe_gray1": 0.1,
    "taupe_gray2": 0.1,
    "brass": 3.0, 
    "gold": 2.0, 
    "copper": 3.0,
    "bronze": 3.0,
    "ochre": 10.0, 
    "pale_brown": 5.0,
    "black2": 0.1, 
    "tan": 1.0, 
    "heliotrope": 0.1, 
    "pink": 0.1, 
    "pale_blue": 0.0,
    "red_purple": 0.1,
    "amber": 5,
    "rust": 5,
    "dark_chestnut": 5,
    "plum": 0.1,
    "charcoal": 2,
    "sepia": 5,
    "dark_brown": 3},
  "pale_brown": {
    "gray": 2.0, 
    "taupe_gray1": 2.0,
    "taupe_gray2": 2.0,
    "black1": 3.0,
    "brass": 1.0, 
    "gold": 0.5,
    "copper": 1.0,
    "bronze": 1.0,
    "ochre": 5.0,
    "pale_brown": 10.0,
    "tan": 3.0,
    "amber": 5,
    "rust": 5,
    "dark_chestnut": 7,
    "sepia": 5,
    "dark_brown": 7},
  "black2": {
    "silver1": 2.0, 
    "silver2": 2.0, 
    "gray": 5.0,
    "taupe_gray1": 4.0,
    "taupe_gray2": 4.0,
    "white1": 0.3,
    "black1": 5.0, 
    "brass": 1.0,
    "gold": 0.1,
    "copper": 1.0, 
    "bronze": 0.1, 
    "white2": 0.0, 
    "ochre": 0.5,
    "pale_brown": 0.1,
    "black2": 10.0,
    "tan": 0.5,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.},
  "tan": {
    "gray": 0.1, 
    "taupe_gray1": 0.5,
    "taupe_gray2": 0.5,
    "black1": 2.0, 
    "brass": 3.0, 
    "gold": 2.0,
    "copper": 3.0,
    "bronze": 3.0, 
    "ochre": 5.0, 
    "pale_brown": 4.0,
    "black2": 2.0,
    "tan": 10.0,
    "heliotrope": 0.2,
    "amber": 5,
    "rust": 5,
    "dark_chestnut": 7,
    "sepia": 5,
    "dark_brown": 7},
  "heliotrope": {
    "silver1": 0.1,
    "silver2": 0.1,
    "gray": 0.1,
    "taupe_gray1": 0.1,
    "taupe_gray2": 0.1,
    "brass": 3.0,
    "gold": 1.0,
    "copper": 2.0,
    "bronze": 3.0,
    "ochre": 2.0, 
    "pale_brown": 1.0,
    "tan": 2.0, 
    "heliotrope": 10.0, 
    "pink": 5.0,
    "red_purple": 1.0,
    "amber": 2.0,
    "ash_gray": 0.1,
    "rust": 2.0},
  "pink": {
    "silver1": 0.1,
    "silver2": 0.1,
    "gray": 0.1, 
    "taupe_gray1": 0.1, 
    "taupe_gray2": 0.1, 
    "brass": 3.0, 
    "gold": 1.0,
    "copper": 2.0, 
    "bronze": 3.0,
    "ochre": 2.0, 
    "pale_brown": 1.0,
    "tan": 2.0, 
    "heliotrope": 5.0,
    "pink": 10.0,
    "red_purple": 1.0,
    "amber": 2.0,
    "ash_gray": 0.1,
    "rust": 2.0},
  "pale_blue": {
    "silver1": 3, 
    "silver2": 3,
    "gray": 2,
    "taupe_gray1": 2, 
    "taupe_gray2": 2,
    "pale_blue": 10,
    "green": 1,
    "dark_green": 1,
    "plum": 2,},
  "red_purple": {
    "brass": 2.0,
    "copper": 2.0, 
    "bronze": 2.0, 
    "ochre": 1.0, 
    "pale_brown": 1.0,
    "tan": 1.0,
    "heliotrope": 0.5,
    "pink": 0.5,
    "red_purple": 10.0,
    "amber": 2.0,
    "ash_gray": 0.1,
    "rust": 2.0},
  "amber": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 2,
    "gold": 3,
    "copper": 3,
    "bronze": 3,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "heliotrope": 0.1, 
    "pink": 0.1,
    "amber": 10,
    "rust": 2,
    "dark_chestnut": 1,
    "taupe_dark": 1,
    "sepia": 2,
    "dark_brown": 1
    },
  "ash_gray": {
    "silver1": 1.0,
    "silver2": 1.0,
    "gray": 1.0,
    "taupe_gray1": 5.0,
    "taupe_gray2": 5.0,
    "white1": 1.0,
    "black1": 0.1,
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1,
    "bronze": 0.1,
    "white2": 1.0, 
    "ochre": 0.1,
    "pale_brown": 0.1, 
    "black2": 0.1, 
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": .2,
    "taupe_dark": 0.4,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 3},
  "rust": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 2,
    "gold": 3,
    "copper": 3,
    "bronze": 3,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "heliotrope": 0.1, 
    "pink": 0.1,
    "amber": 2,
    "rust": 10,
    "dark_chestnut": 1,
    "taupe_dark": 1,
    "sepia": 2,
    "dark_brown": 1
    },
  "dark_chestnut": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 2,
    "gold": 3,
    "copper": 3,
    "bronze": 3,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "amber": 1,
    "ash_gray": 1,
    "rust": 1,
    "dark_chestnut": 10,
    "taupe_dark": 2,
    "charcoal": 2,
    "sepia": 1,
    "dark_brown": 3
    },
  "taupe_dark": {
    "silver1": 1.0,
    "silver2": 1.0,
    "gray": 5.0,
    "taupe_gray1": 5.0,
    "taupe_gray2": 5.0, 
    "white1": 1.0, 
    "black1": 0.1, 
    "brass": 0.1,
    "gold": 0.1,
    "copper": 0.1, 
    "bronze": 0.1, 
    "white2": 1.0, 
    "ochre": 0.1, 
    "pale_brown": 0.1,
    "black2": 0.1,
    "tan": 0.1,
    "amber": 3,
    "ash_gray": 10,
    "rust": 0.2,
    "dark_chestnut": 0.2,
    "taupe_dark": 10,
    "charcoal": 4,
    "sepia": 1,
    "dark_brown": 0.5},
  "green": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 1,
    "gold": 1,
    "copper": 1,
    "bronze": 1,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "amber": 0.0,
    "ash_gray": 0.5,
    "green": 10,
    "dark_green": 5,
    "plum": 1,
    "charcoal": 2,
    "sepia": 1,
    "dark_brown": 1
    },
  "dark_green": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 1,
    "gold": 1,
    "copper": 1,
    "bronze": 1,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "amber": 0.0,
    "ash_gray": 0.5,
    "green": 5,
    "dark_green": 10,
    "plum": 1,
    "charcoal": 2,
    "sepia": 1,
    "dark_brown": 1
    },
  "plum": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 1, 
    "black1": 0.1,
    "brass": 2,
    "gold": 3,
    "copper": 3,
    "bronze": 3,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "heliotrope": 1, 
    "pink": 1,
    "red_purple": 2,
    "amber": 1,
    "rust": 2,
    "dark_chestnut": 1,
    "taupe_dark": 1,
    "plum": 10,
    },
  "charcoal": {
    "silver1": 0.5, 
    "silver2": 0.5,
    "gray": 1,
    "taupe_gray1": 0.5, 
    "taupe_gray2": 0.5, 
    "white1": 0.1, 
    "black1": 4,
    "brass": 1,
    "gold": 0.5,
    "copper": 0.5,
    "bronze": 1,
    "white2": 0.1,
    "ochre": 2, 
    "pale_brown": 2, 
    "black2": 0.1,
    "tan": 3,
    "ash_gray": 5,
    "rust": 2,
    "dark_chestnut": 2,
    "taupe_dark": 4,
    "charcoal": 10,
    "sepia": 1,
    "dark_brown": 1
    },
  "sepia": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 0.2,
    "taupe_gray1": 0.3, 
    "taupe_gray2": 0.3, 
    "white1": 0.2, 
    "black1": 0.1,
    "brass": 2,
    "gold": 2,
    "copper": 5,
    "bronze": 5,
    "white2": 0.1,
    "ochre": 4, 
    "pale_brown": 2, 
    "black2": 0.1,
    "pink": 1,
    "red_purple": 1,
    "amber": 2,
    "rust": 1,
    "sepia": 10,
    "dark_brown": 1
    },
  "dark_brown": {
    "silver1": 0.1, 
    "silver2": 0.1,
    "gray": 0.1,
    "taupe_gray1": 0.2, 
    "taupe_gray2": 0.3, 
    "white1": 0, 
    "black1": 2,
    "brass": 0.2,
    "gold": 0.3,
    "copper": 0.1,
    "bronze": 0.1,
    "white2": 0.1,
    "ochre": 3, 
    "pale_brown": 5, 
    "tan": 5,
    "amber": 2,
    "rust": 1,
    "dark_chestnut": 2,
    "taupe_dark": 3,
    "charcoal": 1,
    "sepia": 2,
    "dark_brown": 10
    }
  };
  
// Metal color probabilities
const basic_colors = {'gray': 3,
                'silver1': 1,
                'silver2': 1,
                'taupe_gray1': 1,
                'taupe_gray2': 1,
                'white1': 0.3,
                'black1': 0.5,
                'ash_gray': 2,
                'taupe_dark': 1,
                'charcoal': 2
                };

const fancy_colors = {'brass': 1,
                'gold': 1,
                'copper': 1,
                'bronze': 1,
                'white2': 4,
                'ochre': 1,
                'pale_brown': 1,
                'black2': 1,
                'tan': 1,
                'silver2': 4,
                'amber': 1,
                'rust': 2,
                'dark_chestnut': 1,
                'sepia': 1,
                'dark_brown': 1
                }

const rare_colors = {'heliotrope': 1,
               'pink': 1,
               'pale_blue': 1,
               'red_purple': 1,
               'green': 1,
               'dark_green': 1,
               'plum': 1}  ;
               
const BASIC_COLORS = Object.keys(basic_colors);
const BASIC_COLOR_PROBS = normalize(Object.values(basic_colors));
const FANCY_COLORS = Object.keys(fancy_colors);
const FANCY_COLOR_PROBS = normalize(Object.values(fancy_colors));
const RARE_COLORS = Object.keys(rare_colors);
const RARE_COLORS_PROBS = normalize(Object.values(rare_colors));

// Ore colors
// Each pair is ('foreground color:background color:foreground bright/dark', probability weight)
let ore_colors = [
    ['4:7:0', 1],
    ['6:7:1', 1],
    ['2:7:1', 1],
    ['2:7:0', 1],
    ['7:7:1', 1],
    ['0:7:1', 1],
    ['6:7:0', 1],
    ['1:7:1', 1],
    ['0:7:1', 1]
  ]

ore_colors = unzip(ore_colors);
const ORE_COLORS = ore_colors[0];
const ORE_COLOR_PROBS = normalize(ore_colors[1]);


function pickOreColor() {
  //Return a randomly selected ore color string.
  return randomChoice(ORE_COLORS, ORE_COLOR_PROBS)[0];
}

function pickMetalColor(rarity) {
  //Return the randomly selected color specification strings for a metal.
  let pick;
  if (rarity === 'basic') {
    pick = randomChoice(BASIC_COLORS, BASIC_COLOR_PROBS)[0];
  } else if (rarity === 'fancy') {
    pick = randomChoice(FANCY_COLORS, FANCY_COLOR_PROBS)[0];
  } else {
    pick = randomChoice(RARE_COLORS, RARE_COLORS_PROBS)[0];
  }
  let pick_values = METAL_COLORS[pick];
  return [pick, pick_values[0], pick_values[1]];
}

function pickAlloyColor(primary_metal_color) {
  //Return the randomly selected color specification string for an alloy.
  let picking_dict = ALLOY_COLORS[primary_metal_color];
  let pick = randomChoice(Object.keys(picking_dict), normalize(Object.values(picking_dict)))[0];
  return [pick, METAL_COLORS[pick][0], METAL_COLORS[pick][1]];
}

