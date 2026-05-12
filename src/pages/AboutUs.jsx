import React from 'react'
import { useI18n } from '../i18n/LanguageContext'
import './Page.css'
import './AboutUs.css'

function AboutUs() {
  const { t } = useI18n()
  const igUrl = 'https://www.instagram.com/rotaractdiagonal/'

  return (
    <div className="page about-page">
      <h1 className="page-title">{t('about.pageTitle')}</h1>

      <div className="page-content about-content">
        <p className="about-intro">
          {t('about.introBefore')}
          <strong>{t('about.introEmphasis')}</strong>
          {t('about.introAfter')}
        </p>

        <section className="about-section" aria-labelledby="about-origin-heading">
          <h2 id="about-origin-heading" className="about-section-title">
            {t('about.originTitle')}
          </h2>
          <p>
            {t('about.originP1Before')}
            <strong>{t('about.originP1Strong')}</strong>
            {t('about.originP1After')}
          </p>
          <p>{t('about.originP2')}</p>
        </section>

        <section className="about-section about-highlight" aria-labelledby="about-growth-heading">
          <h2 id="about-growth-heading" className="about-section-title">
            {t('about.growthTitle')}
          </h2>
          <p className="about-stat-lead">
            {t('about.growthLeadBefore')}
            <strong>{t('about.growthLeadStrongFour')}</strong>
            {t('about.growthLeadMid')}
            <strong>{t('about.growthLeadStrongTwenty')}</strong>
            {t('about.growthLeadAfter')}
          </p>
          <p>{t('about.growthP2')}</p>
        </section>

        <section className="about-section" aria-labelledby="about-spirit-heading">
          <h2 id="about-spirit-heading" className="about-section-title">
            {t('about.spiritTitle')}
          </h2>
          <ul className="about-pillars">
            <li>
              <span className="about-pillar-label">{t('about.handsOnLabel')}</span>
              {t('about.handsOnText')}
            </li>
            <li>
              <span className="about-pillar-label">{t('about.welcomingLabel')}</span>
              {t('about.welcomingText')}
            </li>
            <li>
              <span className="about-pillar-label">{t('about.heartLabel')}</span>
              {t('about.heartText')}
            </li>
          </ul>
        </section>

        <section
          className="about-section about-highlight"
          aria-labelledby="about-partners-heading"
        >
          <h2 id="about-partners-heading" className="about-section-title">
            {t('about.thanksTitle')}
          </h2>
          <p>
            {t('about.thanksP1Before')}
            <strong>{t('about.thanksP1Club')}</strong>
            {t('about.thanksP1After')}
          </p>
          <p>
            {t('about.thanksP2Before')}
            <strong>{t('about.thanksP2Club')}</strong>
            {t('about.thanksP2After')}
          </p>
        </section>

        <section className="about-section about-cta" aria-labelledby="about-join-heading">
          <h2 id="about-join-heading" className="about-section-title">
            {t('about.visitTitle')}
          </h2>
          <p>
            {t('about.visitLeadBefore')}
            <strong>{t('about.visitStrongWhen')}</strong>
            {t('about.visitMidAt')}
            <strong>{t('about.visitStrongWhere')}</strong>
            {t('about.visitOutroBefore')}
            <a
              href={igUrl}
              className="about-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('about.visitInstagramLink')}
            </a>
            {t('about.visitOutroAfter')}
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutUs
