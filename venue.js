/* =====================================================================
   Venue page — data + rendering
   URL: venue.html?city=<slug>
   ===================================================================== */

const VENUES = {
  atlanta: {
    name: 'Atlanta',
    country: '🇺🇸 USA',
    stadium: 'Mercedes-Benz Stadium',
    cityLabel: 'Atlanta, United States',
    image: 'assets/lounge-a.webp',
    description:
      "From Southern hospitality to a booming arts and sports scene, Atlanta is a cultural hub with deep global roots. Mercedes-Benz Stadium is home to the NFL's Atlanta Falcons and MLS's Atlanta United. It will host eight matches at FIFA World Cup 2026™, including a Semi-Final.",
    matches: [
      { id: 'M16', group: 'Group D', teams: ['Norway', 'Colombia'], flags: ['🇳🇴', '🇨🇴'], date: 'June 16', day: 'Tuesday', time: '3:00 pm ET', price: '2,500' },
      { id: 'M30', group: 'Group C', teams: ['Ecuador', 'Scotland'], flags: ['🇪🇨', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'], date: 'June 20', day: 'Saturday', time: '12:00 pm ET', price: '2,250' },
      { id: 'M47', group: 'Group E', teams: ['Portugal', 'Iran'], flags: ['🇵🇹', '🇮🇷'], date: 'June 24', day: 'Wednesday', time: '9:00 pm ET', price: '3,100', tag: 'Going Fast' },
      { id: 'M89', group: 'Semi-Final', teams: ['W81', 'W82'], flags: ['🏆', '🏆'], date: 'July 14', day: 'Tuesday', time: '8:00 pm ET', price: '6,500', tag: 'Going Fast' },
    ],
  },
  boston: {
    name: 'Boston',
    country: '🇺🇸 USA',
    stadium: 'Boston Stadium',
    cityLabel: 'Foxborough, United States',
    image: 'assets/lounge-b.webp',
    description:
      "Boston is a showcase city where people from all over the world come together to live, work, and play. It is a city where everyone brings their own values and traditions to continually refine what it means to be a Bostonian. Boston Stadium is home to MLS' New England Revolution and the NFL's New England Patriots. It will host seven matches at FIFA World Cup 2026™, including a Quarter-Final match.",
    matches: [
      { id: 'M5',  group: 'Group C', teams: ['Haiti', 'Scotland'],      flags: ['🇭🇹', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'], date: 'June 13', day: 'Saturday',  time: '9:00 pm ET', price: '3,000' },
      { id: 'M18', group: 'Group I', teams: ['Iraq', 'Norway'],         flags: ['🇮🇶', '🇳🇴'], date: 'June 16', day: 'Tuesday',   time: '6:00 pm ET', price: '2,000' },
      { id: 'M30', group: 'Group C', teams: ['Scotland', 'Morocco'],    flags: ['🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇲🇦'], date: 'June 19', day: 'Friday',    time: '6:00 pm ET', price: '2,850' },
      { id: 'M45', group: 'Group L', teams: ['England', 'Ghana'],       flags: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇬🇭'], date: 'June 23', day: 'Tuesday',   time: '4:00 pm ET', price: '2,430' },
      { id: 'M61', group: 'Group I', teams: ['Norway', 'France'],       flags: ['🇳🇴', '🇫🇷'], date: 'June 26', day: 'Friday',    time: '3:00 pm ET', price: '2,500' },
      { id: 'M74', group: 'Round of 32', teams: ['1E', '3ABCDF'],        flags: ['🏆', '🏆'], date: 'June 29', day: 'Monday',    time: '4:30 pm ET', price: '2,500' },
      { id: 'M97', group: 'Quarter-Final', teams: ['W89', 'W90'],       flags: ['🏆', '🏆'], date: 'July 9',  day: 'Thursday',  time: '4:00 pm ET', price: '4,300', tag: 'Going Fast' },
    ],
  },
  dallas: {
    name: 'Dallas',
    country: '🇺🇸 USA',
    stadium: 'AT&T Stadium',
    cityLabel: 'Arlington, United States',
    image: 'assets/lounge-c.webp',
    description:
      "Dallas is a city of big ambitions and even bigger welcomes. AT&T Stadium, home to the NFL's Dallas Cowboys, hosts nine FIFA World Cup 2026™ matches, including a Semi-Final.",
    matches: [
      { id: 'M11', group: 'Group F', teams: ['Netherlands', 'Japan'],   flags: ['🇳🇱', '🇯🇵'], date: 'June 14', day: 'Sunday',    time: '7:00 pm CT', price: '3,200' },
      { id: 'M25', group: 'Group B', teams: ['Uruguay', 'Egypt'],       flags: ['🇺🇾', '🇪🇬'], date: 'June 18', day: 'Thursday',  time: '9:00 pm CT', price: '2,400' },
      { id: 'M52', group: 'Group H', teams: ['Germany', 'Uruguay'],     flags: ['🇩🇪', '🇺🇾'], date: 'June 25', day: 'Thursday',  time: '8:00 pm CT', price: '3,500' },
      { id: 'M80', group: 'Round of 16', teams: ['1C', '2D'],            flags: ['🏆', '🏆'], date: 'July 1',  day: 'Wednesday', time: '7:00 pm CT', price: '3,900' },
      { id: 'M99', group: 'Semi-Final', teams: ['W93', 'W94'],          flags: ['🏆', '🏆'], date: 'July 10', day: 'Friday',    time: '8:00 pm CT', price: '6,800', tag: 'Going Fast' },
    ],
  },
  houston: {
    name: 'Houston',
    country: '🇺🇸 USA',
    stadium: 'NRG Stadium',
    cityLabel: 'Houston, United States',
    image: 'assets/lounge-d.webp',
    description:
      'A vibrant, diverse metropolis with world-class cuisine and culture. NRG Stadium will host seven matches at FIFA World Cup 2026™.',
    matches: [
      { id: 'M10', group: 'Group G', teams: ['Germany', 'Curaçao'],     flags: ['🇩🇪', '🇨🇼'], date: 'June 14', day: 'Sunday',    time: '4:00 pm CT', price: '2,800' },
      { id: 'M29', group: 'Group A', teams: ['Argentina', 'Senegal'],   flags: ['🇦🇷', '🇸🇳'], date: 'June 19', day: 'Friday',    time: '9:00 pm CT', price: '3,600', tag: 'Going Fast' },
      { id: 'M42', group: 'Group K', teams: ['Spain', 'Nigeria'],       flags: ['🇪🇸', '🇳🇬'], date: 'June 22', day: 'Monday',    time: '8:00 pm CT', price: '2,950' },
      { id: 'M65', group: 'Round of 32', teams: ['2A', '1B'],            flags: ['🏆', '🏆'], date: 'June 28', day: 'Sunday',    time: '5:00 pm CT', price: '3,100' },
    ],
  },
  'kansas-city': {
    name: 'Kansas City',
    country: '🇺🇸 USA',
    stadium: 'Arrowhead Stadium',
    cityLabel: 'Kansas City, United States',
    image: 'assets/offering-a.webp',
    description:
      'A city of jazz, barbeque, and fountains, Kansas City blends Midwestern warmth with championship sports heritage. Arrowhead Stadium will host six FIFA World Cup 2026™ matches.',
    matches: [
      { id: 'M13', group: 'Group H', teams: ['Tunisia', 'Australia'],   flags: ['🇹🇳', '🇦🇺'], date: 'June 15', day: 'Monday',    time: '3:00 pm CT', price: '2,100' },
      { id: 'M27', group: 'Group J', teams: ['Switzerland', 'Qatar'],   flags: ['🇨🇭', '🇶🇦'], date: 'June 19', day: 'Friday',    time: '12:00 pm CT', price: '2,200' },
      { id: 'M56', group: 'Round of 32', teams: ['1J', '3EFGH'],         flags: ['🏆', '🏆'], date: 'June 27', day: 'Saturday',  time: '8:00 pm CT', price: '3,000' },
    ],
  },
  'los-angeles': {
    name: 'Los Angeles',
    country: '🇺🇸 USA',
    stadium: 'SoFi Stadium',
    cityLabel: 'Inglewood, United States',
    image: 'assets/offering-b.webp',
    description:
      "LA Stadium will welcome the world with sun-soaked energy and Hollywood flair. Home to the NFL's Rams and Chargers, it hosts eight matches at FIFA World Cup 2026™.",
    matches: [
      { id: 'M4',  group: 'Group A', teams: ['United States', 'Paraguay'], flags: ['🇺🇸', '🇵🇾'], date: 'June 12', day: 'Friday',    time: '4:00 pm PT', price: '3,400', tag: 'Going Fast' },
      { id: 'M22', group: 'Group B', teams: ['France', 'Canada'],       flags: ['🇫🇷', '🇨🇦'], date: 'June 17', day: 'Wednesday', time: '7:00 pm PT', price: '3,200' },
      { id: 'M40', group: 'Group F', teams: ['Japan', 'Türkiye'],       flags: ['🇯🇵', '🇹🇷'], date: 'June 22', day: 'Monday',    time: '6:00 pm PT', price: '2,700' },
      { id: 'M72', group: 'Round of 16', teams: ['1A', '2B'],            flags: ['🏆', '🏆'], date: 'June 30', day: 'Tuesday',   time: '7:00 pm PT', price: '3,800' },
    ],
  },
  miami: {
    name: 'Miami',
    country: '🇺🇸 USA',
    stadium: 'Hard Rock Stadium',
    cityLabel: 'Miami Gardens, United States',
    image: 'assets/offering-c.webp',
    description:
      'Miami pulses with Latin rhythm, beachside glamour, and global football passion. Hard Rock Stadium will host seven matches at FIFA World Cup 2026™, including a Round of 16.',
    matches: [
      { id: 'M6',  group: 'Group D', teams: ['Korea Republic', 'Türkiye'], flags: ['🇰🇷', '🇹🇷'], date: 'June 13', day: 'Saturday',  time: '3:00 pm ET', price: '2,600' },
      { id: 'M25', group: 'Group B', teams: ['Uruguay', 'Egypt'],       flags: ['🇺🇾', '🇪🇬'], date: 'June 18', day: 'Thursday',  time: '9:00 pm ET', price: '2,500', tag: 'Going Fast' },
      { id: 'M44', group: 'Group K', teams: ['Spain', 'Uzbekistan'],    flags: ['🇪🇸', '🇺🇿'], date: 'June 23', day: 'Tuesday',   time: '7:00 pm ET', price: '2,900' },
      { id: 'M69', group: 'Round of 16', teams: ['1D', '2C'],            flags: ['🏆', '🏆'], date: 'June 29', day: 'Monday',    time: '8:00 pm ET', price: '3,700' },
    ],
  },
  'new-york-new-jersey': {
    name: 'New York New Jersey',
    country: '🇺🇸 USA',
    stadium: 'MetLife Stadium',
    cityLabel: 'East Rutherford, United States',
    image: 'assets/offering-d.webp',
    description:
      'The greatest city in the world hosts the greatest sporting event on Earth. MetLife Stadium will host eight matches at FIFA World Cup 2026™ — including the Final.',
    matches: [
      { id: 'M7',  group: 'Group E', teams: ['Brazil', 'Morocco'],      flags: ['🇧🇷', '🇲🇦'], date: 'June 13', day: 'Saturday',  time: '7:00 pm ET', price: '3,500' },
      { id: 'M24', group: 'Group C', teams: ['Portugal', 'Ghana'],      flags: ['🇵🇹', '🇬🇭'], date: 'June 18', day: 'Thursday',  time: '5:00 pm ET', price: '2,900' },
      { id: 'M60', group: 'Round of 32', teams: ['1D', '3ABCE'],         flags: ['🏆', '🏆'], date: 'June 28', day: 'Sunday',    time: '4:00 pm ET', price: '3,400' },
      { id: 'M102', group: 'Semi-Final', teams: ['W97', 'W98'],         flags: ['🏆', '🏆'], date: 'July 14', day: 'Tuesday',   time: '8:00 pm ET', price: '8,200', tag: 'Going Fast' },
      { id: 'M104', group: 'FINAL',      teams: ['W101', 'W102'],       flags: ['🏆', '🏆'], date: 'July 19', day: 'Sunday',    time: '3:00 pm ET', price: '15,000', tag: 'Going Fast' },
    ],
  },
  philadelphia: {
    name: 'Philadelphia',
    country: '🇺🇸 USA',
    stadium: 'Lincoln Financial Field',
    cityLabel: 'Philadelphia, United States',
    image: 'assets/suites.webp',
    description:
      'Birthplace of American freedom, Philadelphia brings fierce loyalty and historic grit. Lincoln Financial Field will host six FIFA World Cup 2026™ matches.',
    matches: [
      { id: 'M9',  group: 'Group C', teams: ["Côte d'Ivoire", 'Ecuador'], flags: ['🇨🇮', '🇪🇨'], date: 'June 14', day: 'Sunday',    time: '7:00 pm ET', price: '2,300' },
      { id: 'M26', group: 'Group J', teams: ['Switzerland', 'New Zealand'], flags: ['🇨🇭', '🇳🇿'], date: 'June 18', day: 'Thursday',  time: '3:00 pm ET', price: '2,150' },
      { id: 'M55', group: 'Round of 32', teams: ['2C', '3ABCE'],         flags: ['🏆', '🏆'], date: 'June 27', day: 'Saturday',  time: '3:00 pm ET', price: '2,950' },
    ],
  },
  'san-francisco-bay-area': {
    name: 'San Francisco Bay Area',
    country: '🇺🇸 USA',
    stadium: "Levi's Stadium",
    cityLabel: 'Santa Clara, United States',
    image: 'assets/platinum.webp',
    description:
      "Innovation, diversity, and Pacific beauty define the Bay Area. Levi's Stadium will host six matches at FIFA World Cup 2026™.",
    matches: [
      { id: 'M8',  group: 'Group J', teams: ['Qatar', 'Switzerland'],   flags: ['🇶🇦', '🇨🇭'], date: 'June 13', day: 'Saturday',  time: '4:00 pm PT', price: '2,500' },
      { id: 'M41', group: 'Group F', teams: ['Germany', 'Japan'],       flags: ['🇩🇪', '🇯🇵'], date: 'June 22', day: 'Monday',    time: '6:00 pm PT', price: '3,100' },
      { id: 'M58', group: 'Group K', teams: ['Spain', 'Ecuador'],       flags: ['🇪🇸', '🇪🇨'], date: 'June 26', day: 'Friday',    time: '5:00 pm PT', price: '2,800' },
    ],
  },
  seattle: {
    name: 'Seattle',
    country: '🇺🇸 USA',
    stadium: 'Lumen Field',
    cityLabel: 'Seattle, United States',
    image: 'assets/trophy.webp',
    description:
      "Seattle is the Emerald City — fiercely green, fiercely passionate about football. Lumen Field, home to MLS' Sounders FC, will host six FIFA World Cup 2026™ matches.",
    matches: [
      { id: 'M32', group: 'Group A', teams: ['United States', 'Australia'], flags: ['🇺🇸', '🇦🇺'], date: 'July 3',  day: 'Friday',    time: '6:00 pm PT', price: '3,400', tag: 'Going Fast' },
      { id: 'M46', group: 'Group L', teams: ['England', 'Paraguay'],    flags: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇵🇾'], date: 'June 23', day: 'Tuesday',   time: '9:00 pm PT', price: '3,000' },
      { id: 'M66', group: 'Round of 32', teams: ['1G', '3BEFK'],         flags: ['🏆', '🏆'], date: 'June 28', day: 'Sunday',    time: '6:00 pm PT', price: '3,200' },
    ],
  },
  toronto: {
    name: 'Toronto',
    country: '🇨🇦 Canada',
    stadium: 'BMO Field',
    cityLabel: 'Toronto, Canada',
    image: 'assets/lounge-a.webp',
    description:
      "Canada's largest and most diverse city welcomes the world. BMO Field will host six FIFA World Cup 2026™ matches, including Canada's opening fixture.",
    matches: [
      { id: 'M2',  group: 'Group B', teams: ['Canada', 'Opponent TBD'], flags: ['🇨🇦', '🏁'], date: 'June 11', day: 'Thursday',  time: '8:00 pm ET', price: '4,100', tag: 'Going Fast' },
      { id: 'M17', group: 'Group D', teams: ['Belgium', 'Algeria'],     flags: ['🇧🇪', '🇩🇿'], date: 'June 16', day: 'Tuesday',   time: '6:00 pm ET', price: '2,200' },
      { id: 'M36', group: 'Group B', teams: ['Canada', 'Belgium'],      flags: ['🇨🇦', '🇧🇪'], date: 'June 21', day: 'Sunday',    time: '7:00 pm ET', price: '3,300' },
    ],
  },
  vancouver: {
    name: 'Vancouver',
    country: '🇨🇦 Canada',
    stadium: 'BC Place',
    cityLabel: 'Vancouver, Canada',
    image: 'assets/lounge-b.webp',
    description:
      'Mountains meet the sea in Vancouver — a global city of natural beauty and cultural richness. BC Place will host seven FIFA World Cup 2026™ matches.',
    matches: [
      { id: 'M5b', group: 'Group B', teams: ['Canada', 'Opponent TBD'], flags: ['🇨🇦', '🏁'], date: 'June 13', day: 'Saturday',  time: '6:00 pm PT', price: '3,000' },
      { id: 'M50', group: 'Group K', teams: ['Poland', 'Ghana'],        flags: ['🇵🇱', '🇬🇭'], date: 'June 25', day: 'Thursday',  time: '8:00 pm PT', price: '2,500' },
      { id: 'M73', group: 'Round of 16', teams: ['1B', '2A'],            flags: ['🏆', '🏆'], date: 'June 30', day: 'Tuesday',   time: '5:00 pm PT', price: '3,800' },
    ],
  },
  guadalajara: {
    name: 'Guadalajara',
    country: '🇲🇽 Mexico',
    stadium: 'Estadio Akron',
    cityLabel: 'Guadalajara, Mexico',
    image: 'assets/lounge-c.webp',
    description:
      'The heartland of mariachi and tequila, Guadalajara brings vibrant spirit. Estadio Akron will host four FIFA World Cup 2026™ matches.',
    matches: [
      { id: 'M3',  group: 'Group A', teams: ['Mexico', 'Opponent TBD'], flags: ['🇲🇽', '🏁'], date: 'June 12', day: 'Friday',    time: '7:00 pm CT', price: '3,800', tag: 'Going Fast' },
      { id: 'M21', group: 'Group H', teams: ['Colombia', 'Ghana'],      flags: ['🇨🇴', '🇬🇭'], date: 'June 17', day: 'Wednesday', time: '4:00 pm CT', price: '2,200' },
      { id: 'M43', group: 'Group L', teams: ['Ghana', 'Paraguay'],      flags: ['🇬🇭', '🇵🇾'], date: 'June 22', day: 'Monday',    time: '5:00 pm CT', price: '2,000' },
    ],
  },
  'mexico-city': {
    name: 'Mexico City',
    country: '🇲🇽 Mexico',
    stadium: 'Estadio Azteca',
    cityLabel: 'Mexico City, Mexico',
    image: 'assets/lounge-d.webp',
    description:
      "Mexico City is where football passion runs deepest. Estadio Azteca — the only venue to host three World Cup openers — welcomes the tournament's opening match.",
    matches: [
      { id: 'M1',  group: 'Group A', teams: ['Mexico', 'South Africa'], flags: ['🇲🇽', '🇿🇦'], date: 'June 11', day: 'Thursday',  time: '12:00 pm CT', price: '5,200', tag: 'Going Fast' },
      { id: 'M23', group: 'Group A', teams: ['Argentina', 'Iran'],      flags: ['🇦🇷', '🇮🇷'], date: 'June 17', day: 'Wednesday', time: '9:00 pm CT', price: '4,000', tag: 'Going Fast' },
      { id: 'M38', group: 'Group A', teams: ['Mexico', 'Argentina'],    flags: ['🇲🇽', '🇦🇷'], date: 'June 21', day: 'Sunday',    time: '8:00 pm CT', price: '5,600', tag: 'Going Fast' },
    ],
  },
  monterrey: {
    name: 'Monterrey',
    country: '🇲🇽 Mexico',
    stadium: 'Estadio BBVA',
    cityLabel: 'Monterrey, Mexico',
    image: 'assets/offering-a.webp',
    description:
      "Modern, industrious, and surrounded by the Sierra Madre, Monterrey is Mexico's northern jewel. Estadio BBVA will host four FIFA World Cup 2026™ matches.",
    matches: [
      { id: 'M8b', group: 'Group F', teams: ['Japan', 'Norway'],        flags: ['🇯🇵', '🇳🇴'], date: 'June 13', day: 'Saturday',  time: '9:00 pm CT', price: '2,400' },
      { id: 'M48', group: 'Group A', teams: ['Mexico', 'Opponent TBD'], flags: ['🇲🇽', '🏁'], date: 'June 24', day: 'Wednesday', time: '6:00 pm CT', price: '3,700', tag: 'Going Fast' },
      { id: 'M63', group: 'Group G', teams: ['Belgium', 'Ukraine'],     flags: ['🇧🇪', '🇺🇦'], date: 'June 27', day: 'Saturday',  time: '5:00 pm CT', price: '2,100' },
    ],
  },
};

const ORDER = [
  'atlanta', 'boston', 'dallas', 'houston', 'kansas-city', 'los-angeles', 'miami',
  'new-york-new-jersey', 'philadelphia', 'san-francisco-bay-area', 'seattle',
  'toronto', 'vancouver', 'guadalajara', 'mexico-city', 'monterrey',
];

const STAGE_ACCENT = {
  'Group A': '#fe1743', 'Group B': '#f59e0b', 'Group C': '#eab308', 'Group D': '#84cc16',
  'Group E': '#10b981', 'Group F': '#14b8a6', 'Group G': '#06b6d4', 'Group H': '#3b82f6',
  'Group I': '#6366f1', 'Group J': '#a855f7', 'Group K': '#d946ef', 'Group L': '#ec4899',
  'Round of 32': '#64748b', 'Round of 16': '#475569',
  'Quarter-Final': '#b29f6c', 'Semi-Final': '#c28e00', 'FINAL': '#fe1743',
};

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('city');
  return VENUES[slug] ? slug : 'boston';
}

function matchCard(m, venueName) {
  const tagHtml = m.tag ? `<span class="tag tag--red">${m.tag}</span>` : '';
  const [day, dayOfMonth, month] = [m.day, m.date.split(' ')[1], m.date.split(' ')[0]];
  return `
    <article class="match-card">
      <div class="match-card__img" style="background-image:url('assets/matches-map.webp')">${tagHtml}</div>
      <div class="match-card__date">
        <span>${day} <strong>${dayOfMonth}</strong> ${month}</span>
        <em>${m.time}</em>
      </div>
      <div class="match-card__info">
        <p class="match-card__venue">${venueName} Stadium</p>
        <h4>${m.id}: ${m.teams.join(' vs. ')}</h4>
      </div>
      <div class="match-card__price">
        <span class="from">From</span>
        <strong>$${m.price}</strong>
        <em>USD each</em>
      </div>
      <a class="btn btn--primary btn--sm btn--full" href="index.html#matches">Buy Now</a>
    </article>
  `;
}

function scheduleRow(m, venue) {
  const accent = STAGE_ACCENT[m.group] || '#fe1743';
  const tagHtml = m.tag ? `<span class="tag tag--red sch-row__tag">${m.tag}</span>` : '';
  return `
    <li class="sch-row" style="--accent:${accent}">
      <div class="sch-row__id">
        <span class="sch-row__id-label">${m.id}</span>
      </div>
      <div class="sch-row__teams">
        <p class="sch-row__group">${m.group}</p>
        <div class="sch-row__matchup">
          <span class="sch-row__flag">${m.flags[0]}</span>
          <strong>${m.teams[0]}</strong>
          <span class="sch-row__vs">vs</span>
          <span class="sch-row__flag">${m.flags[1]}</span>
          <strong>${m.teams[1]}</strong>
        </div>
      </div>
      <div class="sch-row__when">
        <p class="sch-row__date">${m.date}</p>
        <p class="sch-row__time">${m.day}, ${m.time}</p>
      </div>
      <div class="sch-row__where">
        <p class="sch-row__city">${venue.cityLabel}</p>
        <p class="sch-row__stadium">${venue.stadium}</p>
      </div>
      <div class="sch-row__price">
        <p class="sch-row__starting">Starting at</p>
        <p class="sch-row__amount"><strong>$${m.price}</strong> <em>USD/pp</em></p>
      </div>
      <a class="sch-row__cta" href="index.html#matches" aria-label="View ${m.id}">
        ${tagHtml}
        <span class="sch-row__chev" aria-hidden="true">›</span>
      </a>
    </li>
  `;
}

function otherVenueCard(slug, venue) {
  return `
    <a class="other-venue" href="venue.html?city=${slug}">
      <div class="other-venue__img" style="background-image:url('${venue.image}')"></div>
      <div class="other-venue__body">
        <span class="other-venue__country">${venue.country}</span>
        <h4>${venue.name}</h4>
        <span class="other-venue__arrow" aria-hidden="true">→</span>
      </div>
    </a>
  `;
}

function render() {
  const slug = getSlug();
  const venue = VENUES[slug];

  document.title = `${venue.name} — FIFA World Cup 2026™`;
  document.getElementById('venueName').textContent = venue.name.toUpperCase();
  document.getElementById('venueDescription').textContent = venue.description;
  document.getElementById('venueImage').src = venue.image;
  document.getElementById('venueImage').alt = `${venue.name} host city`;
  document.getElementById('venueMatchesCta').textContent = `${venue.name} Matches`;

  const grid = document.getElementById('venueMatchGrid');
  grid.innerHTML = venue.matches.slice(0, 6).map((m) => matchCard(m, venue.name)).join('');

  const countEl = document.getElementById('venueMatchCount');
  countEl.textContent = `${venue.matches.length} matches · ${venue.country}`;

  const schedule = document.getElementById('scheduleList');
  schedule.innerHTML = venue.matches.map((m) => scheduleRow(m, venue)).join('');

  const otherGrid = document.getElementById('otherVenuesGrid');
  const others = ORDER.filter((s) => s !== slug).slice(0, 6);
  otherGrid.innerHTML = others.map((s) => otherVenueCard(s, VENUES[s])).join('');
}

document.addEventListener('DOMContentLoaded', render);

const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const dropdowns = document.querySelectorAll('.has-dropdown');
dropdowns.forEach((dd) => {
  const btn = dd.querySelector('.nav__link');
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    const wasOpen = dd.classList.contains('is-open');
    dropdowns.forEach((d) => d.classList.remove('is-open'));
    if (!wasOpen) dd.classList.add('is-open');
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    dropdowns.forEach((d) => d.classList.remove('is-open'));
  }
});
