import React, { useState, useEffect } from 'react'
import './Members.css'

function Members() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('members')
    if (saved) {
      setMembers(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">Members</h1>
      {members.length === 0 ? (
        <p className="no-members">No members added yet.</p>
      ) : (
        <div className="members-grid">
          {members.map((member, index) => (
            <div key={index} className="member-card">
              <img src={member.photo} alt={member.name} className="member-photo" />
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                {member.role && <p className="member-role">{member.role}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Members
