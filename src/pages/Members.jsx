import React, { useState, useEffect } from 'react'
import { getMemberPhotoUrl } from '../utils/memberPhoto'
import { loadSiteData } from '../utils/siteData'
import './Members.css'

function Members() {
  const [members, setMembers] = useState([])
  const [directionSlots, setDirectionSlots] = useState([null, null, null, null, null])

  useEffect(() => {
    let cancelled = false
    loadSiteData().then((data) => {
      if (!cancelled) {
        if (data.members) setMembers(data.members)
        if (data.directionSlots) setDirectionSlots(data.directionSlots)
      }
    })
    return () => { cancelled = true }
  }, [])

  const directionMembers = directionSlots.map((id) =>
    id ? members.find((m) => String(m.id) === String(id)) : null
  )
  const directionIds = directionSlots.filter(Boolean).map((id) => String(id))
  const restOrdered = members
    .filter((m) => !directionIds.includes(String(m.id)))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <div className="page members-page">
      <h1 className="page-title">Members</h1>

      <section className="members-section">
        <h2 className="section-heading">Direction</h2>
        <div className="members-grid direction-grid">
          {[0, 1, 2, 3, 4].map((i) => {
            const member = directionMembers[i]
            return (
              <div key={`dir-${i}`} className="member-card member-slot">
                {member ? (
                  <>
                    <img src={getMemberPhotoUrl(member.photo)} alt={member.name} className="member-photo" />
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      {member.role && <p className="member-role">{member.role}</p>}
                    </div>
                  </>
                ) : (
                  <div className="member-slot-empty">Slot {i + 1}</div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="members-section">
        <h2 className="section-heading">Members</h2>
        {restOrdered.length === 0 ? (
          <p className="no-members">No other members yet.</p>
        ) : (
          <div className="members-grid">
            {restOrdered.map((member, index) => (
              <div key={member.id ?? index} className="member-card">
                <img src={getMemberPhotoUrl(member.photo)} alt={member.name} className="member-photo" />
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  {member.role && <p className="member-role">{member.role}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Members
