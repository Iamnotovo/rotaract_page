import React, { useState } from 'react'
import './ContactForm.css'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    submissions.push({
      ...formData,
      date: new Date().toISOString()
    })
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
    
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>
      
      <button type="submit" className="submit-btn">Send</button>
      
      {submitted && (
        <div className="success-message">
          Thank you! Your message has been sent.
        </div>
      )}
    </form>
  )
}

export default ContactForm
