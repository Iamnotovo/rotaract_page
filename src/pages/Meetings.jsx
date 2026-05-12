import React from 'react'
import './Page.css'
import './Meetings.css'

const MEETING_ADDRESS = 'Carrer de Bruc 147, 3º D, 2ª, 08037 Barcelona'
const MAP_EMBED_QUERY =
  'Carrer+de+Bruc+147,+08037+Barcelona,+Spain'

function Meetings() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${MAP_EMBED_QUERY}`

  return (
    <div className="page meetings-page">
      <h1 className="page-title">Meetings</h1>

      <div className="page-content meetings-content">
        <p className="meetings-lead">
          We gather every week to plan projects, share updates, and welcome guests.
          Drop by — visitors are always welcome.
        </p>

        <section className="meetings-card meetings-schedule" aria-labelledby="meetings-schedule-heading">
          <h2 id="meetings-schedule-heading" className="meetings-card-title">
            When we meet
          </h2>
          <dl className="meetings-details">
            <div className="meetings-detail-row">
              <dt>Day</dt>
              <dd>Every Monday</dd>
            </div>
            <div className="meetings-detail-row">
              <dt>Time</dt>
              <dd>
                <time dateTime="20:30">20:30</time>
                {' – '}
                <time dateTime="21:30">21:30</time>
              </dd>
            </div>
          </dl>
        </section>

        <section className="meetings-card meetings-location" aria-labelledby="meetings-location-heading">
          <h2 id="meetings-location-heading" className="meetings-card-title">
            Where we meet
          </h2>
          <address className="meetings-address">{MEETING_ADDRESS}</address>
          <p className="meetings-address-note">
            The marker shows the building on Carrer de Bruc; ring at{' '}
            <strong>3º D, 2ª</strong> when you arrive or ask a member for the exact bell.
          </p>
          <div className="meetings-map-wrap">
            <iframe
              title="Map: Carrer de Bruc 147, Barcelona"
              className="meetings-map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${MAP_EMBED_QUERY}&output=embed`}
              allowFullScreen
            />
          </div>
          <a href={mapsHref} className="meetings-map-link" target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </section>
      </div>
    </div>
  )
}

export default Meetings
