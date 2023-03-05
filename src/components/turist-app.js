import React, { useState, useEffect } from 'react'
import Loading from './turist-loading'
import axios from 'axios'
import Tours from './tours'


function App() {
  const [loading, setLoading] = useState(false)
  const [tours, setTours] = useState([])
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours)
  }
  
  const fetchTours = async () => {
    setLoading(true)
    const url = 'https://course-api.com/react-tours-project'
    const res = await axios.get(url)
    if(res.status === 200) {
      setLoading(false)
      setTours(res.data)
      }
    }
  useEffect(() => {
    fetchTours()
  }, [])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={fetchTours} >
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
 }

export default App