import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [level, setLevel] = useState(1)
  const [baseElement, setBaseElement] = useState('Mercury')
  const [djinn, setDjinn] = useState(['', '', '', ''])
  const [adeptClass, setAdeptClass] = useState('Paragon')
  const [adeptClasses, setAdeptClasses] = useState(['Paragon'])
  const [classTier, setClassTier] = useState(1)
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)")
    const handler = () => setIsPortrait(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const elements = ['Mercury', 'Venus', 'Mars', 'Jupiter']
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

  const devotion = {
    Mercury: 0,
    Venus: 0,
    Mars: 0,
    Jupiter: 0
  }

  devotion[baseElement] += 1
  djinn.forEach(d => {
    if (d) {
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
    'Whirlwind': { cost: 1, description: 'Create a 10 ft radius whirlwind centered at a point within 20 ft. Creatures in the area take 1d8 slashing damahe and make a STR save or get thrown 10 ft away from the center and fall prone. Creatures that start their turn in or enter the whirlwind take 1d8 slashing damage.' },
    'Tornado': { cost: 1, description: 'Create a 10 ft radius whirlwind centered at a point within 30 ft. Creatures in the area take 1d8 slashing damahe and make a STR save or get thrown 10 ft away from the center and fall prone. You can move the tornado up to 20 ft with a Bonus Action and 1 PP. You can also float within the tornado, gaining +2 AC but -2 on attack rolls.' },
    'Storm Ray': { cost: 2, description: 'Call a series of lightning bolts to shoot down from the sky. Ranged spell attack on up to 3 targets within 30 ft, with advantage against targets made of or wearing metal. Deals 1d12 lightning damage and applies stunned until the start of your next turn.' },
    'Mind Link': { cost: 0, description: '???' },
    'Destruct Ray': { cost: 2, description: '???' },
    'Tempest': { cost: 1, description: '???' },
    'Brain Storm': { cost: 2, description: '???' }
  }
  
  const availableSpells = ['Fireball', 'Healing Word', 'Lightning Bolt', 'Entangle']
  const preparedSpells = Math.floor(level / 2) + 1

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
    }

    calculateAdeptClasses()
  }, [djinn, baseElement])

  return (
    <div className={`App ${isPortrait ? 'portrait' : 'landscape'}`}>
      <h1>Adept Sheet</h1>
      
      <div className="layout">
        <section className="section combined-character-section">
          
          <div className="two-column">
            <div className="character-info">
            <h2>Character</h2>
            <label>
              <h3>Level:</h3>
              <input
                type="number"
                min="1"
                max="20"
                value={level}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '') {
                    setLevel('')
                  } else {
                    setLevel(parseInt(val))
                  }
                }}
                onBlur={() => {
                  if (level === '' || isNaN(level)) {
                    setLevel(1)
                  }
                }}
              />
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
              <ul>
                {Object.entries(devotion).map(([element, count]) => (
                  <li key={element}>{element}: {count}</li>
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
              {djinn.map((value, index) => (
                <div key={index}>
                  <select
                    value={value}
                    onChange={(e) => {
                      const newDjinn = [...djinn]
                      newDjinn[index] = e.target.value
                      setDjinn(newDjinn)
                    }}
                  >
                    <option value="">None</option>
                    {availableDjinn.map(dj => (
                      <option key={dj} value={dj}>{dj}</option>
                    ))}
                  </select>
                  {value ? (
                    <div>
                      <p className="three-column-text">
                        <span><strong>Element: </strong> {djinnDetails[value].element}</span>
                        <span><strong>Damage Type: </strong> {djinnDetails[value].damage}</span>
                        <span><strong>Skill Bonus: </strong> {djinnDetails[value].skill}</span>
                      </p>
                      <p><strong>Bond Skill: </strong> {djinnDetails[value].bond}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Psynergy</h2>
          <p><strong>Psynergy Points:</strong> {pp}</p>
          <p><strong>Psynergy You Can Prepare:</strong> {preparedSpells}</p>

          <h3>Base Psynergy</h3>
          <ul>
            {basePsynergy.map(spell => (
              <li key={spell}><strong>{spell} ({psynergyDetails[spell].cost}):</strong> {psynergyDetails[spell].description}</li>
            ))}
          </ul>

          <h3>Prepared {adeptClass} Psynergy</h3>

          {[...Array(preparedSpells)].map((_, i) => (
            <select key={i} defaultValue="">
              <option value="" disabled>Select a spell</option>
              {availableSpells.map(spell => (
                <option key={spell} value={spell}>{spell}</option>
              ))}
            </select>
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
