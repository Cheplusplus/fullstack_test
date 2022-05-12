import { useState } from "react"
import CSRFToken from "./csrftoken"

const AddEvent = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [date, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add an event')
      return
    } 

    onAdd({text, date, reminder})

    setText('')
    setDay('')
    setReminder(false)
  }

    return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Event</label>
            <input 
            type='text' 
            placeholder="Add Event" 
            value={ text } 
            onChange={ (e) => setText(e.target.value) } />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input 
            type='text' 
            placeholder="Add Day" 
            value={ date } 
            onChange={ (e) => setDay(e.target.value) } />
        </div>
        <div className="form-control form-control-check">
            <label className="noselect">Set Reminder</label>
            <input
            type='checkbox' 
            value={ reminder }
            checked={ reminder }
            onChange={ (e) => setReminder(e.currentTarget.checked) } />
        </div>

        <input type='submit' value='Save' className="btn btn-block" />
    </form>
  )
}

export default AddEvent