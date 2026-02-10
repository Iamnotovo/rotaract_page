import React from 'react'
import ContactForm from '../components/ContactForm'
import './Home.css'

function Home() {
  const base = import.meta.env.BASE_URL
  return (
    <div className="home">
      <section className="hero">
        <img
          src={`${base}group-photo.jpeg`}
          alt="Rotaract Club de Barcelona Diagonal"
          className="hero-image"
        />
        <div className="hero-overlay" />
      </section>

      <div className="home-content">
        <h1 className="home-title">Club Barcelona Diagonal</h1>

        <p className="home-lead">
          Rotaract clubs bring together people ages 18 and older to exchange ideas
          with leaders in the community, develop leadership and professional skills,
          and have fun through service. Rotaract members decide how to organize and
          run their clubs, manage their own funds, and plan and carry out activities
          and service projects: becoming a member offers great opportunities of
          experience in community service, self-development and a network of friends,
          both local and global.
        </p>

        <div className="home-block">
          <h2 className="home-heading">Can I join Rotaract?</h2>
          <p>
            With pleasure! We are always welcoming new members. Please contact us at{' '}
            <a href="mailto:rotaract.diagonal@rotary2202.org" className="home-link">
              rotaract.diagonal@rotary2202.org
            </a>
            . Candidate members are asked to get to know the club and participate in
            meetings during a period lasting 3 months, upon which their full
            membership will be granted during a majority based voting session.
          </p>
        </div>

        <div className="home-block home-block-contact">
          <h2 className="home-heading">Contact us</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Home
