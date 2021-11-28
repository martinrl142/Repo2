import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'

import styles from './styles.module.css'
import LoginButtonHome from './LoginButtonHome'
import LoginComponent from './LoginComponent'
import { Container } from 'react-bootstrap'

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 100 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
      
    </div>
  )
}

export default function HomeComponent() {
  const [open, set] = useState(true)
  return (
    <div className={styles.container} onClick={() => set(state => state)}>
      <Trail open={open}>
        <span>Equiipo</span>
        <p className={styles.pclass}>Conectar para mejorar</p>
      </Trail>
    </div>
  )
}
