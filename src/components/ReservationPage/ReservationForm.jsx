import { useState } from 'react'
import './ReservationForm.css'

export default function ReservationForm({ isOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    requests: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.guests) newErrors.guests = 'Number of guests is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
      }, 1500)
    }
  }

  if (isSuccess) {
    return (
      <div className="res-success">
        <h3 className="res-success__title">YOUR TABLE REQUEST<br/>HAS BEEN RECEIVED</h3>
        <p className="res-success__copy">
          Thank you for choosing Tres Bon.<br/>
          Our team will be in touch shortly to confirm your reservation.
        </p>
        <div className="res-success__details">
          <div><strong>Date:</strong> {formData.date}</div>
          <div><strong>Time:</strong> {formData.time}</div>
          <div><strong>Guests:</strong> {formData.guests}</div>
        </div>
      </div>
    )
  }

  return (
    <form className="res-form" onSubmit={handleSubmit} noValidate>
      <div className="res-form__row">
        <div className="res-form__group">
          <label htmlFor="name" className="res-form__label">Your name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className={`res-form__input ${errors.name ? 'has-error' : ''}`}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          />
          {errors.name && <span className="res-form__error">{errors.name}</span>}
        </div>
      </div>

      <div className="res-form__row res-form__row--split">
        <div className="res-form__group">
          <label htmlFor="email" className="res-form__label">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className={`res-form__input ${errors.email ? 'has-error' : ''}`}
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          />
          {errors.email && <span className="res-form__error">{errors.email}</span>}
        </div>
        <div className="res-form__group">
          <label htmlFor="phone" className="res-form__label">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className={`res-form__input ${errors.phone ? 'has-error' : ''}`}
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          />
          {errors.phone && <span className="res-form__error">{errors.phone}</span>}
        </div>
      </div>

      <div className="res-form__row res-form__row--split">
        <div className="res-form__group">
          <label htmlFor="date" className="res-form__label">Preferred date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            className={`res-form__input ${errors.date ? 'has-error' : ''}`}
            value={formData.date}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          />
          {errors.date && <span className="res-form__error">{errors.date}</span>}
        </div>
        <div className="res-form__group">
          <label htmlFor="time" className="res-form__label">Preferred time</label>
          <select 
            id="time" 
            name="time" 
            className={`res-form__select ${errors.time ? 'has-error' : ''}`}
            value={formData.time}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          >
            <option value="" disabled>Select time</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="6:30 PM">6:30 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="7:30 PM">7:30 PM</option>
            <option value="8:00 PM">8:00 PM</option>
            <option value="8:30 PM">8:30 PM</option>
            <option value="9:00 PM">9:00 PM</option>
            <option value="9:30 PM">9:30 PM</option>
          </select>
          {errors.time && <span className="res-form__error">{errors.time}</span>}
        </div>
      </div>

      <div className="res-form__row res-form__row--split">
        <div className="res-form__group">
          <label htmlFor="guests" className="res-form__label">Number of guests</label>
          <select 
            id="guests" 
            name="guests" 
            className={`res-form__select ${errors.guests ? 'has-error' : ''}`}
            value={formData.guests}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          >
            <option value="" disabled>Select guests</option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5 People</option>
            <option value="6">6 People</option>
            <option value="7">7 People</option>
            <option value="8">8 People</option>
            <option value="9+">9+ People</option>
          </select>
          {errors.guests && <span className="res-form__error">{errors.guests}</span>}
        </div>
        <div className="res-form__group">
          <label htmlFor="occasion" className="res-form__label">Occasion</label>
          <select 
            id="occasion" 
            name="occasion" 
            className="res-form__select"
            value={formData.occasion}
            onChange={handleChange}
            tabIndex={isOpen ? 0 : -1}
          >
            <option value="" disabled>Select occasion (optional)</option>
            <option value="Dinner">Dinner</option>
            <option value="Lunch">Lunch</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Celebration">Celebration</option>
            <option value="Business Dining">Business Dining</option>
            <option value="Date Night">Date Night</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="res-form__row">
        <div className="res-form__group">
          <label htmlFor="requests" className="res-form__label">Special requests</label>
          <textarea 
            id="requests" 
            name="requests" 
            className="res-form__textarea"
            placeholder="Special requests or dietary requirements"
            value={formData.requests}
            onChange={handleChange}
            rows={3}
            tabIndex={isOpen ? 0 : -1}
          />
        </div>
      </div>

      <div className="res-form__action">
        <button 
          type="submit" 
          className={`res-form__submit ${isSubmitting ? 'is-loading' : ''}`}
          disabled={isSubmitting}
          tabIndex={isOpen ? 0 : -1}
        >
          {isSubmitting ? 'PROCESSING...' : 'REQUEST A TABLE'}
        </button>
      </div>
    </form>
  )
}
