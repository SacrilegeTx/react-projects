import { useEffect, useRef, useState, useCallback } from 'react'
import debounce from 'just-debounce-it'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = event => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = event => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Start Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
