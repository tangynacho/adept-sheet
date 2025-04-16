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
    'Flint': { element: 'Venus', damage: 'Thunder', skill: 'Survival', bond: 'Enemies in a 30ft radius are knocked prone and deafened until the start of your next turn.' },
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
    'Douse': { cost: 0, description: '' },
    'Douse+': { cost: 0, description: '' },
    'Frost': { cost: 1, description: '' },
    'Tundra': { cost: 1, description: '' },
    'Prism': { cost: 2, description: '' },
    'Drench': { cost: 0, description: '' },
    'Hail Prism': { cost: 2, description: '' },
    'Glacier': { cost: 1, description: '' },
    'Freeze Prism': { cost: 2, description: '' },
    // Venus
    'Growth': { cost: 0, description: '' },
    'Growth+': { cost: 0, description: '' },
    'Spire': { cost: 1, description: '' },
    'Clay Spire': { cost: 1, description: '' },
    'Ragnarok': { cost: 2, description: '' },
    'Briar Growth': { cost: 0, description: '' },
    'Iliad': { cost: 2, description: '' },
    'Stone Spire': { cost: 1, description: '' },
    'Odyssey': { cost: 2, description: '' },
    // Mars
    'Flare': { cost: 0, description: '' },
    'Flare+': { cost: 0, description: '' },
    'Burst': { cost: 1, description: '' },
    'Mad Burst': { cost: 1, description: '' },
    'Beam': { cost: 2, description: '' },
    'Flare Storm': { cost: 0, description: '' },
    'Searing Beam': { cost: 2, description: '' },
    'Fiery Burst': { cost: 1, description: '' },
    'Cycle Beam': { cost: 2, description: '' },
    // Jupiter
    'Mind Read': { cost: 0, description: '' },
    'Mind Read+': { cost: 0, description: '' },
    'Whirlwind': { cost: 1, description: '' },
    'Tornado': { cost: 1, description: '' },
    'Storm Ray': { cost: 2, description: '' },
    'Mind Link': { cost: 0, description: '' },
    'Destruct Ray': { cost: 2, description: '' },
    'Tempest': { cost: 1, description: '' },
    'Brain Storm': { cost: 2, description: '' }
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
                Level:
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={level}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                />
              </label>
              <label>
                Base Element:
                <select value={baseElement} onChange={(e) => setBaseElement(e.target.value)}>
                  {elements.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
              </label>
              <div>Devotions:</div>
              <ul>
                {Object.entries(devotion).map(([element, count]) => (
                  <li key={element}>{element}: {count}</li>
                ))}
              </ul>
              
              <label>
                Adept Class:
                {adeptClasses.length > 1 ? (
                <select value={adeptClass} onChange={(e) => setAdeptClass(e.target.value)}>
                  {adeptClasses.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
                ) : <span> {adeptClass}</span>}
              </label>
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
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Psynergy</h2>
          <p><strong>Psynergy Points:</strong> {pp}</p>
          <p><strong>Spells You Can Prepare:</strong> {preparedSpells}</p>

          <h3>Base Psynergy</h3>
          <ul>
            {basePsynergy.map(spell => (
              <li key={spell}>{spell}</li>
            ))}
          </ul>

          <h3>Adept Class</h3>
          <p><em>Adept Class</em></p>

          <h3>Prepared Psynergy</h3>
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
