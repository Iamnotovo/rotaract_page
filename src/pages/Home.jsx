import React from 'react'
import './Home.css'

const INSTAGRAM_URL = 'https://www.instagram.com/rotaractdiagonal/'

const EXPLORE_CARDS = [
  {
    section: 'projects',
    title: 'Projects',
    tagline: 'Impact in action',
    description:
      'From local drives to international partnerships—see what we’ve built together.',
    featured: true,
  },
  {
    section: 'about-us',
    title: 'About us',
    tagline: 'Who we are',
    description:
      'Our story, values, and what Rotaract Barcelona Diagonal stands for.',
  },
  {
    section: 'members',
    title: 'Members',
    tagline: 'Meet the board',
    description:
      'Say hello to the people planning meetings, projects, and club life.',
  },
  {
    section: 'meetings',
    title: 'Meetings',
    tagline: 'Join us',
    description:
      'When and where we gather—and how to drop in as a guest.',
  },
  {
    section: 'useful-links',
    title: 'Useful links',
    tagline: 'Stay connected',
    description:
      'Instagram, Rotary resources, and tools we use as a club.',
  },
]

function Home({ onNavigate }) {
  const base = import.meta.env.BASE_URL

  return (
    <div className="home">
      <section className="hero">
        <img
          src={`${base}group-photo.jpeg`}
          alt="Rotaract Club de Barcelona Diagonal"
          className="hero-image"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker">Service · Leadership · Fellowship</p>
          <p className="hero-headline">Rotaract Club Barcelona Diagonal</p>
          <p className="hero-sub">
            Discover our projects, meet the club, and find out how to get involved.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={() => onNavigate?.('projects')}
            >
              Explore projects
            </button>
            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => onNavigate?.('about-us')}
            >
              About us
            </button>
          </div>
        </div>
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

        <section className="home-explore" aria-labelledby="explore-heading">
          <div className="home-explore-intro">
            <h2 id="explore-heading" className="home-explore-title">
              Explore the club
            </h2>
            <p className="home-explore-lead">
              Jump straight into the parts of our site visitors love most—projects first,
              then everything you need to know about who we are and how to join us.
            </p>
          </div>
          <div className="explore-grid">
            {EXPLORE_CARDS.map((card) => (
              <button
                key={card.section}
                type="button"
                className={`explore-card${card.featured ? ' explore-card-featured' : ''}`}
                onClick={() => onNavigate?.(card.section)}
              >
                <span className="explore-card-accent" aria-hidden="true" />
                <div className="explore-card-stack">
                  <span className="explore-card-tagline">{card.tagline}</span>
                  <span className="explore-card-title">{card.title}</span>
                  <span className="explore-card-desc">{card.description}</span>
                </div>
                <span className="explore-card-cta">
                  Open
                  <span className="explore-card-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </button>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-card explore-card-contact"
            >
              <span className="explore-card-accent explore-card-accent-muted" aria-hidden="true" />
              <div className="explore-card-stack">
                <span className="explore-card-tagline">Say hello</span>
                <span className="explore-card-title">Contact us</span>
                <span className="explore-card-desc">
                  Message us on Instagram — it’s how we chat with visitors and answer questions about joining.
                </span>
              </div>
              <span className="explore-card-cta">
                Open Instagram
                <span className="explore-card-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          </div>
        </section>

        <div className="home-block">
          <h2 className="home-heading">Can I join Rotaract?</h2>
          <p>
            With pleasure! We are always welcoming new members. Send us a message on{' '}
            <a href={INSTAGRAM_URL} className="home-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>{' '}
            so we can help you get started. Candidate members are asked to get to know the club and participate in
            meetings during a period lasting 3 months, upon which their full
            membership will be granted during a majority based voting session.
          </p>
        </div>

        <div id="home-contact" className="home-block home-block-contact">
          <h2 className="home-heading">Contact us</h2>
          <p>
            We keep things simple: please reach out through{' '}
            <strong>Instagram direct messages</strong>. Tell us who you are and what you’re curious about —
            membership, visiting a meeting, or collaborating — and we’ll get back to you there.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="home-instagram-cta"
          >
            Message us on Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
