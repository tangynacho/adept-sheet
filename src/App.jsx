import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [level, setLevel] = useState(1)
  const [currentPP, setCurrentPP] = useState(4)
  const [baseElement, setBaseElement] = useState('Mercury')
  const [djinn, setDjinn] = useState(['', '', '', ''])
  const [adeptClass, setAdeptClass] = useState('Paragon')
  const [adeptClasses, setAdeptClasses] = useState(['Paragon'])
  const [classTier, setClassTier] = useState(1)
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches)
  const [chosenClassSpells, setChosenClassSpells] = useState({ Paragon: [ [], [], [], [], [], ], Gallant: [ [], [], [], [], [], ], Warrior: [ [], [], [], [], [], ], Magister: [ [], [], [], [], [], ], Guardian: [ [], [], [], [], [], ], Luminier: [ [], [], [], [], [], ], Oracle: [ [], [], [], [], [], ], Berserker: [ [], [], [], [], [], ], Conjurer: [ [], [], [], [], [], ], Illusionist: [ [], [], [], [], [], ], });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)")
    const handler = () => setIsPortrait(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const elements = ['Mercury', 'Venus', 'Mars', 'Jupiter']
  const elementIcons = {
    Mercury: '/icons/mercury.png',
    Venus: '/icons/venus.png',
    Mars: '/icons/mars.png',
    Jupiter: '/icons/jupiter.png',
  };
  const elementColors = {
    Mercury: '#7fcfff', // Light Blue
    Venus: '#f4d35e',   // Golden Yellow
    Mars: '#f76c5e',    // Red-Orange
    Jupiter: '#c084fc', // Pinkish Purple
  };
  const djinnDetails = {
    // Mercury
    'Chill': { element: 'Mercury', damage: 'Cold', skill: 'Medicine', bond: '???' },
    // Venus
    'Flint': { element: 'Venus', damage: 'Thunder', skill: 'Survival', bond: 'All enemies within 30 ft of you are knocked prone and deafened until the start of your next turn.' },
    // Mars
    'Forge': { element: 'Mars', damage: 'Fire', skill: 'Animal Handling', bond: '???' },
    // Jupiter
    'Gust': { element: 'Jupiter', damage: 'Force', skill: 'Deception', bond: '???' },
  }
  const availableDjinn = ['Chill', 'Flint', 'Forge', 'Gust']
  const [djinnMode, setDjinnMode] = useState(['Set', 'Set', 'Set', 'Set'])

  const devotion = {
    Mercury: 0,
    Venus: 0,
    Mars: 0,
    Jupiter: 0
  }

  const getDjinnIndex = (d) => {
    return availableDjinn.indexOf(d)
  }
  const toggleDjinnMode = (d) => {
    const newList = [...djinnMode];
    const currentMode = djinnMode[getDjinnIndex(d)]
    newList[getDjinnIndex(d)] = currentMode === 'Set' ? 'Standby' : 'Set';
    setDjinnMode(newList)
  }
  const summonWithDjinn = (d) => {
    const newList = [...djinnMode];
    newList[getDjinnIndex(d)] = 'Recovery';
    setDjinnMode(newList)
  }

  devotion[baseElement] += 1
  djinn.forEach(d => {
    if (d && djinnMode[getDjinnIndex(d)] === 'Set') {
      const element = djinnDetails[d].element
      devotion[element] += 1
    }
  })

  const calculatePP = (level) => {
    if (level >= 18) return 8
    if (level >= 12) return 7
    if (level >= 7) return 6
    if (level >= 3) return 5
    return 4
  }
  const pp = calculatePP(level)
  
  const basePsynergyMap = {
    Mercury: [
      ['Douse'], ['Douse+','Frost'], ['Douse+','Tundra','Prism'], ['Drench','Tundra','Hail Prism'], ['Drench','Glacier','Freeze Prism']
    ],
    Venus: [
      ['Growth'], ['Growth+','Spire'], ['Growth+','Clay Spire','Ragnarok'], ['Briar Growth','Clay Spire','Iliad'], ['Briar Growth','Stone Spire','Odyssey']
    ],
    Mars: [
      ['Flare'], ['Flare+','Burst'], ['Flare+','Mad Burst','Beam'], ['Flare Storm','Mad Burst','Searing Beam'], ['Flare Storm','Fiery Burst','Cycle Beam']
    ],
    Jupiter: [
      ['Mind Read'], ['Mind Read+','Whirlwind'], ['Mind Read+','Tornado','Storm Ray'], ['Mind Link','Tornado','Destruct Ray'], ['Mind Link','Tempest','Brain Storm']
    ]
  }
  const getBasePsynergy = (element, level) => {
    return (level >= 14) ? basePsynergyMap[element][4]
    : (level >= 9) ? basePsynergyMap[element][3]
    : (level >= 5) ? basePsynergyMap[element][2]
    : (level >= 3) ? basePsynergyMap[element][1]
    : basePsynergyMap[element][0]
  }
  const basePsynergy = getBasePsynergy(baseElement, level) 
  const psynergyDetails = {
    // Mercury
    'Douse': { cost: 0, description: 'Fill a container within 10 ft of you with water. No more than 15 gal. Water remains 5 min. Water cures disease.' },
    'Douse+': { cost: 0, description: 'Fill a container or create a puddle within 10 ft of you with water. No more than 15 gal. Water remains 5 min. Water cures disease.' },
    'Frost': { cost: 1, description: 'Create a 5x5 pillar of ice on a wet surface within 20 ft. Any creatures on the pillar make a DEX save or fall off, taking fall damage. Pillar lasts for 1 min.' },
    'Tundra': { cost: 1, description: 'Create a 5x5 pillar of ice on a wet surface within 30 ft. Any creatures on the pillar make a DEX save or fall off, taking fall damage. A 20 ft radius sheet of ice forms around the pillar. While standing on it, you have double movement and can Disengage as a Bonus Action. Ice lasts for 1 min.' },
    'Prism': { cost: 2, description: 'Reaction to being hit or taking damage. Seal yourself in a crystal prism, becoming immune to damage and conditions. Breaks concentration, heals you for 1d8 HP. Your speed is 0 and you cannot take actions. You regain 1d8 HP at the end of your turns. Prism remains until end of your next turn or can be dismissed with a Bonus Action.' },
    'Drench': { cost: 0, description: '???' },
    'Hail Prism': { cost: 2, description: '???' },
    'Glacier': { cost: 1, description: '???' },
    'Freeze Prism': { cost: 2, description: '???' },
    // Venus
    'Growth': { cost: 0, description: 'Target plant life within 10 ft and choose an effect. A 20 ft tall climbable vine. A 5x5 area of difficult terrain. A flower that cures and prevents frightened within 10 ft. Lasts 10 mins.' },
    'Growth+': { cost: 0, description: 'Target plant life within 10 ft and choose an effect. A 20 ft tall climbable vine. A 5x5 area of difficult terrain. A flower that cures and prevents frightened within 10 ft. Lasts 10 mins. A rthorn grows up from the ground dealing 1d4 piercing damage.' },
    'Spire': { cost: 1, description: 'A 10 ft tall stalagmite grows from the ground within 10 ft. Creatures within 5 ft make a DEX save. On fail, 2d6 piercing damage, half damage on success. Spire provides full cover and can be scaled. Lasts for 1 min.' },
    'Clay Spire': { cost: 1, description: 'Choose stalagmite or stalagtite. A 10 ft tall stalagmite grows from the ground within 10 ft. Creatures within 5 ft make a DEX save. On fail, 2d6 piercing damage, half damage on success. Spire provides full cover and can be scaled. Lasts for 1 min. Can be used as a Reaction to being hit by a ranged attack. OR A stalactite falls at a point. Creatures within 5 ft make a DEX save. On fail, 3d6 bludgeoning damage, half on success. Creatures at the midpoint also take 1d6 piercing on fail.' },
    'Ragnarok': { cost: 2, description: 'Ranged spell attack, 60 ft. Conjure a massive ethereal sword to fall from the sky, dealing 2d12 piercing damage. Moving directly toward the sword doubles movement and ignores difficult terrain. If you have Extra Attack, you can make a weapon atatck as part of this action. Sword vanishes at the end of your turn.' },
    'Briar Growth': { cost: 0, description: '???' },
    'Iliad': { cost: 2, description: '???' },
    'Stone Spire': { cost: 1, description: '???' },
    'Odyssey': { cost: 2, description: '???' },
    // Mars
    'Flare': { cost: 0, description: 'Conjure a ball of flame to light a 30 ft radius around you. Lasts while you concentrate, up to an hour. You can thorw the flame with a Bonus Action to ignite flammable objects.' },
    'Flare+': { cost: 0, description: 'Conjure a ball of flame to light a 60 ft radius around you. Lasts while you concentrate, up to an hour. You can thorw the flame with a Bonus Action to ignite flammable objects or deal 1d6 fire damage to a target within 60 ft.' },
    'Burst': { cost: 1, description: 'Ranged spell attack on a crack or weakness, 20 ft. Trigger a small explosion, dealing 16 fire damage to the object and 2d8 fire damage in a 10 ft radius.' },
    'Mad Burst': { cost: 1, description: 'Choose destruction or propulsion. Destruction is a ranged spell attack on a crack or weakness, 20 ft. Trigger a small explosion, dealing 16 fire damage to the object and 2d8 fire damage in a 10 ft radius. OR Propulsion hits yourself with the explosion, dealing 1d8 fire damage to creatures within 10 ft and 1d8 to you, the lower value to you. You are propelled 40 ft in a direction. If you hit an obstacle you take 1d6 bludgeoning damage and make a DEX12 or fall prone. If you hit something smaller they take 1d10 bludgeoning damage and make a DEX13 or fall prone.' },
    'Beam': { cost: 2, description: 'Shoot a beam of light out to 40 ft. Creatures make a WIS save. On fail, 4d6 radiant damage and blinded until your next turn, half damage on success.' },
    'Flare Storm': { cost: 0, description: '???' },
    'Searing Beam': { cost: 2, description: '???' },
    'Fiery Burst': { cost: 1, description: '???' },
    'Cycle Beam': { cost: 2, description: '???' },
    // Jupiter
    'Mind Read': { cost: 0, description: 'Read the mind of a living thing or construct within 10 ft. You hear up to 2 sentences of their thoughts in a langauge you understand. Only works on a given target once per day.' },
    'Mind Read+': { cost: 0, description: 'Read the mind of a living thing or construct within 10 ft. You hear up to 3 sentences of their thoughts in a langauge you understand. Only works on a given target twice per day.' },
    'Whirlwind': { cost: 1, description: 'Create a 10 ft radius whirlwind centered at a point within 20 ft. Creatures in the area take 1d8 slashing damage and make a STR save or get thrown 10 ft away from the center and fall prone. Creatures that start their turn in or enter the whirlwind take 1d8 slashing damage.' },
    'Tornado': { cost: 1, description: 'Create a 10 ft radius whirlwind centered at a point within 30 ft. Creatures in the area take 1d8 slashing damahe and make a STR save or get thrown 10 ft away from the center and fall prone. You can move the tornado up to 20 ft with a Bonus Action and 1 PP. You can also float within the tornado, gaining +2 AC but -2 on attack rolls.' },
    'Storm Ray': { cost: 2, description: 'Call a series of lightning bolts to shoot down from the sky. Ranged spell attack on up to 3 targets within 30 ft, with advantage against targets made of or wearing metal. Deals 1d12 lightning damage and applies stunned until the start of your next turn.' },
    'Mind Link': { cost: 0, description: '???' },
    'Destruct Ray': { cost: 2, description: '???' },
    'Tempest': { cost: 1, description: '???' },
    'Plasma Ray': { cost: 2, description: '???' }
  }
  
  const adeptClassSpellList = {
    Paragon: [
      ['Healing Word', 'Ice Knife', 'Shape Water', 'Shield of Faith', 'Bless'],
      ['Calm Emotions', 'Lesser Restoration', 'Mass Healing Word', 'Water Breathing', 'Water Walk'],
      ['Aura of Purity', 'Awaken', 'Cone of Cold', 'Control Water', 'Greater Restoration'],
      ['Forbiddance', 'Freezing Sphere', 'Heal', "Heroes' Feast"],
      ['Mass Heal', 'Tsunami'],
    ],
    Gallant: [
      ['Booming Blade', 'Cure Wounds', 'Earth Tremor', 'Mold Earth', 'Sword Burst'],
      ['Aid', 'Conjure Barrage', 'Elemental Weapon', 'Prayer of Healing', 'Meld into Stone'],
      ['Aura of Life', 'Conjure Volley', 'Mass Cure Wounds', 'Stone Shape', 'Wall of Stone'],
      ['Flesh to Stone', 'Move Earth', 'Regenerate', 'Word of Recall'],
      ['Earthquake', 'Power Word Heal'],
    ],
    Warrior: [
      ['Bane', 'Blade Ward', 'Control Flames', 'Fire Bolt', 'Guiding Bolt'],
      ['Bestow Curse', 'Blinding Smite', 'Fireball', 'Ray of Enfeeblement', 'Scorching Ray'],
      ['Contagion', 'Fire Shield', 'Hold Monster', 'Wall of Fire', 'Guardian of Faith'],
      ['Divine Word', 'Fire Storm', 'Harm', 'Sunbeam'],
      ['Meteor Swarm', 'Sunburst'],
    ],
    Magister: [
      ['Expeditious Retreat', 'Guidance', 'Gust', 'Mage Armor', 'Shocking Grasp'],
      ['Blur', 'Dispel Magic', 'Gust of Wind', 'Lightning Arrow', 'Lightning Bolt'],
      ['Circle of Power', 'Confusion', 'Phantasmal Killer', 'Telepathic Bond', 'Wall of Force'],
      ['Chain Lightning', 'Sequester', 'Teleport', 'Wind Walk'],
      ['Feeblemind', 'Mind Blank'],
    ],
    Guardian: [
      ['Ensnaring Strike', 'Entangle', 'Hail of Thorns', 'Magic Stone', 'Shillelagh', 'Thorn Whip'],
      ['Barkskin', 'Revivify', 'Plant Growth', 'Remove Curse', 'Spike Growth'],
      ['Commune with Nature', 'Gaint Insect', 'Grasping Vine', 'Stoneskin', 'Tree Stride'],
      ['Globe of Invulnerability', 'Transport via Plants', 'Wall of Thorns'],
      ['Antimagic Field', 'Shapechange'],
    ],
    Luminier: [
      ['Acid Splash', 'Animal Friendship', 'Dancing Lights', 'Fog Cloud', 'Posion Spray', 'Shield'],
      ['Acid Arrow', 'Beacon of Hope', 'Branding Smite', 'Misty Step', 'Moonbeam'],
      ['Arcane Eye', 'Cloudkill', 'Freedom of Movement', 'Fount of Moonlight', 'Resilient Sphere'],
      ['Arcane Gate', 'Disintegrate', 'Prismatic Spray'],
      ['Holy Aura', 'Prismatic Wall'],
    ],
    Oracle: [
      ['Armor of Agathys', 'Frostbite', 'Ray of Frost', 'Lightning Lure', 'Thunderclap', 'Witch Bolt'],
      ['Call Lightning', 'Darkness', 'Mirror Image', 'Sleet Storm', 'Wind Wall'],
      ['Conjure Elemental', 'Divination', 'Ice Storm', 'Insect Plague', 'Storm of Radiance'],
      ['Reverse Gravity', 'True Seeing', 'Wall of Ice'],
      ['Control Weather', 'Storm of Vengeance'],
    ],
    Berserker: [
      ['Burning Hands', 'Create Bonfire', 'Hellish Rebuke', 'Sacred Flame', 'Thunderwave', 'Thunderous Smite'],
      ['Cloud of Daggers', 'Flame Blade', 'Shatter', 'Flaming Sphere', "Crusader's Mantle"],
      ['Banishing Smite', 'Destructive Wave', 'Dominate Person', 'Flame Strike', 'Staggering Smite'],
      ['Blade Barrier', 'Circle of Death', 'Delayed Blast Fireball'],
      ['Incendiary Cloud', 'Power Word Stun'],
    ],
    Conjurer: [
      ['Arms of Hadar', 'Chill Touch', 'Divine Favor', 'False Life', 'Hex', 'Heroism'],
      ['Animate Dead', 'Aura of Vitality', 'Speak with Dead', 'Vampiric Touch', 'Warding Bond'],
      ['Black Tentacles', 'Blight', 'Death Ward', 'Hallow', 'Raise Dead'],
      ['Create Undead', 'Finger of Death', 'Ressurection'],
      ['Power Word Kill', 'True Ressurection'],
    ],
    Illusionist: [
      ['Charm Person', 'Faerie Fire', 'Magic Missile', 'Mind Sliver', 'Minor Illusion', 'Sleep'],
      ["Arcanist's Magic Aura", 'Blink', 'Counterspell', 'Crown of Madness', 'Phantom Steed'],
      ['Dimension Door', 'Faithful Hound', 'Geas', 'Modify Memory', 'Polymorph'],
      ['Eyebite', 'Forcecage', 'Mass Suggestion'],
      ['True Polymorph', 'Time Stop'],
    ],
  };

  const getPreparedSpellsByLevel = (level) => {
    if (level >= 17) return [2,2,2,2,2]
    if (level >= 15) return [2,2,2,2,1]
    if (level >= 13) return [2,2,2,2,0]
    if (level >= 11) return [2,2,2,1,0]
    if (level >= 10) return [2,2,2,0,0]
    if (level >= 8) return [2,2,1,0,0]
    if (level >= 6) return [2,2,0,0,0]
    if (level >= 4) return [2,1,0,0,0]
    if (level >= 2) return [2,0,0,0,0]
    return [1,0,0,0,0]
  }
  const preparedSpells = getPreparedSpellsByLevel(level)
  const [chosenSpells, setChosenSpells] = useState(
    preparedSpells.map(count => Array(count).fill("")) // [["", "", ""], [""], [], etc.]
  )

  const dualClassMap = {
    'Mercury|Venus': 'Guardian',
    'Mars|Mercury': 'Luminier',
    'Jupiter|Mercury': 'Oracle',
    'Mars|Venus': 'Berserker',
    'Jupiter|Venus': 'Conjurer',
    'Jupiter|Mars': 'Illusionist'
  }
  const getDualClassName = (el1, el2) => {
    const key = [el1, el2].sort().join('|')
    return dualClassMap[key] || null
  }

  useEffect(() => {
    function calculateAdeptClasses() {
      let classes = []
      let tier = 1
      let baseDevotion = devotion[baseElement]
      let dual = false
      for (const el of elements) {
        if (el !== baseElement && devotion[el] > 0) dual = true
      }
      if (!dual) {
        classes = baseElement == 'Mercury' ? ['Paragon'] : baseElement == 'Venus' ? ['Gallant'] : baseElement == 'Mars' ? ['Warrior'] : ['Magister']
        tier = baseDevotion
      } else {
        for (const el of elements) {
          if (el !== baseElement) {
            let dev = devotion[el]
            if (dev > 0) {
              let diff = Math.abs(baseDevotion - dev)
              let total = baseDevotion + dev
              if (diff > 1) {
                total = total - diff + 1
              }
              if (total > tier) {
                classes = [getDualClassName(baseElement, el)]
                tier = total
              } else if (total == tier) {
                classes.push(getDualClassName(baseElement, el))
              }
            }
          }
        }
      }
      setAdeptClasses(classes)
      if (classes.length == 1) {
        setAdeptClass(classes[0])
      }
      setClassTier(tier)
      setChosenSpells(chosenClassSpells[adeptClass])
    }

    calculateAdeptClasses()
  }, [djinn, baseElement, djinnMode])

  useEffect(() => {
    setChosenSpells(preparedSpells.map(count => Array(count).fill("")));
  }, [adeptClass]);

  return (
    <div className={`App ${isPortrait ? 'portrait' : 'landscape'}`}>
      <h1>Adept Sheet</h1>
      
      <div className="layout">
        <section className="section combined-character-section">
          <div className="two-column">
            <div className="character-info">
            <h2>Character</h2>
            <label>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Level: {level}
                <button
                  onClick={() => setLevel(prev => Math.max(1, prev - 1))}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  −
                </button>
                <button
                  onClick={() => setLevel(prev => Math.min(20, prev + 1))}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  +
                </button>
              </h3>
            </label>
              <label>
              <h3>Base Element:</h3>
                <select value={baseElement} onChange={(e) => setBaseElement(e.target.value)}>
                  {elements.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
              </label>
              <h3>Devotions:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(devotion)
                  .filter(([_, count]) => count > 0)
                  .map(([element, count]) => (
                    <li
                      key={element}
                      style={{
                        backgroundImage: `url(${elementIcons[element]})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1rem 1rem',
                        backgroundPosition: '0 50%',
                        paddingLeft: '1.5rem', // leaves space for the icon
                        lineHeight: '1.5rem',
                      }}
                    >
                      {element}: {count}
                    </li>
                  ))}
              </ul>
              <h3>
              Adept Class:
                {adeptClasses.length > 1 ? (
                  <div>
                <select value={adeptClass} onChange={(e) => setAdeptClass(e.target.value)}>
                  {adeptClasses.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))} 
                </select>
                <p>Tier {classTier}</p>
                </div>
                ) : <span> {adeptClass} Tier {classTier}</span>}
              </h3>
            </div>

            <div className="djinn-selectors">
              <h2>Djinn</h2>
              {djinn.map((value, index) => {
                // Get list of other selected djinn to filter them out from options
                const alreadySelected = djinn.filter((_, i) => i !== index);

                // Filter available Djinn to exclude already selected ones (except the one in this slot)
                const availableOptions = availableDjinn.filter(
                  dj => !alreadySelected.includes(dj) || dj === value
                );

                return (
                  <div key={index}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                        width: '100%',
                      }}
                    >
                      <select
                        value={value}
                        onChange={(e) => {
                          const newDjinn = [...djinn];
                          newDjinn[index] = e.target.value;
                          setDjinn(newDjinn);
                        }}
                        style={{
                          flex: '0 0 40%', // Makes it take up half width and prevents it from growing
                          maxWidth: '40%', // Optional, ensures it doesn’t overflow
                          minWidth: '120px', // Optional, to keep it readable on small screens
                        }}
                      >
                        <option value="">None</option>
                        {availableOptions.map((dj) => (
                          <option key={dj} value={dj}>
                            {dj}
                          </option>
                        ))}
                      </select>

                      {value && (
                        <>
                          <span style={{ fontStyle: 'italic', marginLeft: '0.5rem' }}>
                            {djinnMode[getDjinnIndex(value)]}
                          </span>

                          <div style={{ flexGrow: 1 }} /> {/* Spacer to push button right */}

                          <button
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              lineHeight: 1,
                            }}
                            onClick={() =>
                              toggleDjinnMode(value)
                            }
                          >
                            {djinnMode[getDjinnIndex(value)] === 'Set' ? 'Unleash' : 'Set'}
                          </button>

                          {djinnMode[getDjinnIndex(value)] === 'Standby' ? (<button
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              marginLeft: '0.5rem',
                              lineHeight: 1,
                            }}
                            onClick={() =>
                              summonWithDjinn(value)
                            }
                          >
                            Summon
                          </button>) : null}
                        </>
                      )}
                    </div>

                    {value ? (
                      <div>
                        <p className="three-column-text">
                          <span>
                            <strong>Element: </strong>
                            <span style={{ color: elementColors[djinnDetails[value].element] }}>
                              {djinnDetails[value].element}
                            </span>
                          </span>
                          <span><strong>Damage Type: </strong> {djinnDetails[value].damage}</span>
                          <span><strong>Skill Bonus: </strong> {djinnDetails[value].skill}</span>
                        </p>
                        <p style={{ fontSize: '0.8rem' }}><strong>Bond Skill: </strong> {djinnDetails[value].bond}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Psynergy</h2>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Psynergy Points: {currentPP} / {pp}
            <button
              onClick={() => setCurrentPP(prev => Math.min(pp, prev + 2))}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                lineHeight: 1,
              }}
            >
              Short Rest
            </button>
            {currentPP < pp &&
            <button
              onClick={() => setCurrentPP(pp)}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                lineHeight: 1,
              }}
            >
              Reset
            </button>}
          </h3>

          <h3>Base Psynergy</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
            {basePsynergy.map((spell, index) => (
              <li
                key={spell}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start', // <-- aligns top instead of center
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {currentPP >= index && index > 0 && (
                  <button
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      marginTop: '0.25rem',
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => {
                      setCurrentPP(prev => Math.max(0, prev - index));
                    }}
                  >
                    Cast
                  </button>
                )}
                <div>
                  <span
                    style={{
                      color: elementColors[baseElement],
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <strong>{spell} ({psynergyDetails[spell].cost}):</strong>
                  </span>{' '}
                  <span>{psynergyDetails[spell].description}</span>
                </div>
              </li>
            ))}
          </ul>

          <h3>Prepared {adeptClass} Psynergy</h3>

          <div className="spell-tiers">
            {preparedSpells.map((count, tierIndex) => (
              <div key={tierIndex} className="spell-tier-column">
                <h4 style={{ textAlign: 'center' }}>Tier {tierIndex + 1}</h4>
                {count > 0 ? (
                  [...Array(count)].map((_, slotIndex) => {
                    let selected = chosenSpells[tierIndex]?.[slotIndex] || "";
                    if (chosenClassSpells[adeptClass][tierIndex][slotIndex]) {
                      selected = chosenClassSpells[adeptClass][tierIndex][slotIndex]
                    }
                    const alreadyChosenInTier = chosenSpells[tierIndex].filter((_, i) => i !== slotIndex);
                    const availableSpells = adeptClassSpellList[adeptClass]?.[tierIndex]?.filter(
                      (spell) => !alreadyChosenInTier.includes(spell) || spell === selected
                    ) || [];

                    return (
                      <div key={slotIndex} style={{ marginBottom: '1rem' }}>
                        <select
                          value={selected}
                          onChange={(e) => {
                            const newSpells = [...chosenSpells];
                            newSpells[tierIndex] = [...newSpells[tierIndex]];
                            newSpells[tierIndex][slotIndex] = e.target.value;
                            setChosenSpells(newSpells);
                            const newClassSpells = chosenClassSpells
                            newClassSpells[adeptClass][tierIndex] = newSpells[tierIndex]
                            setChosenClassSpells(newClassSpells)
                          }}
                          style={{ width: '100%', marginBottom: '0.25rem' }}
                        >
                          <option value="" disabled>Select a spell</option>
                          {availableSpells.map((spell, i) => (
                            <option key={i} value={spell}>{spell}</option>
                          ))}
                        </select>
                    
                        {selected && currentPP >= tierIndex + 1 && (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                marginTop: '0.25rem',
                                lineHeight: 1,
                              }}
                              onClick={() => {
                                setCurrentPP(currentPP - (tierIndex + 1))
                              }}
                            >
                              Cast
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div style={{ height: '2.5rem' }}></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
