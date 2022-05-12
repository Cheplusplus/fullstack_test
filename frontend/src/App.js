import { useState, useEffect} from 'react'
import Header from './components/Header'
import Events from './components/Events';
import AddEvent from './components/AddEvent';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';
import Cookies from 'universal-cookie';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import {
	StatusCodes,
} from 'http-status-codes';

const SERVER_IP = 'http://localhost:8000/'

const App = () => {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async() => {
      const token = getCookie('Token')
      if (typeof token == 'undefined') {
        window.location.href='login'
      }
      const res = await fetch(SERVER_IP + 'events', {
        method: 'GET',
          headers: {
            'Authorization': 'Token ' + token,
          }
      })
      const data = await res.json()
      if (data.detail === 'Invalid token.'){
        window.location.href='login'
      }
      console.log(data)
      return data
    }
    if (window.location.href === 'http://localhost:3000/login') {return}
    const getEvents = async() => {
      const eventsFromServer = await fetchEvents() 
      setEvents(eventsFromServer)
    }
    getEvents()
      .catch(console.error)
  }, [])

  

  const getCookie = (name) => {
    const cookies = new Cookies();
    return cookies.get(name)
  }

  //
  const setCookie = (name, val, settings) => {
    const cookies = new Cookies();
    cookies.set(name, val, settings)
  }

  // Get the logged in user
  //
  //
  // const getMe = () => {
  //   const user = localStorage.getItem('me')
  //   return eval('('+user+')')
  // }

  //Login - Store the users Auth token and save their details in LocalStorage
  //
  //
  const loginUser = async (username, password) => {
    const userDetails = {username, password}
    const res = await fetch(SERVER_IP + 'accounts/login_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
    const data = await res.json()
    setCookie('Token', data[0], { path: '/', maxAge:3000, sameSite:true})
    localStorage.setItem("me", data[1])
    if (res.status !== StatusCodes.OK || !res) {
      alert('Login Failed')
      return
    }
    window.location.href='/'
  }

  //Add Event
  //
  //
  const addEvent = async(event) => {
    
    const token = getCookie('Token')
    const newEvent = {...event }
    const res = await fetch(SERVER_IP + 'events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
      },
      body: JSON.stringify(event),
    })
    const data = await res.json()
    newEvent.id = data['id']
    setEvents([...events, newEvent])
  }

  //Delete Event
  const token = getCookie('Token')
  const deleteEvent = async(id) => {
    await fetch(SERVER_IP + `events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
      },
    })
    setEvents(events.filter((event) => event.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async(event) => {
    const token = getCookie('Token')
    const id = event.id
    await fetch(SERVER_IP + `reminder/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
      },
      body: JSON.stringify(event),
    })
    setEvents(events.map((event) => event.id === id
    ? { ...event, reminder: !event.reminder} : event))

  }

  return (
    <Router>
      <Routes>
        <Route path='login/' element={ 
          <div>
            <Login onLogin={loginUser}/>
          </div>
        }/>
        <Route path='/' element={ 
          <div className="container">
            <Logout />
            <Header onAdd={() => setShowAddEvent(!showAddEvent)} addEventOpen={showAddEvent}/>
            {showAddEvent && <AddEvent onAdd={addEvent}/>}
            {events.length !== 0 ? 
              <Events events={events} onDelete={deleteEvent} onToggle={toggleReminder}/> : <h3>Nothing to show</h3>
            }
          </div>
        }/>

      </Routes>
    </Router>
  );
}

export default App;
