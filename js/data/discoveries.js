/*
 * THE STRANGE ATLAS OF HUMANITY: curated discoveries.
 * Every entry is a real, documented fact with a reference. Where a detail is
 * disputed or depends on definitions, `note` says so and the UI flags it.
 *
 * Fields:
 *   id, c (ISO 3166-1 numeric country code, matching Natural Earth), place,
 *   lat, lon, t (numeric year, negative = BCE), year (display), cat (category),
 *   title, hook (a teaser that never names the place), text, why,
 *   fig [value, caption], src [label, url], note (optional), links [[id, why]]
 *   Link targets prefixed with "p:" point to people in people.js.
 */
window.ATLAS_CATEGORIES = [
  { id: 'geography',    label: 'Geography',    glyph: '🌍', color: '#6FD3C1' },
  { id: 'history',      label: 'History',      glyph: '⚔️', color: '#F0A35E' },
  { id: 'science',      label: 'Science',      glyph: '🧠', color: '#8FB4FF' },
  { id: 'art',          label: 'Art',          glyph: '🎨', color: '#F28DB2' },
  { id: 'inventions',   label: 'Inventions',   glyph: '🔬', color: '#F4D35E' },
  { id: 'people',       label: 'People',       glyph: '👤', color: '#C7A4FF' },
  { id: 'civilization', label: 'Civilization', glyph: '🏛️', color: '#E2BE8F' },
  { id: 'nature',       label: 'Nature',       glyph: '🌋', color: '#8EDB8A' },
  { id: 'medicine',     label: 'Medicine',     glyph: '🧬', color: '#FF8C7A' },
  { id: 'space',        label: 'Space',        glyph: '🚀', color: '#8FE6FF' },
  { id: 'ideas',        label: 'Ideas',        glyph: '💡', color: '#F3EEDF' }
];

