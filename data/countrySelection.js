export const regions = [
  "Region III - Central Luzon",
  "National Capital Region (NCR)",
];

export const provinces = {
  "National Capital Region (NCR)": ["Metro Manila"],
  "Region III - Central Luzon": [
    "Aurora",
    "Bataan",
    "Bulacan",
    "Nueva Ecija",
    "Pampanga",
    "Tarlac",
    "Zambales",
  ],
};

export const cities = {
  // NCR
  "Metro Manila": [
    "Caloocan",
    "Las Piñas",
    "Makati",
    "Malabon",
    "Mandaluyong",
    "Manila",
    "Marikina",
    "Muntinlupa",
    "Navotas",
    "Parañaque",
    "Pasay",
    "Pasig",
    "Quezon City",
    "San Juan",
    "Taguig",
    "Valenzuela",
    "Pateros", // Pateros is a municipality but often included in Metro Manila listings
  ],

  // Region I - Ilocos Region
  "Ilocos Norte": ["Laoag", "Batac"],
  "Ilocos Sur": ["Vigan", "Candon"],
  "La Union": ["San Fernando"],
  Pangasinan: ["Dagupan", "San Carlos", "Urdaneta", "Alaminos"],

  // Region II - Cagayan Valley
  Batanes: ["Basco"],
  Cagayan: ["Tuguegarao"],
  Isabela: ["Cauayan", "Ilagan", "Santiago"],
  "Nueva Vizcaya": ["Bayombong"],
  Quirino: ["Cabarroguis"],

  // Region III - Central Luzon
  Aurora: ["Baler"],
  Bataan: ["Balanga"],
  // Bulacan
  Bulacan: [
    "Angat",
    "Balagtas",
    "Baliwag",
    "Bocaue",
    "Bulakan",
    "Bustos",
    "Calumpit",
    "Dona Remedios Trinidad",
    "Guiguinto ",
    "Hagonoy ",
    "Malolos",
    "Marilao",
    "Meycauayan",
    "Norzagaray",
    "Obando",
    "Pandi",
    "Paombong",
    "Plaridel",
    "Pulilan",
    "San Ildefonso",
    "San Jose Del Monte",
    "San Miguel",
    "San Rafael",
    "Santa Maria",
  ],
  "Nueva Ecija": ["Cabanatuan", "Gapan", "Palayan", "San Jose"],

  Pampanga: ["Angeles", "San Fernando"],
  Tarlac: ["Tarlac City"],
  Zambales: ["Olongapo"],

  // Region IV-A - CALABARZON
  Cavite: [
    "Cavite City",
    "Dasmariñas",
    "Imus",
    "Tagaytay",
    "Trece Martires",
    "Bacoor",
  ],
  Laguna: ["San Pablo", "Santa Rosa", "Calamba", "Biñan", "Cabuyao"],
  Batangas: ["Batangas City", "Lipa", "Tanauan"],
  Rizal: ["Antipolo"],
  Quezon: ["Lucena", "Tayabas"],

  // Region IV-B - MIMAROPA
  "Occidental Mindoro": ["Mamburao"],
  "Oriental Mindoro": ["Calapan"],
  Marinduque: ["Boac"],
  Romblon: ["Romblon"],
  Palawan: ["Puerto Princesa"],

  // Region V - Bicol Region
  Albay: ["Legazpi", "Ligao", "Tabaco"],
  "Camarines Norte": ["Daet"],
  "Camarines Sur": ["Naga", "Iriga"],
  Catanduanes: ["Virac"],
  Masbate: ["Masbate City"],
  Sorsogon: ["Sorsogon City"],

  // Region VI - Western Visayas
  Aklan: ["Kalibo"],
  Antique: ["San Jose de Buenavista"],
  Capiz: ["Roxas City"],
  Guimaras: ["Jordan"],
  Iloilo: ["Iloilo City", "Passi"],
  "Negros Occidental": [
    "Bacolod",
    "Cadiz",
    "Escalante",
    "Himamaylan",
    "Kabankalan",
    "La Carlota",
    "Sagay",
    "San Carlos",
    "Silay",
    "Sipalay",
    "Talisay",
    "Victorias",
  ],

  // Region VII - Central Visayas
  Bohol: ["Tagbilaran"],
  Cebu: ["Cebu City", "Mandaue", "Lapu-Lapu", "Toledo", "Talisay", "Naga"],
  "Negros Oriental": ["Dumaguete", "Bais", "Bayawan", "Canlaon", "Tanjay"],
  Siquijor: ["Siquijor"],

  // Region VIII - Eastern Visayas
  Biliran: ["Naval"],
  "Eastern Samar": ["Borongan"],
  Leyte: ["Tacloban", "Ormoc"],
  "Northern Samar": ["Catarman"],
  Samar: ["Calbayog", "Catbalogan"],
  "Southern Leyte": ["Maasin"],

  // Region IX - Zamboanga Peninsula
  "Zamboanga del Norte": ["Dipolog", "Dapitan"],
  "Zamboanga del Sur": ["Pagadian", "Zamboanga City"],
  "Zamboanga Sibugay": ["Ipil"],

  // Region X - Northern Mindanao
  Bukidnon: ["Malaybalay", "Valencia"],
  Camiguin: ["Mambajao"],
  "Lanao del Norte": ["Iligan"],
  "Misamis Occidental": ["Oroquieta", "Ozamiz", "Tangub"],
  "Misamis Oriental": ["Cagayan de Oro", "Gingoog"],

  // Region XI - Davao Region
  "Davao de Oro": ["Monkayo"],
  "Davao del Norte": ["Panabo", "Samal", "Tagum"],
  "Davao del Sur": ["Davao City", "Digos"],
  "Davao Occidental": ["Malita"],
  "Davao Oriental": ["Mati"],

  // Region XII - SOCCSKSARGEN
  Cotabato: ["Kidapawan"],
  Sarangani: ["Alabel"],
  "South Cotabato": ["Koronadal", "General Santos"],
  "Sultan Kudarat": ["Isulan"],

  // Region XIII - Caraga
  "Agusan del Norte": ["Butuan", "Cabadbaran"],
  "Agusan del Sur": ["Bayugan"],
  "Dinagat Islands": ["San Jose"],
  "Surigao del Norte": ["Surigao City"],
  "Surigao del Sur": ["Bislig", "Tandag"],

  // Cordillera Administrative Region (CAR)
  Abra: ["Bangued"],
  Apayao: ["Kabugao"],
  Benguet: ["Baguio"],
  Ifugao: ["Lagawe"],
  Kalinga: ["Tabuk"],
  "Mountain Province": ["Bontoc"],

  // Autonomous Region in Muslim Mindanao (ARMM)
  Basilan: ["Isabela City"],
  "Lanao del Sur": ["Marawi"],
  Maguindanao: ["Buluan"],
  Sulu: ["Jolo"],
  "Tawi-Tawi": ["Bongao"],
};
