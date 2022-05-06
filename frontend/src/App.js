import { useState, useEffect } from 'react'
import Header from './components/Header'
import Events from './components/Events';
import AddEvent from './components/AddEvent';
import './App.css';

const App = () => {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async() => {
      const eventsFromServer = await fetchEvents() 
      setEvents(eventsFromServer)
    }
    getEvents()
  }, [])

  const fetchEvents = async() => {
    const res = await fetch('http://localhost:8000/1')
    const data = await res.json()
    return data
  }

  
  //Add Event
  const addEvent = async(event) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newEvent = { id, ...event }
    await fetch('http://localhost:8000/add/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event),
    })
    setEvents([...events, newEvent])
  }

  //Delete Event
  const deleteEvent = async(id) => {
    await fetch(`http://localhost:8000/delete/${id}`, {
      method: 'DELETE'
    })
    setEvents(events.filter((event) => event.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async(event) => {
    const id = event.id
    await fetch(`http://localhost:8000/reminder/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event),
    })
    console.log(JSON.stringify(event))
    setEvents(events.map((event) => event.id === id
    ? { ...event, reminder: !event.reminder} : event))

  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddEvent(!showAddEvent)} test={showAddEvent}/>
      {showAddEvent && <AddEvent onAdd={addEvent}/>}
      {events.length !== 0 ? 
        <Events events={events} onDelete={deleteEvent} onToggle={toggleReminder}/> : <h3>Nothing to show</h3>
      }
    </div>
  );
}

export default App;
