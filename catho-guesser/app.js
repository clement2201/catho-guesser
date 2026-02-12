(() => {
  'use strict';

  // ==================== CONSTANTES ====================
  const TOTAL_ROUNDS = 20;
  const POINTS_COUNTRY = 1;
  const POINTS_CITY = 2;
  const POINTS_NAME = 3;
  const FEEDBACK_DELAY_CORRECT = 1200;
  const FEEDBACK_DELAY_WRONG = 2000;
  const LEADERBOARD_KEY = 'catho_guesser_leaderboard';
  const LANG_KEY = 'catho_guesser_lang';
  const MAX_LEADERBOARD = 200;

  // ==================== FIREBASE ====================
  const firebaseConfig = {
    apiKey: "AIzaSyD0H5t_IEKYjrdyh9J7UiR-JtqgKSvFYzA",
    authDomain: "catho-guesser.firebaseapp.com",
    databaseURL: "https://catho-guesser-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catho-guesser",
    storageBucket: "catho-guesser.firebasestorage.app",
    messagingSenderId: "390464919609",
    appId: "1:390464919609:web:40864cc5bde0d807ca55e8"
  };

  let firebaseDb = null;
  let firebaseAvailable = false;

  const withTimeout = (promise, ms) =>
    Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), ms))
    ]);

  try {
    if (typeof firebase !== 'undefined') {
      firebase.initializeApp(firebaseConfig);
      firebaseDb = firebase.database();
      firebaseAvailable = true;
    }
  } catch (e) {
    console.warn('Firebase init failed, using localStorage fallback:', e);
  }

  // ==================== TRADUCTIONS ====================
  let currentLang = 'fr';

  const I18N = {
    fr: {
      // Header
      score: 'Score',
      streak: 'Série',
      round: 'Manche',
      // Start screen
      subtitle: 'Montre au monde à quel point tu es un bon chrétien',
      rule1: 'Devinez le <strong>pays</strong> <em>(+1 pt)</em>',
      rule2: 'Devinez la <strong>ville</strong> <em>(+2 pts)</em>',
      rule3: 'Devinez le <strong>nom</strong> <em>(+3 pts)</em>',
      start_note_jokers: 'Vous disposez de 3 prières afin d\u2019obtenir des indices et vous rapprocher des cieux',
      start_note: '20 églises par manche',
      btn_start: 'Commencer la Messe',
      btn_leaderboard: '\uD83C\uDFC6 Classement',
      // Game
      question_country: 'Dans quel pays se trouve cette église ?',
      question_city: 'Dans quelle ville se trouve cette église ?',
      question_name: 'Quel est le nom de cette église ?',
      city_placeholder: 'Nom de la ville...',
      name_placeholder: "Nom de l'église...",
      btn_submit: 'Valider',
      btn_skip: 'Passer',
      // Feedback
      correct: 'Correct !',
      bravo: 'Bravo !',
      wrong: 'Mauvaise réponse !',
      was: "C'était : ",
      not_quite: 'Pas tout à fait...',
      skipped: 'Passé !',
      plus_1: '+1 point',
      plus_2: '+2 points',
      plus_3: '+3 points',
      // Game over
      gameover_title: 'Amen !',
      gameover_subtitle: 'La messe est dite.',
      points_label: 'Points',
      best_streak: 'Meilleure série',
      perfect: 'Sans-faute',
      save_label: '\u270D Inscrivez votre nom dans le livre sacré :',
      pseudo_placeholder: 'Votre pseudo...',
      btn_save: 'Sauvegarder',
      btn_restart: 'Nouvelle Messe',
      score_saved: '\u2713 Score inscrit dans le livre sacré !',
      // Jokers
      joker_spirit: 'Saint-Esprit',
      joker_god: 'Dieu',
      joker_father: 'Le Père',
      hint_continent: 'Continent :',
      hint_eliminated: '2 mauvaises réponses éliminées !',
      hint_first_letter: 'Première lettre :',
      hint_letters: 'Nombre de lettres :',
      // Rangs du clergé
      rank_pope: 'Pape',
      rank_cardinal: 'Cardinal',
      rank_archbishop: 'Archevêque',
      rank_bishop: 'Évêque',
      rank_priest: 'Curé',
      rank_deacon: 'Diacre',
      rank_seminarian: 'Séminariste',
      rank_altarboy: 'Enfant de chœur',
      // Leaderboard
      lb_title: '\uD83D\uDCDC Le Livre Sacré',
      lb_subtitle: 'Les plus grands fidèles',
      btn_back: 'Retour',
      btn_play: 'Jouer',
      btn_clear_lb: 'Purger les hérétiques',
      confirm_clear: '\u26A0\uFE0F Purger tous les hérétiques du classement ?',
      lb_empty: 'Aucun fidèle inscrit.<br>Jouez une partie pour entrer dans le livre sacré !',
      // Footer
      footer: 'Images : Wikimedia Commons (CC BY-SA) \u2022 Catho Guesser \u2022 <em>In nomine Patris</em>',
      // Misc
      image_unavailable: 'Image indisponible'
    },
    en: {
      score: 'Score',
      streak: 'Streak',
      round: 'Round',
      subtitle: 'Show the world what a good Christian you are',
      rule1: 'Guess the <strong>country</strong> <em>(+1 pt)</em>',
      rule2: 'Guess the <strong>city</strong> <em>(+2 pts)</em>',
      rule3: 'Guess the <strong>name</strong> <em>(+3 pts)</em>',
      start_note_jokers: 'You have 3 prayers to get hints and get closer to heaven',
      start_note: '20 churches per round',
      btn_start: 'Start the Mass',
      btn_leaderboard: '\uD83C\uDFC6 Leaderboard',
      question_country: 'In which country is this church?',
      question_city: 'In which city is this church?',
      question_name: 'What is the name of this church?',
      city_placeholder: 'Name of the city...',
      name_placeholder: 'Name of the church...',
      btn_submit: 'Submit',
      btn_skip: 'Skip',
      correct: 'Correct!',
      bravo: 'Well done!',
      wrong: 'Wrong answer!',
      was: 'It was: ',
      not_quite: 'Not quite...',
      skipped: 'Skipped!',
      plus_1: '+1 point',
      plus_2: '+2 points',
      plus_3: '+3 points',
      gameover_title: 'Amen!',
      gameover_subtitle: 'The mass has been said.',
      points_label: 'Points',
      best_streak: 'Best streak',
      perfect: 'Perfect',
      save_label: '\u270D Write your name in the sacred book:',
      pseudo_placeholder: 'Your name...',
      btn_save: 'Save',
      btn_restart: 'New Mass',
      score_saved: '\u2713 Score saved in the sacred book!',
      joker_spirit: 'Holy Spirit',
      joker_god: 'God',
      joker_father: 'The Father',
      hint_continent: 'Continent:',
      hint_eliminated: '2 wrong answers eliminated!',
      hint_first_letter: 'First letter:',
      hint_letters: 'Number of letters:',
      rank_pope: 'Pope',
      rank_cardinal: 'Cardinal',
      rank_archbishop: 'Archbishop',
      rank_bishop: 'Bishop',
      rank_priest: 'Priest',
      rank_deacon: 'Deacon',
      rank_seminarian: 'Seminarian',
      rank_altarboy: 'Altar Boy',
      lb_title: '\uD83D\uDCDC The Sacred Book',
      lb_subtitle: 'The greatest faithful',
      btn_back: 'Back',
      btn_play: 'Play',
      btn_clear_lb: 'Purge the heretics',
      confirm_clear: '\u26A0\uFE0F Purge all heretics from the leaderboard?',
      lb_empty: 'No faithful registered.<br>Play a game to enter the sacred book!',
      footer: 'Images: Wikimedia Commons (CC BY-SA) \u2022 Catho Guesser \u2022 <em>In nomine Patris</em>',
      image_unavailable: 'Image unavailable'
    },
    es: {
      score: 'Puntos',
      streak: 'Racha',
      round: 'Ronda',
      subtitle: 'Demuestra al mundo lo buen cristiano que eres',
      rule1: 'Adivina el <strong>país</strong> <em>(+1 pt)</em>',
      rule2: 'Adivina la <strong>ciudad</strong> <em>(+2 pts)</em>',
      rule3: 'Adivina el <strong>nombre</strong> <em>(+3 pts)</em>',
      start_note_jokers: 'Tienes 3 oraciones para obtener pistas y acercarte al cielo',
      start_note: '20 iglesias por ronda',
      btn_start: 'Comenzar la Misa',
      btn_leaderboard: '\uD83C\uDFC6 Clasificación',
      question_country: '¿En qué país se encuentra esta iglesia?',
      question_city: '¿En qué ciudad se encuentra esta iglesia?',
      question_name: '¿Cuál es el nombre de esta iglesia?',
      city_placeholder: 'Nombre de la ciudad...',
      name_placeholder: 'Nombre de la iglesia...',
      btn_submit: 'Enviar',
      btn_skip: 'Pasar',
      correct: '¡Correcto!',
      bravo: '¡Bravo!',
      wrong: '¡Respuesta incorrecta!',
      was: 'Era: ',
      not_quite: 'No del todo...',
      skipped: '¡Pasado!',
      plus_1: '+1 punto',
      plus_2: '+2 puntos',
      plus_3: '+3 puntos',
      gameover_title: '¡Amén!',
      gameover_subtitle: 'La misa ha terminado.',
      points_label: 'Puntos',
      best_streak: 'Mejor racha',
      perfect: 'Perfecto',
      save_label: '\u270D Escribe tu nombre en el libro sagrado:',
      pseudo_placeholder: 'Tu nombre...',
      btn_save: 'Guardar',
      btn_restart: 'Nueva Misa',
      score_saved: '\u2713 ¡Puntuación inscrita en el libro sagrado!',
      joker_spirit: 'Espíritu Santo',
      joker_god: 'Dios',
      joker_father: 'El Padre',
      hint_continent: 'Continente:',
      hint_eliminated: '¡2 respuestas incorrectas eliminadas!',
      hint_first_letter: 'Primera letra:',
      hint_letters: 'Número de letras:',
      rank_pope: 'Papa',
      rank_cardinal: 'Cardenal',
      rank_archbishop: 'Arzobispo',
      rank_bishop: 'Obispo',
      rank_priest: 'Cura',
      rank_deacon: 'Diácono',
      rank_seminarian: 'Seminarista',
      rank_altarboy: 'Monaguillo',
      lb_title: '\uD83D\uDCDC El Libro Sagrado',
      lb_subtitle: 'Los más grandes fieles',
      btn_back: 'Volver',
      btn_play: 'Jugar',
      btn_clear_lb: 'Purgar a los herejes',
      confirm_clear: '\u26A0\uFE0F ¿Purgar a todos los herejes de la clasificación?',
      lb_empty: 'Ningún fiel inscrito.<br>¡Juega una partida para entrar en el libro sagrado!',
      footer: 'Imágenes: Wikimedia Commons (CC BY-SA) \u2022 Catho Guesser \u2022 <em>In nomine Patris</em>',
      image_unavailable: 'Imagen no disponible'
    }
  };

  const t = (key) => (I18N[currentLang] || I18N.fr)[key] || I18N.fr[key] || key;

  const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
  };

  const setLang = (lang) => {
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    applyTranslations();
  };

  // ==================== ÉTAT DU JEU ====================
  const game = {
    state: 'idle', // idle | guess_country | guess_city | guess_name | game_over
    churches: [],
    currentIndex: 0,
    currentChurch: null,
    score: 0,
    streak: 0,
    maxStreak: 0,
    roundsPlayed: 0,
    perfectRounds: 0,
    _roundPoints: 0,
    jokers: { spirit: false, god: false, father: false }
  };

  // ==================== CACHE DOM ====================
  let dom = {};

  const cacheDom = () => {
    dom = {
      header: document.getElementById('header'),
      progressBar: document.getElementById('progress-bar'),
      scoreDisplay: document.getElementById('score-display'),
      streakDisplay: document.getElementById('streak-display'),
      progressDisplay: document.getElementById('progress-display'),

      screenStart: document.getElementById('screen-start'),
      screenGame: document.getElementById('screen-game'),
      screenGameover: document.getElementById('screen-gameover'),
      screenLeaderboard: document.getElementById('screen-leaderboard'),

      btnStart: document.getElementById('btn-start'),
      btnRestart: document.getElementById('btn-restart'),
      btnLeaderboard: document.getElementById('btn-leaderboard'),
      btnLeaderboardHome: document.getElementById('btn-leaderboard-home'),
      btnBackHome: document.getElementById('btn-back-home'),
      btnPlayFromLb: document.getElementById('btn-play-from-lb'),
      btnClearLeaderboard: document.getElementById('btn-clear-leaderboard'),

      churchImage: document.getElementById('church-image'),
      imageLoader: document.getElementById('image-loader'),
      roundBadge: document.getElementById('round-badge'),
      questionText: document.getElementById('question-text'),
      choicesContainer: document.getElementById('choices-container'),
      textInputContainer: document.getElementById('text-input-container'),
      nameInput: document.getElementById('name-input'),
      btnSubmitName: document.getElementById('btn-submit-name'),
      btnSkipName: document.getElementById('btn-skip-name'),

      jokersBar: document.getElementById('jokers-bar'),
      jokerSpirit: document.getElementById('joker-spirit'),
      jokerGod: document.getElementById('joker-god'),
      jokerFather: document.getElementById('joker-father'),
      hintDisplay: document.getElementById('hint-display'),

      feedbackOverlay: document.getElementById('feedback-overlay'),
      feedbackIcon: document.getElementById('feedback-icon'),
      feedbackText: document.getElementById('feedback-text'),
      feedbackDetail: document.getElementById('feedback-detail'),

      finalStats: document.getElementById('final-stats'),
      pseudoInput: document.getElementById('pseudo-input'),
      btnSaveScore: document.getElementById('btn-save-score'),
      saveFeedback: document.getElementById('save-feedback'),
      saveScoreSection: document.getElementById('save-score-section'),
      leaderboardList: document.getElementById('leaderboard-list')
    };
  };

  // ==================== UTILITAIRES ====================
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const levenshtein = (a, b) => {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  };

  const GENERIC_WORDS = new Set([
    'cathedrale', 'basilique', 'eglise', 'abbaye', 'sanctuaire', 'chapelle',
    'cathedral', 'basilica', 'church', 'abbey', 'temple',
    'de', 'du', 'des', 'la', 'le', 'les', 'l', 'en', 'a', 'au',
    'of', 'the', 'di', 'del', 'da', 'das', 'do', 'dos',
    'nationale', 'metropolitaine', 'national', 'metropolitan',
    'sacre', 'saint', 'sainte', 'notre', 'dame', 'bois', 'debout'
  ]);

  const extractKeywords = (name) => {
    const words = normalizeText(name).split(' ').filter(w => w.length >= 3 && !GENERIC_WORDS.has(w));
    return words;
  };

  const checkNameMatch = (userInput, church) => {
    const normalized = normalizeText(userInput);
    if (normalized.length < 2) return false;

    const candidates = [church.name, ...(church.nameAlt || [])];

    for (const candidate of candidates) {
      const c = normalizeText(candidate);
      // Match exact
      if (normalized === c) return true;
      // Inclusion dans les deux sens
      if (c.includes(normalized) && normalized.length >= 4) return true;
      if (normalized.includes(c) && c.length >= 4) return true;
      // Levenshtein plus tolerant (40% de la longueur, max 5)
      const maxDist = Math.min(5, Math.floor(c.length * 0.4));
      if (levenshtein(normalized, c) <= maxDist) return true;
    }

    // Verifier si l'input contient un mot-cle distinctif du nom
    const keywords = extractKeywords(church.name);
    for (const alt of (church.nameAlt || [])) {
      extractKeywords(alt).forEach(k => { if (!keywords.includes(k)) keywords.push(k); });
    }

    for (const keyword of keywords) {
      if (keyword.length < 4) continue;
      // Le mot-cle est dans l'input (ou l'inverse)
      if (normalized.includes(keyword)) return true;
      if (keyword.includes(normalized) && normalized.length >= 4) return true;
      // Levenshtein sur le mot-cle seul
      const inputWords = normalized.split(' ');
      for (const w of inputWords) {
        if (w.length < 3) continue;
        const dist = levenshtein(w, keyword);
        if (dist <= Math.min(2, Math.floor(keyword.length * 0.35))) return true;
      }
    }

    return false;
  };

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // ==================== GÉNÉRATION DE CHOIX ====================
  const generateCountryChoices = (church) => {
    const correct = church.country;
    const seen = new Set([correct]);
    const distractors = [];

    const shuffled = shuffleArray(CHURCHES);
    for (const c of shuffled) {
      if (!seen.has(c.country)) {
        distractors.push(c.country);
        seen.add(c.country);
        if (distractors.length === 3) break;
      }
    }
    return shuffleArray([correct, ...distractors]);
  };

  // Villes connues par pays pour les distracteurs QCM
  const COUNTRY_CITIES = {
    "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Strasbourg", "Nantes", "Lille", "Nice", "Rouen", "Reims", "Le Mont-Saint-Michel", "Chartres", "Lourdes", "Avignon"],
    "Italie": ["Rome", "Vatican", "Florence", "Milan", "Venise", "Naples", "Turin", "Bologne", "Palerme", "Assise", "Sienne", "Bari", "Gênes", "Padoue"],
    "Espagne": ["Madrid", "Barcelone", "Séville", "Valence", "Tolède", "Grenade", "Bilbao", "Saragosse", "Cordoue", "Saint-Jacques-de-Compostelle", "Salamanque"],
    "Royaume-Uni": ["Londres", "Canterbury", "York", "Édimbourg", "Liverpool", "Oxford", "Cambridge", "Bristol", "Manchester", "Durham", "Winchester"],
    "Allemagne": ["Berlin", "Munich", "Cologne", "Hambourg", "Francfort", "Dresde", "Aix-la-Chapelle", "Nuremberg", "Stuttgart", "Trèves"],
    "Russie": ["Moscou", "Saint-Pétersbourg", "Kazan", "Novgorod", "Volgograd", "Ekaterinbourg", "Sotchi", "Vladivostok"],
    "Turquie": ["Istanbul", "Ankara", "Izmir", "Antalya", "Éphèse", "Cappadoce", "Trabzon", "Konya"],
    "Norvège": ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø", "Lærdal", "Ålesund"],
    "Islande": ["Reykjavik", "Akureyri", "Vik", "Húsavík", "Selfoss", "Keflavík"],
    "Tchéquie": ["Prague", "Brno", "Ostrava", "Plzeň", "Český Krumlov", "Olomouc", "Kutná Hora"],
    "États-Unis": ["New York", "Washington", "Los Angeles", "Chicago", "Boston", "San Francisco", "Philadelphie", "La Nouvelle-Orléans", "Baltimore", "Saint-Louis"],
    "Canada": ["Montréal", "Québec", "Toronto", "Ottawa", "Vancouver", "Winnipeg", "Halifax", "Calgary"],
    "Mexique": ["Mexico", "Guadalajara", "Puebla", "Oaxaca", "Monterrey", "Mérida", "San Cristóbal", "Guanajuato"],
    "Brésil": ["Brasília", "São Paulo", "Rio de Janeiro", "Salvador", "Belo Horizonte", "Recife", "Fortaleza", "Manaus"],
    "Colombie": ["Bogota", "Medellín", "Cali", "Carthagène", "Barranquilla", "Ipiales", "Santa Marta"],
    "Équateur": ["Quito", "Guayaquil", "Cuenca", "Loja", "Ambato", "Riobamba"],
    "Pérou": ["Lima", "Cusco", "Arequipa", "Trujillo", "Ayacucho", "Puno", "Huancayo"],
    "Éthiopie": ["Addis-Abeba", "Lalibela", "Gondar", "Axoum", "Harar", "Dire Dawa"],
    "Égypte": ["Le Caire", "Alexandrie", "Louxor", "Assouan", "Port-Saïd", "Gizeh"],
    "Côte d'Ivoire": ["Abidjan", "Yamoussoukro", "Bouaké", "San-Pédro", "Daloa", "Korhogo"],
    "Maroc": ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Meknès", "Agadir"],
    "Afrique du Sud": ["Le Cap", "Johannesbourg", "Pretoria", "Durban", "Port Elizabeth", "Bloemfontein"],
    "Inde": ["Goa", "Mumbai", "Delhi", "Chennai", "Kolkata", "Bangalore", "Pondichéry", "Kochi"],
    "Philippines": ["Manille", "Cebu", "Davao", "Zamboanga", "Iloilo", "Baguio", "Vigan"],
    "Arménie": ["Erevan", "Etchmiadzin", "Gyumri", "Vanadzor", "Goris", "Dilijan"],
    "Géorgie": ["Tbilissi", "Batoumi", "Kutaïssi", "Mtskheta", "Gori", "Telavi"],
    "Japon": ["Tokyo", "Kyoto", "Nagasaki", "Osaka", "Hiroshima", "Nara", "Yokohama", "Kobe"],
    "Liban": ["Beyrouth", "Tripoli", "Byblos", "Sidon", "Jounieh", "Baalbek", "Tyr"],
    "Australie": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adélaïde", "Canberra", "Darwin"],
    "Nouvelle-Zélande": ["Auckland", "Wellington", "Christchurch", "Dunedin", "Hamilton", "Queenstown"],
    "Fidji": ["Suva", "Nadi", "Lautoka", "Labasa", "Savusavu", "Levuka"]
  };

  const generateCityChoices = (church) => {
    const correct = church.city;
    const countryCities = (COUNTRY_CITIES[church.country] || []).filter(c => c !== correct);

    let distractors = shuffleArray(countryCities).slice(0, 3);

    // Fallback si pas assez de villes pour ce pays (ne devrait pas arriver)
    if (distractors.length < 3) {
      const otherCities = CHURCHES
        .filter(c => c.city !== correct && !distractors.includes(c.city))
        .map(c => c.city);
      const unique = [...new Set(otherCities)];
      distractors = [...distractors, ...shuffleArray(unique).slice(0, 3 - distractors.length)];
    }

    return shuffleArray([correct, ...distractors.slice(0, 3)]);
  };

  // ==================== MUSIQUE ====================
  const audioLanding = new Audio('https://archive.org/download/GregorianChantMass/02Track2_vbr.mp3');
  audioLanding.loop = true;
  audioLanding.volume = 0.3;
  audioLanding.preload = 'auto';

  const audioGameover = new Audio('https://archive.org/download/EDIS-SRP-0195-06/EDIS-SRP-0195-06.mp3');
  audioGameover.loop = false;
  audioGameover.volume = 0.4;
  audioGameover.preload = 'auto';

  let audioUnlocked = false;

  const stopAllMusic = () => {
    audioLanding.pause();
    audioLanding.currentTime = 0;
    audioGameover.pause();
    audioGameover.currentTime = 0;
  };

  const playMusic = (audio) => {
    stopAllMusic();
    if (audioUnlocked) {
      audio.play().catch(() => {});
    }
  };

  // Débloquer l'audio au premier geste utilisateur
  const unlockAudio = () => {
    audioUnlocked = true;
    // Jouer la musique de l'écran actuel
    const startScreen = document.getElementById('screen-start');
    if (startScreen && startScreen.classList.contains('active')) {
      audioLanding.play().catch(() => {});
    }
    document.removeEventListener('pointerdown', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('pointerdown', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  // ==================== NAVIGATION ====================
  const showScreen = (name) => {
    const screens = [dom.screenStart, dom.screenGame, dom.screenGameover, dom.screenLeaderboard];
    screens.forEach(s => s.classList.remove('active'));

    const map = {
      start: dom.screenStart,
      game: dom.screenGame,
      gameover: dom.screenGameover,
      leaderboard: dom.screenLeaderboard
    };
    map[name].classList.add('active');

    const showHeader = name === 'game';
    dom.header.classList.toggle('hidden', !showHeader);
    document.getElementById('lang-selector').classList.toggle('hidden', showHeader);

    // Musique
    if (name === 'start') {
      playMusic(audioLanding);
    } else if (name === 'gameover') {
      playMusic(audioGameover);
    } else {
      stopAllMusic();
    }
  };

  // ==================== LOGIQUE DE JEU ====================
  const startGame = () => {
    game.churches = shuffleArray([...CHURCHES]).slice(0, TOTAL_ROUNDS);
    game.currentIndex = 0;
    game.score = 0;
    game.streak = 0;
    game.maxStreak = 0;
    game.roundsPlayed = 0;
    game.perfectRounds = 0;
    game.jokers = { spirit: false, god: false, father: false };
    resetJokersUI();

    updateStats();
    showScreen('game');
    startRound();
  };

  const startRound = () => {
    game.currentChurch = game.churches[game.currentIndex];
    game._roundPoints = 0;

    dom.roundBadge.textContent = `${game.currentIndex + 1} / ${TOTAL_ROUNDS}`;
    dom.hintDisplay.classList.add('hidden');
    dom.hintDisplay.textContent = '';
    updateProgress();
    loadImage(game.currentChurch.imageUrl);
    showGuessCountry();
  };

  const loadImage = (url) => {
    dom.churchImage.classList.add('loading');
    dom.imageLoader.classList.add('visible');

    // Proxy via wsrv.nl pour éviter le rate-limit Wikimedia
    const proxied = `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&fit=cover`;
    dom.churchImage.src = proxied;

    dom.churchImage.onload = () => {
      dom.churchImage.classList.remove('loading');
      dom.imageLoader.classList.remove('visible');
    };

    dom.churchImage.onerror = () => {
      dom.imageLoader.classList.remove('visible');
      dom.churchImage.classList.remove('loading');
      dom.churchImage.src = `data:image/svg+xml,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" fill="#e8d5a8">' +
        '<rect width="800" height="500"/>' +
        `<text x="400" y="240" text-anchor="middle" fill="#8a6e55" font-size="24" font-family="serif">${t('image_unavailable')}</text>` +
        '<text x="400" y="280" text-anchor="middle" fill="#8a6e55" font-size="48">&#10013;</text>' +
        '</svg>'
      )}`;
    };
  };

  // ==================== GUESS COUNTRY ====================
  const showGuessCountry = () => {
    game.state = 'guess_country';
    dom.questionText.textContent = t('question_country');
    dom.textInputContainer.classList.add('hidden');
    dom.choicesContainer.style.display = '';
    dom.choicesContainer.innerHTML = '';

    const choices = generateCountryChoices(game.currentChurch);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handleCountryGuess(choice, btn));
      dom.choicesContainer.appendChild(btn);
    });
  };

  const handleCountryGuess = (selected, clickedBtn) => {
    const correct = selected === game.currentChurch.country;
    disableChoices();
    highlightChoices(game.currentChurch.country, correct ? null : clickedBtn);

    if (correct) {
      game.score += POINTS_COUNTRY;
      game._roundPoints += POINTS_COUNTRY;
      updateStats();
      showFeedback(true, t('correct'), t('plus_1'), () => showGuessCity());
    } else {
      game.streak = 0;
      updateStats();
      showFeedback(false, t('wrong'), `${t('was')}${game.currentChurch.country}`, () => nextRound());
    }
  };

  // ==================== GUESS CITY ====================
  const checkCityMatch = (userInput, church) => {
    const normalized = normalizeText(userInput);
    if (normalized.length < 2) return false;
    const city = normalizeText(church.city);
    if (normalized === city) return true;
    if (city.includes(normalized) && normalized.length >= 4) return true;
    if (normalized.includes(city) && city.length >= 4) return true;
    const maxDist = Math.min(2, Math.floor(city.length * 0.3));
    if (levenshtein(normalized, city) <= maxDist) return true;
    return false;
  };

  const showGuessCity = () => {
    game.state = 'guess_city';
    dom.questionText.textContent = t('question_city');
    dom.textInputContainer.classList.add('hidden');
    dom.choicesContainer.style.display = '';
    dom.choicesContainer.innerHTML = '';

    const choices = generateCityChoices(game.currentChurch);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handleCityGuess(choice, btn));
      dom.choicesContainer.appendChild(btn);
    });
  };

  const handleCityGuess = (selected, clickedBtn) => {
    const correct = selected === game.currentChurch.city;
    disableChoices();
    highlightChoices(game.currentChurch.city, correct ? null : clickedBtn);

    if (correct) {
      game.score += POINTS_CITY;
      game._roundPoints += POINTS_CITY;
      updateStats();
      showFeedback(true, t('correct'), t('plus_2'), () => showGuessName());
    } else {
      game.streak = 0;
      updateStats();
      showFeedback(false, t('wrong'), `${t('was')}${game.currentChurch.city}`, () => nextRound());
    }
  };

  // ==================== GUESS NAME ====================
  // Eglises/monuments religieux connus par ville pour les distracteurs
  const CITY_CHURCHES = {
    "Paris": ["Cathédrale Notre-Dame de Paris", "Basilique du Sacré-Cœur", "Église de la Madeleine", "Église Saint-Sulpice", "Sainte-Chapelle", "Église Saint-Eustache", "Église Saint-Germain-des-Prés", "Panthéon"],
    "Le Mont-Saint-Michel": ["Mont-Saint-Michel", "Abbaye du Mont-Saint-Michel", "Église Saint-Pierre du Mont-Saint-Michel", "Chapelle Saint-Aubert"],
    "Strasbourg": ["Cathédrale Notre-Dame de Strasbourg", "Église Saint-Thomas", "Église Saint-Paul", "Église Saint-Pierre-le-Jeune"],
    "Vatican": ["Basilique Saint-Pierre", "Chapelle Sixtine", "Basilique Saint-Jean-de-Latran", "Basilique Sainte-Marie-Majeure"],
    "Florence": ["Cathédrale de Florence", "Basilique Santa Croce", "Basilique San Lorenzo", "Église Santa Maria Novella", "Baptistère Saint-Jean"],
    "Milan": ["Cathédrale de Milan", "Basilique Sant'Ambrogio", "Église Santa Maria delle Grazie", "Église San Maurizio"],
    "Venise": ["Basilique Saint-Marc", "Église Santa Maria della Salute", "Basilique San Giorgio Maggiore", "Église des Frari"],
    "Barcelone": ["Sagrada Família", "Cathédrale Sainte-Eulalie", "Église Santa Maria del Mar", "Basilique de la Mercè"],
    "Séville": ["Cathédrale de Séville", "Église du Divin-Sauveur", "Basilique de la Macarena", "Église Santa Ana"],
    "Londres": ["Abbaye de Westminster", "Cathédrale Saint-Paul", "Église du Temple", "Cathédrale de Southwark", "Brompton Oratory"],
    "Cologne": ["Cathédrale de Cologne", "Église Sainte-Marie-du-Capitole", "Grande Église Saint-Martin", "Église des Saints-Apôtres"],
    "Moscou": ["Cathédrale Saint-Basile", "Cathédrale du Christ-Sauveur", "Cathédrale de la Dormition", "Cathédrale de l'Archange-Saint-Michel"],
    "Istanbul": ["Hagia Sophia", "Mosquée Bleue", "Église Saint-Sauveur-in-Chora", "Église Sainte-Irène"],
    "Lærdal": ["Église en bois debout de Borgund", "Stavkirke d'Urnes", "Stavkirke de Lom", "Stavkirke de Heddal"],
    "Reykjavik": ["Hallgrímskirkja", "Cathédrale du Christ-Roi", "Église libre de Reykjavik", "Église de Landakot"],
    "Prague": ["Église Saint-Nicolas", "Cathédrale Saint-Guy", "Église Notre-Dame de Týn", "Église Saint-Jacques-le-Majeur"],
    "New York": ["Cathédrale Saint-Patrick", "Cathédrale Saint-Jean le Divin", "Église de la Trinité", "Église Saint-Thomas"],
    "Washington": ["Cathédrale nationale de Washington", "Basilique du Sanctuaire national", "Église Saint-Matthieu", "Église de l'Épiphanie"],
    "Montréal": ["Basilique Notre-Dame de Montréal", "Oratoire Saint-Joseph", "Cathédrale Marie-Reine-du-Monde", "Église Saint-Patrick"],
    "Mexico": ["Cathédrale métropolitaine de Mexico", "Basilique Notre-Dame de Guadalupe", "Temple de San Francisco", "Église de Santo Domingo"],
    "Brasília": ["Cathédrale de Brasília", "Sanctuaire Dom Bosco", "Église Notre-Dame de Fátima", "Chapelle de la Légation"],
    "Ipiales": ["Sanctuaire de Las Lajas", "Cathédrale d'Ipiales", "Église San Felipe Neri", "Chapelle de La Milagrosa"],
    "Quito": ["Basilique du Vœu National", "Église de la Compañía", "Cathédrale de Quito", "Église San Francisco"],
    "Cusco": ["Église de la Compagnie de Jésus", "Cathédrale de Cusco", "Église San Blas", "Église de la Merced"],
    "Lalibela": ["Église Saint-Georges de Lalibela", "Église Bete Medhane Alem", "Église Bete Maryam", "Église Bete Amanuel"],
    "Le Caire": ["Église suspendue du Caire", "Église Saints-Serge-et-Bacchus", "Cathédrale Saint-Marc", "Église Sainte-Barbara"],
    "Yamoussoukro": ["Basilique Notre-Dame de la Paix", "Cathédrale Saint-Augustin", "Temple protestant de Yamoussoukro", "Mosquée de Yamoussoukro"],
    "Casablanca": ["Cathédrale du Sacré-Cœur de Casablanca", "Église Notre-Dame de Lourdes", "Église du Saint-Rosaire", "Cathédrale Saint-Pierre"],
    "Le Cap": ["Cathédrale Saint-Georges du Cap", "Église réformée hollandaise", "Cathédrale Sainte-Marie", "Église Saint-André"],
    "Goa": ["Basilique de Bom Jesus", "Cathédrale Sé de Goa", "Église Saint-François-d'Assise", "Église Notre-Dame-du-Rosaire"],
    "Manille": ["Église San Agustin de Manille", "Cathédrale de Manille", "Église de Quiapo", "Basilique San Sebastian"],
    "Etchmiadzin": ["Cathédrale d'Etchmiadzin", "Église Sainte-Hripsimé", "Église Sainte-Gayané", "Église Choghakat"],
    "Tbilissi": ["Cathédrale de la Sainte-Trinité de Tbilissi", "Basilique d'Antchiskhati", "Église Metekhi", "Cathédrale de Sion"],
    "Nagasaki": ["Église d'Oura", "Cathédrale d'Urakami", "Église de Shitsu", "Église de Kashiragashima"],
    "Beyrouth": ["Cathédrale Saint-Georges de Beyrouth", "Cathédrale Saint-Georges des Grecs", "Église Saint-Louis des Capucins", "Église Saint-Élie"],
    "Sydney": ["Cathédrale Sainte-Marie de Sydney", "Cathédrale Saint-André", "Église Saint-Jacques", "Église Sainte-Marie de la Couronne"],
    "Christchurch": ["Cathédrale ChristChurch", "Basilique de la Sainte-Trinité", "Église Saint-Michel", "Cathédrale du Saint-Sacrement"],
    "Suva": ["Cathédrale du Sacré-Cœur de Suva", "Église Centenary Methodist", "Cathédrale Holy Trinity", "Église Saint-François-Xavier"]
  };

  // Eglises connues par pays pour fallback quand pas assez dans la ville
  const COUNTRY_CHURCHES = {
    "France": ["Cathédrale Notre-Dame de Paris", "Basilique du Sacré-Cœur", "Mont-Saint-Michel", "Cathédrale Notre-Dame de Strasbourg", "Sainte-Chapelle", "Cathédrale de Chartres", "Basilique de Lourdes", "Cathédrale Notre-Dame de Reims", "Cathédrale d'Amiens", "Basilique de Vézelay", "Abbaye de Fontenay", "Cathédrale Notre-Dame de Rouen", "Église de la Madeleine", "Basilique Notre-Dame de Fourvière", "Cathédrale Saint-André de Bordeaux"],
    "Italie": ["Basilique Saint-Pierre", "Cathédrale de Florence", "Cathédrale de Milan", "Basilique Saint-Marc", "Basilique Santa Croce", "Chapelle Sixtine", "Basilique San Giovanni in Laterano", "Basilique Sainte-Marie-Majeure", "Cathédrale de Sienne", "Basilique Saint-François d'Assise", "Cathédrale de Palerme", "Basilique San Vitale de Ravenne"],
    "Espagne": ["Sagrada Família", "Cathédrale de Séville", "Cathédrale de Tolède", "Cathédrale de Saint-Jacques-de-Compostelle", "Cathédrale de Burgos", "Mosquée-Cathédrale de Cordoue", "Cathédrale de Grenade", "Basilique du Pilar de Saragosse", "Cathédrale de Salamanque", "Cathédrale Sainte-Eulalie de Barcelone"],
    "Royaume-Uni": ["Abbaye de Westminster", "Cathédrale Saint-Paul", "Cathédrale de Canterbury", "Cathédrale de York", "Cathédrale de Durham", "Cathédrale de Winchester", "Cathédrale de Salisbury", "Cathédrale de Lincoln", "Cathédrale de Liverpool"],
    "Allemagne": ["Cathédrale de Cologne", "Cathédrale d'Aix-la-Chapelle", "Cathédrale de Berlin", "Frauenkirche de Dresde", "Frauenkirche de Munich", "Cathédrale de Trèves", "Cathédrale de Spire", "Cathédrale de Worms"],
    "Russie": ["Cathédrale Saint-Basile", "Cathédrale du Christ-Sauveur", "Cathédrale Saint-Isaac", "Cathédrale de la Dormition", "Église du Sauveur-sur-le-Sang-Versé", "Cathédrale Notre-Dame de Kazan", "Cathédrale de l'Archange-Saint-Michel"],
    "Turquie": ["Hagia Sophia", "Église Saint-Sauveur-in-Chora", "Église Sainte-Irène", "Cathédrale d'Ani", "Église des Quarante Martyrs"],
    "Norvège": ["Église en bois debout de Borgund", "Stavkirke d'Urnes", "Cathédrale de Nidaros", "Stavkirke de Heddal", "Stavkirke de Lom", "Cathédrale d'Oslo"],
    "Islande": ["Hallgrímskirkja", "Cathédrale du Christ-Roi", "Église de Landakot", "Église de Blönduós", "Skálholt"],
    "Tchéquie": ["Église Saint-Nicolas", "Cathédrale Saint-Guy", "Église Notre-Dame de Týn", "Église Saint-Jacques de Kutná Hora", "Ossuaire de Sedlec", "Basilique Saint-Pierre de Brno"],
    "États-Unis": ["Cathédrale Saint-Patrick", "Cathédrale nationale de Washington", "Cathédrale Saint-Jean le Divin", "Basilique du Sanctuaire national", "Église de la Trinité", "Cathédrale de San Fernando"],
    "Canada": ["Basilique Notre-Dame de Montréal", "Oratoire Saint-Joseph", "Cathédrale Marie-Reine-du-Monde", "Basilique-Cathédrale Notre-Dame de Québec", "Basilique Sainte-Anne-de-Beaupré"],
    "Mexique": ["Cathédrale métropolitaine de Mexico", "Basilique Notre-Dame de Guadalupe", "Cathédrale de Puebla", "Cathédrale de Oaxaca", "Cathédrale de Morelia", "Temple de Santo Domingo de Oaxaca"],
    "Brésil": ["Cathédrale de Brasília", "Cathédrale métropolitaine de Rio", "Église São Francisco de Salvador", "Basilique Notre-Dame d'Aparecida", "Cathédrale de São Paulo"],
    "Colombie": ["Sanctuaire de Las Lajas", "Cathédrale de Bogota", "Cathédrale de sel de Zipaquirá", "Cathédrale de Carthagène", "Église San Pedro Claver"],
    "Équateur": ["Basilique du Vœu National", "Église de la Compañía de Quito", "Cathédrale de Cuenca", "Église San Francisco de Quito"],
    "Pérou": ["Église de la Compagnie de Jésus", "Cathédrale de Cusco", "Cathédrale de Lima", "Couvent de Santo Domingo", "Église de la Merced"],
    "Éthiopie": ["Église Saint-Georges de Lalibela", "Église Bete Medhane Alem", "Église de la Sainte-Trinité d'Addis-Abeba", "Cathédrale Saint-Georges d'Addis-Abeba", "Église Bete Maryam"],
    "Égypte": ["Église suspendue du Caire", "Cathédrale Saint-Marc du Caire", "Monastère Sainte-Catherine", "Église Saints-Serge-et-Bacchus", "Cathédrale de la Nativité"],
    "Côte d'Ivoire": ["Basilique Notre-Dame de la Paix", "Cathédrale Saint-Paul d'Abidjan", "Cathédrale Saint-Augustin", "Église Sainte-Thérèse de Treichville"],
    "Maroc": ["Cathédrale du Sacré-Cœur de Casablanca", "Église Notre-Dame de Lourdes", "Cathédrale Saint-Pierre de Rabat", "Église du Sacré-Cœur de Tanger"],
    "Afrique du Sud": ["Cathédrale Saint-Georges du Cap", "Cathédrale Sainte-Marie de Johannesbourg", "Église réformée hollandaise de Stellenbosch", "Cathédrale Emmanuel de Durban"],
    "Inde": ["Basilique de Bom Jesus", "Cathédrale Sé de Goa", "Basilique San Thome de Chennai", "Cathédrale Sainte-Philomène de Mysore", "Basilique de Velankanni"],
    "Philippines": ["Église San Agustin de Manille", "Cathédrale de Manille", "Basilique San Sebastian", "Église de Paoay", "Basilique du Santo Niño de Cebu"],
    "Arménie": ["Cathédrale d'Etchmiadzin", "Monastère de Geghard", "Monastère de Khor Virap", "Monastère de Tatev", "Église Sainte-Hripsimé"],
    "Géorgie": ["Cathédrale de la Sainte-Trinité de Tbilissi", "Cathédrale de Svetitskhoveli", "Monastère de Djvari", "Cathédrale de Bagrati", "Église Metekhi"],
    "Japon": ["Église d'Oura", "Cathédrale d'Urakami", "Cathédrale Sainte-Marie de Tokyo", "Église de Shitsu", "Cathédrale du Sacré-Cœur d'Osaka"],
    "Liban": ["Cathédrale Saint-Georges de Beyrouth", "Notre-Dame du Liban", "Cathédrale Saint-Paul de Harissa", "Basilique Saint-Étienne de Byblos", "Cathédrale Saint-Élie"],
    "Australie": ["Cathédrale Sainte-Marie de Sydney", "Cathédrale Saint-Patrick de Melbourne", "Cathédrale Saint-André de Sydney", "Cathédrale Sainte-Marie de Perth"],
    "Nouvelle-Zélande": ["Cathédrale ChristChurch", "Cathédrale du Saint-Sacrement", "Cathédrale Saint-Patrick de Auckland", "Basilique de la Sainte-Trinité"],
    "Fidji": ["Cathédrale du Sacré-Cœur de Suva", "Cathédrale Holy Trinity", "Église Saint-François-Xavier", "Église Centenary Methodist"]
  };

  const generateNameChoices = (church) => {
    const correct = church.name;
    const seen = new Set([correct]);

    // 1. Eglises de la meme ville
    const cityChurches = (CITY_CHURCHES[church.city] || []).filter(c => !seen.has(c));
    let distractors = shuffleArray(cityChurches).slice(0, 3);
    distractors.forEach(d => seen.add(d));

    // 2. Fallback : eglises du meme pays
    if (distractors.length < 3) {
      const countryChurches = (COUNTRY_CHURCHES[church.country] || []).filter(c => !seen.has(c));
      const extra = shuffleArray(countryChurches).slice(0, 3 - distractors.length);
      distractors = [...distractors, ...extra];
      extra.forEach(d => seen.add(d));
    }

    // 3. Dernier fallback : autres eglises du dataset
    if (distractors.length < 3) {
      const otherNames = CHURCHES.map(c => c.name).filter(c => !seen.has(c));
      distractors = [...distractors, ...shuffleArray(otherNames).slice(0, 3 - distractors.length)];
    }

    return shuffleArray([correct, ...distractors.slice(0, 3)]);
  };

  const showGuessName = () => {
    game.state = 'guess_name';
    dom.questionText.textContent = t('question_name');
    dom.textInputContainer.classList.add('hidden');
    dom.choicesContainer.style.display = '';
    dom.choicesContainer.innerHTML = '';

    const choices = generateNameChoices(game.currentChurch);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handleNameGuess(choice, btn));
      dom.choicesContainer.appendChild(btn);
    });
  };

  const handleNameGuess = (selected, clickedBtn) => {
    const correct = selected === game.currentChurch.name;
    disableChoices();
    highlightChoices(game.currentChurch.name, correct ? null : clickedBtn);

    if (correct) {
      game.score += POINTS_NAME;
      game._roundPoints += POINTS_NAME;
      game.streak += 1;
      game.maxStreak = Math.max(game.maxStreak, game.streak);
      game.perfectRounds += 1;
      updateStats();
      showFeedback(true, t('bravo'), t('plus_3'), () => nextRound());
    } else {
      game.streak = 0;
      updateStats();
      showFeedback(false, t('not_quite'), game.currentChurch.name, () => nextRound());
    }
  };

  // ==================== FEEDBACK ====================
  const showFeedback = (isCorrect, text, detail, callback) => {
    dom.feedbackOverlay.classList.remove('hidden');
    dom.feedbackIcon.textContent = isCorrect ? '\u2713' : '\u2717';
    dom.feedbackIcon.className = isCorrect ? 'feedback-correct' : 'feedback-wrong';
    dom.feedbackText.textContent = text;
    dom.feedbackDetail.textContent = detail || '';

    const delay = isCorrect ? FEEDBACK_DELAY_CORRECT : FEEDBACK_DELAY_WRONG;
    setTimeout(() => {
      dom.feedbackOverlay.classList.add('hidden');
      if (callback) callback();
    }, delay);
  };

  const disableChoices = () => {
    dom.choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
      btn.disabled = true;
    });
  };

  const highlightChoices = (correctValue, wrongBtn) => {
    dom.choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
      if (btn.textContent === correctValue) btn.classList.add('correct');
    });
    if (wrongBtn) wrongBtn.classList.add('wrong');
  };

  // ==================== NEXT ROUND / GAME OVER ====================
  const nextRound = () => {
    game.roundsPlayed += 1;
    game.currentIndex += 1;

    if (game.currentIndex >= game.churches.length) {
      showGameOver();
    } else {
      startRound();
    }
  };

  const showGameOver = () => {
    game.state = 'game_over';
    showScreen('gameover');

    const maxPossible = TOTAL_ROUNDS * (POINTS_COUNTRY + POINTS_CITY + POINTS_NAME);
    const percentage = Math.round((game.score / maxPossible) * 100);

    const rank = getRank(percentage);

    dom.finalStats.innerHTML =
      `<div class="rank-badge"><span class="rank-emoji">${rank.emoji}</span><span class="rank-title">${t(rank.key)}</span></div>` +
      `<div class="stats-row">` +
      `<div class="stat-card"><span class="stat-card-value">${game.score}</span><span class="stat-card-label">${t('points_label')} (${percentage}%)</span></div>` +
      `<div class="stat-card"><span class="stat-card-value">${game.maxStreak}</span><span class="stat-card-label">${t('best_streak')}</span></div>` +
      `<div class="stat-card"><span class="stat-card-value">${game.perfectRounds}</span><span class="stat-card-label">${t('perfect')}</span></div>` +
      `</div>`;

    // Reset save section
    dom.saveScoreSection.style.display = '';
    dom.pseudoInput.value = '';
    dom.pseudoInput.disabled = false;
    dom.saveFeedback.classList.add('hidden');
    dom.btnSaveScore.disabled = false;
  };

  const getRank = (pct) => {
    if (pct >= 96) return { key: 'rank_pope', emoji: '\u{1F451}' };
    if (pct >= 85) return { key: 'rank_cardinal', emoji: '\u{1F534}' };
    if (pct >= 72) return { key: 'rank_archbishop', emoji: '\u{2728}' };
    if (pct >= 58) return { key: 'rank_bishop', emoji: '\u{1F4DC}' };
    if (pct >= 44) return { key: 'rank_priest', emoji: '\u{26EA}' };
    if (pct >= 30) return { key: 'rank_deacon', emoji: '\u{1F4D6}' };
    if (pct >= 15) return { key: 'rank_seminarian', emoji: '\u{1F64F}' };
    return { key: 'rank_altarboy', emoji: '\u{1F476}' };
  };

  // ==================== STATS UI ====================
  const updateStats = () => {
    animateStat(dom.scoreDisplay, game.score);
    animateStat(dom.streakDisplay, game.streak);
    dom.progressDisplay.textContent = `${game.currentIndex + 1}/${TOTAL_ROUNDS}`;
  };

  const animateStat = (el, value) => {
    el.textContent = value;
    el.classList.remove('stat-bump');
    void el.offsetWidth; // force reflow
    el.classList.add('stat-bump');
  };

  const updateProgress = () => {
    const pct = (game.currentIndex / TOTAL_ROUNDS) * 100;
    dom.progressBar.style.width = `${pct}%`;
  };

  // ==================== LEADERBOARD ====================
  const getLeaderboardLocal = () => {
    try {
      const data = localStorage.getItem(LEADERBOARD_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const saveLeaderboardLocal = (entries) => {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
    } catch {}
  };

  const getLeaderboard = () => {
    return new Promise((resolve) => {
      if (!firebaseAvailable) {
        resolve(getLeaderboardLocal());
        return;
      }
      firebaseDb.ref('/leaderboard').orderByChild('score').once('value')
        .then((snapshot) => {
          const entries = [];
          snapshot.forEach((child) => {
            entries.push({ id: child.key, ...child.val() });
          });
          entries.sort((a, b) => b.score - a.score);
          resolve(entries);
        })
        .catch(() => {
          resolve(getLeaderboardLocal());
        });
    });
  };

  const addToLeaderboard = async (pseudo, score) => {
    const entry = {
      pseudo,
      score,
      date: new Date().toLocaleDateString(currentLang === 'en' ? 'en-GB' : currentLang === 'es' ? 'es-ES' : 'fr-FR'),
      timestamp: Date.now()
    };

    // TOUJOURS sauvegarder dans localStorage d'abord
    let entries = getLeaderboardLocal();
    entries.push(entry);
    entries.sort((a, b) => b.score - a.score);
    entries = entries.slice(0, MAX_LEADERBOARD);
    saveLeaderboardLocal(entries);

    // Aussi envoyer vers Firebase si disponible (avec timeout)
    if (firebaseAvailable) {
      try {
        await withTimeout(firebaseDb.ref('/leaderboard').push(entry), 5000);
        // Garder seulement les MAX_LEADERBOARD meilleurs scores
        const snapshot = await withTimeout(
          firebaseDb.ref('/leaderboard').orderByChild('score').once('value'), 5000
        );
        const all = [];
        snapshot.forEach((child) => {
          all.push({ id: child.key, score: child.val().score });
        });
        if (all.length > MAX_LEADERBOARD) {
          const toRemove = all.slice(0, all.length - MAX_LEADERBOARD);
          const updates = {};
          toRemove.forEach((e) => { updates[e.id] = null; });
          await withTimeout(firebaseDb.ref('/leaderboard').update(updates), 5000);
        }
      } catch (e) {
        console.warn('Firebase write failed (localStorage OK):', e);
      }
    }
  };

  let firebaseLeaderboardListener = null;

  const renderLeaderboardEntries = (entries) => {
    const list = dom.leaderboardList;
    list.innerHTML = '';

    if (entries.length === 0) {
      list.innerHTML = `<div class="lb-empty">${t('lb_empty')}</div>`;
      return;
    }

    const medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    entries.forEach((entry, i) => {
      const div = document.createElement('div');
      div.className = 'lb-entry';
      const rankText = i < 3 ? medals[i] : (i + 1);
      div.innerHTML =
        `<span class="lb-rank">${rankText}</span>` +
        `<span class="lb-name">${escapeHtml(entry.pseudo)}</span>` +
        `<span class="lb-score">${entry.score} pts</span>` +
        `<span class="lb-date">${entry.date}</span>`;
      list.appendChild(div);
    });
  };

  const renderLeaderboard = () => {
    // Toujours afficher localStorage immédiatement
    renderLeaderboardEntries(getLeaderboardLocal());

    // Détacher l'ancien listener si existant
    if (firebaseLeaderboardListener) {
      firebaseDb.ref('/leaderboard').off('value', firebaseLeaderboardListener);
      firebaseLeaderboardListener = null;
    }

    // Si Firebase est disponible, écouter les mises à jour en temps réel
    if (firebaseAvailable) {
      firebaseLeaderboardListener = firebaseDb.ref('/leaderboard').on('value', (snapshot) => {
        const entries = [];
        snapshot.forEach((child) => {
          entries.push({ id: child.key, ...child.val() });
        });
        entries.sort((a, b) => b.score - a.score);
        renderLeaderboardEntries(entries);
      }, () => {
        // Erreur Firebase → on garde les données localStorage déjà affichées
      });
    }
  };

  const handleSaveScore = async () => {
    let pseudo = dom.pseudoInput.value.trim();
    if (!pseudo) {
      dom.pseudoInput.focus();
      return;
    }
    if (pseudo.length > 20) pseudo = pseudo.substring(0, 20);

    dom.btnSaveScore.disabled = true;
    dom.pseudoInput.disabled = true;

    try {
      await addToLeaderboard(pseudo, game.score);
      dom.saveFeedback.textContent = t('score_saved');
      dom.saveFeedback.className = 'success';
      dom.saveFeedback.classList.remove('hidden');
    } catch {
      dom.btnSaveScore.disabled = false;
      dom.pseudoInput.disabled = false;
    }
  };

  const handleClearLeaderboard = async () => {
    if (!confirm(t('confirm_clear'))) return;

    // Toujours vider localStorage
    saveLeaderboardLocal([]);

    if (firebaseAvailable) {
      try {
        await withTimeout(firebaseDb.ref('/leaderboard').remove(), 5000);
      } catch (e) {
        console.warn('Firebase clear failed:', e);
      }
    }

    renderLeaderboard();
  };

  // ==================== JOKERS ====================
  const resetJokersUI = () => {
    dom.jokerSpirit.disabled = false;
    dom.jokerGod.disabled = false;
    dom.jokerFather.disabled = false;
  };

  const getAnswer = () => {
    if (game.state === 'guess_country') return game.currentChurch.country;
    if (game.state === 'guess_city') return game.currentChurch.city;
    if (game.state === 'guess_name') return game.currentChurch.name;
    return '';
  };

  const showHint = (text) => {
    dom.hintDisplay.textContent = text;
    dom.hintDisplay.classList.remove('hidden');
  };

  const useJoker = (type) => {
    if (game.jokers[type]) return;
    game.jokers[type] = true;

    const answer = getAnswer();

    if (type === 'spirit') {
      // Révèle le continent
      dom.jokerSpirit.disabled = true;
      showHint(`${t('hint_continent')} ${game.currentChurch.continent}`);
    }

    if (type === 'god') {
      // Élimine 2 mauvaises réponses (pays QCM) / première lettre (ville/nom)
      dom.jokerGod.disabled = true;
      if (game.state === 'guess_country') {
        const btns = [...dom.choicesContainer.querySelectorAll('.choice-btn:not(:disabled)')];
        const wrong = btns.filter(b => b.textContent !== game.currentChurch.country);
        const toRemove = shuffleArray(wrong).slice(0, 2);
        toRemove.forEach(b => { b.disabled = true; b.style.opacity = '0.2'; });
        showHint(t('hint_eliminated'));
      } else {
        showHint(`${t('hint_first_letter')} « ${answer.charAt(0).toUpperCase()} »`);
      }
    }

    if (type === 'father') {
      // Première lettre (pays) / nombre de lettres (ville/nom)
      dom.jokerFather.disabled = true;
      if (game.state === 'guess_country') {
        showHint(`${t('hint_first_letter')} « ${answer.charAt(0).toUpperCase()} »`);
      } else {
        showHint(`${t('hint_letters')} ${answer.length}`);
      }
    }
  };

  // ==================== INITIALISATION ====================
  const init = () => {
    cacheDom();

    // Langue
    const savedLang = (() => { try { return localStorage.getItem(LANG_KEY); } catch { return null; } })();
    currentLang = savedLang && I18N[savedLang] ? savedLang : 'fr';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    applyTranslations();

    // Accueil
    dom.btnStart.addEventListener('click', startGame);
    dom.btnLeaderboardHome.addEventListener('click', () => {
      renderLeaderboard();
      showScreen('leaderboard');
    });

    // Jeu
    const handleTextSubmit = () => {
      if (game.state === 'guess_name') handleNameSubmit();
    };
    const handleTextSkip = () => {
      handleNameSkip();
    };
    // Jokers
    dom.jokerSpirit.addEventListener('click', () => useJoker('spirit'));
    dom.jokerGod.addEventListener('click', () => useJoker('god'));
    dom.jokerFather.addEventListener('click', () => useJoker('father'));

    dom.btnSubmitName.addEventListener('click', handleTextSubmit);
    dom.btnSkipName.addEventListener('click', handleTextSkip);
    dom.nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleTextSubmit();
    });

    // Game over
    dom.btnRestart.addEventListener('click', startGame);
    dom.btnLeaderboard.addEventListener('click', () => {
      renderLeaderboard();
      showScreen('leaderboard');
    });
    dom.btnSaveScore.addEventListener('click', handleSaveScore);
    dom.pseudoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSaveScore();
    });

    // Leaderboard
    dom.btnBackHome.addEventListener('click', () => showScreen('start'));
    dom.btnPlayFromLb.addEventListener('click', startGame);
    dom.btnClearLeaderboard.addEventListener('click', handleClearLeaderboard);

  };

  document.addEventListener('DOMContentLoaded', init);
})();
