/* eslint-disable */
// Dataset d'églises du monde entier
// Images : Wikipedia / Wikimedia Commons (libre de droits)
var CHURCHES = [
  // ===================== EUROPE (18) =====================
  {
    id: 1,
    name: "Cathédrale Notre-Dame de Paris",
    nameAlt: ["Notre-Dame de Paris", "Notre Dame", "Notre-Dame"],
    city: "Paris",
    country: "France",
    continent: "Europe",
    yearBuilt: 1163,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Notre-Dame_de_Paris%2C_4_October_2017.jpg/800px-Notre-Dame_de_Paris%2C_4_October_2017.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 2,
    name: "Basilique du Sacré-Cœur",
    nameAlt: ["Sacré-Coeur", "Sacre Coeur", "Sacré-Cœur de Montmartre"],
    city: "Paris",
    country: "France",
    continent: "Europe",
    yearBuilt: 1875,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Le_sacre_coeur.jpg/800px-Le_sacre_coeur.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 3,
    name: "Mont-Saint-Michel",
    nameAlt: ["Abbaye du Mont-Saint-Michel", "Le Mont Saint Michel", "Mont Saint-Michel"],
    city: "Le Mont-Saint-Michel",
    country: "France",
    continent: "Europe",
    yearBuilt: 966,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mont-Saint-Michel_vu_du_ciel.jpg/800px-Mont-Saint-Michel_vu_du_ciel.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 4,
    name: "Cathédrale Notre-Dame de Strasbourg",
    nameAlt: ["Cathédrale de Strasbourg", "Notre-Dame de Strasbourg"],
    city: "Strasbourg",
    country: "France",
    continent: "Europe",
    yearBuilt: 1015,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Strasbourg_Cathedral_Exterior_-_Diliff.jpg/800px-Strasbourg_Cathedral_Exterior_-_Diliff.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 5,
    name: "Basilique Saint-Pierre",
    nameAlt: ["Saint-Pierre de Rome", "Basilique Saint-Pierre du Vatican", "St Peter's Basilica"],
    city: "Vatican",
    country: "Italie",
    continent: "Europe",
    yearBuilt: 1506,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg/800px-Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 6,
    name: "Cathédrale de Florence",
    nameAlt: ["Duomo de Florence", "Santa Maria del Fiore", "Duomo di Firenze"],
    city: "Florence",
    country: "Italie",
    continent: "Europe",
    yearBuilt: 1296,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cattedrale_di_Santa_Maria_del_Fiore_%E2%80%93_Il_Duomo_di_Firenze.jpg/800px-Cattedrale_di_Santa_Maria_del_Fiore_%E2%80%93_Il_Duomo_di_Firenze.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 7,
    name: "Cathédrale de Milan",
    nameAlt: ["Duomo de Milan", "Duomo di Milano"],
    city: "Milan",
    country: "Italie",
    continent: "Europe",
    yearBuilt: 1386,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg/800px-Milan_Cathedral_from_Piazza_del_Duomo.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 8,
    name: "Basilique Saint-Marc",
    nameAlt: ["Saint-Marc de Venise", "Basilica di San Marco"],
    city: "Venise",
    country: "Italie",
    continent: "Europe",
    yearBuilt: 1063,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Venezia_Basilica_di_San_Marco_Fassade_2.jpg/800px-Venezia_Basilica_di_San_Marco_Fassade_2.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 9,
    name: "Sagrada Família",
    nameAlt: ["Sagrada Familia", "La Sagrada Familia", "Temple Expiatori de la Sagrada Família"],
    city: "Barcelone",
    country: "Espagne",
    continent: "Europe",
    yearBuilt: 1882,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg/800px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 10,
    name: "Cathédrale de Séville",
    nameAlt: ["Cathédrale Notre-Dame du Siège de Séville", "Catedral de Sevilla"],
    city: "Séville",
    country: "Espagne",
    continent: "Europe",
    yearBuilt: 1401,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sevilla_Cathedral_-_Southeast.jpg/800px-Sevilla_Cathedral_-_Southeast.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 11,
    name: "Abbaye de Westminster",
    nameAlt: ["Westminster Abbey"],
    city: "Londres",
    country: "Royaume-Uni",
    continent: "Europe",
    yearBuilt: 1245,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Westminster_Abbey_St_Peter.jpg/800px-Westminster_Abbey_St_Peter.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 12,
    name: "Cathédrale Saint-Paul",
    nameAlt: ["St Paul's Cathedral", "Saint Paul's Cathedral"],
    city: "Londres",
    country: "Royaume-Uni",
    continent: "Europe",
    yearBuilt: 1675,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/St_Pauls_aerial_%28cropped%29.jpg/800px-St_Pauls_aerial_%28cropped%29.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 13,
    name: "Cathédrale de Cologne",
    nameAlt: ["Kölner Dom", "Kolner Dom", "Dom de Cologne"],
    city: "Cologne",
    country: "Allemagne",
    continent: "Europe",
    yearBuilt: 1248,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg/800px-K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 14,
    name: "Cathédrale Saint-Basile",
    nameAlt: ["Saint-Basile-le-Bienheureux", "Saint Basil's Cathedral", "Cathédrale Basile le Bienheureux"],
    city: "Moscou",
    country: "Russie",
    continent: "Europe",
    yearBuilt: 1555,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Saint_Basil%27s_Cathedral_in_Moscow.jpg/800px-Saint_Basil%27s_Cathedral_in_Moscow.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 15,
    name: "Hagia Sophia",
    nameAlt: ["Sainte-Sophie", "Ayasofya", "Basilique Sainte-Sophie"],
    city: "Istanbul",
    country: "Turquie",
    continent: "Europe",
    yearBuilt: 532,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hagia_Sophia_%28228968325%29.jpeg/800px-Hagia_Sophia_%28228968325%29.jpeg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 16,
    name: "Église en bois debout de Borgund",
    nameAlt: ["Stavkirke de Borgund", "Borgund Stave Church", "Borgund stavkyrkje"],
    city: "Lærdal",
    country: "Norvège",
    continent: "Europe",
    yearBuilt: 1180,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Borgund_Stave_Church_in_L%C3%A6rdalen%2C_2013_June.jpg/800px-Borgund_Stave_Church_in_L%C3%A6rdalen%2C_2013_June.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 17,
    name: "Hallgrímskirkja",
    nameAlt: ["Hallgrimskirkja", "Église de Hallgrímur"],
    city: "Reykjavik",
    country: "Islande",
    continent: "Europe",
    yearBuilt: 1945,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Leifur_Eir%C3%ADksson_and_Hallgr%C3%ADmskirkja_%2814527191932%29.jpg/800px-Leifur_Eir%C3%ADksson_and_Hallgr%C3%ADmskirkja_%2814527191932%29.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 18,
    name: "Église Saint-Nicolas",
    nameAlt: ["Kostel svatého Mikuláše", "St Nicholas Church Prague"],
    city: "Prague",
    country: "Tchéquie",
    continent: "Europe",
    yearBuilt: 1703,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Praag%2C_Tsjechi%C3%AB_Aug_17%2C_2019_05-12-38_PM.jpeg/800px-Praag%2C_Tsjechi%C3%AB_Aug_17%2C_2019_05-12-38_PM.jpeg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },

  // ===================== AMÉRIQUES (8) =====================
  {
    id: 19,
    name: "Cathédrale Saint-Patrick",
    nameAlt: ["St Patrick's Cathedral", "Saint Patrick's Cathedral"],
    city: "New York",
    country: "États-Unis",
    continent: "Amérique",
    yearBuilt: 1858,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/At_New_York%2C_USA_2017_119.jpg/800px-At_New_York%2C_USA_2017_119.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 20,
    name: "Cathédrale nationale de Washington",
    nameAlt: ["Washington National Cathedral", "National Cathedral"],
    city: "Washington",
    country: "États-Unis",
    continent: "Amérique",
    yearBuilt: 1907,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/WashNatCathedralx1.jpg/800px-WashNatCathedralx1.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 21,
    name: "Basilique Notre-Dame de Montréal",
    nameAlt: ["Notre-Dame de Montréal", "Notre-Dame Basilica Montreal"],
    city: "Montréal",
    country: "Canada",
    continent: "Amérique",
    yearBuilt: 1824,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bas%C3%ADlica_de_Notre-Dame%2C_Montreal%2C_Canad%C3%A1%2C_2017-08-11%2C_DD_26-28_HDR.jpg/800px-Bas%C3%ADlica_de_Notre-Dame%2C_Montreal%2C_Canad%C3%A1%2C_2017-08-11%2C_DD_26-28_HDR.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 22,
    name: "Cathédrale métropolitaine de Mexico",
    nameAlt: ["Catedral Metropolitana", "Cathédrale de Mexico"],
    city: "Mexico",
    country: "Mexique",
    continent: "Amérique",
    yearBuilt: 1573,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mexico_City_%282018%29_-_160.jpg/800px-Mexico_City_%282018%29_-_160.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 23,
    name: "Cathédrale de Brasília",
    nameAlt: ["Catedral de Brasília", "Cathédrale métropolitaine de Brasília"],
    city: "Brasília",
    country: "Brésil",
    continent: "Amérique",
    yearBuilt: 1958,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Catedral_Metropolitana_de_Brasilia.jpg/800px-Catedral_Metropolitana_de_Brasilia.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 24,
    name: "Sanctuaire de Las Lajas",
    nameAlt: ["Las Lajas", "Santuario de Las Lajas"],
    city: "Ipiales",
    country: "Colombie",
    continent: "Amérique",
    yearBuilt: 1916,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Santuario_de_Las_Lajas%2C_Ipiales%2C_Colombia%2C_2015-07-21%2C_DD_26-27_HDR.JPG/800px-Santuario_de_Las_Lajas%2C_Ipiales%2C_Colombia%2C_2015-07-21%2C_DD_26-27_HDR.JPG",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 25,
    name: "Basilique du Vœu National",
    nameAlt: ["Basílica del Voto Nacional", "Basilica del Voto Nacional"],
    city: "Quito",
    country: "Équateur",
    continent: "Amérique",
    yearBuilt: 1892,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/El_Voto_Nacional_._Quito%2C_Ecuador.JPG/800px-El_Voto_Nacional_._Quito%2C_Ecuador.JPG",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 26,
    name: "Église de la Compagnie de Jésus",
    nameAlt: ["Iglesia de la Compañía de Jesús", "La Compañía"],
    city: "Cusco",
    country: "Pérou",
    continent: "Amérique",
    yearBuilt: 1571,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Iglesia_de_la_Compa%C3%B1%C3%ADa_de_Jes%C3%BAs%2C_Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_51.JPG/800px-Iglesia_de_la_Compa%C3%B1%C3%ADa_de_Jes%C3%BAs%2C_Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_51.JPG",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },

  // ===================== AFRIQUE (5) =====================
  {
    id: 27,
    name: "Église Saint-Georges de Lalibela",
    nameAlt: ["Bete Giyorgis", "Church of Saint George Lalibela", "Église rupestre de Lalibela"],
    city: "Lalibela",
    country: "Éthiopie",
    continent: "Afrique",
    yearBuilt: 1200,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lalibela%2C_san_giorgio%2C_esterno_24.jpg/800px-Lalibela%2C_san_giorgio%2C_esterno_24.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 28,
    name: "Église suspendue du Caire",
    nameAlt: ["Église suspendue", "Al-Moallaqa", "Hanging Church"],
    city: "Le Caire",
    country: "Égypte",
    continent: "Afrique",
    yearBuilt: 690,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kairo_Hanging_Church_BW_1.jpg/800px-Kairo_Hanging_Church_BW_1.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 29,
    name: "Basilique Notre-Dame de la Paix",
    nameAlt: ["Notre-Dame de la Paix de Yamoussoukro", "Basilique de Yamoussoukro"],
    city: "Yamoussoukro",
    country: "Côte d'Ivoire",
    continent: "Afrique",
    yearBuilt: 1985,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Notre_dame_de_la_paix_yamoussoukro_by_felix_krohn.jpg/800px-Notre_dame_de_la_paix_yamoussoukro_by_felix_krohn.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 30,
    name: "Cathédrale du Sacré-Cœur de Casablanca",
    nameAlt: ["Cathédrale de Casablanca", "Sacré-Cœur de Casablanca"],
    city: "Casablanca",
    country: "Maroc",
    continent: "Afrique",
    yearBuilt: 1930,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Cath%C3%A9drale_Casablanca.jpg/800px-Cath%C3%A9drale_Casablanca.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 31,
    name: "Cathédrale Saint-Georges du Cap",
    nameAlt: ["St George's Cathedral", "Cathédrale du Cap"],
    city: "Le Cap",
    country: "Afrique du Sud",
    continent: "Afrique",
    yearBuilt: 1897,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/St_George%27s_Cathedral%2C_Wale_Street%2C_Cape_Town.jpg/800px-St_George%27s_Cathedral%2C_Wale_Street%2C_Cape_Town.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },

  // ===================== ASIE (6) =====================
  {
    id: 32,
    name: "Basilique de Bom Jesus",
    nameAlt: ["Basilica of Bom Jesus", "Bom Jesus de Goa"],
    city: "Goa",
    country: "Inde",
    continent: "Asie",
    yearBuilt: 1594,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/800px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 33,
    name: "Église San Agustin de Manille",
    nameAlt: ["San Agustin Church", "Église San Agustin", "San Agustin Manila"],
    city: "Manille",
    country: "Philippines",
    continent: "Asie",
    yearBuilt: 1587,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/San_Agustin_Church_2024-05-19.jpg/800px-San_Agustin_Church_2024-05-19.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 34,
    name: "Cathédrale d'Etchmiadzin",
    nameAlt: ["Etchmiadzin", "Cathédrale-mère du Saint-Siège d'Etchmiadzin"],
    city: "Etchmiadzin",
    country: "Arménie",
    continent: "Asie",
    yearBuilt: 301,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Etchmiadzin_2025-3.jpg/800px-Etchmiadzin_2025-3.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 35,
    name: "Cathédrale de la Sainte-Trinité de Tbilissi",
    nameAlt: ["Tsminda Sameba", "Holy Trinity Cathedral Tbilisi", "Sameba"],
    city: "Tbilissi",
    country: "Géorgie",
    continent: "Asie",
    yearBuilt: 1995,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/2014_Tbilisi%2C_Sob%C3%B3r_Tr%C3%B3jcy_%C5%9Awi%C4%99tej_%2817%29.jpg/800px-2014_Tbilisi%2C_Sob%C3%B3r_Tr%C3%B3jcy_%C5%9Awi%C4%99tej_%2817%29.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 36,
    name: "Église d'Oura",
    nameAlt: ["Oura Church", "Église des vingt-six martyrs du Japon"],
    city: "Nagasaki",
    country: "Japon",
    continent: "Asie",
    yearBuilt: 1864,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Oura_Cathedral_20180623.jpg/800px-Oura_Cathedral_20180623.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: 37,
    name: "Cathédrale Saint-Georges de Beyrouth",
    nameAlt: ["Cathédrale maronite Saint-Georges", "St George Maronite Cathedral"],
    city: "Beyrouth",
    country: "Liban",
    continent: "Asie",
    yearBuilt: 1884,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Saint_George_Maronite_Cathedral_and_Mohammad_Al-Amin_Mosque_by_Lebnen18.jpg/800px-Saint_George_Maronite_Cathedral_and_Mohammad_Al-Amin_Mosque_by_Lebnen18.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  },

  // ===================== OCÉANIE (3) =====================
  {
    id: 38,
    name: "Cathédrale Sainte-Marie de Sydney",
    nameAlt: ["St Mary's Cathedral Sydney", "Cathédrale de Sydney"],
    city: "Sydney",
    country: "Australie",
    continent: "Océanie",
    yearBuilt: 1866,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/St_Mary%27s_Cathedral%2C_Sydney_HDR_b.jpg/800px-St_Mary%27s_Cathedral%2C_Sydney_HDR_b.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 39,
    name: "Cathédrale ChristChurch",
    nameAlt: ["ChristChurch Cathedral", "Cathédrale anglicane de Christchurch"],
    city: "Christchurch",
    country: "Nouvelle-Zélande",
    continent: "Océanie",
    yearBuilt: 1864,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Christ_ChurchCathedral1_gobeirne.jpg/800px-Christ_ChurchCathedral1_gobeirne.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 3.0"
  },
  {
    id: 40,
    name: "Cathédrale du Sacré-Cœur de Suva",
    nameAlt: ["Sacred Heart Cathedral Suva", "Cathédrale de Suva"],
    city: "Suva",
    country: "Fidji",
    continent: "Océanie",
    yearBuilt: 1902,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sacred_Heart_Cathedral%2C_Suva_Fiji_July_2014.jpg/800px-Sacred_Heart_Cathedral%2C_Suva_Fiji_July_2014.jpg",
    attribution: "Wikimedia Commons, CC BY-SA 4.0"
  }
];
