import React, { useMemo } from 'react'
import { useI18n } from '../i18n/LanguageContext'
import './Home.css'

const INSTAGRAM_URL = 'https://www.instagram.com/rotaractdiagonal/'

const EXPLORE_META = [
  { section: 'projects', msgKey: 'projects', featured: true },
  { section: 'about-us', msgKey: 'about' },
  { section: 'members', msgKey: 'members' },
  { section: 'meetings', msgKey: 'meetings' },
  { section: 'useful-links', msgKey: 'links' },
]

function Home({ onNavigate }) {
  const { t } = useI18n()
  const base = import.meta.env.BASE_URL

  const exploreCards = useMemo(
    () =>
      EXPLORE_META.map((row) => ({
        section: row.section,
        featured: row.featured,
        title: t(`home.cards.${row.msgKey}.title`),
        tagline: t(`home.cards.${row.msgKey}.tagline`),
        description: t(`home.cards.${row.msgKey}.description`),
      })),
    [t]
  )

  return (
    <div className="home">
      <section className="hero">
        <img
          src={`${base}group-photo.jpeg`}
          alt={t('meta.logoAlt')}
          className="hero-image"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker">{t('home.heroKicker')}</p>
          <p className="hero-headline">{t('home.heroHeadline')}</p>
          <p className="hero-sub">{t('home.heroSub')}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={() => onNavigate?.('projects')}
            >
              {t('home.exploreProjects')}
            </button>
            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => onNavigate?.('about-us')}
            >
              {t('home.aboutUsCta')}
            </button>
          </div>
        </div>
      </section>

      <div className="home-content">
        <h1 className="home-title">{t('home.title')}</h1>

        <p className="home-lead">{t('home.lead')}</p>

        <section className="home-explore" aria-labelledby="explore-heading">
          <div className="home-explore-intro">
            <h2 id="explore-heading" className="home-explore-title">
              {t('home.exploreHeading')}
            </h2>
            <p className="home-explore-lead">{t('home.exploreLead')}</p>
          </div>
          <div className="explore-grid">
            {exploreCards.map((card) => (
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
                  {t('home.exploreOpen')}
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
                <span className="explore-card-tagline">{t('home.cards.contact.tagline')}</span>
                <span className="explore-card-title">{t('home.cards.contact.title')}</span>
                <span className="explore-card-desc">{t('home.cards.contact.description')}</span>
              </div>
              <span className="explore-card-cta">
                {t('home.exploreInstagram')}
                <span className="explore-card-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          </div>
        </section>

        <div className="home-block">
          <h2 className="home-heading">{t('home.joinHeading')}</h2>
          <p>
            {t('home.joinBodyBefore')}
            <a href={INSTAGRAM_URL} className="home-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            {' '}
            {t('home.joinBodyAfter')}
          </p>
        </div>

        <div id="home-contact" className="home-block home-block-contact">
          <h2 className="home-heading">{t('home.contactHeading')}</h2>
          <p>
            {t('home.contactLeadBefore')}
            <strong>{t('home.contactLeadStrong')}</strong>
            {t('home.contactLeadAfter')}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="home-instagram-cta"
          >
            {t('home.instagramCta')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
