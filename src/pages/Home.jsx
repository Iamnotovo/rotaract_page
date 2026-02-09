import React, { useState } from 'react'
import ContactForm from '../components/ContactForm'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <h1 className="main-title">Club Barcelona Diagonal</h1>
      
      <section className="who-we-are">
        <div className="who-we-are-content">
          <div className="who-we-are-text">
            <h2 className="section-title">Who We Are</h2>
            <p>
              Rotaract clubs bring together people ages 18 and older to exchange ideas 
              with leaders in the community, develop leadership and professional skills, 
              and have fun through service. Rotaract members decide how to organize and 
              run their clubs, manage their own funds, and plan and carry out activities 
              and service projects: becoming a member offers great opportunities of 
              experience in community service, self-development and a network of friends, 
              both local and global.
            </p>
          </div>
          <div className="who-we-are-photos">
            <div className="photo-placeholder">
              <p>Photo Gallery</p>
              <small>Add photos of club members</small>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section">
        <h2 className="pink-title">Can I join Rotaract?</h2>
        <p>
          With pleasure! We are always welcoming new members. Please contact us at 
          rotaractgeneveinternational@gmail.com. Candidate members are asked to get 
          to know the club and participate in meetings during a period lasting 3 months, 
          upon which their full membership will be granted during a majority based voting session.
        </p>
      </section>

      <section className="contact-section">
        <h2 className="pink-title">Contact Us</h2>
        <ContactForm />
      </section>
    </div>
  )
}

export default Home
