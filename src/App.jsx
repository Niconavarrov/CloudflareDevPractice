import { useState } from 'react'
import './App.css'

function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)

  const [water, setWater] = useState(null)

  // ratio of recommended water against double the recommended (max)
  // currently we're showing recommended amount relative to twice that value
  const waterRatio = water ? Math.min(water / (2 * water), 1) : 0

  const calculateBMI = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // convert cm to meters
    if (!w || !h) return
    const result = w / (h * h)
    setBmi(result.toFixed(2))
    // water intake: 35 ml per kg
    const waterMl = w * 35
    setWater(waterMl)
  }

  const getCategory = (value) => {
    const v = parseFloat(value)
    if (v < 18.5) return 'Bajo peso'
    if (v < 25) return 'Normal'
    if (v < 30) return 'Sobrepeso'
    return 'Obesidad'
  }

  const category = bmi !== null ? getCategory(bmi) : null

  return (
    <div className='app'>
      <h1>Calculadora de Habitos</h1>
      <div className='bmi-wrapper'>
        <div className='bmi-calculator'>
          <div className='field'>
            <label htmlFor='weight'>Peso (kg):</label>
            <input
              id='weight'
              type='number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder='ej. 70'
            />
          </div>
          <div className='field'>
            <label htmlFor='height'>Altura (cm):</label>
            <input
              id='height'
              type='number'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder='ej. 175'
            />
          </div>
          <button onClick={calculateBMI}>Calcular</button>
          {bmi !== null && (
            <p className='result'>Tu IMC es: {bmi} ({category})</p>
          )}
        </div>

        {bmi !== null && (
          <table className='bmi-table'>
            <thead>
              <tr>
                <th>Rango IMC</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <tr className={category === 'Bajo peso' ? 'bajo' : ''}>
                <td>&lt; 18.5</td>
                <td>Bajo peso</td>
              </tr>
              <tr className={category === 'Normal' ? 'normal' : ''}>
                <td>18.5 - 24.9</td>
                <td>Normal</td>
              </tr>
              <tr className={category === 'Sobrepeso' ? 'sobrepeso' : ''}>
                <td>25 - 29.9</td>
                <td>Sobrepeso</td>
              </tr>
              <tr className={category === 'Obesidad' ? 'obesidad' : ''}>
                <td>&gt;= 30</td>
                <td>Obesidad</td>
              </tr>
            </tbody>
          </table>
        )}
        {bmi !== null && water !== null && (
          <div className='water-info'>
            <p>
              Necesitas {water / 1000} L de agua diarios.
            </p>
            <div className='water-bar-container'>
              <span
                className='water-label'
                style={{ bottom: `${waterRatio * 100}%`, transform: 'translateY(-50%)' }}
              >
                {Number((water / 1000).toFixed(2))}L
              </span>
              <div
                className='water-bar'
                style={{ height: `${waterRatio * 100}%` }}
              ></div>
            </div>
            <p style={{ fontSize: '1rem' }}>
              (35 ml × {weight} kg de peso corporal)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
