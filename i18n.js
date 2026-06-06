/* i18n.js — minimal locale dictionary + DOM applier for the FIFA hospitality demo.
 * Active locale is determined by <html data-locale="..."> (falls back to "en").
 * Any element with data-i18n="dot.path" gets its innerHTML replaced. */
window.I18N = {
  en: {
    nav: {
      matchOfferings: "Match Offerings",
      singleMatches: "Single Matches",
      venueSeries: "Venue Series",
      followMyTeam: "Follow My Team",
      privateSuites: "Private Suites",
      multiMatchSeries: "Multi-Match Series",
      more: "More",
      faq: "FAQ",
      about: "About",
      venues: "Venues",
      schedule: "Schedule",
      currentLang: "English",
      langEn: "English",
      langFr: "Français",
      langEs: "Español",
      login: "Log In / Sign Up"
    },
    hero: {
      eyebrow: "Official Hospitality",
      overline: "Get closer Than Ever To",
      lede: "Experience the best of it all with official hospitality packages featuring premium tickets, food &amp; beverage, entertainment, and more. <strong>Now available: single matches and private suites!</strong>",
      browseMatches: "Browse Matches",
      browseSuites: "Browse Suites",
      kickoffIn: "Kick-off in",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    },
    browse: {
      title: "Browse",
      hostCity: "Host City",
      team: "Team"
    },
    alert: {
      title: "Don't risk unofficial sources or leave tickets to chance!<br/>Every offering features premium seats and hospitality.",
      step1: "Choose Offerings",
      step2: "Choose Hospitality",
      step3: "Configure &amp; Check Out"
    },
    offerings: {
      eyebrow: "Ways to Experience",
      title: "Match Offerings",
      nowAvailable: "Now Available",
      buyNow: "Buy Now",
      details: "Details",
      singleMatch: { title: "Single Match", body: "Watch every match at the venue of your choice." },
      venueSeries: { title: "Venue Series", body: "See your team in action at every early-stage match, regardless of location." },
      followMyTeam: { title: "Follow My Team", body: "Follow your nation across the tournament — every match, every venue." },
      multiMatch: { title: "Multi-Match Series", body: "Your path to the Final Match! Choose a curated multi-stage series." }
    },
    tier: {
      title: "Your path to the Final Match!",
      step1: "Choose from any Group Stage (except Team USA) or Round of 32",
      step2: "Choose from all previous options or Round of 16 or Bronze Final",
      step3: "Choose from all previous options or Team USA Group Stage or Quarter-Finals or Semi-Finals",
      step4: "Choose from all previous options (incl. Team USA Group Stage or QFs or SFs)",
      final: "Choose from all matches, including the <strong>FINAL!</strong>"
    },
    matches: {
      title: "Single Matches",
      subtitle: "Choose from 104 matches across 16 dynamic host cities and venues<sup>*</sup>.",
      exploreAll: "Explore All Matches",
      viewSchedule: "View Schedule ↗",
      popular: "Popular",
      group: "Group Stage",
      r32: "Round of 32",
      from: "From",
      usdEach: "USD each",
      buyNow: "Buy Now",
      goingFast: "Going Fast"
    },
    suites: {
      eyebrow: "Exclusive",
      title: "Private <br/>Suites",
      body: "Level up with this exclusive offering that includes preferred entry, direct seating access, and dedicated service — all to be enjoyed privately among you and your guests.",
      buyNow: "Buy Now"
    },
    additional: {
      eyebrow: "Want more?",
      contactUs: "contact us here",
      title: "Additional Offerings",
      registerInterest: "Register Interest",
      platinum: { title: "Platinum access", body: "The most exclusive offering. It delivers an all-encompassing experience with full-service customization and the most premium access available." },
      accommodations: { title: "Accommodations", body: "Select your preferred hotels, experiences, and/or car rentals to create your ideal trip package." }
    },
    lounges: {
      title: "Unrivaled <br/>Lounge access",
      subtitle: "After selecting your series, choose from a selection of dynamic lounge offerings at every venue.",
      mostPremium: "Most Premium",
      pitchside: "Pitchside Lounge",
      vip: "VIP",
      trophy: "Trophy Lounge",
      champions: "Champions Club",
      pavilion: "FIFA Pavilion"
    },
    why: {
      eyebrow: "About",
      title: "Why Choose <br/>on Location?",
      body: "On Location is the Official Hospitality Provider of the FIFA World Cup 26™. For decades we've delivered once-in-a-lifetime experiences at the world's biggest sporting events.",
      statGuests: "Global Guests Hosted Annually",
      statYears: "Premium Hospitality Experience",
      statCities: "Across USA · Canada · Mexico",
      learnMore: "Learn More"
    },
    faq: {
      eyebrow: "Support",
      title: "Frequently asked questions",
      q1: "How is hospitality different from a general ticket?",
      a1: "An Official Hospitality package pairs a premium match ticket with an exclusive pre-match, halftime and post-match experience — including dining, beverages, and access to lounges, entertainment and FIFA Legend appearances. A general ticket only gets you into the stadium seat.",
      q2: "Can I buy hospitality packages from other companies?",
      a2: "On Location is the only official hospitality provider appointed by FIFA. Visit <a href=\"#\">FIFA.com/hospitality</a> to confirm official sellers. We strongly advise against purchasing packages from unauthorized platforms or sellers — booking <a href=\"#\">here</a> guarantees your experience.",
      q3: "Why are there separate FIFA Hospitality Digital Checkout Stores for each of the three host nations (Canada, Mexico, and the U.S.)?",
      a3: "Purchases need to be made in each host nation's currency (in their related digital checkout store). Use the country switcher at the top of the page to select the appropriate store before booking.",
      q4: "What do I need to know re: purchasing packages in different host nations?",
      a4: "Purchases need to be made in each host nation's currency (in their related digital checkout store). Applicable taxes, payment methods, and delivery options vary by country. Our sales agents can help guide you through the process.",
      q5: "Is it possible for different purchasers – those who have purchased packages using separate accounts – to sit together at a match?",
      a5: "Yes — separately purchased packages can typically be linked for seating purposes. Please contact your sales agent at least 30 days prior to the match to coordinate, subject to availability.",
      seeAll: "See All FAQs"
    },
    support: {
      title: "What can we help you with?",
      subtitle: "Tell us how we can help.",
      contactTitle: "Contact Customer Support",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Customer Email",
      phone: "Customer Phone",
      country: "Country",
      selectCountry: "Select Country",
      orderNumber: "Order Number",
      subject: "Subject",
      description: "Description",
      submit: "Submit",
      faqNote: "Looking for more information? Check out our",
      faqLink: "Frequently Asked Questions."
    },
    cta: {
      eyebrow: "Not ready to make a purchase?",
      title: "Talk to an Official Sales Agent."
    },
    footer: {
      about: "On Location is the Official Hospitality Provider of the FIFA World Cup 26™.",
      explore: "Explore",
      account: "Account",
      contact: "Contact",
      home: "Home",
      aboutUs: "About Us",
      matches: "Matches",
      venues: "Venues",
      faq: "FAQ",
      myAccount: "My Account",
      myOrders: "My Orders",
      salesAgents: "FIFA World Cup 26™ Sales Agents",
      contactUs: "Contact Us",
      requestAccessible: "Request Accessible Hospitality",
      copyright: "© 2025 On Location Events, LLC | All Rights Reserved",
      privacyPolicy: "Privacy Policy",
      ticketTerms: "FIFA Ticket Terms of Use",
      olTerms: "On Location Terms of Use",
      salesRegs: "Hospitality Sales Regulations",
      depositTerms: "Deposit Terms",
      cookiePolicy: "Cookie Policy",
      doNotSell: "Do Not Sell My Personal Info",
      cookieSettings: "Cookies Settings/Preferences"
    },
    country: {
      title: "Choose Country",
      body: "Please select the host country in which you're purchasing hospitality packages. The price will be in the respective country's currency.",
      usa: "United States",
      canada: "Canada",
      mexico: "Mexico"
    }
  },

  es: {
    nav: {
      matchOfferings: "Ofertas de Partidos",
      singleMatches: "Partidos Individuales",
      venueSeries: "Serie por Sede",
      followMyTeam: "Sigue a Mi Equipo",
      privateSuites: "Suites Privadas",
      multiMatchSeries: "Serie de Varios Partidos",
      more: "Más",
      faq: "Preguntas Frecuentes",
      about: "Acerca de",
      venues: "Sedes",
      schedule: "Calendario",
      currentLang: "Español",
      langEn: "English",
      langFr: "Français",
      langEs: "Español",
      login: "Iniciar Sesión / Registrarse"
    },
    hero: {
      eyebrow: "Hospitalidad Oficial",
      overline: "Acércate Más Que Nunca a la",
      lede: "Vive lo mejor de todo con paquetes oficiales de hospitalidad que incluyen entradas premium, comida y bebida, entretenimiento y mucho más. <strong>¡Ya disponibles: partidos individuales y suites privadas!</strong>",
      browseMatches: "Ver Partidos",
      browseSuites: "Ver Suites",
      kickoffIn: "Saque inicial en",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos"
    },
    browse: {
      title: "Explorar",
      hostCity: "Ciudad Anfitriona",
      team: "Equipo"
    },
    alert: {
      title: "¡No te arriesgues con fuentes no oficiales ni dejes las entradas al azar!<br/>Cada oferta incluye asientos premium y hospitalidad.",
      step1: "Elige las Ofertas",
      step2: "Elige la Hospitalidad",
      step3: "Configura y Paga"
    },
    offerings: {
      eyebrow: "Maneras de Vivirlo",
      title: "Ofertas de Partidos",
      nowAvailable: "Ya Disponible",
      buyNow: "Comprar Ahora",
      details: "Detalles",
      singleMatch: { title: "Partido Individual", body: "Mira todos los partidos en la sede que prefieras." },
      venueSeries: { title: "Serie por Sede", body: "Mira a tu equipo en acción en cada partido de la fase inicial, sin importar la ubicación." },
      followMyTeam: { title: "Sigue a Mi Equipo", body: "Sigue a tu selección a lo largo del torneo: cada partido, cada sede." },
      multiMatch: { title: "Serie de Varios Partidos", body: "¡Tu camino a la Final! Elige una serie curada de varias fases." }
    },
    tier: {
      title: "¡Tu camino a la Final!",
      step1: "Elige cualquier Fase de Grupos (excepto Selección de EE. UU.) o Ronda de 32",
      step2: "Elige cualquier opción anterior o Ronda de 16 o Final por el Bronce",
      step3: "Elige cualquier opción anterior o Fase de Grupos de EE. UU. o Cuartos de Final o Semifinales",
      step4: "Elige cualquier opción anterior (incl. Fase de Grupos de EE. UU. o Cuartos o Semis)",
      final: "Elige cualquier partido, ¡incluida la <strong>FINAL!</strong>"
    },
    matches: {
      title: "Partidos Individuales",
      subtitle: "Elige entre 104 partidos en 16 dinámicas ciudades y sedes anfitrionas<sup>*</sup>.",
      exploreAll: "Explorar Todos los Partidos",
      viewSchedule: "Ver Calendario ↗",
      popular: "Populares",
      group: "Fase de Grupos",
      r32: "Ronda de 32",
      from: "Desde",
      usdEach: "USD c/u",
      buyNow: "Comprar Ahora",
      goingFast: "Se Agota Rápido"
    },
    suites: {
      eyebrow: "Exclusivo",
      title: "Suites <br/>Privadas",
      body: "Sube de nivel con esta oferta exclusiva que incluye entrada preferente, acceso directo a los asientos y servicio dedicado, todo para disfrutar en privado con tus invitados.",
      buyNow: "Comprar Ahora"
    },
    additional: {
      eyebrow: "¿Quieres más?",
      contactUs: "contáctanos aquí",
      title: "Ofertas Adicionales",
      registerInterest: "Registrar Interés",
      platinum: { title: "Acceso Platino", body: "La oferta más exclusiva. Brinda una experiencia integral con personalización completa y el acceso más premium disponible." },
      accommodations: { title: "Alojamiento", body: "Selecciona tus hoteles, experiencias y/o alquileres de auto preferidos para crear tu paquete de viaje ideal." }
    },
    lounges: {
      title: "Acceso Inigualable <br/>a Lounges",
      subtitle: "Después de elegir tu serie, escoge entre una selección de lounges dinámicos en cada sede.",
      mostPremium: "Más Premium",
      pitchside: "Lounge a Pie de Cancha",
      vip: "VIP",
      trophy: "Lounge del Trofeo",
      champions: "Champions Club",
      pavilion: "Pabellón FIFA"
    },
    why: {
      eyebrow: "Acerca de",
      title: "¿Por qué Elegir <br/>On Location?",
      body: "On Location es el Proveedor Oficial de Hospitalidad de la FIFA World Cup 26™. Durante décadas hemos creado experiencias únicas en los eventos deportivos más importantes del mundo.",
      statGuests: "Invitados Globales Recibidos al Año",
      statYears: "Experiencia en Hospitalidad Premium",
      statCities: "En EE. UU. · Canadá · México",
      learnMore: "Saber Más"
    },
    faq: {
      eyebrow: "Soporte",
      title: "Preguntas Frecuentes",
      q1: "¿En qué se diferencia la hospitalidad de una entrada general?",
      a1: "Un paquete de Hospitalidad Oficial combina una entrada premium con una experiencia exclusiva antes, durante el descanso y después del partido, incluyendo comida, bebidas y acceso a lounges, entretenimiento y apariciones de Leyendas FIFA. Una entrada general solo te da acceso al asiento del estadio.",
      q2: "¿Puedo comprar paquetes de hospitalidad de otras empresas?",
      a2: "On Location es el único proveedor oficial de hospitalidad designado por la FIFA. Visita <a href=\"#\">FIFA.com/hospitality</a> para confirmar a los vendedores oficiales. Recomendamos firmemente no comprar paquetes en plataformas o vendedores no autorizados; reservar <a href=\"#\">aquí</a> garantiza tu experiencia.",
      q3: "¿Por qué hay tiendas de pago digital de Hospitalidad FIFA separadas para cada uno de los tres países anfitriones (Canadá, México y EE. UU.)?",
      a3: "Las compras deben realizarse en la moneda de cada país anfitrión (en su tienda digital correspondiente). Usa el selector de país en la parte superior de la página para elegir la tienda adecuada antes de reservar.",
      q4: "¿Qué necesito saber sobre la compra de paquetes en distintos países anfitriones?",
      a4: "Las compras deben realizarse en la moneda de cada país anfitrión (en su tienda digital correspondiente). Los impuestos, métodos de pago y opciones de entrega varían según el país. Nuestros agentes de ventas pueden guiarte en el proceso.",
      q5: "¿Es posible que distintos compradores, que han adquirido paquetes en cuentas separadas, se sienten juntos en un partido?",
      a5: "Sí, los paquetes comprados por separado pueden vincularse para asignación de asientos. Comunícate con tu agente de ventas al menos 30 días antes del partido para coordinar, sujeto a disponibilidad.",
      seeAll: "Ver Todas las Preguntas Frecuentes"
    },
    support: {
      title: "¿En qué podemos ayudarte?",
      subtitle: "Cuéntanos cómo podemos ayudarte.",
      contactTitle: "Contactar a Atención al Cliente",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phone: "Teléfono",
      country: "País",
      selectCountry: "Seleccionar País",
      orderNumber: "Número de Pedido",
      subject: "Asunto",
      description: "Descripción",
      submit: "Enviar",
      faqNote: "¿Buscas más información? Consulta nuestras",
      faqLink: "Preguntas Frecuentes."
    },
    cta: {
      eyebrow: "¿Aún no estás listo para comprar?",
      title: "Habla con un Agente Oficial de Ventas."
    },
    footer: {
      about: "On Location es el Proveedor Oficial de Hospitalidad de la FIFA World Cup 26™.",
      explore: "Explorar",
      account: "Cuenta",
      contact: "Contacto",
      home: "Inicio",
      aboutUs: "Acerca de Nosotros",
      matches: "Partidos",
      venues: "Sedes",
      faq: "Preguntas Frecuentes",
      myAccount: "Mi Cuenta",
      myOrders: "Mis Pedidos",
      salesAgents: "Agentes de Ventas FIFA World Cup 26™",
      contactUs: "Contáctanos",
      requestAccessible: "Solicitar Hospitalidad Accesible",
      copyright: "© 2025 On Location Events, LLC | Todos los Derechos Reservados",
      privacyPolicy: "Política de Privacidad",
      ticketTerms: "Términos de Uso de Entradas FIFA",
      olTerms: "Términos de Uso de On Location",
      salesRegs: "Reglamento de Ventas de Hospitalidad",
      depositTerms: "Términos de Depósito",
      cookiePolicy: "Política de Cookies",
      doNotSell: "No Vender Mi Información Personal",
      cookieSettings: "Configuración de Cookies"
    },
    country: {
      title: "Elige País",
      body: "Selecciona el país anfitrión donde adquirirás los paquetes de hospitalidad. El precio se mostrará en la moneda del país correspondiente.",
      usa: "Estados Unidos",
      canada: "Canadá",
      mexico: "México"
    }
  },

  fr: {
    nav: {
      matchOfferings: "Offres de Match",
      singleMatches: "Matchs à l'Unité",
      venueSeries: "Série par Site",
      followMyTeam: "Suivre Mon Équipe",
      privateSuites: "Loges Privées",
      multiMatchSeries: "Série Multi-Matchs",
      more: "Plus",
      faq: "FAQ",
      about: "À propos",
      venues: "Sites",
      schedule: "Calendrier",
      currentLang: "Français",
      langEn: "English",
      langFr: "Français",
      langEs: "Español",
      login: "Connexion / Inscription"
    },
    hero: {
      eyebrow: "Hospitalité Officielle",
      overline: "Vivez de Plus Près Que Jamais la",
      lede: "Vivez le meilleur de l'événement avec des forfaits d'hospitalité officielle incluant des billets premium, restauration et boissons, divertissement et bien plus. <strong>Désormais disponibles : matchs à l'unité et loges privées !</strong>",
      browseMatches: "Voir les Matchs",
      browseSuites: "Voir les Loges",
      kickoffIn: "Coup d'envoi dans",
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes"
    },
    browse: {
      title: "Explorer",
      hostCity: "Ville Hôte",
      team: "Équipe"
    },
    alert: {
      title: "Ne prenez pas de risques avec des sources non officielles ni au hasard !<br/>Chaque offre comprend des sièges premium et de l'hospitalité.",
      step1: "Choisissez les Offres",
      step2: "Choisissez l'Hospitalité",
      step3: "Configurez et Payez"
    },
    offerings: {
      eyebrow: "Façons de Vivre l'Expérience",
      title: "Offres de Match",
      nowAvailable: "Maintenant Disponible",
      buyNow: "Acheter",
      details: "Détails",
      singleMatch: { title: "Match à l'Unité", body: "Assistez à chaque match dans le site de votre choix." },
      venueSeries: { title: "Série par Site", body: "Voyez votre équipe en action à chaque match de la phase initiale, où qu'il se joue." },
      followMyTeam: { title: "Suivre Mon Équipe", body: "Suivez votre nation tout au long du tournoi — chaque match, chaque site." },
      multiMatch: { title: "Série Multi-Matchs", body: "Votre route vers la Finale ! Choisissez une série multi-phases sélectionnée." }
    },
    tier: {
      title: "Votre route vers la Finale !",
      step1: "Choisissez une Phase de Groupes (sauf Équipe USA) ou un 16e de finale",
      step2: "Choisissez parmi les options précédentes ou les 8e de finale ou la Finale pour la 3e place",
      step3: "Choisissez parmi les options précédentes ou la Phase de Groupes de l'Équipe USA, les Quarts ou les Demi-finales",
      step4: "Choisissez parmi toutes les options précédentes (Phase de Groupes USA, Quarts ou Demi-finales incluses)",
      final: "Choisissez parmi tous les matchs, y compris la <strong>FINALE !</strong>"
    },
    matches: {
      title: "Matchs à l'Unité",
      subtitle: "Choisissez parmi 104 matchs dans 16 villes et sites hôtes dynamiques<sup>*</sup>.",
      exploreAll: "Explorer Tous les Matchs",
      viewSchedule: "Voir le Calendrier ↗",
      popular: "Populaires",
      group: "Phase de Groupes",
      r32: "16e de finale",
      from: "À partir de",
      usdEach: "USD chacun",
      buyNow: "Acheter",
      goingFast: "Bientôt Épuisé"
    },
    suites: {
      eyebrow: "Exclusif",
      title: "Loges <br/>Privées",
      body: "Passez à un niveau supérieur avec cette offre exclusive comprenant entrée prioritaire, accès direct aux sièges et service dédié — le tout à savourer en privé avec vos invités.",
      buyNow: "Acheter"
    },
    additional: {
      eyebrow: "Vous en voulez plus ?",
      contactUs: "contactez-nous ici",
      title: "Offres Supplémentaires",
      registerInterest: "Manifester son Intérêt",
      platinum: { title: "Accès Platine", body: "L'offre la plus exclusive. Elle propose une expérience complète avec personnalisation totale et l'accès le plus premium disponible." },
      accommodations: { title: "Hébergement", body: "Sélectionnez vos hôtels, expériences et/ou locations de voiture préférés pour composer votre forfait voyage idéal." }
    },
    lounges: {
      title: "Accès Inégalé <br/>aux Lounges",
      subtitle: "Après avoir choisi votre série, sélectionnez parmi une variété de lounges dynamiques dans chaque site.",
      mostPremium: "Le Plus Premium",
      pitchside: "Lounge en Bord de Pelouse",
      vip: "VIP",
      trophy: "Lounge du Trophée",
      champions: "Champions Club",
      pavilion: "Pavillon FIFA"
    },
    why: {
      eyebrow: "À propos",
      title: "Pourquoi Choisir <br/>On Location ?",
      body: "On Location est le Fournisseur Officiel d'Hospitalité de la FIFA World Cup 26™. Depuis des décennies, nous offrons des expériences uniques lors des plus grands événements sportifs mondiaux.",
      statGuests: "Invités Mondiaux Accueillis Chaque Année",
      statYears: "d'Expérience en Hospitalité Premium",
      statCities: "À travers les USA · Canada · Mexique",
      learnMore: "En Savoir Plus"
    },
    faq: {
      eyebrow: "Assistance",
      title: "Questions Fréquentes",
      q1: "En quoi l'hospitalité diffère-t-elle d'un billet général ?",
      a1: "Un forfait Hospitalité Officielle associe un billet de match premium à une expérience exclusive avant, à la mi-temps et après le match — repas, boissons, accès aux lounges, divertissement et apparitions de Légendes FIFA. Un billet général ne donne accès qu'au siège dans le stade.",
      q2: "Puis-je acheter des forfaits d'hospitalité auprès d'autres entreprises ?",
      a2: "On Location est le seul fournisseur officiel d'hospitalité désigné par la FIFA. Consultez <a href=\"#\">FIFA.com/hospitality</a> pour confirmer les revendeurs officiels. Nous déconseillons fortement l'achat auprès de plateformes ou vendeurs non autorisés — réserver <a href=\"#\">ici</a> garantit votre expérience.",
      q3: "Pourquoi existe-t-il des Boutiques Numériques d'Hospitalité FIFA distinctes pour chacun des trois pays hôtes (Canada, Mexique et États-Unis) ?",
      a3: "Les achats doivent être effectués dans la devise de chaque pays hôte (dans la boutique numérique correspondante). Utilisez le sélecteur de pays en haut de la page pour choisir la bonne boutique avant de réserver.",
      q4: "Que dois-je savoir concernant l'achat de forfaits dans différents pays hôtes ?",
      a4: "Les achats doivent être effectués dans la devise de chaque pays hôte (dans la boutique numérique correspondante). Les taxes applicables, les moyens de paiement et les options de livraison varient selon le pays. Nos agents commerciaux peuvent vous guider dans la démarche.",
      q5: "Est-il possible que différents acheteurs — ayant acheté des forfaits avec des comptes distincts — soient assis ensemble lors d'un match ?",
      a5: "Oui — les forfaits achetés séparément peuvent généralement être liés en termes de placement. Veuillez contacter votre agent commercial au moins 30 jours avant le match pour la coordination, sous réserve de disponibilité.",
      seeAll: "Voir Toutes les FAQ"
    },
    support: {
      title: "Comment pouvons-nous vous aider ?",
      subtitle: "Dites-nous comment nous pouvons vous aider.",
      contactTitle: "Contacter le Service Client",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail du Client",
      phone: "Téléphone du Client",
      country: "Pays",
      selectCountry: "Sélectionner un Pays",
      orderNumber: "Numéro de Commande",
      subject: "Sujet",
      description: "Description",
      submit: "Envoyer",
      faqNote: "Vous cherchez plus d'informations ? Consultez nos",
      faqLink: "Questions Fréquentes."
    },
    cta: {
      eyebrow: "Pas encore prêt à acheter ?",
      title: "Parlez à un Agent Commercial Officiel."
    },
    footer: {
      about: "On Location est le Fournisseur Officiel d'Hospitalité de la FIFA World Cup 26™.",
      explore: "Explorer",
      account: "Compte",
      contact: "Contact",
      home: "Accueil",
      aboutUs: "À propos de Nous",
      matches: "Matchs",
      venues: "Sites",
      faq: "FAQ",
      myAccount: "Mon Compte",
      myOrders: "Mes Commandes",
      salesAgents: "Agents Commerciaux FIFA World Cup 26™",
      contactUs: "Nous Contacter",
      requestAccessible: "Demander une Hospitalité Accessible",
      copyright: "© 2025 On Location Events, LLC | Tous Droits Réservés",
      privacyPolicy: "Politique de Confidentialité",
      ticketTerms: "Conditions d'Utilisation des Billets FIFA",
      olTerms: "Conditions d'Utilisation On Location",
      salesRegs: "Règlement des Ventes d'Hospitalité",
      depositTerms: "Conditions d'Acompte",
      cookiePolicy: "Politique des Cookies",
      doNotSell: "Ne Pas Vendre Mes Informations Personnelles",
      cookieSettings: "Paramètres des Cookies"
    },
    country: {
      title: "Choisir un Pays",
      body: "Veuillez sélectionner le pays hôte dans lequel vous achetez vos forfaits d'hospitalité. Le prix sera affiché dans la devise du pays correspondant.",
      usa: "États-Unis",
      canada: "Canada",
      mexico: "Mexique"
    }
  }
};

(function () {
  var locale = document.documentElement.getAttribute('data-locale') || 'en';
  var dict = window.I18N[locale] || window.I18N.en;
  var get = function (path) {
    return path.split('.').reduce(function (o, k) { return (o ? o[k] : undefined); }, dict);
  };
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var val = get(el.getAttribute('data-i18n'));
    if (val !== undefined) el.innerHTML = val;
  });
})();
