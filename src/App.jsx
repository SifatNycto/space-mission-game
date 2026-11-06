import { useEffect, useState } from 'react'
import Spacecraft3D from './components/Spacecraft3D'
import './App.css'

function App() {
  const [selectedMission, setSelectedMission] = useState(null)
  const [simulationResult, setSimulationResult] = useState(null)
  const [launchStatus, setLaunchStatus] = useState('idle')
  const [countdown, setCountdown] = useState(10)
  const [spacecraft, setSpacecraft] = useState({
    bus: 'standard',
    instrument: 'camera',
    propulsion: 'chemical',
    power: 'solar',
    communication: 'high-gain',
  })

  
  // COMPONENT ENGINEERING SPECIFICATIONS
  // All values are illustrative game-design assumptions.

  const componentSpecs = {
    bus: {
      standard: {
        name: 'Standard bus',
        mass: 120,
        power: 35,
        cost: 18,
      },
      lightweight: {
        name: 'Lightweight bus',
        mass: 75,
        power: 25,
        cost: 15,
      },
      heavy: {
        name: 'Heavy-duty bus',
        mass: 190,
        power: 50,
        cost: 25,
      },
    },

    instrument: {
      camera: {
        name: 'High-resolution camera',
        mass: 25,
        power: 45,
        cost: 12,
      },
      spectrometer: {
        name: 'Spectrometer',
        mass: 35,
        power: 60,
        cost: 18,
      },
      radar: {
        name: 'Scientific radar',
        mass: 55,
        power: 90,
        cost: 24,
      },
    },

    propulsion: {
      chemical: {
        name: 'Chemical propulsion',
        mass: 80,
        power: 10,
        cost: 15,
      },
      electric: {
        name: 'Electric propulsion',
        mass: 55,
        power: 35,
        cost: 22,
      },
      'cold-gas': {
        name: 'Cold gas propulsion',
        mass: 30,
        power: 5,
        cost: 8,
      },
    },

    power: {
      solar: {
        name: 'Solar panels',
        mass: 45,
        generation: 180,
        cost: 14,
      },
      'advanced-solar': {
        name: 'Advanced solar panels',
        mass: 60,
        generation: 280,
        cost: 22,
      },
      rtg: {
        name: 'Radioisotope power system',
        mass: 70,
        generation: 140,
        cost: 35,
      },
    },

    communication: {
      'high-gain': {
        name: 'High-gain antenna',
        mass: 25,
        power: 30,
        cost: 10,
      },
      'medium-gain': {
        name: 'Medium-gain antenna',
        mass: 15,
        power: 18,
        cost: 7,
      },
      'low-gain': {
        name: 'Low-gain antenna',
        mass: 8,
        power: 10,
        cost: 4,
      },
    },
  }

  // INITIAL MISSION BUDGET (MILLION USD)
  const missionBudget = 100


  // CALCULATE SPACECRAFT RESOURCES

  const totalMass =
    componentSpecs.bus[spacecraft.bus].mass +
    componentSpecs.instrument[spacecraft.instrument].mass +
    componentSpecs.propulsion[spacecraft.propulsion].mass +
    componentSpecs.power[spacecraft.power].mass +
    componentSpecs.communication[spacecraft.communication].mass

  const totalPowerUse =
    componentSpecs.bus[spacecraft.bus].power +
    componentSpecs.instrument[spacecraft.instrument].power +
    componentSpecs.propulsion[spacecraft.propulsion].power +
    componentSpecs.communication[spacecraft.communication].power

  const powerGeneration =
    componentSpecs.power[spacecraft.power].generation

  const powerBalance = powerGeneration - totalPowerUse

  const totalCost =
    componentSpecs.bus[spacecraft.bus].cost +
    componentSpecs.instrument[spacecraft.instrument].cost +
    componentSpecs.propulsion[spacecraft.propulsion].cost +
    componentSpecs.power[spacecraft.power].cost +
    componentSpecs.communication[spacecraft.communication].cost

  const remainingBudget = missionBudget - totalCost

  // MISSION-SPECIFIC MASS LIMITS
  const missionMassLimit = selectedMission === 'moon' ? 350 : 400

  const massAvailable = totalMass <= missionMassLimit


  
  // RUN MISSION SIMULATION
  const runSimulation = () => {
    const failureReasons = []

    if (powerBalance < 0) {
      failureReasons.push(
        `Insufficient power: ${Math.abs(powerBalance)} W missing.`
      )
    }

    if (remainingBudget < 0) {
      failureReasons.push(
        `Budget exceeded by $${Math.abs(remainingBudget)}M.`
      )
    }

    if (!massAvailable) {
      failureReasons.push(
        `Spacecraft exceeds the mission mass limit by ${totalMass - missionMassLimit} kg.`
      )
    }

    if (failureReasons.length > 0) {
      setSimulationResult({
        success: false,
        message: failureReasons.join(' '),
      })
      return
    }

    setSimulationResult({
      success: true,
      message: 'Mission ready! All engineering requirements satisfied.',
    })
  }

  // START LAUNCH PREPARATION
  const startLaunch = () => {
    if (!simulationResult || !simulationResult.success) {
      return
    }

    setCountdown(10)
    setLaunchStatus('preparing')
  }


  // AUTOMATIC LAUNCH COUNTDOWN
  useEffect(() => {
    if (launchStatus === 'preparing') {
      const preparationTimer = setTimeout(() => {
        setLaunchStatus('countdown')
      }, 2000)

      return () => clearTimeout(preparationTimer)
    }

    if (launchStatus === 'countdown') {
      const countdownTimer = setInterval(() => {
        setCountdown((previousCount) => {
          if (previousCount <= 1) {
            setLaunchStatus('launched')
            return 0
          }

          return previousCount - 1
        })
      }, 1000)

      return () => clearInterval(countdownTimer)
    }
  }, [launchStatus])


  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">✦</span>
          ORBITFORGE
        </a>

        <nav className="navigation">
          <a href="#missions">Missions</a>
          <a href="#about">About</a>
        </nav>

        <span className="status">
          <span className="status-dot"></span>
          SIMULATION ONLINE
        </span>
      </header>

      <section className="hero-section" id="about">
        <div className="hero-content">
          <p className="eyebrow">YOUR MISSION. YOUR UNIVERSE.</p>

          <h1>
            The next frontier
            <br />
            is <span>yours to design.</span>
          </h1>

          <p className="hero-description">
            Design a spacecraft, manage limited resources, and discover how
            your engineering decisions shape the success of a space mission.
          </p>

          <a className="primary-button" href="#missions">
            Explore missions <span>↗</span>
          </a>

          <div className="hero-facts">
            <div>
              <strong>01</strong>
              <span>Choose a mission</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Engineer your craft</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Test your strategy</span>
            </div>
          </div>
        </div>

        <div className="planet-scene" aria-label="Illustration of a planet">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="planet">
            <div className="planet-highlight"></div>
            <div className="planet-crater crater-one"></div>
            <div className="planet-crater crater-two"></div>
            <div className="planet-crater crater-three"></div>
          </div>
          <div className="moon"></div>
          <span className="star star-one">✦</span>
          <span className="star star-two">✧</span>
          <span className="star star-three">✦</span>
          <span className="scene-label">DEEP SPACE / 001</span>
        </div>
      </section>

      <section className="missions-section" id="missions">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MISSION CONTROL</p>
            <h2>Where will you go?</h2>
          </div>
          <span className="section-count">01 — SELECT YOUR OBJECTIVE</span>
        </div>

        <div className="mission-grid">
          <article className="mission-card">
            <div className="mission-art lunar-art">
              <span className="mission-number">MISSION 01</span>
              <div className="mini-moon"></div>
              <span className="art-label">LUNAR EXPLORATION</span>
            </div>
            <div className="mission-info">
              <div className="mission-type">ROBOTIC / SURFACE</div>
              <h3>Echoes of the Moon</h3>
              <p>
                Design an orbiter to investigate the lunar south pole and
                search for signs of water ice.
              </p>
              <div className="mission-meta">
                <span>DIFFICULTY <b>MODERATE</b></span>
                <span>RISK <b>MEDIUM</b></span>
              </div>
              <button
                className="mission-button"
                type="button"
                onClick={() => setSelectedMission('moon')}
              >
                Select Moon Mission <span>↗</span>
              </button>
            </div>
          </article>

          <article className="mission-card">
            <div className="mission-art mars-art">
              <span className="mission-number">MISSION 02</span>
              <div className="mini-mars"></div>
              <span className="art-label">PLANETARY SCIENCE</span>
            </div>

            <div className="mission-info">
              <div className="mission-type">ROBOTIC / ORBITER</div>
              <h3>Red Planet Survey</h3>
              <p>
                Plan an orbital mission to study the Martian atmosphere and
                map its surface.
              </p>
              <div className="mission-meta">
                <span>DIFFICULTY <b>CHALLENGING</b></span>
                <span>RISK <b>HIGH</b></span>
              </div>

              <button
                className="mission-button"
                type="button"
                onClick={() => setSelectedMission('mars')}
              >
                Select Mars Mission <span>↗</span>
              </button>
            </div>
          </article>

        </div>
      </section>

      {/* SELECTED MISSION BRIEFING */}
      {selectedMission && (
        <section className="briefing-section" id="briefing">
          <p className="eyebrow">MISSION BRIEFING</p>

          <h2>
            {selectedMission === 'moon'
              ? 'Echoes of the Moon'
              : 'Red Planet Survey'}
          </h2>

          <p>
            {selectedMission === 'moon'
              ? 'Your objective is to investigate the lunar south pole and search for signs of water ice.'
              : 'Your objective is to study the Martian atmosphere and map the planet surface.'}
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() => setSelectedMission(null)}
          >
            Back to missions <span>↗</span>
          </button>
        </section>
      )}

      
      {/* SPACECRAFT DESIGNER */}
      {selectedMission && (
        <section className="designer-section" id="designer">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ENGINEERING BAY</p>
              <h2>Design your spacecraft</h2>
            </div>
            <span className="section-count">02 — SPACECRAFT CONFIGURATION</span>
          </div>

          <p className="designer-description">
            Choose the components for your mission. Every engineering
            decision affects your spacecraft.
          </p>

          <div className="designer-layout">
            <div className="component-panel">
              <h3>Spacecraft components</h3>

              <label htmlFor="bus">Spacecraft bus</label>
              <select
                id="bus"
                value={spacecraft.bus}
                onChange={(e) => {
                  setSpacecraft({ ...spacecraft, bus: e.target.value })
                  setSimulationResult(null)
                  setLaunchStatus('idle')
                }}
              >
                <option value="standard">Standard bus</option>
                <option value="lightweight">Lightweight bus</option>
                <option value="heavy">Heavy-duty bus</option>
              </select>

              <label htmlFor="instrument">Scientific instrument</label>
              <select
                id="instrument"
                value={spacecraft.instrument}
                onChange={(e) => {
                  setSpacecraft({ ...spacecraft, instrument: e.target.value })
                  setSimulationResult(null)
                  setLaunchStatus('idle')
                }}
              >
                <option value="camera">High-resolution camera</option>
                <option value="spectrometer">Spectrometer</option>
                <option value="radar">Scientific radar</option>
              </select>

              <label htmlFor="propulsion">Propulsion system</label>
              <select
                id="propulsion"
                value={spacecraft.propulsion}
                onChange={(e) => {
                  setSpacecraft({ ...spacecraft, propulsion: e.target.value })
                  setSimulationResult(null)
                  setLaunchStatus('idle')
                }}
              >
                <option value="chemical">Chemical propulsion</option>
                <option value="electric">Electric propulsion</option>
                <option value="cold-gas">Cold gas propulsion</option>
              </select>

              <label htmlFor="power">Power system</label>
              <select
                id="power"
                value={spacecraft.power}
                onChange={(e) => {
                  setSpacecraft({ ...spacecraft, power: e.target.value })
                  setSimulationResult(null)
                  setLaunchStatus('idle')
                }}
              >
                <option value="solar">Solar panels</option>
                <option value="advanced-solar">Advanced solar panels</option>
                <option value="rtg">Radioisotope power system</option>
              </select>

              <label htmlFor="communication">Communication system</label>
              <select
                id="communication"
                value={spacecraft.communication}
                onChange={(e) => {
                  setSpacecraft({
                    ...spacecraft,
                    communication: e.target.value,
                  })
                  setSimulationResult(null)
                  setLaunchStatus('idle')
                }}
              >
                <option value="high-gain">High-gain antenna</option>
                <option value="medium-gain">Medium-gain antenna</option>
                <option value="low-gain">Low-gain antenna</option>
              </select>
            </div>

            <div className="spacecraft-preview">
              <p className="eyebrow">LIVE 3D SPACECRAFT</p>

              <div className="spacecraft-3d-viewer">
                <Spacecraft3D spacecraft={spacecraft} />
              </div>

              <h3>Mission spacecraft</h3>
              <p>Rotate, zoom and inspect your spacecraft.</p>

              <div className="configuration-list">
                <div>
                  <span>BUS</span>
                  <strong>{spacecraft.bus}</strong>
                </div>
                <div>
                  <span>INSTRUMENT</span>
                  <strong>{spacecraft.instrument}</strong>
                </div>
                <div>
                  <span>PROPULSION</span>
                  <strong>{spacecraft.propulsion}</strong>
                </div>
                <div>
                  <span>POWER</span>
                  <strong>{spacecraft.power}</strong>
                </div>
                <div>
                  <span>COMMUNICATION</span>
                  <strong>{spacecraft.communication}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE RESOURCE DASHBOARD */}
          <div className="resource-dashboard">
            <p className="eyebrow">ENGINEERING TELEMETRY</p>
            <h3>Spacecraft resource analysis</h3>

            <div className="resource-grid">
              <div className="resource-card">
                <span>TOTAL MASS</span>
                <strong>{totalMass} kg</strong>
              </div>

              <div className="resource-card">
                <span>POWER CONSUMPTION</span>
                <strong>{totalPowerUse} W</strong>
              </div>

              <div className="resource-card">
                <span>POWER GENERATION</span>
                <strong>{powerGeneration} W</strong>
              </div>

              <div className="resource-card">
                <span>POWER BALANCE</span>
                <strong className={powerBalance >= 0 ? 'positive' : 'negative'}>
                  {powerBalance > 0 ? '+' : ''}{powerBalance} W
                </strong>
              </div>

              <div className="resource-card">
                <span>ESTIMATED COST</span>
                <strong>${totalCost}M</strong>
              </div>

              <div className="resource-card">
                <span>REMAINING BUDGET</span>
                <strong className={remainingBudget >= 0 ? 'positive' : 'negative'}>
                  ${remainingBudget}M
                </strong>
              </div>
            </div>
            {/* ENGINEERING STATUS */}
            <div className="engineering-alerts">
              {powerBalance < 0 && (
                <p className="alert danger">
                  ⚠ Insufficient power: Your spacecraft needs {Math.abs(powerBalance)} W
                  more power.
                </p>
              )}

              {remainingBudget < 0 && (
                <p className="alert danger">
                  ⚠ Budget exceeded: You are ${Math.abs(remainingBudget)}M over budget.
                </p>
              )}

              {!massAvailable && (
                <p className="alert danger">
                  ⚠ Mass limit exceeded: Your spacecraft is {totalMass - missionMassLimit} kg overweight.
                </p>
              )}

              {powerBalance >= 0 &&
                remainingBudget >= 0 &&
                massAvailable && (
                <p className="alert success">
                  ✓ Engineering status: All resource limits are satisfied.
                </p>
              )}
            </div>
            <button
            className="primary-button"
            type="button"
            onClick={runSimulation}
            style={{ marginTop: '20px', cursor: 'pointer' }}
          >
            Launch Mission Simulation 🚀
          </button>

          {simulationResult && (
            <div className={`alert ${simulationResult.success ? 'success' : 'danger'}`}>
              {simulationResult.message}
            </div>
          )}
          {simulationResult?.success && launchStatus === 'idle' && (
            <button
              className="primary-button"
              type="button"
              onClick={startLaunch}
              style={{ marginTop: '15px', cursor: 'pointer' }}
            >
              Begin Launch Preparation 🚀
            </button>
          )}

          {launchStatus === 'preparing' && (
            <div className="alert success">
              ✓ Launch preparation initiated. Checking spacecraft systems...
            </div>
          )}

          {launchStatus === 'countdown' && (
            <div className="alert success">
              <h2>LAUNCH COUNTDOWN</h2>
              <h1>{countdown}</h1>
              <p>Preparing for liftoff...</p>
            </div>
          )}

          {launchStatus === 'launched' && (
            <div className="launch-animation">
              <div className="launch-stars">✦　·　✧　·　✦</div>

              <div className="launch-spacecraft">🛰️</div>

              <h2>SPACECRAFT LAUNCHED!</h2>
              <p>Your spacecraft has successfully lifted off.</p>

              <div className="launch-trail"></div>
            </div>
          )}
          </div>
        </section>
      )}


      <footer className="footer">
        <span>ORBITFORGE © 2026</span>
        <span>BUILT TO EXPLORE THE IMPOSSIBLE.</span>
      </footer>
    </main>
  )
}

export default App
