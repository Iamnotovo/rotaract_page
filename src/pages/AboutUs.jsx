import React from 'react'
import './Page.css'
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="page about-page">
      <h1 className="page-title">About Us</h1>

      <div className="page-content about-content">
        <p className="about-intro">
          Rotaract Club Barcelona Diagonal is a{' '}
          <strong>small club with big momentum</strong>: we started from scratch,
          grew quickly, and today we are a lively circle of young people who care
          about service, friendship, and showing up for whatever needs doing.
        </p>

        <section className="about-section" aria-labelledby="about-origin-heading">
          <h2 id="about-origin-heading" className="about-section-title">
            How we came back
          </h2>
          <p>
            In <strong>April 2024</strong>, four members stepped forward when our club had been
            closed because of inactivity. Rotary invited us to reopen Barcelona Diagonal —
            not as a polished institution, but as a blank page we could fill together.
          </p>
          <p>
            That humble beginning shaped who we are: we learned by doing, leaned on each
            other, and proved that commitment beats perfection when you want to serve your
            city and your network.
          </p>
        </section>

        <section className="about-section about-highlight" aria-labelledby="about-growth-heading">
          <h2 id="about-growth-heading" className="about-section-title">
            From four founders to twenty friends
          </h2>
          <p className="about-stat-lead">
            We began as <strong>4 people</strong> with a mandate to revive the club.
            Today we are around <strong>20 young, active participants</strong> — and we are still growing.
          </p>
          <p>
            Every new face adds skills, languages, and ideas. Whether you love logistics,
            outreach, creativity, or simply lending a hand on project day, there is room for you.
          </p>
        </section>

        <section className="about-section" aria-labelledby="about-spirit-heading">
          <h2 id="about-spirit-heading" className="about-section-title">
            What we are like
          </h2>
          <ul className="about-pillars">
            <li>
              <span className="about-pillar-label">Hands-on</span>
              We engage in whatever we can — local drives, international exchanges,
              fundraisers, and spontaneous collaborations when opportunity knocks.
            </li>
            <li>
              <span className="about-pillar-label">Welcoming</span>
              The vibe is intentionally informal: questions are encouraged, mistakes are OK,
              and mentorship happens across roles, not only from the board.
            </li>
            <li>
              <span className="about-pillar-label">Rotaract at heart</span>
              We stay grounded in Rotary values — fellowship, ethics, and Service Above Self —
              while keeping meetings energetic and grounded in real projects.
            </li>
          </ul>
        </section>

        <section
          className="about-section about-highlight"
          aria-labelledby="about-partners-heading"
        >
          <h2 id="about-partners-heading" className="about-section-title">
            Special thanks
          </h2>
          <p>
            A special mention goes to{' '}
            <strong>Rotary Club Barcelona Diagonal</strong>, whose sponsorship makes it possible
            for us to stay active and keep growing as a Rotaract club.
          </p>
          <p>
            We are also grateful to <strong>Rotary Club Milenium</strong>, which has stood by us on
            many occasions and lent a hand whenever we needed it.
          </p>
        </section>

        <section className="about-section about-cta" aria-labelledby="about-join-heading">
          <h2 id="about-join-heading" className="about-section-title">
            Come see us
          </h2>
          <p>
            Curiosity is enough for a first visit. Join us on{' '}
            <strong>Mondays from 20:30 to 21:30</strong> at{' '}
            <strong>Carrer de Bruc 147, 3º D, 2ª</strong>. For questions beforehand,
            send us a message on{' '}
            <a
              href="https://www.instagram.com/rotaractdiagonal/"
              className="about-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            — that’s where we reply to visitors.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutUs
