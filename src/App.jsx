import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [level, setLevel] = useState(1)
  const [baseElement, setBaseElement] = useState('Mercury')
  const [djinn, setDjinn] = useState(['', '', '', ''])
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)")
    const handler = () => setIsPortrait(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const elements = ['Mercury', 'Venus', 'Mars', 'Jupiter']
  const placeholderDjinn = ['Mercury Djinn', 'Venus Djinn', 'Mars Djinn', 'Jupiter Djinn']

  const devotion = {
    Mercury: 0,
    Venus: 0,
    Mars: 0,
    Jupiter: 0
  }

  devotion[baseElement] += 1
  djinn.forEach(d => {
    if (d) {
      const element = d.split(' ')[0]
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
  const preparedSpells = Math.floor(level / 2) + 1
  const basePsynergy = ['Move', 'Cure', 'Flare']
  const availableSpells = ['Fireball', 'Healing Word', 'Lightning Bolt', 'Entangle']

  return (
    <div className={`App ${isPortrait ? 'portrait' : 'landscape'}`}>
      <h1>Adept Sheet</h1>
      
      <div className="layout">
        <section className="section">
          <h2>Character Info</h2>
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
        </section>

        <section className="section">
          <h2>Djinn</h2>
          {djinn.map((value, index) => (
            <div key={index}>
              <label>Djinn Slot {index + 1}:</label>
              <select
                value={value}
                onChange={(e) => {
                  const newDjinn = [...djinn]
                  newDjinn[index] = e.target.value
                  setDjinn(newDjinn)
                }}
              >
                <option value="">None</option>
                {placeholderDjinn.map(dj => (
                  <option key={dj} value={dj}>{dj}</option>
                ))}
              </select>
            </div>
          ))}
        </section>

        <section className="section">
          <h2>Devotion</h2>
          <ul>
            {Object.entries(devotion).map(([element, count]) => (
              <li key={element}>{element}: {count}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Psynergy</h2>
          <p><strong>PP:</strong> {pp}</p>
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
