import { useState } from 'react'
import './App.css'

function App() {
  const initialButtons = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    text: `Button ${i + 1}`,
    color: '#eee',
    fontSize: '1rem',
    disabled: false,
  }))

  const [buttons, setButtons] = useState(initialButtons)
  const [bgColor, setBgColor] = useState('#999999')
  const [darkMode, setDarkMode] = useState(false)
  const [title, setTitle] = useState('Mi Aplicación')
  const [description, setDescription] =
    useState('Aquí hay un grid de botones con diferentes acciones.')

  const randomColor = () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')

  const handleButtonAction = (id) => {
    setButtons((prev) => {
      const newBtns = [...prev]
      const idx = newBtns.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const btn = { ...newBtns[idx] }
      switch (id) {
        case 0:
          btn.color = randomColor()
          break
        case 1:
          btn.fontSize = parseFloat(btn.fontSize) * 1.2 + 'rem'
          break
        case 2:
          btn.fontSize = parseFloat(btn.fontSize) * 0.8 + 'rem'
          break
        case 3:
          btn.text = 'Hola ' + Math.random().toString(36).substring(2, 7)
          break
        case 4:
          btn.text = `Button ${id + 1}`
          break
        case 5:
          setBgColor(randomColor())
          break
        case 6:
          setDarkMode((m) => !m)
          break
        case 7:
          setTitle('Título ' + Math.random().toString(36).substring(2, 5))
          break
        case 8:
          setTitle('Mi Aplicación')
          break
        case 9:
          setDescription(
            'Descripción ' + Math.random().toString(36).substring(2, 5)
          )
          break
        case 10:
          setDescription(
            'Aquí hay un grid de botones con diferentes acciones.'
          )
          break
        case 11: {
          const shuffled = [...newBtns].sort(() => Math.random() - 0.5)
          return shuffled
        }
        case 12: {
          const enabled = newBtns.filter((b) => !b.disabled)
          if (enabled.length) {
            const rand = enabled[Math.floor(Math.random() * enabled.length)]
            newBtns.find((b) => b.id === rand.id).disabled = true
          }
          break
        }
        case 13:
          newBtns.forEach((b) => (b.disabled = false))
          break
        case 14:
          btn.text += ` ${new Date().toLocaleTimeString()}`
          break
        case 15:
          btn.text = `Button ${id + 1}`
          break
        default:
          break
      }
      newBtns[idx] = btn
      return newBtns
    })
  }

  const actualBg = darkMode ? '#333' : bgColor

  return (
    <div className='app' style={{ backgroundColor: actualBg, minHeight: '100vh' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className='button-grid'>
        {buttons.map((btn) => (
          <button
            key={btn.id}
            style={{
              backgroundColor: btn.color,
              fontSize: btn.fontSize,
              margin: '5px',
            }}
            disabled={btn.disabled}
            onClick={() => handleButtonAction(btn.id)}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
