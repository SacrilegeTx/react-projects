import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/fact'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }
  // Recuperar la cita la cargar la pagina
  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