window.ATLAS_DISCOVERIES = [
  {
    id: 'zanzibar-war', c: '834', place: 'Zanzibar, Tanzania', lat: -6.16, lon: 39.19, t: 1896, year: '1896', cat: 'history',
    title: 'The war that lasted 38 minutes',
    hook: 'A war started after breakfast and was over before most people had finished their tea.',
    text: 'On 27 August 1896, Britain bombarded the palace of Khalid bin Barghash, who had claimed the throne of Zanzibar without British approval. The sultan’s forces gave up in roughly 38 to 45 minutes.',
    why: 'It is usually cited as the shortest war in recorded history, over in less time than most films.',
    fig: ['38', 'minutes, by the most common count'],
    note: 'Accounts give 38, 40 or 45 minutes depending on when you start and stop the clock.',
    src: ['Wikipedia: Anglo-Zanzibar War', 'https://en.wikipedia.org/wiki/Anglo-Zanzibar_War'],
    links: [['oman-zanzibar', 'Why Zanzibar had a sultan in the first place'], ['laughter-epidemic', 'Same coast, 66 years later, a very different outbreak'], ['onoda', 'From the shortest war to the soldier who would not stop'], ['great-stink', 'Meanwhile, at the heart of the empire that fired the shells']]
  },
  {
    id: 'laughter-epidemic', c: '834', place: 'Kashasha, Tanzania', lat: -1.45, lon: 31.62, t: 1962, year: '1962', cat: 'medicine',
    title: 'The laughter epidemic',
    hook: 'A fit of giggles at one school spread so far that 14 schools had to close.',
    text: 'In January 1962, uncontrollable laughter broke out among pupils at a girls’ boarding school in Kashasha, in what was then Tanganyika. It spread to nearby villages over months, affecting around 1,000 people, and at least 14 schools shut temporarily.',
    why: 'Nothing infectious was ever found. It is a textbook case of mass psychogenic illness: stress, spreading person to person like a virus.',
    fig: ['14', 'schools closed'],
    src: ['Wikipedia: 1962 Tanganyika laughter epidemic', 'https://en.wikipedia.org/wiki/1962_Tanganyika_laughter_epidemic'],
    links: [['dancing-plague', 'Four centuries earlier, a whole city could not stop dancing'], ['zanzibar-war', 'The same country, at the end of the 19th century']]
  },
  {
    id: 'dancing-plague', c: '250', place: 'Strasbourg, France', lat: 48.58, lon: 7.75, t: 1518, year: '1518', cat: 'history',
    title: 'The summer a city could not stop dancing',
    hook: 'The city council’s cure for a deadly outbreak was to hire a band.',
    text: 'In July 1518 a woman began dancing in a Strasbourg street and kept going for days. Within weeks dozens, perhaps hundreds, had joined her. Believing more dancing would cure it, the authorities hired musicians and built a stage.',
    why: 'Physicians and city records confirm the event really happened. Today it is usually explained as mass psychogenic illness during a time of famine and disease.',
    fig: ['1518', 'Strasbourg, then part of the Holy Roman Empire'],
    note: 'The event is well documented. Later claims that many dancers danced themselves to death are disputed.',
    src: ['Wikipedia: Dancing plague of 1518', 'https://en.wikipedia.org/wiki/Dancing_plague_of_1518'],
    links: [['laughter-epidemic', 'The same mystery, in a 1960s schoolroom'], ['guillotine-starwars', 'Another French story that warps your sense of time'], ['quarantine-dubrovnik', 'How medieval cities really fought plague']]
  },
  {
    id: 'guillotine-starwars', c: '250', place: 'Marseille, France', lat: 43.30, lon: 5.37, t: 1977, year: '1977', cat: 'history',
    title: 'The guillotine outlived the release of Star Wars',
    hook: 'A device from the French Revolution was still in official use the year the first Star Wars film opened.',
    text: 'France’s last execution by guillotine took place in Marseille on 10 September 1977. Star Wars had opened in American cinemas that May. France abolished the death penalty in 1981.',
    why: 'We file the guillotine under powdered wigs and revolution, yet it overlapped with disco and the first home computers.',
    fig: ['1977', 'last use of the guillotine'],
    src: ['Wikipedia: Hamida Djandoubi', 'https://en.wikipedia.org/wiki/Hamida_Djandoubi'],
    links: [['cleopatra', 'Another fact that breaks your mental timeline'], ['dancing-plague', 'France, four and a half centuries earlier']]
  },
  {
    id: 'www-cern', c: '756', place: 'CERN, Geneva, Switzerland', lat: 46.23, lon: 6.05, t: 1989, year: '1989', cat: 'inventions',
    title: 'The web was born in a particle physics lab',
    hook: 'The thing you are using right now was a side project at a lab that smashes atoms.',
    text: 'In March 1989, Tim Berners-Lee, a British scientist at CERN, proposed a system to help physicists share documents. His manager wrote “Vague but exciting…” on the cover. It became the World Wide Web, and in 1993 CERN released the software into the public domain.',
    why: 'The web was not built by a tech company. It came from physicists who needed to share papers, and it was given away for free.',
    fig: ['$0', 'royalties: the web was released royalty-free in 1993'],
    src: ['CERN: The birth of the Web', 'https://home.cern/science/computing/birth-web'],
    links: [['p:bernerslee', 'The person who wrote the proposal'], ['linux', 'Another free gift that now runs the internet'], ['frankenstein', 'The same lakeshore, 173 years earlier']]
  },
  {
    id: 'frankenstein', c: '756', place: 'Villa Diodati, Cologny, Switzerland', lat: 46.22, lon: 6.18, t: 1816, year: '1816', cat: 'art',
    title: 'A volcano helped write Frankenstein',
    hook: 'Two of the most famous monsters in fiction were born because of bad weather caused by an eruption on the other side of the world.',
    text: 'In the cold, stormy summer of 1816, Lord Byron challenged his guests at the Villa Diodati near Geneva to write ghost stories. Eighteen-year-old Mary Shelley began Frankenstein. Byron’s doctor, John Polidori, wrote The Vampyre, often called the first modern vampire story in English.',
    why: 'The gloom that kept them indoors was the “Year Without a Summer”, caused by a volcanic eruption in Indonesia the year before.',
    fig: ['18', 'Mary Shelley’s age when she began the novel'],
    src: ['Wikipedia: Villa Diodati', 'https://en.wikipedia.org/wiki/Villa_Diodati'],
    links: [['tambora', 'The eruption behind the weather'], ['p:lovelace', 'Byron’s daughter would write the first published computer program'], ['serbian-vampire', 'Where the word “vampire” came from']]
  },
  {
    id: 'tambora', c: '360', place: 'Mount Tambora, Sumbawa, Indonesia', lat: -8.25, lon: 118.0, t: 1815, year: '1815', cat: 'nature',
    title: 'The eruption that cancelled summer',
    hook: 'A mountain exploded in Asia, and the next year it snowed in June in New England.',
    text: 'Mount Tambora erupted in April 1815, the most powerful eruption in recorded history. Ash and sulfur in the stratosphere cooled the planet, and 1816 became the “Year Without a Summer”, with June snow in New England and failed harvests across Europe.',
    why: 'An eruption in Indonesia caused famine in Europe, a novel in Switzerland and, possibly, the invention of the bicycle.',
    fig: ['VEI 7', 'on the volcanic explosivity index'],
    src: ['Wikipedia: 1815 eruption of Mount Tambora', 'https://en.wikipedia.org/wiki/1815_eruption_of_Mount_Tambora'],
    links: [['frankenstein', 'The ghost-story contest it caused'], ['draisine', 'Starving horses and a new machine'], ['lake-nyos', 'When volcanic gas kills quietly']]
  },
  {
    id: 'draisine', c: '276', place: 'Mannheim, Germany', lat: 49.49, lon: 8.47, t: 1817, year: '1817', cat: 'inventions',
    title: 'The first bicycle had no pedals',
    hook: 'The ancestor of one of the world’s most common vehicles may have been a response to a volcanic eruption.',
    text: 'On 12 June 1817, Karl Drais rode his “running machine” from Mannheim to a coaching inn about 7 km away and back in roughly an hour. It had two wheels and steering but no pedals: riders pushed along the ground with their feet.',
    why: 'Some historians link it to the Year Without a Summer, when failed oat harvests made horses expensive to feed.',
    fig: ['0', 'pedals'],
    note: 'The link between the famine and Drais’s invention is a popular hypothesis, not established fact.',
    src: ['Wikipedia: Dandy horse', 'https://en.wikipedia.org/wiki/Dandy_horse'],
    links: [['tambora', 'The eruption in the background'], ['dagen-h', 'Another strange moment in the history of the road']]
  },
  {
    id: 'serbian-vampire', c: '688', place: 'Kisiljevo, Serbia', lat: 44.73, lon: 21.40, t: 1725, year: '1725', cat: 'civilization',
    title: 'Serbia gave the world the word “vampire”',
    hook: 'A government report from a small village introduced a word that every language now knows.',
    text: 'In 1725 an Austrian official reported that villagers in Kisiljevo had exhumed a man named Petar Blagojević, accused of rising from the grave. The report, printed in Vienna, used the local word for it. Similar Serbian cases in the 1730s set off a vampire panic across Europe.',
    why: 'Dracula is Transylvanian fiction, but the word itself spread west through bureaucratic paperwork from Serbia.',
    fig: ['1725', 'the report that made the word famous'],
    note: 'The word has older Slavic roots. The Serbian reports are what popularised it in Western Europe.',
    src: ['Wikipedia: Petar Blagojević', 'https://en.wikipedia.org/wiki/Petar_Blagojevi%C4%87'],
    links: [['frankenstein', 'The night the modern vampire story was written'], ['necktie', 'Another Balkan export everyone uses'], ['p:tesla', 'A Serb born just across today’s border']]
  },
  {
    id: 'necktie', c: '191', place: 'Croatia', lat: 45.81, lon: 15.98, t: 1630, year: '1630s', cat: 'civilization',
    title: 'Your necktie is Croatian',
    hook: 'Millions of office workers put on a piece of 17th-century military uniform every morning.',
    text: 'In the 17th century, Croatian mercenaries serving France tied distinctive scarves around their necks. Parisians copied the look and called it à la croate, which became the French word cravate.',
    why: 'Every business tie is a souvenir of the Thirty Years’ War. Croatia now celebrates Cravat Day every 18 October.',
    fig: ['18 Oct', 'Cravat Day in Croatia'],
    note: 'The etymology is widely accepted. Details of how the fashion spread vary between accounts.',
    src: ['Wikipedia: Cravat (early)', 'https://en.wikipedia.org/wiki/Cravat_(early)'],
    links: [['quarantine-dubrovnik', 'Croatia also gave us quarantine'], ['p:tesla', 'The most famous person born in Croatia'], ['serbian-vampire', 'Next door, another word the world borrowed']]
  },
  {
    id: 'quarantine-dubrovnik', c: '191', place: 'Dubrovnik, Croatia', lat: 42.65, lon: 18.09, t: 1377, year: '1377', cat: 'medicine',
    title: 'Quarantine was invented in Dubrovnik',
    hook: 'A small medieval republic wrote the rule the whole world followed in 2020.',
    text: 'In 1377 the Republic of Ragusa, today’s Dubrovnik, ordered anyone arriving from plague areas to wait 30 days in isolation before entering. Venice later stretched the wait to 40 days, quaranta giorni, which gave us the word quarantine.',
    why: 'This was five centuries before anyone knew germs existed. It worked anyway.',
    fig: ['30', 'days of isolation in the first law'],
    src: ['Wikipedia: Quarantine (history)', 'https://en.wikipedia.org/wiki/Quarantine#History'],
    links: [['p:semmelweis', 'The doctor ridiculed for saying hands carry disease'], ['great-stink', 'How a smell finally cleaned up a city'], ['necktie', 'Another thing Croatia gave everyone']]
  },
  {
    id: 'kongo-gumi', c: '392', place: 'Osaka, Japan', lat: 34.65, lon: 135.52, t: 578, year: '578', cat: 'civilization',
    title: 'A company that ran for 1,428 years',
    hook: 'A construction company was already 900 years old when Columbus sailed.',
    text: 'Kongō Gumi was founded in Osaka in 578 to build the Shitennō-ji Buddhist temple. Run by the same family for some 40 generations, it remained independent until a larger construction firm absorbed it in 2006.',
    why: 'It outlived empires, dynasties and every company you have heard of, by more than a thousand years.',
    fig: ['1,428', 'years as an independent company'],
    src: ['Wikipedia: Kongō Gumi', 'https://en.wikipedia.org/wiki/Kong%C5%8D_Gumi'],
    links: [['qarawiyyin', 'An institution even older, still open'], ['yamaguchi', 'Japan, 1945']]
  },
  {
    id: 'yamaguchi', c: '392', place: 'Hiroshima and Nagasaki, Japan', lat: 32.75, lon: 129.88, t: 1945, year: '1945', cat: 'history',
    title: 'He survived both atomic bombs',
    hook: 'A man on a business trip lived through the worst day in his city’s history, then went home and lived through it again.',
    text: 'Tsutomu Yamaguchi was in Hiroshima on business on 6 August 1945 when the first atomic bomb exploded about 3 km away. Injured, he went home to Nagasaki, and was there on 9 August for the second. He lived to 93.',
    why: 'In 2009 Japan officially recognised him as a survivor of both bombings, the only person to receive that recognition.',
    fig: ['2', 'atomic bombings survived'],
    src: ['Wikipedia: Tsutomu Yamaguchi', 'https://en.wikipedia.org/wiki/Tsutomu_Yamaguchi'],
    links: [['onoda', 'The Japanese soldier for whom the war never ended'], ['p:meitner', 'The physicist who explained nuclear fission'], ['nuke-moon', 'A plan to set off a nuclear bomb on the Moon']]
  },
  {
    id: 'onoda', c: '608', place: 'Lubang Island, Philippines', lat: 13.80, lon: 120.12, t: 1974, year: '1974', cat: 'history',
    title: 'The soldier who fought until 1974',
    hook: 'A soldier kept fighting a world war for 29 years after it ended.',
    text: 'Japanese intelligence officer Hiroo Onoda kept up a guerrilla campaign in the jungle of Lubang Island, refusing to believe that the Second World War was over. He surrendered only in 1974, after his former commanding officer flew out to relieve him of duty in person.',
    why: 'Leaflets announcing Japan’s surrender were dismissed as enemy propaganda for almost three decades.',
    fig: ['29', 'years in the jungle'],
    src: ['Wikipedia: Hiroo Onoda', 'https://en.wikipedia.org/wiki/Hiroo_Onoda'],
    links: [['zanzibar-war', 'The opposite extreme: a war of 38 minutes'], ['yamaguchi', 'The other end of the same war']]
  },
  {
    id: 'great-stink', c: '826', place: 'London, United Kingdom', lat: 51.50, lon: -0.12, t: 1858, year: '1858', cat: 'civilization',
    title: 'The smell that built modern London',
    hook: 'Lawmakers ignored thousands of deaths for years, then acted in weeks because of a smell.',
    text: 'In the hot summer of 1858 the sewage-choked Thames smelled so bad that Parliament hung curtains soaked in chloride of lime. A bill funding Joseph Bazalgette’s sewer network passed in 18 days. Much of that network is still in use.',
    why: 'Cholera had killed tens of thousands of Londoners. What moved Parliament was the stink under its own windows.',
    fig: ['18', 'days from bill to law'],
    src: ['Wikipedia: Great Stink', 'https://en.wikipedia.org/wiki/Great_Stink'],
    links: [['p:snow', 'The doctor who mapped where cholera came from'], ['p:pasteur', 'The scientist who proved what was really killing people'], ['oxford-bell', 'An English experiment still running since 1840']]
  },
  {
    id: 'oxford-bell', c: '826', place: 'Oxford, United Kingdom', lat: 51.76, lon: -1.26, t: 1840, year: '1840', cat: 'science',
    title: 'A bell that has been ringing since 1840',
    hook: 'A battery-powered experiment started before photography was common, and it is still running.',
    text: 'In a corridor of Oxford’s Clarendon Laboratory, a small bell has rung almost continuously since 1840, powered by the same pair of dry piles. Nobody knows exactly what is inside them, and opening them would end the experiment.',
    why: 'It has rung an estimated 10 billion times. You can barely hear it, because it sits behind two layers of glass.',
    fig: ['~10 bn', 'rings and counting'],
    src: ['Wikipedia: Oxford Electric Bell', 'https://en.wikipedia.org/wiki/Oxford_Electric_Bell'],
    links: [['pitch-drop', 'An even slower experiment, in Australia'], ['p:faraday', 'The bookbinder who made electricity useful']]
  },
  {
    id: 'scotland-unicorn', c: '826', place: 'Edinburgh, United Kingdom', lat: 55.95, lon: -3.19, t: 1603, year: '1300s–1603', cat: 'civilization',
    title: 'Scotland’s national animal is a unicorn',
    hook: 'A country’s official national animal does not exist.',
    text: 'Unicorns have appeared on Scottish royal arms since the 1300s. When James VI of Scotland inherited the English throne in 1603, the unicorn joined England’s lion on the royal coat of arms, where it still stands, wearing a chain.',
    why: 'The chain is usually explained by legend: a unicorn was so wild that only a king could tame it.',
    fig: ['1603', 'the unicorn joins the lion'],
    src: ['Wikipedia: Unicorn (Scotland)', 'https://en.wikipedia.org/wiki/Unicorn#Heraldry'],
    links: [['penguin-knight', 'A real animal with a real knighthood'], ['nepal-flag', 'Another national symbol that breaks the rules']]
  },
  {
    id: 'pitch-drop', c: '036', place: 'Brisbane, Australia', lat: -27.50, lon: 153.01, t: 1927, year: '1927', cat: 'science',
    title: 'The slowest experiment on Earth',
    hook: 'A science experiment has produced nine results in almost a century, and nobody has seen one happen.',
    text: 'In 1927 physicist Thomas Parnell poured heated pitch into a sealed funnel at the University of Queensland. In 1930 he cut the stem. Since then only nine drops have fallen. Pitch looks solid and shatters under a hammer, but it flows like a liquid about 100 billion times thicker than water.',
    why: 'No one has ever watched a drop fall in person. In 2000, the camera filming it failed at the crucial moment.',
    fig: ['9', 'drops since 1930'],
    src: ['Wikipedia: Pitch drop experiment', 'https://en.wikipedia.org/wiki/Pitch_drop_experiment'],
    links: [['oxford-bell', 'The other experiment that refuses to end'], ['emu-war', 'Australia, 1932: the army versus the birds']]
  },
  {
    id: 'emu-war', c: '036', place: 'Campion, Western Australia', lat: -31.10, lon: 118.40, t: 1932, year: '1932', cat: 'history',
    title: 'The army lost a war to emus',
    hook: 'A modern army deployed machine guns against birds, and the birds won.',
    text: 'In late 1932, around 20,000 emus moved onto farmland in Western Australia. The government sent soldiers with two Lewis machine guns. After weeks and thousands of rounds, the emus were largely unbothered and the operation was withdrawn.',
    why: 'Their commanding officer remarked that the emus could face machine guns “with the invulnerability of tanks”.',
    fig: ['~20,000', 'emus'],
    note: 'Kill counts reported at the time vary widely and are disputed.',
    src: ['Wikipedia: Emu War', 'https://en.wikipedia.org/wiki/Emu_War'],
    links: [['zanzibar-war', 'Another very short, very strange war'], ['hans-island', 'A war fought with bottles of whisky'], ['pitch-drop', 'Australia’s other test of patience']]
  },
  {
    id: 'molasses', c: '840', place: 'Boston, United States', lat: 42.37, lon: -71.06, t: 1919, year: '1919', cat: 'history',
    title: 'A wave of molasses killed 21 people',
    hook: 'A tidal wave of something sweet swept through a city’s streets.',
    text: 'On 15 January 1919, a giant storage tank in Boston’s North End burst, releasing about 8.7 million litres of molasses. A wave up to 7.6 m high moved through the streets at an estimated 56 km/h, killing 21 people and injuring about 150.',
    why: 'Syrup is deadly at scale. It moved fast, then trapped people as it thickened in the cold.',
    fig: ['56 km/h', 'estimated speed of the wave'],
    src: ['Wikipedia: Great Molasses Flood', 'https://en.wikipedia.org/wiki/Great_Molasses_Flood'],
    links: [['great-stink', 'Another disaster that changed how cities are regulated'], ['nuke-moon', 'America, 40 years later: a plan to bomb the Moon']]
  },
  {
    id: 'nuke-moon', c: '840', place: 'Chicago, United States', lat: 41.84, lon: -87.63, t: 1958, year: '1958', cat: 'space',
    title: 'The US once planned to nuke the Moon',
    hook: 'At the height of the Cold War, a superpower studied blowing up part of the Moon to impress the world.',
    text: 'In 1958 the US Air Force commissioned a secret study, Project A119, on detonating a nuclear bomb on the Moon, where the flash would be visible from Earth, as a show of strength in the Space Race. It was shelved, and became public only in 2000.',
    why: 'A young Carl Sagan worked on it, calculating how the dust cloud would expand.',
    fig: ['A119', 'the project’s code name'],
    src: ['Wikipedia: Project A119', 'https://en.wikipedia.org/wiki/Project_A119'],
    links: [['baikonur', 'Where the other side of the Space Race launched'], ['tunguska', 'A real explosion that flattened 80 million trees'], ['lemaitre', 'The priest who first said the universe had a beginning']]
  },
  {
    id: 'hans-island', c: '124', place: 'Hans Island, Nares Strait', lat: 80.83, lon: -66.45, t: 2022, year: '1984–2022', cat: 'geography',
    title: 'The “Whisky War” between Canada and Denmark',
    hook: 'Two friendly countries fought over an island for decades, using alcohol.',
    text: 'Canada and Denmark both claimed tiny, barren Hans Island in the Arctic. From 1984, visiting officials took turns removing each other’s flags and leaving a bottle of Canadian whisky or Danish schnapps. In 2022 they settled it by splitting the island in two.',
    why: 'The deal created a land border between Canada and the Kingdom of Denmark, in the middle of an Arctic strait.',
    fig: ['1.3 km²', 'the entire disputed island'],
    src: ['Wikipedia: Whisky War', 'https://en.wikipedia.org/wiki/Whisky_War'],
    links: [['emu-war', 'Another war nobody took seriously'], ['greenland-shark', 'In the waters nearby lives a 400-year-old shark'], ['insulin', 'Canada gave away something far more valuable']]
  },
  {
    id: 'insulin', c: '124', place: 'Toronto, Canada', lat: 43.66, lon: -79.39, t: 1923, year: '1923', cat: 'medicine',
    title: 'Insulin’s discoverers sold the patent for $1',
    hook: 'The people behind one of medicine’s most important drugs gave it away for the price of a coffee.',
    text: 'After Frederick Banting, Charles Best and James Collip isolated insulin in Toronto, they sold the patent to the University of Toronto in 1923 for $1 each, so that no one could profit by restricting it.',
    why: 'Banting is often quoted as saying that insulin “belongs to the world”.',
    fig: ['$1', 'the price of the patent'],
    note: 'The quote is widely attributed to Banting; its exact wording varies.',
    src: ['University of Toronto: The discovery of insulin', 'https://insulin.library.utoronto.ca/about/history'],
    links: [['p:fleming', 'The accident that gave us antibiotics'], ['heart-transplant', 'A medical first nobody expects in Cape Town'], ['www-cern', 'Another world-changing gift, given away free']]
  },
  {
    id: 'greenland-shark', c: '304', place: 'Greenland', lat: 72.0, lon: -40.0, t: 2016, year: '2016', cat: 'nature',
    title: 'A shark that may be 400 years old',
    hook: 'Some animals swimming today may have been born before the United States existed.',
    text: 'In 2016, scientists radiocarbon-dated proteins in the eye lenses of Greenland sharks. The largest was estimated at 392 years old, give or take 120 years, making the species the longest-lived vertebrate known.',
    why: 'They grow about a centimetre a year and may not reach maturity until they are 150.',
    fig: ['392 ± 120', 'years: the oldest estimate'],
    src: ['Nielsen et al., Science (2016)', 'https://www.science.org/doi/10.1126/science.aaf1703'],
    links: [['blood-falls', 'Life in a lake sealed under ice'], ['hans-island', 'An Arctic dispute settled with whisky']]
  },
  {
    id: 'tycho-nose', c: '208', place: 'Denmark', lat: 55.68, lon: 12.57, t: 1566, year: '1566', cat: 'science',
    title: 'The astronomer with a metal nose',
    hook: 'One of the great astronomers lost part of his nose in a duel, reportedly over mathematics.',
    text: 'Danish nobleman Tycho Brahe lost part of his nose in a 1566 duel and wore a prosthetic for the rest of his life. His naked-eye observations, the most precise before the telescope, let Johannes Kepler show that planets move in ellipses.',
    why: 'Legend says his nose was gold and silver. Analysis of his remains in 2010 suggested his everyday one was brass.',
    fig: ['1566', 'the duel'],
    note: 'Why the duel was fought comes from accounts, not court records.',
    src: ['Wikipedia: Tycho Brahe', 'https://en.wikipedia.org/wiki/Tycho_Brahe'],
    links: [["ulugh-beg","A prince who built an even bigger instrument"], ['galileo-pardon', 'His contemporary, and a 359-year wait'], ['lemaitre', 'The astronomer-priest who imagined the Big Bang']]
  },
  {
    id: 'tordesillas', c: '724', place: 'Tordesillas, Spain', lat: 41.50, lon: -5.0, t: 1494, year: '1494', cat: 'history',
    title: 'Two kingdoms split the world with a line',
    hook: 'Two countries divided every land outside Europe between themselves with one line on a map.',
    text: 'In 1494, Spain and Portugal signed the Treaty of Tordesillas, splitting newly discovered lands outside Europe along a north–south line 370 leagues west of the Cape Verde islands. Spain took the west, Portugal the east.',
    why: 'That line is why Brazil speaks Portuguese while most of the rest of South America speaks Spanish.',
    fig: ['370', 'leagues west of Cape Verde'],
    src: ['Wikipedia: Treaty of Tordesillas', 'https://en.wikipedia.org/wiki/Treaty_of_Tordesillas'],
    links: [['brasilia', 'The Portuguese-speaking giant that line created'], ['lisbon-quake', 'Portugal’s capital, 261 years later'], ['haiti', 'What European empire cost the Americas']]
  },
  {
    id: 'spain-anthem', c: '724', place: 'Madrid, Spain', lat: 40.42, lon: -3.70, t: 1770, year: 'Today', cat: 'civilization',
    title: 'An anthem with no words',
    hook: 'At major football finals, one team’s players stand in silence during their anthem, because there is nothing to sing.',
    text: 'Spain’s national anthem, the Marcha Real, has no official lyrics. Several versions of words have existed, but none is official today, so Spanish athletes stand silently or hum.',
    why: 'It is one of only a handful of national anthems in the world without official lyrics.',
    fig: ['0', 'official words'],
    src: ['Wikipedia: Marcha Real', 'https://en.wikipedia.org/wiki/Marcha_Real'],
    links: [["cordoba-library","Spain, a thousand years earlier"], ['paraguay-flag', 'A flag with two different faces'], ['nepal-flag', 'The only national flag that is not a rectangle']]
  },
  {
    id: 'lisbon-quake', c: '620', place: 'Lisbon, Portugal', lat: 38.72, lon: -9.14, t: 1755, year: '1755', cat: 'ideas',
    title: 'The earthquake that shook philosophy',
    hook: 'A natural disaster on a religious holiday changed what Europe’s greatest thinkers believed about the world.',
    text: 'On All Saints’ Day 1755 an earthquake, a tsunami and fires destroyed much of Lisbon and killed tens of thousands. Voltaire attacked the idea that this was “the best of all possible worlds” in Candide, and Portugal’s systematic survey of the damage is often called the start of modern seismology.',
    why: 'A disaster changed philosophy and science at the same time.',
    fig: ['1 Nov', '1755, All Saints’ Day'],
    src: ['Wikipedia: 1755 Lisbon earthquake', 'https://en.wikipedia.org/wiki/1755_Lisbon_earthquake'],
    links: [['tordesillas', 'When Portugal shared the world with Spain'], ['zhang-heng', 'An earthquake detector 1,600 years earlier'], ['tambora', 'Another natural disaster that changed culture']]
  },
  {
    id: 'paricutin', c: '484', place: 'Paricutín, Michoacán, Mexico', lat: 19.49, lon: -102.25, t: 1943, year: '1943', cat: 'nature',
    title: 'A volcano was born in a cornfield',
    hook: 'A farmer went to work in his field one afternoon and watched a volcano appear.',
    text: 'On 20 February 1943, farmer Dionisio Pulido saw the ground in his cornfield crack open and start to smoke. Within a day there was a cone; within a year it was 336 m high. Paricutín erupted until 1952 and buried two towns.',
    why: 'It was the first time scientists could document a volcano’s whole life, from birth to extinction.',
    fig: ['336 m', 'of growth in its first year'],
    src: ['Wikipedia: Paricutín', 'https://en.wikipedia.org/wiki/Paricut%C3%ADn'],
    links: [['tambora', 'The most powerful eruption on record'], ['lake-nyos', 'A volcanic lake that suffocated a valley']]
  },
  {
    id: 'snake-island', c: '076', place: 'Ilha da Queimada Grande, Brazil', lat: -24.49, lon: -46.67, t: 1909, year: 'Today', cat: 'nature',
    title: 'An island ruled by a snake found nowhere else',
    hook: 'There is an island where the government will not let you land, because of who lives there.',
    text: 'Ilha da Queimada Grande, about 33 km off the coast of São Paulo, is the only home of the golden lancehead, a critically endangered venomous pit viper. Brazil bars visits except by authorised researchers and the navy.',
    why: 'Rising seas cut the island off from the mainland thousands of years ago, and the snakes evolved on their own, hunting migrating birds.',
    fig: ['1', 'island on Earth where it lives'],
    src: ['Wikipedia: Ilha da Queimada Grande', 'https://en.wikipedia.org/wiki/Ilha_da_Queimada_Grande'],
    links: [['socotra', 'Another island where evolution went its own way'], ['brasilia', 'Brazil’s capital, built from nothing']]
  },
  {
    id: 'brasilia', c: '076', place: 'Brasília, Brazil', lat: -15.79, lon: -47.88, t: 1960, year: '1960', cat: 'civilization',
    title: 'A capital city built in 41 months',
    hook: 'A country built its capital city from scratch in empty grassland in under four years.',
    text: 'Brasília was built in the empty savanna of Brazil’s interior and inaugurated in 1960, about 41 months after construction began. Lúcio Costa’s plan, shaped like an aeroplane or a bird, made it one of the largest cities ever designed from nothing.',
    why: 'Brazil’s 1891 constitution had already called for moving the capital inland. It took almost 70 years.',
    fig: ['41', 'months to build'],
    src: ['Wikipedia: Brasília', 'https://en.wikipedia.org/wiki/Bras%C3%ADlia'],
    links: [['tordesillas', 'The 1494 line that made Brazil Portuguese'], ['snake-island', 'Off Brazil’s coast, a forbidden island']]
  },
  {
    id: 'khipu', c: '604', place: 'Cusco, Peru', lat: -13.53, lon: -71.97, t: 1450, year: '1400s', cat: 'civilization',
    title: 'An empire run on knotted string',
    hook: 'The largest empire in the Americas ran its accounts without any known writing.',
    text: 'The Inca Empire governed perhaps 10 million people without a known writing system. Officials recorded censuses and tribute on khipu: cords whose knots, by position and type, encoded numbers in base ten.',
    why: 'Most khipu still cannot be read, and whether they also recorded words is an open question.',
    fig: ['~1,000', 'khipu survive'],
    note: 'Whether khipu encoded language as well as numbers is debated.',
    src: ['Wikipedia: Quipu', 'https://en.wikipedia.org/wiki/Quipu'],
    links: [['zero', 'The number that makes place-value counting work'], ['bolivia-navy', 'Next door: a navy with no sea'], ['enheduanna', 'The first author we know by name']]
  },
  {
    id: 'bolivia-navy', c: '068', place: 'Lake Titicaca, Bolivia', lat: -16.0, lon: -69.2, t: 1884, year: 'Since 1884', cat: 'geography',
    title: 'A landlocked country with a navy',
    hook: 'A country with no coastline keeps thousands of sailors and celebrates a Day of the Sea.',
    text: 'Bolivia lost its Pacific coast to Chile in the War of the Pacific (1879–1884). It kept its navy anyway: several thousand personnel patrol Lake Titicaca and the country’s rivers, and every 23 March the nation marks the Día del Mar.',
    why: 'The navy is a standing reminder of a coastline Bolivia still hopes to regain.',
    fig: ['0 km', 'of coastline'],
    src: ['Wikipedia: Bolivian Navy', 'https://en.wikipedia.org/wiki/Bolivian_Navy'],
    links: [['uyuni', 'Bolivia’s other wonder: a mirror for satellites'], ['khipu', 'The empire that ruled these mountains'], ['lesotho', 'Another country defined by what surrounds it']]
  },
  {
    id: 'uyuni', c: '068', place: 'Salar de Uyuni, Bolivia', lat: -20.13, lon: -67.49, t: 2000, year: 'Today', cat: 'space',
    title: 'A salt flat used to calibrate satellites',
    hook: 'One of the flattest places on Earth helps satellites measure the planet.',
    text: 'Salar de Uyuni covers about 10,000 km² and its height varies by less than a metre across the whole surface. That flatness and brightness make it a prime target for calibrating satellite altimeters, which measure Earth’s surface from orbit.',
    why: 'After rain, a thin layer of water turns it into the largest natural mirror on Earth.',
    fig: ['< 1 m', 'of height difference over 10,000 km²'],
    src: ['Wikipedia: Salar de Uyuni', 'https://en.wikipedia.org/wiki/Salar_de_Uyuni'],
    links: [['atacama-mars', 'Next door, a desert that stands in for Mars'], ['chimborazo', 'The true closest point to space']]
  },
  {
    id: 'atacama-mars', c: '152', place: 'Atacama Desert, Chile', lat: -24.50, lon: -69.25, t: 2003, year: 'Today', cat: 'space',
    title: 'Where Mars rovers practise on Earth',
    hook: 'Space agencies rehearse missions to another planet in one corner of South America.',
    text: 'Parts of the Atacama Desert are so dry, and their soil so lifeless, that NASA and other agencies use them to test rovers and life-detection instruments bound for Mars. Some weather stations there record about 1 mm of rain a year.',
    why: 'Experiments in 2003 found soil here so sterile it behaved like Martian samples.',
    fig: ['~1 mm', 'of rain a year at some stations'],
    src: ['Wikipedia: Atacama Desert', 'https://en.wikipedia.org/wiki/Atacama_Desert'],
    links: [['uyuni', 'Next door, a mirror for satellites'], ['cybersyn', 'Chile, 1971: an internet before the internet'], ['hoba', 'A visitor from space that never moved']]
  },
  {
    id: 'cybersyn', c: '152', place: 'Santiago, Chile', lat: -33.45, lon: -70.67, t: 1971, year: '1971', cat: 'ideas',
    title: 'Chile tried to run its economy by telex',
    hook: 'Decades before the internet, one country tried to run its economy through a network and a futuristic control room.',
    text: 'In 1971 Salvador Allende’s government hired British cybernetician Stafford Beer to build Project Cybersyn: around 500 telex machines sending factory data to Santiago daily, software to flag problems, and an operations room with swivel chairs and built-in buttons. It ended with the 1973 coup.',
    why: 'It was one of the first attempts to run a national economy in near real time with computers.',
    fig: ['~500', 'telex machines'],
    src: ['Wikipedia: Project Cybersyn', 'https://en.wikipedia.org/wiki/Project_Cybersyn'],
    links: [['estonia-evote', 'The country that went digital for real'], ['www-cern', 'Where the web really began'], ['p:shannon', 'The man who defined information']]
  },
  {
    id: 'fingerprint', c: '032', place: 'Necochea, Argentina', lat: -38.55, lon: -58.74, t: 1892, year: '1892', cat: 'science',
    title: 'The first murder solved by a fingerprint',
    hook: 'Forensic science’s first great case was solved in a small Argentine town, not in London.',
    text: 'In 1892, two children were murdered in Necochea, Argentina. A bloody thumbprint on a door frame matched their mother, Francisca Rojas, who had accused a neighbour. The investigators used a classification system developed by police official Juan Vucetich.',
    why: 'It is generally cited as the first criminal case solved through fingerprint evidence.',
    fig: ['1', 'bloody thumbprint'],
    src: ['Wikipedia: Juan Vucetich', 'https://en.wikipedia.org/wiki/Juan_Vucetich'],
    links: [['birome', 'Argentina’s other gift: the pen in your bag'], ['enigma-poland', 'A different kind of code-breaking']]
  },
  {
    id: 'birome', c: '032', place: 'Buenos Aires, Argentina', lat: -34.60, lon: -58.38, t: 1943, year: '1943', cat: 'inventions',
    title: 'The ballpoint pen was perfected in Buenos Aires',
    hook: 'The pen you probably have in a drawer was patented by a refugee in South America.',
    text: 'Hungarian journalist László Bíró fled to Argentina and in 1943, with his brother György, patented a practical ballpoint pen there. Argentines still call a ballpoint a birome, and the country marks Inventors’ Day on Bíró’s birthday.',
    why: 'Britain’s Royal Air Force bought licences early, because the pens did not leak at altitude.',
    fig: ['1943', 'the Argentine patent'],
    note: 'Earlier ballpoint patents existed (John Loud, 1888); Bíró’s was the first commercially successful design.',
    src: ['Wikipedia: László Bíró', 'https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_B%C3%ADr%C3%B3'],
    links: [['fingerprint', 'Argentina’s first forensic breakthrough'], ['p:semmelweis', 'Another Hungarian ahead of his time'], ['p:kariko', 'A Hungarian scientist behind the mRNA vaccines']]
  },
  {
    id: 'lemaitre', c: '056', place: 'Leuven, Belgium', lat: 50.88, lon: 4.70, t: 1927, year: '1927', cat: 'space',
    title: 'The Big Bang was proposed by a priest',
    hook: 'The scientific theory of how the universe began was first put forward by a Catholic priest.',
    text: 'In 1927 Georges Lemaître, a Belgian Catholic priest and physicist, proposed that the universe is expanding, two years before Edwin Hubble’s famous paper. In 1931 he went further, suggesting it began from a “primeval atom”.',
    why: 'Einstein at first rejected the idea, reportedly telling him: “Your calculations are correct, but your physics is abominable.” In 2018 astronomers renamed Hubble’s law the Hubble–Lemaître law.',
    fig: ['1927', 'two years before Hubble'],
    src: ['Wikipedia: Georges Lemaître', 'https://en.wikipedia.org/wiki/Georges_Lema%C3%AEtre'],
    links: [['p:leavitt', 'The woman whose measurements made it provable'], ['galileo-pardon', 'When the Church and astronomy clashed'], ['tycho-nose', 'An astronomer of a very different era']]
  },
  {
    id: 'leeuwenhoek', c: '528', place: 'Delft, Netherlands', lat: 52.01, lon: 4.36, t: 1676, year: '1676', cat: 'science',
    title: 'A cloth merchant discovered bacteria',
    hook: 'The first person to see bacteria was a fabric seller with no scientific training.',
    text: 'Antonie van Leeuwenhoek sold cloth in Delft and had no university education. Grinding his own tiny lenses, some magnifying more than 250 times, he became the first person to observe bacteria, describing them to London’s Royal Society in 1676.',
    why: 'The Royal Society doubted his reports of “animalcules” until its own members confirmed them.',
    fig: ['~270×', 'magnification of his best surviving lens'],
    src: ['Wikipedia: Antonie van Leeuwenhoek', 'https://en.wikipedia.org/wiki/Antonie_van_Leeuwenhoek'],
    links: [['p:pasteur', 'Two centuries later: proof that microbes cause disease'], ['quarantine-dubrovnik', 'How people fought germs before they knew about them']]
  },
  {
    id: 'antikythera', c: '300', place: 'Antikythera, Greece', lat: 35.87, lon: 23.31, t: -100, year: 'c. 100 BCE', cat: 'science',
    title: 'A 2,000-year-old computer',
    hook: 'Divers found an ancient gadget so complex that nothing like it appears again for more than a thousand years.',
    text: 'In 1901 sponge divers recovered corroded bronze lumps from a Roman-era shipwreck off Antikythera. X-ray and CT scans later revealed at least 30 interlocking gears: a hand-cranked device that predicted eclipses and the positions of the Sun and Moon.',
    why: 'Nothing of similar complexity is known until the astronomical clocks of medieval Europe.',
    fig: ['30+', 'bronze gears'],
    note: 'Its exact date is debated; estimates range from about 200 to 60 BCE.',
    src: ['Wikipedia: Antikythera mechanism', 'https://en.wikipedia.org/wiki/Antikythera_mechanism'],
    links: [["p:alzarqali","The astrolabe makers who came after"], ['p:lovelace', 'The first program for a general-purpose machine'], ['zhang-heng', 'A Chinese instrument of similar ingenuity'], ['cleopatra', 'The same century, in Egypt']]
  },
  {
    id: 'cleopatra', c: '818', place: 'Giza, Egypt', lat: 29.98, lon: 31.13, t: -30, year: '30 BCE', cat: 'civilization',
    title: 'Cleopatra lived closer to the Moon landing than to the pyramids',
    hook: 'A famous ancient ruler lived closer in time to astronauts than to the builders of her country’s most famous monument.',
    text: 'The Great Pyramid of Giza was finished around 2560 BCE. Cleopatra died in 30 BCE, about 2,500 years later. The Apollo 11 Moon landing came just under 2,000 years after her death.',
    why: 'To Cleopatra, the pyramids were already ancient ruins.',
    fig: ['2,530 vs 1,999', 'years to the pyramid vs to Apollo 11'],
    src: ['Wikipedia: Great Pyramid of Giza', 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza'],
    links: [['eratosthenes', 'In Alexandria, someone measured the whole planet'], ['nubian-pyramids', 'The country with even more pyramids'], ['gobekli', 'Monuments older than the pyramids by 7,000 years'], ['guillotine-starwars', 'Another fact that warps your timeline']]
  },
  {
    id: 'nubian-pyramids', c: '729', place: 'Meroë, Sudan', lat: 16.94, lon: 33.75, t: -300, year: 'c. 2500 BCE – 350 CE', cat: 'history',
    title: 'Sudan has more pyramids than Egypt',
    hook: 'The country with the most pyramids in the world is not the one you think.',
    text: 'The kings and queens of Kush, in what is now Sudan, built around 200 to 250 pyramids, more than the roughly 120 to 140 known in Egypt. They are smaller and steeper, and many cluster at Meroë, a UNESCO World Heritage Site.',
    why: 'Kush even conquered Egypt and ruled it as its 25th Dynasty, the “black pharaohs”.',
    fig: ['~200+', 'Nubian pyramids'],
    src: ['Wikipedia: Nubian pyramids', 'https://en.wikipedia.org/wiki/Nubian_pyramids'],
    links: [['cleopatra', 'Egypt’s pyramids, from Cleopatra’s point of view'], ['mansa-musa', 'Another African empire of astonishing wealth']]
  },
  {
    id: 'gobekli', c: '792', place: 'Göbekli Tepe, Türkiye', lat: 37.22, lon: 38.92, t: -9500, year: 'c. 9500 BCE', cat: 'civilization',
    title: 'Monuments older than farming',
    hook: 'Someone built giant carved stone monuments before anyone had learned to farm.',
    text: 'Göbekli Tepe in southeastern Türkiye has massive carved stone pillars set in circles, built around 9500 BCE, roughly 6,000 years before Stonehenge. Its builders appear to have been hunter-gatherers.',
    why: 'It suggests that monumental building may have come before agriculture, not after it.',
    fig: ['~11,500', 'years old'],
    note: 'Whether it was a temple, a gathering place or a settlement is debated.',
    src: ['Wikipedia: Göbekli Tepe', 'https://en.wikipedia.org/wiki/G%C3%B6bekli_Tepe'],
    links: [['blombos', 'The oldest known drawing, far older still'], ['enheduanna', 'The first author we know by name'], ['cleopatra', 'How old ancient really is']]
  },
  {
    id: 'enheduanna', c: '368', place: 'Ur, Iraq', lat: 30.96, lon: 46.10, t: -2300, year: 'c. 2300 BCE', cat: 'art',
    title: 'The first author known by name was a woman',
    hook: 'The first writer in history whose name we know lived 4,300 years ago, and she was a priestess.',
    text: 'Enheduanna, daughter of Sargon of Akkad and high priestess of the moon god at Ur, composed hymns that scribes copied for centuries. She is the earliest author in history known by name.',
    why: 'She wrote about 1,500 years before Homer.',
    fig: ['~4,300', 'years ago'],
    note: 'Scholars debate how many of the works attributed to her she wrote herself.',
    src: ['Wikipedia: Enheduanna', 'https://en.wikipedia.org/wiki/Enheduanna'],
    links: [['p:alkhwarizmi', 'Three thousand years later, Baghdad gave us algebra'], ['gobekli', 'Monuments from before writing existed'], ['sirimavo', 'The first woman to lead a modern government']]
  },
  {
    id: 'yakhchal', c: '364', place: 'Yazd, Iran', lat: 31.90, lon: 54.37, t: -400, year: 'c. 400 BCE', cat: 'inventions',
    title: 'Ice made in the desert, 2,400 years ago',
    hook: 'An ancient civilisation stored ice through desert summers without any electricity.',
    text: 'Persian builders made yakhchāls: domed mud-brick structures up to 18 m tall. Water channelled into shallow pools froze on winter nights, and the ice was kept in deep pits through summer, insulated by thick walls of heat-resistant mortar.',
    why: 'By around 400 BCE, Persian engineers were serving ice in the desert in summer.',
    fig: ['18 m', 'tall domes'],
    src: ['Wikipedia: Yakhchāl', 'https://en.wikipedia.org/wiki/Yakhch%C4%81l'],
    links: [["windmills","Persia\u2019s other machine: the first windmills"], ['p:alkhwarizmi', 'A Persian scholar whose name gave us “algorithm”'], ['enheduanna', 'Mesopotamia, next door and far older']]
  },
  {
    id: 'zero', c: '356', place: 'Bhinmal, India', lat: 25.0, lon: 72.25, t: 628, year: '628', cat: 'ideas',
    title: 'Zero became a number in India',
    hook: 'The most important digit in your computer was turned into a real number by a 7th-century astronomer.',
    text: 'Several cultures used a symbol for “nothing” as a placeholder. But in 628, the Indian mathematician Brahmagupta wrote the first known rules for zero as a number in its own right: how to add, subtract and multiply with it.',
    why: 'He got division by zero wrong. Mathematicians still treat it as undefined.',
    fig: ['628', 'the Brāhmasphuṭasiddhānta'],
    src: ['Wikipedia: 0 (number)', 'https://en.wikipedia.org/wiki/0'],
    links: [["fibonacci-bejaia","How these numbers reached Europe, through Algeria"], ['p:brahmagupta', 'The mathematician'], ['p:alkhwarizmi', 'How Indian numerals reached the rest of the world'], ['khipu', 'An empire that counted in knots']]
  },
  {
    id: 'khejarli', c: '356', place: 'Khejarli, Rajasthan, India', lat: 26.17, lon: 73.13, t: 1730, year: '1730', cat: 'nature',
    title: '363 people died protecting trees',
    hook: 'The original “tree huggers” gave their lives in the 18th century.',
    text: 'In 1730, soldiers sent by the Maharaja of Jodhpur came to cut khejri trees in the Bishnoi village of Khejarli. Amrita Devi hugged a tree to protect it and was killed; according to Bishnoi tradition, 363 villagers followed her. The Maharaja then banned felling in Bishnoi villages.',
    why: 'Their sacrifice inspired the Chipko movement of the 1970s.',
    fig: ['363', 'lives, by Bishnoi tradition'],
    note: 'The number of deaths comes from community tradition.',
    src: ['Wikipedia: Bishnoi (Khejarli massacre)', 'https://en.wikipedia.org/wiki/Bishnoi#Khejarli_massacre'],
    links: [['bhutan-forest', 'A constitution that orders forests to stay'], ['zero', 'India’s gift to mathematics']]
  },
  {
    id: 'zhang-heng', c: '156', place: 'Luoyang, China', lat: 34.62, lon: 112.45, t: 132, year: '132', cat: 'science',
    title: 'An earthquake detector from 132 CE',
    hook: 'Eight bronze dragons once detected an earthquake nobody in the capital could feel.',
    text: 'Zhang Heng built a bronze seismoscope with eight dragons around its rim, each holding a ball above an open-mouthed toad. A tremor would make a dragon drop its ball, indicating the quake’s direction. Records say it once detected a distant quake that no one in the capital felt.',
    why: 'Nothing like it existed in Europe for well over 1,500 years.',
    fig: ['8', 'bronze dragons'],
    note: 'The original is lost; how it worked inside is reconstructed from written descriptions.',
    src: ['Wikipedia: Zhang Heng', 'https://en.wikipedia.org/wiki/Zhang_Heng'],
    links: [['antikythera', 'Greece’s ancient computer'], ['lisbon-quake', 'The earthquake that started modern seismology'], ['p:cailun', 'Paper was made in the same dynasty']]
  },
  {
    id: 'china-timezone', c: '156', place: 'Kashgar, Xinjiang, China', lat: 39.47, lon: 75.99, t: 1949, year: 'Since 1949', cat: 'geography',
    title: 'Five time zones, one clock',
    hook: 'In one region of a very large country, the sun can rise at around 10 a.m. in winter.',
    text: 'China spans about 5,000 km from east to west, but since 1949 the whole country officially runs on Beijing time. In far-western Xinjiang, many people unofficially use a local time two hours behind.',
    why: 'Crossing the border into Afghanistan means turning your watch back three and a half hours.',
    fig: ['1', 'official time zone'],
    src: ['Wikipedia: Time in China', 'https://en.wikipedia.org/wiki/Time_in_China'],
    links: [['diomede', 'Two islands 4 km and 21 hours apart'], ['samoa-skip', 'The country that deleted a day'], ['mongol-y', 'Next door, a genetic surprise']]
  },
  {
    id: 'mongol-y', c: '496', place: 'Mongolia', lat: 47.9, lon: 106.9, t: 2003, year: '2003', cat: 'science',
    title: 'One in 200 men may share one ancestor',
    hook: 'A single family line shows up in the DNA of about 16 million men alive today.',
    text: 'A 2003 genetic study found a Y-chromosome lineage carried by about 8% of men across a large region of Asia, roughly 0.5% of all men alive. It traces back about 1,000 years to Mongolia.',
    why: 'The researchers proposed it came from Genghis Khan and his close male relatives.',
    fig: ['~16 m', 'men in the 2003 estimate'],
    note: 'The Genghis Khan link is a hypothesis: his remains have never been found or tested.',
    src: ['Zerjal et al., American Journal of Human Genetics (2003)', 'https://doi.org/10.1086/367774'],
    links: [['iceland-app', 'A country so related it needs an app'], ['p:mendel', 'The monk who discovered heredity'], ['china-timezone', 'Next door, one clock for a continent']]
  },
  {
    id: 'tunguska', c: '643', place: 'Tunguska, Siberia, Russia', lat: 60.9, lon: 101.9, t: 1908, year: '1908', cat: 'space',
    title: 'The explosion that flattened 80 million trees',
    hook: 'Something exploded over a forest and flattened an area larger than a major city, then left no crater.',
    text: 'On 30 June 1908, something exploded several kilometres above the Siberian forest near the Tunguska River, flattening an estimated 80 million trees over 2,150 km². No crater was found: the object, probably a small asteroid or comet fragment, burst in the air.',
    why: 'It is the largest impact event in recorded history, and because the area was so remote, few if any people died.',
    fig: ['2,150 km²', 'of forest flattened'],
    src: ['Wikipedia: Tunguska event', 'https://en.wikipedia.org/wiki/Tunguska_event'],
    links: [['hoba', 'The biggest meteorite ever found'], ['nuke-moon', 'Explosions by design: the plan to bomb the Moon'], ['diomede', 'Russia’s other edge: tomorrow island']]
  },
  {
    id: 'diomede', c: '643', place: 'Bering Strait', lat: 65.78, lon: -169.05, t: 1867, year: 'Since 1867', cat: 'geography',
    title: 'Two islands 4 km and 21 hours apart',
    hook: 'You can see tomorrow from yesterday across a few kilometres of sea.',
    text: 'In the Bering Strait, Russia’s Big Diomede and America’s Little Diomede are under 4 km apart. The International Date Line runs between them, so Big Diomede is 21 hours ahead in winter. They are nicknamed Tomorrow Island and Yesterday Island.',
    why: 'In winter the sea between them can freeze, but crossing the border is prohibited.',
    fig: ['21 h', 'time difference'],
    src: ['Wikipedia: Diomede Islands', 'https://en.wikipedia.org/wiki/Diomede_Islands'],
    links: [['kiribati-dateline', 'The country that moved the date line'], ['samoa-skip', 'The country that deleted a day'], ['china-timezone', 'One clock for five time zones']]
  },
  {
    id: 'baikonur', c: '398', place: 'Baikonur, Kazakhstan', lat: 45.96, lon: 63.31, t: 1961, year: '1961', cat: 'space',
    title: 'The first human in space launched from Kazakhstan',
    hook: 'Humanity’s first trip to space started from a country that is now independent but still leases out its launch pad.',
    text: 'Yuri Gagarin’s 1961 flight, the first human spaceflight, lifted off from Baikonur in the Kazakh steppe. Kazakhstan is now independent, but Russia leases the cosmodrome, and between 2011 and 2020 it was the only place astronauts of any nation could launch to the International Space Station.',
    why: 'The town of Baikonur is administered by Russia under a lease running to 2050.',
    fig: ['108', 'minutes: Gagarin’s whole flight'],
    src: ['Wikipedia: Baikonur Cosmodrome', 'https://en.wikipedia.org/wiki/Baikonur_Cosmodrome'],
    links: [['nuke-moon', 'The US side of the Space Race'], ['uyuni', 'A salt flat that helps satellites see'], ['atacama-mars', 'Where Mars rovers practise']]
  },
  {
    id: 'korean-age', c: '410', place: 'Seoul, South Korea', lat: 37.57, lon: 126.98, t: 2023, year: '2023', cat: 'civilization',
    title: 'A whole country got younger overnight',
    hook: 'On one day in 2023, millions of people became one or two years younger by law.',
    text: 'Under South Korea’s traditional system, babies were one year old at birth and everyone aged a year every 1 January. On 28 June 2023, a law made international age the standard for official use, so most people became one or two years younger on paper.',
    why: 'Under the old system, a baby born on 31 December turned two the next day.',
    fig: ['−1 or −2', 'years for most people'],
    src: ['Wikipedia: East Asian age reckoning', 'https://en.wikipedia.org/wiki/East_Asian_age_reckoning'],
    links: [['ethiopia-calendar', 'A country living seven years behind'], ['samoa-skip', 'A country that deleted a day']]
  },
  {
    id: 'nepal-flag', c: '524', place: 'Nepal', lat: 27.70, lon: 85.32, t: 1962, year: '1962', cat: 'civilization',
    title: 'The only national flag that is not a rectangle',
    hook: 'One country’s flag is so unusual that its constitution explains, step by step, how to draw it.',
    text: 'Nepal’s flag is two stacked pennants, a shape inherited from triangular banners. Its constitution includes detailed geometric instructions for constructing it.',
    why: 'Every other national flag on Earth is a rectangle or a square.',
    fig: ['1', 'of about 195 nations'],
    src: ['Wikipedia: Flag of Nepal', 'https://en.wikipedia.org/wiki/Flag_of_Nepal'],
    links: [['paraguay-flag', 'A flag with two different sides'], ['bhutan-forest', 'Next door, a constitution that protects forests'], ['spain-anthem', 'An anthem without words']]
  },
  {
    id: 'bhutan-forest', c: '064', place: 'Bhutan', lat: 27.47, lon: 89.64, t: 2008, year: '2008', cat: 'nature',
    title: 'A constitution that requires forests',
    hook: 'One country’s highest law says most of its land must stay forest forever.',
    text: 'Bhutan’s 2008 constitution requires that at least 60% of the country stay under forest cover for all time. The country measures progress by Gross National Happiness and reports absorbing more CO₂ than it emits.',
    why: 'Few nations write ecology into their constitution, and fewer still are carbon-negative.',
    fig: ['60%', 'minimum forest cover, by law'],
    src: ['Constitution of Bhutan, Article 5', 'https://en.wikipedia.org/wiki/Constitution_of_Bhutan'],
    links: [['khejarli', 'The villagers who died for trees'], ['nepal-flag', 'Next door, the flag that is not a rectangle']]
  },
  {
    id: 'famadihana', c: '450', place: 'Central highlands, Madagascar', lat: -18.90, lon: 47.52, t: 1800, year: 'Living tradition', cat: 'civilization',
    title: 'Dancing with the ancestors',
    hook: 'Every few years, some families open their ancestors’ tombs and dance with them.',
    text: 'In parts of Madagascar’s highlands, families hold famadihana, the “turning of the bones”: they open the family tomb, rewrap their ancestors’ remains in fresh silk shrouds, and dance with them to music before returning them, typically every five to seven years.',
    why: 'It is a joyful family reunion, with the dead invited.',
    fig: ['5–7', 'years between ceremonies'],
    src: ['Wikipedia: Famadihana', 'https://en.wikipedia.org/wiki/Famadihana'],
    links: [['ethiopia-calendar', 'Another way of keeping time with the past'], ['dancing-plague', 'Dancing of a very different kind']]
  },
  {
    id: 'ethiopia-calendar', c: '231', place: 'Ethiopia', lat: 9.03, lon: 38.74, t: 2007, year: 'Today', cat: 'civilization',
    title: 'A country living seven years in the past',
    hook: 'In one country, the year 2019 begins in September 2026.',
    text: 'Ethiopia uses its own calendar: 12 months of 30 days, plus a 13th month of five or six days. Because it dates the birth of Jesus differently, it runs about seven to eight years behind the Gregorian calendar.',
    why: 'Ethiopia celebrated the new millennium in September 2007.',
    fig: ['13', 'months in a year'],
    src: ['Wikipedia: Ethiopian calendar', 'https://en.wikipedia.org/wiki/Ethiopian_calendar'],
    links: [['korean-age', 'A country that got younger overnight'], ['samoa-skip', 'A country that deleted a day'], ['famadihana', 'A ceremony for the ancestors']]
  },
  {
    id: 'heart-transplant', c: '710', place: 'Cape Town, South Africa', lat: -33.94, lon: 18.46, t: 1967, year: '1967', cat: 'medicine',
    title: 'The first heart transplant was in Cape Town',
    hook: 'One of the biggest firsts in medical history happened far from where most people would guess.',
    text: 'On 3 December 1967, surgeon Christiaan Barnard and his team at Groote Schuur Hospital transplanted the heart of a 25-year-old accident victim, Denise Darvall, into 53-year-old Louis Washkansky. He lived 18 days.',
    why: 'The first human-to-human heart transplant happened in South Africa, not in the US or Europe.',
    fig: ['18', 'days he lived with the new heart'],
    src: ['Wikipedia: Christiaan Barnard', 'https://en.wikipedia.org/wiki/Christiaan_Barnard'],
    links: [['insulin', 'A cure given away for $1'], ['blombos', 'South Africa’s 73,000-year-old drawing'], ['p:fleming', 'The accident that made modern surgery survivable']]
  },
  {
    id: 'blombos', c: '710', place: 'Blombos Cave, South Africa', lat: -34.41, lon: 21.22, t: -71000, year: '~73,000 years ago', cat: 'art',
    title: 'The oldest known drawing looks like a hashtag',
    hook: 'The oldest drawing ever found is a little grid of crossed lines.',
    text: 'On a flake of stone from Blombos Cave, archaeologists found a cross-hatched pattern drawn with a red ochre crayon about 73,000 years ago. Published in 2018, it is the oldest known drawing made by humans.',
    why: 'It is about 30,000 years older than the oldest known cave paintings in Europe.',
    fig: ['73,000', 'years old'],
    src: ['Henshilwood et al., Nature (2018)', 'https://www.nature.com/articles/s41586-018-0514-3'],
    links: [['gobekli', 'The first monuments'], ['enheduanna', 'The first named author'], ['heart-transplant', 'The same coast, 73,000 years later']]
  },
  {
    id: 'lesotho', c: '426', place: 'Lesotho', lat: -29.6, lon: 28.2, t: 1966, year: 'Today', cat: 'geography',
    title: 'A country that never dips below 1,400 m',
    hook: 'There is a country whose lowest point is higher than most countries’ mountains.',
    text: 'Lesotho is completely surrounded by South Africa. Its lowest point, about 1,400 m above sea level, is the highest lowest point of any country on Earth.',
    why: 'More than 80% of the country lies above 1,800 m.',
    fig: ['1,400 m', 'its lowest point'],
    src: ['Wikipedia: Lesotho', 'https://en.wikipedia.org/wiki/Lesotho'],
    links: [['bolivia-navy', 'Another country shaped by what surrounds it'], ['chimborazo', 'Where Earth comes closest to space']]
  },
  {
    id: 'lake-nyos', c: '120', place: 'Lake Nyos, Cameroon', lat: 6.44, lon: 10.30, t: 1986, year: '1986', cat: 'nature',
    title: 'The lake that suffocated a valley',
    hook: 'One night a lake released an invisible cloud that killed nearly 1,750 people in their sleep.',
    text: 'On the night of 21 August 1986, Lake Nyos released a huge cloud of carbon dioxide that had built up in its depths. Heavier than air, the gas rolled down the valleys and killed about 1,746 people and 3,500 livestock.',
    why: 'This kind of “limnic eruption” has only ever been recorded at two lakes. Pipes now vent the gas safely.',
    fig: ['1,746', 'people killed'],
    src: ['Wikipedia: Lake Nyos disaster', 'https://en.wikipedia.org/wiki/Lake_Nyos_disaster'],
    links: [['tambora', 'Volcanic gas on a global scale'], ['paricutin', 'A volcano born in a cornfield'], ['tunguska', 'Another disaster without a crater']]
  },
  {
    id: 'mansa-musa', c: '466', place: 'Mali Empire (Timbuktu, Mali)', lat: 16.77, lon: -3.0, t: 1324, year: '1324', cat: 'history',
    title: 'A pilgrim who lowered the price of gold',
    hook: 'One traveller handed out so much gold that its price fell in a major city for years.',
    text: 'When Mansa Musa, ruler of the Mali Empire, passed through Cairo on pilgrimage to Mecca in 1324, he and his entourage spent and gave away so much gold that, according to the chronicler al-Umari, its value in Cairo stayed depressed for years.',
    why: 'Fifty years later, a European map, the Catalan Atlas, showed him on a throne holding a gold nugget.',
    fig: ['1324', 'the pilgrimage'],
    note: 'Figures for his wealth and entourage come from accounts written years later.',
    src: ['Wikipedia: Musa I of Mali', 'https://en.wikipedia.org/wiki/Musa_I_of_Mali'],
    links: [['qarawiyyin', 'Across the Sahara, the world’s oldest university'], ['nubian-pyramids', 'Another great African kingdom'], ['haiti', 'A very different story of wealth and power']]
  },
  {
    id: 'qarawiyyin', c: '504', place: 'Fez, Morocco', lat: 34.06, lon: -4.97, t: 859, year: '859', cat: 'civilization',
    title: 'The oldest university was founded by a woman',
    hook: 'The oldest educational institution still running was founded by a merchant’s daughter.',
    text: 'Al-Qarawiyyin in Fez was founded in 859 as a mosque and centre of learning by Fatima al-Fihri, the daughter of a wealthy merchant. UNESCO and Guinness list it as the oldest existing, continually operating educational institution in the world.',
    why: 'It was teaching centuries before Oxford or Bologna existed.',
    fig: ['859', 'founded'],
    note: 'Whether it counts as a “university” before it joined Morocco’s state system in 1963 depends on the definition.',
    src: ['Wikipedia: University of al-Qarawiyyin', 'https://en.wikipedia.org/wiki/University_of_al-Qarawiyyin'],
    links: [["cordoba-library","Across the strait: C\u00f3rdoba\u2019s great library"], ['kongo-gumi', 'A company that lasted 1,428 years'], ['mansa-musa', 'The richest pilgrim in history'], ['p:alkhwarizmi', 'The scholar of the same century who gave us algebra']]
  },
  {
    id: 'libya-heat', c: '434', place: 'El Azizia, Libya', lat: 32.53, lon: 13.02, t: 2012, year: '1922 / 2012', cat: 'geography',
    title: 'The heat record that was cancelled after 90 years',
    hook: 'The world’s hottest temperature on record was struck off after 90 years.',
    text: 'For 90 years, El Azizia in Libya held the record for the hottest air temperature ever measured: 58 °C in 1922. In 2012 a World Meteorological Organization investigation rejected it, citing an inexperienced observer and unsuitable equipment.',
    why: 'The record returned to Death Valley, California, where 56.7 °C was recorded in 1913.',
    fig: ['58 °C', 'the record that never was'],
    src: ['World Meteorological Organization (2012)', 'https://en.wikipedia.org/wiki/Aziziya,_Libya'],
    links: [['atacama-mars', 'The driest place instead of the hottest'], ['lesotho', 'A country without lowlands']]
  },
  {
    id: 'taumata', c: '554', place: 'Hawke’s Bay, New Zealand', lat: -40.35, lon: 176.54, t: 1900, year: 'Today', cat: 'geography',
    title: 'A hill with an 85-letter name',
    hook: 'A modest hill has a name so long that its road sign is a tourist attraction.',
    text: 'A hill in New Zealand’s Hawke’s Bay is called Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu. In Māori it roughly means “the summit where Tamatea, the man with the big knees, … played his flute to his loved one”.',
    why: 'It is often listed as the longest place name in the world.',
    fig: ['85', 'letters'],
    src: ['Wikipedia: Taumata hill', 'https://en.wikipedia.org/wiki/Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu'],
    links: [['bangkok-name', 'A capital with a 168-letter name'], ['p:rutherford', 'The New Zealander who found the atomic nucleus'], ['papua-languages', 'A country of 840 languages']]
  },
  {
    id: 'papua-languages', c: '598', place: 'Papua New Guinea', lat: -6.3, lon: 145.0, t: 2020, year: 'Today', cat: 'civilization',
    title: '840 languages in one country',
    hook: 'One country of about 10 million people speaks more than a tenth of all the world’s languages.',
    text: 'Papua New Guinea has around 840 living languages, more than any other country and over a tenth of the world’s total. Steep mountains and isolated valleys kept communities apart for thousands of years.',
    why: 'Some valleys a day’s walk apart speak languages as different as English and Japanese.',
    fig: ['~840', 'living languages'],
    src: ['Wikipedia: Languages of Papua New Guinea', 'https://en.wikipedia.org/wiki/Languages_of_Papua_New_Guinea'],
    links: [['khipu', 'An empire with no writing at all'], ['taumata', 'The longest place name'], ['tuvalu-tv', 'A Pacific nation funded by two letters']]
  },
  {
    id: 'kiribati-dateline', c: '296', place: 'Kiritimati, Kiribati', lat: 1.87, lon: -157.40, t: 1995, year: '1995', cat: 'geography',
    title: 'The country that moved the date line',
    hook: 'A nation redrew the International Date Line to stop being in two days at once.',
    text: 'Kiribati’s islands are spread across about 3.5 million km² of ocean. Until 1995 the date line ran through the country, so its eastern and western islands were a day apart. Kiribati moved the line east, and Kiritimati became one of the first places on Earth to start each new day.',
    why: 'Kiribati is the only country in all four hemispheres.',
    fig: ['UTC+14', 'the earliest time zone on Earth'],
    src: ['Wikipedia: International Date Line', 'https://en.wikipedia.org/wiki/International_Date_Line'],
    links: [['samoa-skip', 'A neighbour that deleted a day'], ['diomede', 'Tomorrow Island and Yesterday Island'], ['tuvalu-tv', 'Another Pacific nation, another strange revenue source']]
  },
  {
    id: 'samoa-skip', c: '882', place: 'Samoa', lat: -13.8, lon: -172.0, t: 2011, year: '2011', cat: 'geography',
    title: 'Samoa deleted a day',
    hook: 'One country simply skipped a date on the calendar.',
    text: 'At midnight on 29 December 2011, Samoa jumped straight to 31 December, skipping 30 December entirely. Moving to the other side of the International Date Line put it on the same day as its trading partners Australia and New Zealand.',
    why: 'In 1892 Samoa had done the opposite, living 4 July twice to line up with American traders.',
    fig: ['0', 'hours of 30 December 2011'],
    src: ['Wikipedia: Time in Samoa', 'https://en.wikipedia.org/wiki/Time_in_Samoa'],
    links: [['kiribati-dateline', 'The country that moved the date line'], ['korean-age', 'Everyone got younger overnight'], ['ethiopia-calendar', 'Thirteen months in a year']]
  },
  {
    id: 'tuvalu-tv', c: '798', place: 'Funafuti, Tuvalu', lat: -8.52, lon: 179.20, t: 2000, year: 'Since 2000', cat: 'inventions',
    title: 'A nation funded by two letters',
    hook: 'A tiny Pacific nation earns millions from two letters that television networks wanted.',
    text: 'Tuvalu, an island nation of about 11,000 people, was assigned the internet domain .tv. Leasing it to streaming and broadcasting companies has earned the country tens of millions of dollars, helping to pay for its UN membership.',
    why: 'Its highest point is about 4.6 m above sea level, and it has begun building a digital copy of itself in case rising seas take the islands.',
    fig: ['.tv', 'one of its biggest earners'],
    src: ['Wikipedia: .tv', 'https://en.wikipedia.org/wiki/.tv'],
    links: [['www-cern', 'Where the web began'], ['kiribati-dateline', 'A Pacific neighbour that moved the date line']]
  },
  {
    id: 'haiti', c: '332', place: 'Port-au-Prince, Haiti', lat: 18.54, lon: -72.34, t: 1825, year: '1804–1947', cat: 'history',
    title: 'The nation that paid for its own freedom',
    hook: 'A country was forced to compensate its former enslavers for its freedom, and kept paying for 122 years.',
    text: 'Haiti became independent in 1804 after the only slave revolt in history to found a state. In 1825, France demanded 150 million francs, later reduced to 90 million, to compensate former slaveholders, backed by warships. Haiti finished paying off the related loans in 1947.',
    why: 'A 2022 New York Times analysis estimated the payments cost Haiti between $21 billion and $115 billion in lost economic growth.',
    fig: ['122', 'years of payments'],
    src: ['Wikipedia: Haiti indemnity controversy', 'https://en.wikipedia.org/wiki/Haiti_indemnity_controversy'],
    links: [['tordesillas', 'The treaty that carved up the Americas'], ['choctaw-ireland', 'An act of solidarity that crossed an ocean'], ['mansa-musa', 'A very different story of gold and power']]
  },
  {
    id: 'dagen-h', c: '752', place: 'Stockholm, Sweden', lat: 59.33, lon: 18.07, t: 1967, year: '1967', cat: 'civilization',
    title: 'The morning Sweden switched sides of the road',
    hook: 'At 4:50 one morning, every vehicle in a country stopped, crossed to the other side of the road and waited.',
    text: 'At 4:50 a.m. on 3 September 1967, all traffic in Sweden stopped, moved carefully from the left side of the road to the right, and waited. At 5:00 it set off again. The day was called Dagen H, H for högertrafik, right-hand traffic.',
    why: 'In a 1955 referendum, 83% of Swedes had voted against the change.',
    fig: ['83%', 'had voted no'],
    src: ['Wikipedia: Dagen H', 'https://en.wikipedia.org/wiki/Dagen_H'],
    links: [['draisine', 'The first two-wheeler, with no pedals'], ['nobel-obit', 'Sweden’s most famous inheritance']]
  },
  {
    id: 'nobel-obit', c: '752', place: 'Sweden', lat: 59.40, lon: 17.95, t: 1888, year: '1888 / 1895', cat: 'ideas',
    title: 'The Nobel Prize may have begun with a wrong obituary',
    hook: 'A newspaper’s mistake may have pushed a weapons maker to fund the world’s most famous prize.',
    text: 'When Ludvig Nobel died in 1888, a French newspaper reportedly mistook him for his brother Alfred, the inventor of dynamite, and called him “the merchant of death”. In 1895 Alfred left most of his fortune to fund prizes for those who most benefit humankind.',
    why: 'The prizes were funded by explosives money.',
    fig: ['~94%', 'of his fortune went to the prizes'],
    note: 'The obituary story is widely told, but the original article has never been conclusively found.',
    src: ['Wikipedia: Alfred Nobel', 'https://en.wikipedia.org/wiki/Alfred_Nobel'],
    links: [['p:curie', 'The only person with Nobel Prizes in two sciences'], ['p:haber', 'A Nobel laureate who fed the world and gassed soldiers'], ['dagen-h', 'Sweden’s overnight switch']]
  },
  {
    id: 'penguin-knight', c: '578', place: 'Norway (and Edinburgh Zoo)', lat: 59.91, lon: 10.75, t: 2008, year: '2008', cat: 'people',
    title: 'Norway’s army has a penguin general',
    hook: 'A royal guard of one European country has knighted and promoted a penguin.',
    text: 'Sir Nils Olav, a king penguin at Edinburgh Zoo, is the mascot of the Norwegian King’s Guard. He was knighted in 2008 in a ceremony with the troops on parade, and in 2023 his successor, Sir Nils Olav III, was promoted to major general.',
    why: 'The tradition began in 1972, when a Norwegian officer adopted a penguin during a visit to Edinburgh.',
    fig: ['Maj. Gen.', 'rank since 2023'],
    src: ['Wikipedia: Nils Olav', 'https://en.wikipedia.org/wiki/Nils_Olav'],
    links: [['scotland-unicorn', 'Scotland’s national animal does not exist'], ['emu-war', 'An army that lost to birds']]
  },
  {
    id: 'linux', c: '246', place: 'Helsinki, Finland', lat: 60.17, lon: 24.94, t: 1991, year: '1991', cat: 'inventions',
    title: 'A student’s hobby runs most of the internet',
    hook: 'A student wrote that his project was “just a hobby, won’t be big”. It now runs most of the world’s servers.',
    text: 'In August 1991, 21-year-old Helsinki student Linus Torvalds announced he was writing a free operating system: “just a hobby, won’t be big and professional”. Linux now runs most of the world’s servers, every one of the 500 fastest supercomputers and, through Android, billions of phones.',
    why: 'Your phone, your bank and most websites probably depend on that “hobby”.',
    fig: ['500 / 500', 'top supercomputers run Linux'],
    src: ['Wikipedia: History of Linux', 'https://en.wikipedia.org/wiki/History_of_Linux'],
    links: [['estonia-evote', 'Across the Gulf of Finland, the most digital country'], ['www-cern', 'The other free gift that built the internet'], ['p:hopper', 'The woman who made code readable']]
  },
  {
    id: 'iceland-app', c: '352', place: 'Reykjavík, Iceland', lat: 64.13, lon: -21.90, t: 2013, year: '2013', cat: 'civilization',
    title: 'An app to check you are not dating a relative',
    hook: 'One country’s population is so interrelated that students built an app to check before a date.',
    text: 'In 2013, engineering students in Iceland launched an app built on Íslendingabók, a genealogy database covering most Icelanders. One feature let two users bump phones to see how closely they were related.',
    why: 'Íslendingabók traces family lines back more than 1,000 years, to the island’s first settlers.',
    fig: ['1,000+', 'years of family records'],
    src: ['Wikipedia: Íslendingabók', 'https://en.wikipedia.org/wiki/%C3%8Dslendingab%C3%B3k'],
    links: [['mongol-y', 'A family line found in 16 million men'], ['p:mendel', 'The monk who discovered heredity']]
  },
  {
    id: 'estonia-evote', c: '233', place: 'Tallinn, Estonia', lat: 59.44, lon: 24.75, t: 2005, year: '2005', cat: 'civilization',
    title: 'The first country to vote online nationwide',
    hook: 'In one country, more than half of voters now cast their ballot from home on a computer.',
    text: 'In 2005 Estonia became the first country to allow internet voting in a nationwide election. In the 2023 parliamentary election, more than half of all votes were cast online.',
    why: 'Estonian engineers also wrote the core software behind Skype.',
    fig: ['51%', 'of votes cast online in 2023'],
    src: ['Wikipedia: Electronic voting in Estonia', 'https://en.wikipedia.org/wiki/Electronic_voting_in_Estonia'],
    links: [['linux', 'Across the water, a hobby that runs the internet'], ['cybersyn', 'An earlier dream of a networked nation']]
  },
  {
    id: 'enigma-poland', c: '616', place: 'Warsaw, Poland', lat: 52.23, lon: 21.01, t: 1932, year: '1932', cat: 'science',
    title: 'Poland broke Enigma first',
    hook: 'The famous wartime codebreakers built on work done years earlier by three mathematicians in another country.',
    text: 'In December 1932, Polish mathematician Marian Rejewski worked out the internal wiring of the German Enigma machine using pure mathematics. Poland’s Cipher Bureau read German messages for years and, in July 1939, handed its methods and replica machines to Britain and France.',
    why: 'Bletchley Park’s later breakthroughs, including Alan Turing’s, built on the Polish work.',
    fig: ['1932', 'seven years before the war'],
    src: ['Wikipedia: Marian Rejewski', 'https://en.wikipedia.org/wiki/Marian_Rejewski'],
    links: [['p:turing', 'The mathematician who carried the work forward'], ['czech-robot', 'Next door, the origin of the word “robot”'], ['p:curie', 'Warsaw’s most famous scientist']]
  },
  {
    id: 'czech-robot', c: '203', place: 'Prague, Czechia', lat: 50.08, lon: 14.43, t: 1920, year: '1920', cat: 'ideas',
    title: 'The word “robot” comes from a Czech play',
    hook: 'The word for every machine from factory arms to AI came from a 1920 play.',
    text: 'In his 1920 play R.U.R. (Rossum’s Universal Robots), Karel Čapek imagined artificial workers who rise up against humanity. His brother Josef suggested the name, from the Czech robota, meaning forced labour.',
    why: 'Before this play, the word did not exist in any language.',
    fig: ['1920', 'the word is born'],
    src: ['Wikipedia: R.U.R.', 'https://en.wikipedia.org/wiki/R.U.R.'],
    links: [['p:turing', 'The man who asked whether machines can think'], ['p:mendel', 'Czechia’s other quiet revolutionary'], ['enigma-poland', 'Next door: the machine that was cracked']]
  },
  {
    id: 'galileo-pardon', c: '380', place: 'Rome, Italy', lat: 41.90, lon: 12.45, t: 1992, year: '1633 / 1992', cat: 'science',
    title: 'An apology 359 years late',
    hook: 'An institution admitted it was wrong about a scientist more than three centuries after convicting him.',
    text: 'In 1633 the Roman Inquisition found Galileo “vehemently suspect of heresy” for supporting the idea that the Earth moves around the Sun, and he spent his last years under house arrest. In 1992 Pope John Paul II formally acknowledged that the Church had erred.',
    why: 'By 1992, people had already walked on the Moon.',
    fig: ['359', 'years later'],
    src: ['Wikipedia: Galileo affair', 'https://en.wikipedia.org/wiki/Galileo_affair'],
    links: [["tusi-couple","The Persian geometry inside Copernicus"], ['lemaitre', 'A priest who started modern cosmology'], ['tycho-nose', 'Galileo’s contemporary with a metal nose']]
  },
  {
    id: 'son-doong', c: '704', place: 'Phong Nha-Kẻ Bàng, Vietnam', lat: 17.46, lon: 106.29, t: 2009, year: '2009', cat: 'nature',
    title: 'A cave with its own jungle and clouds',
    hook: 'The largest cave passage on Earth was found by a man who then could not find the entrance again for almost 20 years.',
    text: 'Local man Hồ Khanh found the entrance to Hang Sơn Đoòng around 1990, then lost it. He found it again in 2008, and British explorers surveyed it in 2009. It is the largest known cave passage on Earth, with chambers up to 200 m tall, a jungle where the roof has collapsed, and its own clouds.',
    why: 'A 40-storey building could fit inside parts of it.',
    fig: ['200 m', 'ceiling height in places'],
    src: ['Wikipedia: Hàng Sơn Đoòng', 'https://en.wikipedia.org/wiki/H%C3%A0ng_S%C6%A1n_%C4%90o%C3%B2ng'],
    links: [['socotra', 'An island that looks like another planet'], ['snake-island', 'An island no one may visit']]
  },
  {
    id: 'socotra', c: '887', place: 'Socotra, Yemen', lat: 12.46, lon: 53.82, t: 2008, year: 'Today', cat: 'nature',
    title: 'The island of dragon’s blood trees',
    hook: 'There is an island where a third of the plants exist nowhere else on Earth.',
    text: 'About a third of the plant species on Yemen’s Socotra archipelago are found nowhere else. The most famous, the dragon’s blood tree, grows like an upturned umbrella and bleeds a deep red resin that has been used as dye and medicine since antiquity.',
    why: 'The archipelago has been isolated for millions of years, letting evolution run its own experiment.',
    fig: ['~1/3', 'of its plants are endemic'],
    src: ['Wikipedia: Socotra', 'https://en.wikipedia.org/wiki/Socotra'],
    links: [['snake-island', 'Another island, another lone species'], ['son-doong', 'A cave with its own jungle']]
  },
  {
    id: 'sirimavo', c: '144', place: 'Colombo, Sri Lanka', lat: 6.93, lon: 79.85, t: 1960, year: '1960', cat: 'people',
    title: 'The world’s first woman prime minister',
    hook: 'The first woman to lead a modern government did not come from Europe or America.',
    text: 'In July 1960, Sirimavo Bandaranaike became prime minister of Ceylon, now Sri Lanka, the first woman in the modern world to head a government. She served three terms, the last ending in 2000.',
    why: 'It happened 19 years before Margaret Thatcher became British prime minister.',
    fig: ['1960', 'the first'],
    src: ['Wikipedia: Sirimavo Bandaranaike', 'https://en.wikipedia.org/wiki/Sirimavo_Bandaranaike'],
    links: [['enheduanna', 'The first named author, also a woman'], ['qarawiyyin', 'The oldest university, founded by a woman']]
  },
  {
    id: 'bangkok-name', c: '764', place: 'Bangkok, Thailand', lat: 13.75, lon: 100.50, t: 1782, year: '1782', cat: 'civilization',
    title: 'Bangkok’s real name has 168 letters',
    hook: 'A capital city’s full name is so long that locals sing it to remember it.',
    text: 'The Thai capital’s ceremonial name begins Krung Thep Maha Nakhon and continues for some 168 letters in its romanised form, describing a city of angels and the jewel of the god Indra. Thais simply say Krung Thep. “Bangkok” is mostly used by foreigners.',
    why: 'Guinness lists it as the longest place name in the world.',
    fig: ['168', 'letters'],
    src: ['Wikipedia: Name of Bangkok', 'https://en.wikipedia.org/wiki/Name_of_Bangkok'],
    links: [['taumata', 'A hill that competes for the title'], ['papua-languages', 'A country of 840 languages']]
  },
  {
    id: 'singapore', c: '702', place: 'Singapore', lat: 1.35, lon: 103.82, t: 1965, year: '1965', cat: 'history',
    title: 'The country that did not want independence',
    hook: 'One country’s founding leader cried on television when independence came.',
    text: 'Singapore joined Malaysia in 1963 and was expelled two years later. On 9 August 1965, Prime Minister Lee Kuan Yew announced the separation on television and broke down in tears. Independence was something he had not wanted.',
    why: 'Most nations fight for independence. Singapore had it forced on it.',
    fig: ['2', 'years inside Malaysia'],
    src: ['Wikipedia: Singapore in Malaysia', 'https://en.wikipedia.org/wiki/Singapore_in_Malaysia'],
    links: [['haiti', 'A country that paid for its freedom'], ['samoa-skip', 'A country that rewrote its calendar']]
  },
  {
    id: 'cano-cristales', c: '170', place: 'Serranía de la Macarena, Colombia', lat: 2.26, lon: -73.79, t: 2000, year: 'Every year', cat: 'nature',
    title: 'The river of five colours',
    hook: 'For a few months a year, a river turns bright red.',
    text: 'For a few months each year, Colombia’s Caño Cristales turns vivid red, pink, yellow and green. The colour comes from a riverweed, Macarenia clavigera, that turns red when sunlight and water levels are just right.',
    why: 'It is sometimes called the most beautiful river in the world, and it is just a plant.',
    fig: ['5', 'colours'],
    src: ['Wikipedia: Caño Cristales', 'https://en.wikipedia.org/wiki/Ca%C3%B1o_Cristales'],
    links: [['catatumbo', 'Next door, a storm that almost never stops'], ['snake-island', 'Another natural wonder of South America']]
  },
  {
    id: 'catatumbo', c: '862', place: 'Lake Maracaibo, Venezuela', lat: 9.30, lon: -71.60, t: 2016, year: 'Every night', cat: 'nature',
    title: 'The lightning that almost never stops',
    hook: 'In one place on Earth, a silent lightning storm happens on about half the nights of the year.',
    text: 'Where the Catatumbo River meets Lake Maracaibo, storms happen on 140 to 160 nights a year, often for hours, with up to around 280 flashes an hour. NASA satellite data ranks Lake Maracaibo as the most lightning-struck place on Earth.',
    why: 'Sailors once used the constant glow as a lighthouse.',
    fig: ['~280', 'flashes an hour at peak'],
    src: ['Wikipedia: Catatumbo lightning', 'https://en.wikipedia.org/wiki/Catatumbo_lightning'],
    links: [['cano-cristales', 'A river that turns red'], ['tunguska', 'A sky that exploded']]
  },
  {
    id: 'chimborazo', c: '218', place: 'Chimborazo, Ecuador', lat: -1.47, lon: -78.82, t: 1802, year: 'Today', cat: 'geography',
    title: 'Everest is not the closest point to space',
    hook: 'The point on Earth farthest from its centre is not on Mount Everest.',
    text: 'Because Earth bulges at the equator, the summit of Ecuador’s Chimborazo, about 1° south of the equator, is roughly 6,384 km from Earth’s centre, over 2 km farther than Everest’s peak. Everest is the highest above sea level; Chimborazo reaches farthest from the core.',
    why: 'Standing on its summit, you are the closest you can get to the stars on solid ground.',
    fig: ['+2.1 km', 'farther from the centre than Everest'],
    src: ['Wikipedia: Chimborazo', 'https://en.wikipedia.org/wiki/Chimborazo'],
    links: [['uyuni', 'The flattest place, for contrast'], ['lesotho', 'The highest lowest point']]
  },
  {
    id: 'paraguay-flag', c: '600', place: 'Paraguay', lat: -25.30, lon: -57.60, t: 1842, year: '1842', cat: 'civilization',
    title: 'A flag with two different sides',
    hook: 'One country’s flag looks different depending on which side you are standing on.',
    text: 'Paraguay’s flag has a different emblem on each side: the national coat of arms on the front, and the treasury seal, a lion guarding a red cap of liberty, on the back.',
    why: 'It is one of very few national flags in the world whose two sides do not match.',
    fig: ['2', 'different faces'],
    src: ['Wikipedia: Flag of Paraguay', 'https://en.wikipedia.org/wiki/Flag_of_Paraguay'],
    links: [['nepal-flag', 'The only flag that is not a rectangle'], ['spain-anthem', 'An anthem without words'], ['bolivia-navy', 'Next door: a navy without a sea']]
  },
  {
    id: 'blood-falls', c: '010', place: 'Taylor Glacier, Antarctica', lat: -77.72, lon: 162.27, t: 1911, year: 'Since 1911', cat: 'nature',
    title: 'A glacier that bleeds',
    hook: 'A waterfall in the coldest place on Earth runs blood red.',
    text: 'At Taylor Glacier in Antarctica, a red waterfall stains the ice. It is salty, iron-rich water from a lake trapped beneath the glacier for possibly more than a million years, turning red as the iron rusts in the air.',
    why: 'Microbes live in that brine with no light and almost no oxygen, a model for life on icy moons.',
    fig: ['1911', 'first described by explorers'],
    src: ['Wikipedia: Blood Falls', 'https://en.wikipedia.org/wiki/Blood_Falls'],
    links: [['greenland-shark', 'The other end of the planet: a 400-year-old shark'], ['atacama-mars', 'Another place we use to study alien worlds']]
  },
  {
    id: 'hoba', c: '516', place: 'Grootfontein, Namibia', lat: -19.59, lon: 17.93, t: 1920, year: '1920', cat: 'space',
    title: 'The biggest meteorite has never been moved',
    hook: 'The largest known rock from space is still lying where it landed, in a farmer’s field.',
    text: 'The Hoba meteorite fell in what is now Namibia some 80,000 years ago and was found by a farmer ploughing his field in 1920. At about 60 tonnes it is the largest known meteorite, and it has never been moved because it is so heavy.',
    why: 'It left no crater. Scientists think it slowed down so much in the atmosphere that it simply landed.',
    fig: ['~60 t', 'of iron and nickel'],
    src: ['Wikipedia: Hoba meteorite', 'https://en.wikipedia.org/wiki/Hoba_meteorite'],
    links: [['tunguska', 'An impact without a meteorite'], ['atacama-mars', 'Where meteorite hunters search the desert']]
  },
  {
    id: 'choctaw-ireland', c: '372', place: 'Midleton, County Cork, Ireland', lat: 51.92, lon: -8.17, t: 1847, year: '1847', cat: 'history',
    title: 'A gift from the Trail of Tears to Ireland',
    hook: 'A people who had recently been forced from their own land sent money to help starving strangers across an ocean.',
    text: 'In 1847, during Ireland’s Great Famine, the Choctaw Nation, forcibly removed from their homeland just over a decade earlier, collected $170 for Irish famine relief. In 2017 a sculpture of giant steel feathers, Kindred Spirits, was unveiled in County Cork in thanks.',
    why: 'The friendship continues: during COVID-19, Irish donors raised money for the Navajo and Hopi nations, citing the Choctaw gift.',
    fig: ['$170', 'sent in 1847'],
    src: ['Wikipedia: Kindred Spirits (sculpture)', 'https://en.wikipedia.org/wiki/Kindred_Spirits_(sculpture)'],
    links: [['haiti', 'Another story of what freedom cost'], ['tambora', 'Another famine, another cause']]
  },
  {
    id: 'nollywood', c: '566', place: 'Lagos, Nigeria', lat: 6.52, lon: 3.38, t: 1992, year: 'Since 1992', cat: 'art',
    title: 'Nollywood makes more films than Hollywood',
    hook: 'One of the world’s largest film industries took off with straight-to-video films.',
    text: 'Nigeria’s film industry took off in the early 1990s with low-budget films sold on videotape. By number of films produced, it is one of the largest in the world: in 2009 UNESCO ranked it second only to India’s, ahead of Hollywood.',
    why: 'Most of those films were made in about a week, for tens of thousands of dollars.',
    fig: ['#2', 'by output, UNESCO 2009'],
    src: ['Wikipedia: Nollywood', 'https://en.wikipedia.org/wiki/Nollywood'],
    links: [['blombos', 'The oldest art of all'], ['mansa-musa', 'West Africa’s legendary ruler']]
  },
  /* ---- Middle East & North Africa expansion ---- */
  {"id":"hannibal-alps","c":"788","place":"Carthage, Tunisia","lat":36.85,"lon":10.32,"t":-218,"year":"218 BCE","cat":"history","title":"A general from Tunisia marched elephants over the Alps","hook":"An army crossed a snowbound mountain range with war elephants to attack a superpower from behind.","text":"In 218 BCE the Carthaginian general Hannibal led an army with 37 war elephants from Spain across the Alps into Italy. He then crushed Roman armies for years, most famously at Cannae in 216 BCE, and stayed in Italy for about 15 years.","why":"He was never decisively beaten in Italy, yet he never took Rome. Carthage, his home city, stood in what is now a suburb of Tunis.","fig":["37","war elephants at the start of the crossing"],"note":"Which Alpine pass he used is still debated, and ancient troop numbers are uncertain. Most of the elephants died in the first winter.","src":["Wikipedia: Hannibal\u2019s crossing of the Alps","https://en.wikipedia.org/wiki/Hannibal%27s_crossing_of_the_Alps"],"links":[["ibn-khaldun","Tunis, 1,600 years later: the man who explained why empires fall"],["tunisia-abolition","Tunisia ended slavery before the United States"],["galileo-pardon","Rome, the city he never took"]]},
  {"id":"ibn-battuta","c":"504","place":"Tangier, Morocco","lat":35.77,"lon":-5.8,"t":1325,"year":"1325","cat":"people","title":"He left home at 21 and came back 24 years later","hook":"A young man set out on a pilgrimage and ended up travelling about three times farther than Marco Polo.","text":"In 1325 Ibn Battuta left Tangier for Mecca. He did not return to Morocco for 24 years, and kept travelling after that: across North Africa, Arabia, Persia, East Africa, India, the Maldives, China and Mali. His journeys total roughly 117,000 km.","why":"No one is known to have travelled farther before the age of steam. He visited the equivalent of about 40 modern countries.","fig":["~117,000","kilometres, on foot, camel and ship"],"note":"He dictated his account from memory years later. Scholars doubt some sections, especially parts of the China journey.","src":["Wikipedia: Ibn Battuta","https://en.wikipedia.org/wiki/Ibn_Battuta"],"links":[["mansa-musa","He visited the Mali Empire a generation after its golden pilgrim"],["qarawiyyin","Morocco\u2019s 1,100-year-old seat of learning"],["jebel-irhoud","Morocco also holds the oldest known humans"]]},
  {"id":"ibn-khaldun","c":"788","place":"Tunis, Tunisia","lat":36.8,"lon":10.17,"t":1377,"year":"1377","cat":"ideas","title":"Sociology and economics, sketched out in 1377","hook":"A 14th-century scholar described ideas about taxes and societies that economists were still quoting in the 1980s.","text":"Ibn Khaldun, born in Tunis, wrote the Muqaddimah in 1377 as an introduction to a history of the world. In it he analysed how societies cohere and decay, how labour creates value, and how high tax rates can shrink tax revenue.","why":"He is often called a forerunner of sociology and economics, four centuries before Adam Smith. He wrote the first draft in about five months, in a remote fortress in Algeria.","fig":["5","months to write the first draft"],"src":["Wikipedia: Muqaddimah","https://en.wikipedia.org/wiki/Muqaddimah"],"links":[["p:ibnrushd","The Andalusian philosopher before him"], ["hannibal-alps","The ancient power that rose and fell on the same shore"],["ibn-battuta","His contemporary, the greatest traveller of the age"],["lisbon-quake","Another moment that changed how people explain the world"]]},
  {"id":"tunisia-abolition","c":"788","place":"Tunis, Tunisia","lat":36.82,"lon":10.14,"t":1846,"year":"1846","cat":"history","title":"Tunisia abolished slavery before the United States","hook":"A North African state outlawed slavery almost two decades before the American Civil War ended it in the US.","text":"In January 1846 Ahmad Bey, ruler of Tunis, decreed the abolition of slavery, after closing the slave market in 1841. The United States abolished it in 1865, and France in its colonies in 1848.","why":"It was one of the first abolitions in the Muslim world, and it came earlier than in several Western powers.","fig":["1846","19 years before the US"],"src":["Wikipedia: Slavery in Tunisia","https://en.wikipedia.org/wiki/Slavery_in_Tunisia"],"links":[["haiti","The nation born from a slave revolt"],["hannibal-alps","Tunisia, two thousand years earlier"]]},
  {"id":"eratosthenes","c":"818","place":"Alexandria, Egypt","lat":31.2,"lon":29.92,"t":-240,"year":"c. 240 BCE","cat":"science","title":"The Earth was measured with a shadow","hook":"Someone worked out the size of the whole planet 2,200 years ago without leaving his city.","text":"Eratosthenes, head of the Library of Alexandria, heard that at noon on midsummer the Sun shone straight down a well in Syene (Aswan). In Alexandria, it cast a shadow of about 7\u00b0. From that angle and the distance between the cities, he calculated Earth\u2019s circumference.","why":"His answer was within a few percent to about 15% of the real value, depending on which ancient unit he used.","fig":["~7\u00b0","the angle of one shadow"],"note":"The accuracy depends on the length of the \u201cstadion\u201d he used, which is uncertain.","src":["Wikipedia: Eratosthenes","https://en.wikipedia.org/wiki/Eratosthenes"],"links":[["biruni-earth","1,260 years later: the Earth measured from one mountain"], ["first-strike","Upriver, a thousand years earlier: the first strike"],["cleopatra","Egypt\u2019s strange timeline"],["chimborazo","What the Earth\u2019s real shape does to mountains"]]},
  {"id":"first-strike","c":"818","place":"Deir el-Medina, Luxor, Egypt","lat":25.73,"lon":32.6,"t":-1157,"year":"c. 1157 BCE","cat":"history","title":"The first recorded strike in history","hook":"Workers downed tools and staged a sit-in more than 3,000 years ago, and it worked.","text":"In the 29th year of Pharaoh Ramesses III, the craftsmen who built the royal tombs stopped work because their grain rations were late. They walked out, sat down at nearby temples and said, \u201cWe are hungry.\u201d A scribe recorded it on papyrus.","why":"It is the first labour strike known from written history, and the workers got their rations.","fig":["~3,180","years ago"],"src":["Wikipedia: Deir el-Medina strikes","https://en.wikipedia.org/wiki/Deir_el-Medina_strikes"],"links":[["abu-simbel","The temple that was moved to save it"],["eratosthenes","Measuring the planet from Alexandria"],["ur-nammu","The oldest surviving law code"]]},
  {"id":"abu-simbel","c":"818","place":"Abu Simbel, Egypt","lat":22.34,"lon":31.63,"t":1968,"year":"1964\u20131968","cat":"civilization","title":"A mountain temple was sawn up and moved","hook":"Two enormous ancient temples were cut into blocks and rebuilt on higher ground, like a jigsaw.","text":"When the Aswan High Dam threatened to drown the 3,200-year-old temples of Abu Simbel, an international team cut them into more than 1,000 blocks of up to 30 tonnes and reassembled them 65 m higher and 200 m back from the river.","why":"The rescue led directly to the creation of UNESCO\u2019s World Heritage list.","fig":["1,000+","blocks, up to 30 tonnes each"],"src":["Wikipedia: Abu Simbel","https://en.wikipedia.org/wiki/Abu_Simbel"],"links":[["nubian-pyramids","Further up the Nile: more pyramids than Egypt"],["first-strike","The workers who built such tombs once went on strike"],["brasilia","Another giant building project of the 1960s"]]},
  {"id":"yemen-coffee","c":"887","place":"Mocha, Yemen","lat":13.32,"lon":43.25,"t":1450,"year":"1400s","cat":"civilization","title":"Your coffee habit began in Yemen","hook":"The world\u2019s most popular stimulant drink was first brewed to help people stay awake for night prayers.","text":"The coffee plant comes from Ethiopia, but the earliest reliable evidence of coffee as a drink is from 15th-century Yemen, where Sufi communities used it to stay awake for night devotions. For about 200 years Yemen supplied the world through the port of Mocha.","why":"That is why a caf\u00e9 mocha carries the name of a Yemeni port.","fig":["~200","years as the world\u2019s coffee supplier"],"src":["Wikipedia: History of coffee","https://en.wikipedia.org/wiki/History_of_coffee"],"links":[["shibam","Yemen\u2019s 500-year-old skyscrapers"],["ethiopia-calendar","Across the strait, where the plant came from"],["socotra","Yemen\u2019s island of dragon\u2019s blood trees"]]},
  {"id":"shibam","c":"887","place":"Shibam, Yemen","lat":15.93,"lon":48.63,"t":1550,"year":"1500s","cat":"civilization","title":"Skyscrapers made of mud, 500 years old","hook":"A desert town built a skyline of high-rise towers centuries before New York.","text":"The walled town of Shibam in Yemen\u2019s Hadramawt has about 500 mud-brick tower houses, many from the 16th century, rising five to eleven storeys. They were built tall and close together for protection from raids and floods.","why":"It is nicknamed \u201cthe Manhattan of the desert\u201d, and the mud walls must be recoated regularly to survive.","fig":["~30 m","tall, built from mud brick"],"src":["UNESCO: Old Walled City of Shibam","https://whc.unesco.org/en/list/192/"],"links":[["yemen-coffee","Yemen\u2019s gift to every morning"],["yakhchal","Desert engineering in ancient Persia"],["petra-water","A desert city that ran on hidden water"]]},
  {"id":"byblos-alphabet","c":"422","place":"Byblos, Lebanon","lat":34.12,"lon":35.65,"t":-1050,"year":"c. 1050 BCE","cat":"ideas","title":"Most of the world\u2019s alphabets trace back to Lebanon","hook":"The letters you are reading descend from a 22-letter system spread by sea traders.","text":"Phoenician traders from cities such as Byblos and Tyre used a 22-letter alphabet with one sign per sound. The Greeks adapted it and added vowels; from there came Latin and Cyrillic. Its Aramaic branch led to the Arabic and Hebrew scripts.","why":"The word \u201cBible\u201d comes from Byblos: the Greeks named papyrus, and then books, after the port they bought it from.","fig":["22","letters"],"src":["Wikipedia: Phoenician alphabet","https://en.wikipedia.org/wiki/Phoenician_alphabet"],"links":[["ugarit-song","Just up the coast: the oldest written song"],["hannibal-alps","Carthage was a Phoenician colony"],["papua-languages","A country of 840 languages"]]},
  {"id":"ugarit-song","c":"760","place":"Ugarit (Ras Shamra), Syria","lat":35.6,"lon":35.78,"t":-1400,"year":"c. 1400 BCE","cat":"art","title":"The oldest song you can still play","hook":"A piece of sheet music survived 3,400 years on a clay tablet.","text":"Clay tablets found at Ugarit on the Syrian coast carry a hymn to the goddess Nikkal, with instructions for a lyre. Known as Hurrian Hymn No. 6, it dates to about 1400 BCE and is the oldest substantially complete piece of notated music.","why":"Musicians still perform it, though scholars disagree on how the notation should sound.","fig":["~3,400","years old"],"note":"Several competing reconstructions of the melody exist.","src":["Wikipedia: Hurrian songs","https://en.wikipedia.org/wiki/Hurrian_songs"],"links":[["byblos-alphabet","Just down the coast: the alphabet"],["enheduanna","The first named author"],["blombos","The oldest known drawing"]]},
  {"id":"petra-water","c":"400","place":"Petra, Jordan","lat":30.33,"lon":35.44,"t":-100,"year":"c. 100 BCE","cat":"civilization","title":"A desert city that lived on hidden water","hook":"A trading capital flourished in a canyon that gets almost no rain.","text":"The Nabataeans carved Petra into sandstone cliffs and kept it alive with dams, cisterns and channels cut into the rock, capturing flash floods and spring water. The system supported a city of perhaps 20,000 people in a place with about 15 cm of rain a year.","why":"Europe forgot the city for centuries, until a Swiss traveller entered in disguise in 1812.","fig":["~20,000","people, by common estimates"],"note":"Population figures for ancient Petra are estimates.","src":["Wikipedia: Petra","https://en.wikipedia.org/wiki/Petra"],"links":[["jericho","Nearby: the oldest walled town on Earth"],["shibam","Mud skyscrapers in the Yemeni desert"],["yakhchal","Ice in the Persian desert"]]},
  {"id":"jericho","c":"275","place":"Jericho, West Bank","lat":31.87,"lon":35.44,"t":-8000,"year":"c. 8000 BCE","cat":"civilization","title":"A stone tower 10,000 years old","hook":"People built a town wall and a tower thousands of years before the wheel or writing.","text":"At Tell es-Sultan in Jericho, archaeologists found a stone wall and an 8.5 m tower with an internal staircase, built around 8000 BCE. It is one of the oldest known fortified settlements, and at about 258 m below sea level it is also the lowest city on Earth.","why":"The tower was already 5,000 years old when the Great Pyramid was built.","fig":["8.5 m","stone tower, with 22 steps inside"],"src":["Wikipedia: Tower of Jericho","https://en.wikipedia.org/wiki/Tower_of_Jericho"],"links":[["gobekli","Even older monuments, in T\u00fcrkiye"],["petra-water","A desert city carved in rock"],["cleopatra","How old \u201cancient\u201d really is"]]},
  {"id":"ur-nammu","c":"368","place":"Nippur, Iraq","lat":32.13,"lon":45.23,"t":-2100,"year":"c. 2100 BCE","cat":"civilization","title":"The oldest law code preferred fines to revenge","hook":"The oldest surviving written laws are milder than the famous ones that came later.","text":"The Code of Ur-Nammu, written in Sumerian around 2100 BCE, is the oldest law code that survives. For many injuries it sets fines in silver rather than \u201can eye for an eye\u201d, which appears in Hammurabi\u2019s code about three centuries later.","why":"The earliest known lawmakers chose compensation over retaliation.","fig":["~300","years older than Hammurabi\u2019s code"],"src":["Wikipedia: Code of Ur-Nammu","https://en.wikipedia.org/wiki/Code_of_Ur-Nammu"],"links":[["enheduanna","The first named author lived in the same land"],["banu-musa","Baghdad\u2019s programmable machines"],["first-strike","The first recorded strike"]]},
  {"id":"banu-musa","c":"368","place":"Baghdad, Iraq","lat":33.31,"lon":44.36,"t":850,"year":"c. 850","cat":"inventions","title":"A programmable music machine from 9th-century Baghdad","hook":"Three brothers designed a machine that played music from an interchangeable program, about 1,000 years before the player piano.","text":"Around 850, the Ban\u016b M\u016bs\u0101 brothers of Baghdad\u2019s House of Wisdom wrote the Book of Ingenious Devices, describing about 100 machines. One was an automatic flute player driven by a rotating cylinder with raised pins, which could be swapped to change the tune.","why":"It is often described as the earliest known programmable machine.","fig":["~100","devices in one book"],"src":["Wikipedia: Book of Ingenious Devices","https://en.wikipedia.org/wiki/Book_of_Ingenious_Devices"],"links":[["baghdad-paper","The paper that fed the House of Wisdom"], ["p:aljazari","The engineer who took automata further"],["p:alkhwarizmi","Their colleague at the House of Wisdom"],["p:lovelace","The first program for a general-purpose machine"],["antikythera","A Greek ancestor of such machines"]]},
  {"id":"tassili","c":"012","place":"Tassili n\u2019Ajjer, Algeria","lat":25.5,"lon":9,"t":-6000,"year":"c. 10,000\u20132,000 BCE","cat":"nature","title":"Paintings of a Sahara full of water","hook":"In the middle of the world\u2019s largest hot desert, rock paintings show cattle herds, giraffes and hippos.","text":"The plateau of Tassili n\u2019Ajjer in southern Algeria holds more than 15,000 rock paintings and engravings. They record a \u201cGreen Sahara\u201d of grassland, lakes and rivers, with elephants, hippos and herders, which dried out roughly 5,000 years ago.","why":"The desert is younger than the art. People watched the Sahara form.","fig":["15,000+","paintings and engravings"],"src":["UNESCO: Tassili n\u2019Ajjer","https://whc.unesco.org/en/list/179/"],"links":[["libya-river","Next door: ancient water pumped from under the sand"],["richat","The eye in the Sahara you can see from space"],["blombos","The oldest drawing of all"]]},
  {"id":"libya-river","c":"434","place":"Kufra, Libya","lat":24.18,"lon":23.29,"t":1991,"year":"Since 1991","cat":"inventions","title":"A river in pipes, carrying ice-age water","hook":"One country drinks water that fell as rain before farming was invented.","text":"Libya\u2019s Great Man-Made River is a network of about 2,800 km of buried pipes, each 4 m wide, carrying water from aquifers under the Sahara to cities on the coast. The \u201cfossil water\u201d collected there when the Sahara was green, more than 10,000 years ago.","why":"It is often called the largest irrigation project in the world, and its source does not refill.","fig":["~2,800 km","of pipeline under the desert"],"src":["Wikipedia: Great Man-Made River","https://en.wikipedia.org/wiki/Great_Man-Made_River"],"links":[["tassili","Paintings from when that water fell"],["libya-heat","Libya\u2019s cancelled world heat record"],["petra-water","Ancient desert plumbing"]]},
  {"id":"jebel-irhoud","c":"504","place":"Jebel Irhoud, Morocco","lat":31.85,"lon":-8.87,"t":-298000,"year":"~300,000 years ago","cat":"science","title":"The oldest known humans were found in Morocco","hook":"A discovery in a North African cave made our species 100,000 years older overnight.","text":"In 2017, researchers dated Homo sapiens fossils from Jebel Irhoud, west of Marrakesh, to about 300,000 years ago. Until then, the oldest known remains of our species were about 195,000 years old, from Ethiopia.","why":"It suggests our species emerged across Africa as a whole, not in one \u201ccradle\u201d in the east.","fig":["~300,000","years old"],"src":["Hublin et al., Nature (2017)","https://www.nature.com/articles/nature22336"],"links":[["blombos","The oldest known drawing, also from Africa"],["ibn-battuta","Morocco\u2019s great traveller"],["gobekli","The first monuments"]]},
  {"id":"mustatils","c":"682","place":"AlUla, Saudi Arabia","lat":26.62,"lon":37.92,"t":-5200,"year":"c. 5200 BCE","cat":"civilization","title":"1,600 giant stone rectangles older than the pyramids","hook":"Thousands of huge stone structures sat unnoticed in a desert until people studied them from the air.","text":"Across north-west Saudi Arabia lie more than 1,600 mustatils: low-walled stone rectangles from 20 m to over 600 m long, built about 7,000 years ago. Excavations found cattle horns and skulls placed inside, pointing to ritual use.","why":"They are among the oldest large stone monuments on Earth, older than Stonehenge and the pyramids, and were surveyed in detail only from 2017.","fig":["1,600+","structures, some over 600 m long"],"src":["Wikipedia: Mustatil","https://en.wikipedia.org/wiki/Mustatil"],"links":[["gobekli","The even older monuments of T\u00fcrkiye"],["jericho","A 10,000-year-old tower"],["petra-water","A city carved in the same sandstone country"]]},
  {"id":"oman-zanzibar","c":"512","place":"Muscat, Oman","lat":23.59,"lon":58.41,"t":1840,"year":"1840","cat":"history","title":"Oman once moved its capital to Africa","hook":"An Arabian ruler liked his island territory 3,500 km away so much that he moved his court there.","text":"Around 1840 Sultan Said bin Sultan of Oman moved his capital from Muscat to Zanzibar, off East Africa, the centre of his clove and trading empire. After his death in 1856 the realm split into two sultanates.","why":"It is why Zanzibar had a sultan at all, and why Britain could fight a 38-minute war against one in 1896.","fig":["~3,500 km","from Muscat to the new capital"],"src":["Wikipedia: Said bin Sultan","https://en.wikipedia.org/wiki/Said_bin_Sultan"],"links":[["zanzibar-war","The 38-minute war that followed, decades later"],["yemen-coffee","Arabia\u2019s other world-changing trade"],["ibn-battuta","A traveller who sailed this same coast"]]},
  {"id":"hope-probe","c":"784","place":"Dubai, United Arab Emirates","lat":25.2,"lon":55.27,"t":2021,"year":"2021","cat":"space","title":"A 50-year-old country reached Mars","hook":"A nation younger than many of its citizens\u2019 parents put a spacecraft in orbit around another planet.","text":"On 9 February 2021 the Hope probe entered orbit around Mars, making the United Arab Emirates the fifth space power to reach the planet and the first Arab one. The country was founded in 1971.","why":"Its science lead, Sarah Al Amiri, was 34, and the mission\u2019s data is shared freely.","fig":["5th","to reach Mars orbit"],"src":["Wikipedia: Emirates Mars Mission","https://en.wikipedia.org/wiki/Emirates_Mars_Mission"],"links":[["atacama-mars","Where Mars rovers practise on Earth"],["baikonur","Where human spaceflight began"],["mustatils","Arabia, 7,000 years earlier"]]},
  {"id":"istanbul-inoculation","c":"792","place":"Istanbul, T\u00fcrkiye","lat":41.01,"lon":28.98,"t":1717,"year":"1717","cat":"medicine","title":"Europe learned inoculation from Ottoman women","hook":"An ambassador\u2019s wife watched a folk practice abroad, tried it on her own son, and changed medicine at home.","text":"In 1717 Lady Mary Wortley Montagu, wife of the British ambassador in Constantinople, described how local women protected children from smallpox by scratching matter from a mild case into the skin. She had her son inoculated there, and promoted the practice in England.","why":"This was almost 80 years before Edward Jenner\u2019s vaccine, which built on the same idea.","fig":["~80","years before Jenner"],"src":["Wikipedia: Lady Mary Wortley Montagu","https://en.wikipedia.org/wiki/Lady_Mary_Wortley_Montagu"],"links":[["p:jenner","The country doctor who made it safer"],["p:alrazi","The physician who first told smallpox from measles"],["quarantine-dubrovnik","Another early weapon against epidemics"]]},
  {"id":"richat","c":"478","place":"Richat Structure, Mauritania","lat":21.12,"lon":-11.4,"t":1965,"year":"Seen from orbit since 1965","cat":"nature","title":"The eye in the Sahara that astronauts steer by","hook":"A 40-km bullseye in the desert went largely unnoticed until people saw it from space.","text":"The Richat Structure in Mauritania is a set of concentric rock rings about 40 km across. From the ground it is hard to notice; from orbit it looks like a giant eye. It is a dome of rock that was pushed up and then worn away in layers.","why":"Early astronauts used it as a landmark, because it stands out in the otherwise featureless Sahara.","fig":["~40 km","across"],"src":["Wikipedia: Richat Structure","https://en.wikipedia.org/wiki/Richat_Structure"],"links":[["tassili","Paintings from when the Sahara was green"],["mansa-musa","The gold empire to the south"],["hoba","Something that really did come from space"]]},
  /* ---- Islamic Golden Age & al-Andalus ---- */
  {"id":"ibn-firnas","c":"724","place":"C\u00f3rdoba, Spain","lat":37.88,"lon":-4.78,"t":875,"year":"c. 875","cat":"inventions","title":"A man is said to have flown over C\u00f3rdoba in 875","hook":"About a thousand years before the aeroplane, a scholar in his sixties reportedly jumped off a hill wearing wings.","text":"Abbas ibn Firnas, a poet, musician and inventor at the court of C\u00f3rdoba, is said to have covered a frame with feathers, launched himself from a height and glided for some distance. He landed badly and hurt his back. Later writers said he had forgotten a tail.","why":"If the account is right, it is one of the earliest attempts at controlled human flight. A crater on the Moon and an airport in Baghdad carry his name.","fig":["~1,000","years before the Wright brothers"],"note":"The only detailed account was written by the historian al-Maqqari about seven centuries later, drawing on older sources that are now lost.","src":["Wikipedia: Abbas ibn Firnas","https://en.wikipedia.org/wiki/Abbas_ibn_Firnas"],"links":[["cordoba-library","The city he jumped over"],["p:alzahrawi","C\u00f3rdoba\u2019s surgeon, a century later"],["banu-musa","Meanwhile in Baghdad: programmable machines"],["ziryab","His contemporary at the same court"]]},
  {"id":"cordoba-library","c":"724","place":"C\u00f3rdoba, Spain","lat":37.879,"lon":-4.779,"t":970,"year":"c. 970","cat":"civilization","title":"A library whose catalogue alone filled 44 volumes","hook":"One city\u2019s library was said to hold hundreds of thousands of books when most European libraries held a few hundred.","text":"Under the caliph al-Hakam II (ruled 961\u2013976), the royal library of C\u00f3rdoba was reported to hold about 400,000 volumes, with a catalogue of 44 volumes. C\u00f3rdoba was then one of the largest cities in Europe, with paved streets and running water.","why":"The famous monastery library of St Gall, one of the best in Christian Europe, had a few hundred books at the time.","fig":["44","volumes of catalogue"],"note":"The figure of 400,000 comes from medieval chroniclers and is probably exaggerated, but the library was very large by any standard of its time.","src":["Wikipedia: Al-Hakam II","https://en.wikipedia.org/wiki/Al-Hakam_II"],"links":[["baghdad-paper","What made such libraries possible: paper"],["toledo-translators","Where those books went next"],["p:ibnrushd","The philosopher this city produced"],["qarawiyyin","Across the strait: the oldest university"]]},
  {"id":"ziryab","c":"724","place":"C\u00f3rdoba, Spain","lat":37.885,"lon":-4.77,"t":822,"year":"822","cat":"art","title":"The musician credited with the three-course meal","hook":"Soup first, then a main dish, then dessert: tradition credits that order to one exiled musician.","text":"Ziryab, a singer who left the court of Baghdad, arrived in C\u00f3rdoba in 822 and became its arbiter of taste. He founded a music school and is credited with adding a fifth string to the oud, the ancestor of the lute. Tradition also credits him with serving meals in courses, seasonal fashions and an early toothpaste.","why":"One immigrant shaped how a continent would later eat, dress and play music.","fig":["5th","string, added to the oud"],"note":"Much of what is credited to Ziryab comes from admiring later sources, and historians think some of it is legend.","src":["Wikipedia: Ziryab","https://en.wikipedia.org/wiki/Ziryab"],"links":[["ibn-firnas","His contemporary tried to fly"],["arabic-words","The words that travelled the same road"],["ugarit-song","The oldest written song"]]},
  {"id":"toledo-translators","c":"724","place":"Toledo, Spain","lat":39.86,"lon":-4.02,"t":1150,"year":"1100s","cat":"ideas","title":"Europe got Aristotle back through Arabic","hook":"Much of ancient Greek science returned to Europe after a detour of several centuries through another language.","text":"After Toledo passed to Castile in 1085, scholars from across Europe came to its Arabic libraries. Working with local Arabic-speaking Christians, Jews and Muslims, they put Greek and Arabic science into Latin. One translator, Gerard of Cremona, is credited with more than 70 works, among them Ptolemy\u2019s Almagest.","why":"The first universities of Europe taught medicine, astronomy and mathematics from these translations.","fig":["70+","works translated by one man"],"src":["Wikipedia: Toledo School of Translators","https://en.wikipedia.org/wiki/Toledo_School_of_Translators"],"links":[["cordoba-library","The libraries they drew on"],["p:alzarqali","Toledo\u2019s own astronomer"],["p:ibnsina","The textbook they carried north"],["fibonacci-bejaia","Another route: numerals from Algeria"]]},
  {"id":"alhambra-symmetry","c":"724","place":"Granada, Spain","lat":37.176,"lon":-3.588,"t":1350,"year":"1300s","cat":"art","title":"A palace that explored symmetry before mathematics did","hook":"Medieval tile makers used nearly every possible way to repeat a flat pattern, centuries before mathematicians proved how many there are.","text":"There are exactly 17 ways to repeat a pattern across a flat surface, a fact proved in 1891. The 14th-century tilework and plaster of the Alhambra in Granada uses most of them, and by some counts all 17.","why":"M. C. Escher visited in 1922 and 1936, copied the patterns, and said they changed his art.","fig":["17","possible wallpaper symmetries"],"note":"Whether all 17 groups appear is disputed. Mathematicians have reported counts between 13 and 17.","src":["Wikipedia: Wallpaper group","https://en.wikipedia.org/wiki/Wallpaper_group"],"links":[["girih","In Isfahan, an even stranger pattern"],["arabic-words","What else al-Andalus left behind"],["tordesillas","Spain, a century and a half later"]]},
  {"id":"arabic-words","c":"724","place":"Seville, Spain","lat":37.39,"lon":-5.99,"t":1000,"year":"711\u20131492","cat":"ideas","title":"You speak some Arabic every day","hook":"Sugar, cotton, coffee, lemon, zero, algebra: a whole vocabulary arrived in Europe with the things it named.","text":"Al-Andalus brought new crops and techniques to Europe, such as sugar cane, cotton, rice, citrus and irrigation. The words came with them. Spanish has about 4,000 words of Arabic origin. English has algebra, algorithm, alcohol, zero, sugar, cotton, lemon, magazine, admiral and zenith.","why":"The Spanish word for \u201chopefully\u201d, ojal\u00e1, comes from an Arabic phrase meaning \u201cGod willing\u201d.","fig":["~4,000","Spanish words from Arabic"],"src":["Wikipedia: Arabic language influence on Spanish","https://en.wikipedia.org/wiki/Arabic_language_influence_on_the_Spanish_language"],"links":[["p:alkhwarizmi","The man inside the word \u201calgorithm\u201d"],["yemen-coffee","Where \u201ccoffee\u201d came from"],["al-sufi","The stars have Arabic names too"],["spain-anthem","Spain\u2019s anthem has no words at all"]]},
  {"id":"idrisi-map","c":"380","place":"Palermo, Sicily, Italy","lat":38.11,"lon":13.36,"t":1154,"year":"1154","cat":"geography","title":"The best world map for 300 years had south at the top","hook":"A Christian king hired a Muslim geographer, and 15 years later they had the most accurate map on Earth.","text":"Al-Idrisi, born in Ceuta and educated in C\u00f3rdoba, worked at the court of the Norman king Roger II of Sicily. After 15 years of interviewing travellers, he completed in 1154 a world map in 70 sheets with a book of descriptions. Like many Islamic maps, it puts south at the top.","why":"It was among the most accurate world maps for about three centuries. Roger also had it engraved on a large silver disc, which is lost.","fig":["70","map sheets"],"src":["Wikipedia: Tabula Rogeriana","https://en.wikipedia.org/wiki/Tabula_Rogeriana"],"links":[["ibn-battuta","The traveller who filled in the rest"],["biruni-earth","Measuring the globe itself"],["tordesillas","Later, two kingdoms split that world in half"]]},
  {"id":"fibonacci-bejaia","c":"012","place":"B\u00e9ja\u00efa, Algeria","lat":36.75,"lon":5.07,"t":1202,"year":"c. 1190","cat":"ideas","title":"Europe learned its numbers in an Algerian port","hook":"The digits on your phone reached Europe because a merchant\u2019s son studied arithmetic abroad.","text":"Leonardo of Pisa, later called Fibonacci, grew up in B\u00e9ja\u00efa, where his father ran a trading post. There he learned the Hindu-Arabic numerals 0 to 9 from local teachers. His book Liber Abaci (1202) showed European merchants how much faster they were than Roman numerals.","why":"The French word for candle, bougie, also comes from this port, which exported fine wax.","fig":["1202","the year Europe met 0\u20139"],"src":["Wikipedia: Liber Abaci","https://en.wikipedia.org/wiki/Liber_Abaci"],"links":[["zero","Where zero itself came from"],["p:alkhwarizmi","The book that taught the Arab world these numbers"],["sakk-cheque","Medieval banking on paper"],["tassili","Algeria, 8,000 years earlier"]]},
  {"id":"aghlabid-basins","c":"788","place":"Kairouan, Tunisia","lat":35.69,"lon":10.1,"t":862,"year":"c. 862","cat":"inventions","title":"A 9th-century reservoir wider than a football pitch","hook":"A city in dry country was supplied by giant round pools built over 1,100 years ago.","text":"Around 860, the Aghlabid rulers of Kairouan built a system of basins fed by an aqueduct. Water entered a small pool where mud settled, then passed into a main basin about 128 m across. About 15 basins once ringed the city.","why":"They are among the largest waterworks of the early medieval world, and the biggest still hold water.","fig":["128 m","across the largest basin"],"src":["Wikipedia: Aghlabid Basins","https://en.wikipedia.org/wiki/Aghlabid_Basins"],"links":[["ibn-khaldun","Tunisia\u2019s great thinker"],["petra-water","Older desert plumbing"],["windmills","Persia harnessed the wind"]]},
  {"id":"cairo-hospital","c":"818","place":"Cairo, Egypt","lat":30.05,"lon":31.26,"t":1284,"year":"1284","cat":"medicine","title":"A free hospital with wards, a pharmacy and a library, in 1284","hook":"A medieval hospital treated rich and poor without charge and sorted patients into wards by illness.","text":"The hospital of Sultan Qalawun opened in Cairo in 1284. Its founding deed opened it to everyone, free of charge. It had separate wards for fevers, eye disease, surgery and mental illness, plus a pharmacy, a library and teaching rooms. Egypt\u2019s first such hospital, founded by Ibn Tulun around 872, already had a ward for the mentally ill.","why":"Medical care continued on the same site for about 700 years.","fig":["1284","open to all, free"],"note":"Stories of patients being given money when they left come from later accounts.","src":["Wikipedia: Bimaristan","https://en.wikipedia.org/wiki/Bimaristan"],"links":[["p:ibnalnafis","He worked in Cairo and left this hospital his library"],["p:alrazi","The doctor who shaped Baghdad\u2019s hospitals"],["istanbul-inoculation","How inoculation reached Europe"],["first-strike","Egypt\u2019s first strike"]]},
  {"id":"baghdad-paper","c":"368","place":"Baghdad, Iraq","lat":33.34,"lon":44.4,"t":794,"year":"c. 794","cat":"inventions","title":"Baghdad had a paper mill 350 years before Europe","hook":"A cheap writing material turned one city into the largest book market on Earth.","text":"Paper making came west from China through Central Asia. Baghdad had a paper mill by about 794, and soon a whole street of more than a hundred booksellers. Cheap paper fed the translation movement of the House of Wisdom. Europe\u2019s first paper mills appeared in Muslim Spain in the 11th or 12th century.","why":"Without cheap paper there would have been little for the printing press to print on.","fig":["~350","years ahead of Europe"],"note":"The popular story that the secret came from Chinese prisoners taken at the Battle of Talas in 751 comes from a later writer and is doubted.","src":["Wikipedia: History of paper","https://en.wikipedia.org/wiki/History_of_paper"],"links":[["p:cailun","The man credited with inventing paper"],["p:gutenberg","What paper made possible"],["cordoba-library","The library paper built"],["sakk-cheque","Paper money, of a kind"]]},
  {"id":"sakk-cheque","c":"368","place":"Baghdad, Iraq","lat":33.3,"lon":44.42,"t":900,"year":"800s\u2013900s","cat":"ideas","title":"A cheque written in Baghdad could be cashed in Morocco","hook":"Medieval merchants crossed deserts without carrying coin, using a signed piece of paper.","text":"Merchants in the Abbasid world used the \u1e63akk, a written order to pay, so they did not need to carry gold across thousands of kilometres. Bankers honoured the notes of trusted partners in distant cities, from Baghdad to North Africa.","why":"The English word \u201ccheque\u201d may come from \u1e63akk.","fig":["~5,000 km","from Baghdad to Morocco"],"note":"The etymology is debated. Other scholars derive \u201ccheque\u201d from the Persian word for a written document, or from \u201cexchequer\u201d.","src":["Wikipedia: Cheque (history)","https://en.wikipedia.org/wiki/Cheque#History"],"links":[["fibonacci-bejaia","The numbers merchants wrote them in"],["p:alkindi","Baghdad\u2019s codebreaker"],["mansa-musa","The richest traveller on those routes"]]},
  {"id":"damascus-steel","c":"760","place":"Damascus, Syria","lat":33.51,"lon":36.3,"t":1100,"year":"c. 900\u20131750","cat":"science","title":"Nanotubes found inside a Damascus sword","hook":"Medieval smiths made a material containing structures that science only identified in 1991.","text":"Damascus blades were famous for their watered pattern and sharp, flexible edge. They were forged in the Middle East from wootz steel imported from India. In 2006, researchers examining a 17th-century blade under an electron microscope found carbon nanotubes and nanowires.","why":"The recipe was lost around 1750, and nobody has reproduced it exactly.","fig":["2006","when the nanotubes were seen"],"note":"The finding is from one blade, and how much the nanostructures explain the steel\u2019s properties is debated.","src":["Reibold et al., Nature (2006)","https://www.nature.com/articles/444286a"],"links":[["p:jabir","The chemistry of the age"],["zero","India\u2019s other export"],["ugarit-song","Syria, 2,500 years earlier"]]},
  {"id":"windmills","c":"364","place":"Nashtifan, Iran","lat":34.43,"lon":60.18,"t":900,"year":"c. 900","cat":"inventions","title":"The first windmills turned like revolving doors","hook":"The earliest known windmills did not look like windmills. Some are still standing.","text":"The oldest reliable descriptions of windmills come from eastern Persia in the 9th and 10th centuries. Their sails turned around a vertical shaft, inside walls that funnelled the wind. At Nashtifan, mills of this design, made of clay, straw and wood, ground grain into the 21st century.","why":"The familiar European windmill with a horizontal shaft appeared about 300 years later.","fig":["~300","years before Europe\u2019s windmills"],"note":"The age of the surviving mills at Nashtifan is uncertain. A common claim is about 1,000 years.","src":["Wikipedia: Panemone windmill","https://en.wikipedia.org/wiki/Panemone_windmill"],"links":[["yakhchal","Persia also made ice in the desert"],["p:aljazari","Machines driven by water"],["aghlabid-basins","Storing water in Tunisia"]]},
  {"id":"al-sufi","c":"364","place":"Isfahan, Iran","lat":32.66,"lon":51.68,"t":964,"year":"964","cat":"space","title":"Another galaxy, recorded in 964","hook":"A star atlas from a thousand years ago notes a \u201clittle cloud\u201d that is 2.5 million light years away.","text":"In his Book of Fixed Stars, the astronomer al-Sufi described a small cloud in the constellation Andromeda. It is the earliest known record of the Andromeda Galaxy. His book also fixed the Arabic star names that astronomers still use.","why":"Aldebaran, Altair, Betelgeuse, Deneb, Rigel and Vega are all Arabic names.","fig":["2.5 million","light years to his \u201clittle cloud\u201d"],"src":["Wikipedia: Book of Fixed Stars","https://en.wikipedia.org/wiki/Book_of_Fixed_Stars"],"links":[["p:leavitt","The woman who later measured the distance"],["ulugh-beg","The next great star catalogue"],["arabic-words","More Arabic in your vocabulary"],["tusi-couple","The geometry that reshaped the heavens"]]},
  {"id":"girih","c":"364","place":"Darb-e Imam shrine, Isfahan, Iran","lat":32.665,"lon":51.675,"t":1453,"year":"1453","cat":"art","title":"A tile pattern 500 years ahead of mathematics","hook":"A shrine wall carries a pattern that never exactly repeats. Mathematicians described that idea in the 1970s.","text":"In 2007, physicists Peter Lu and Paul Steinhardt showed that medieval Islamic artisans built complex patterns from a set of five tile shapes. On the Darb-e Imam shrine of 1453, the pattern is almost a perfect Penrose tiling, which fills a surface without ever repeating.","why":"Roger Penrose published such patterns in the 1970s. Crystals with this kind of order won a Nobel Prize in 2011.","fig":["5","tile shapes"],"src":["Lu & Steinhardt, Science (2007)","https://www.science.org/doi/10.1126/science.1135491"],"links":[["alhambra-symmetry","In Granada: the patterns that do repeat"],["al-sufi","Isfahan\u2019s astronomer"],["p:khayyam","A poet who solved cubic equations"]]},
  {"id":"tusi-couple","c":"364","place":"Maragheh, Iran","lat":37.4,"lon":46.21,"t":1259,"year":"1259","cat":"space","title":"Copernicus used a Persian diagram","hook":"A geometric trick from a 13th-century observatory turns up 300 years later in the book that moved the Sun to the centre.","text":"Nasir al-Din al-Tusi, who ran the Maragheh observatory founded in 1259, devised the \u201cTusi couple\u201d: one circle rolling inside another twice its size, which turns circular motion into motion along a straight line. Copernicus used the same device in 1543, in a diagram that closely matches al-Tusi\u2019s.","why":"Maragheh also worked much like a modern research institute, with a staff of astronomers and a large library.","fig":["~300","years before Copernicus"],"note":"No document shows how the idea reached Copernicus. Most historians think it was transmitted, but independent invention cannot be ruled out.","src":["Wikipedia: Tusi couple","https://en.wikipedia.org/wiki/Tusi_couple"],"links":[["p:altusi","The man behind it"],["galileo-pardon","What happened to the next man who moved the Earth"],["ulugh-beg","The observatory it inspired"],["tycho-nose","A later observatory builder"]]},
  {"id":"ulugh-beg","c":"860","place":"Samarkand, Uzbekistan","lat":39.675,"lon":67.005,"t":1429,"year":"c. 1429","cat":"space","title":"A prince measured the year to within a minute","hook":"A ruler built an instrument the size of a building and timed the Earth\u2019s orbit, with no telescope.","text":"Ulugh Beg, grandson of Timur and ruler of Samarkand, built an observatory with a meridian arc about 40 m in radius, sunk into a hillside. His team catalogued 1,018 stars and measured the length of the year with an error of about one minute.","why":"He was a better astronomer than politician. His own son had him killed in 1449, and the observatory lay buried until 1908.","fig":["~40 m","radius of the instrument"],"src":["Wikipedia: Ulugh Beg Observatory","https://en.wikipedia.org/wiki/Ulugh_Beg_Observatory"],"links":[["tusi-couple","The observatory he modelled his on"],["al-sufi","The star book he updated"],["tycho-nose","Europe\u2019s great pre-telescope observer"],["baikonur","Central Asia\u2019s later road to the stars"]]},
  {"id":"biruni-earth","c":"586","place":"Nandana Fort, Punjab, Pakistan","lat":32.72,"lon":73.23,"t":1020,"year":"c. 1020","cat":"science","title":"He measured the Earth from one mountain","hook":"A scholar worked out the size of the planet using one hill, one instrument and trigonometry.","text":"Al-Biruni measured the height of a mountain near Nandana, climbed it, and measured how far the horizon dipped below the horizontal. From that single angle he calculated the Earth\u2019s radius. His result is usually given as about 6,340 km. The modern figure is 6,371 km.","why":"Unlike Eratosthenes, he needed no long march across a desert, only one viewpoint.","fig":["~6,340 km","his radius of the Earth"],"note":"The closeness of his result is partly luck. Bending of light in the atmosphere should have caused a larger error, and the conversion of his units is uncertain.","src":["Wikipedia: Al-Biruni","https://en.wikipedia.org/wiki/Al-Biruni"],"links":[["eratosthenes","The first measurement, with a shadow"],["p:albiruni","The man himself"],["chimborazo","Why the Earth is not quite a sphere"],["idrisi-map","Mapping what he measured"]]}
];
