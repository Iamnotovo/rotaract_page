import React, { useState, useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'
import MemberForm from '../components/MemberForm'
import LinkForm from '../components/LinkForm'
import './AdminDashboard.css'

function AdminDashboard({ onLogout }) {
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])
  const [links, setLinks] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [editingProject, setEditingProject] = useState(null)
  const [editingMember, setEditingMember] = useState(null)
  const [editingLink, setEditingLink] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showMemberForm, setShowMemberForm] = useState(false)
  const [showLinkForm, setShowLinkForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedProjects = localStorage.getItem('projects')
    const savedMembers = localStorage.getItem('members')
    const savedLinks = localStorage.getItem('usefulLinks')
    
    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedMembers) setMembers(JSON.parse(savedMembers))
    if (savedLinks) setLinks(JSON.parse(savedLinks))
  }

  const handleProjectSave = (projectData) => {
    const updated = [...projects]
    if (editingProject !== null) {
      updated[editingProject] = projectData
    } else {
      updated.push(projectData)
    }
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const handleProjectDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((_, i) => i !== index)
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
    }
  }

  const handleMemberSave = (memberData) => {
    const updated = [...members]
    if (editingMember !== null) {
      updated[editingMember] = memberData
    } else {
      updated.push(memberData)
    }
    setMembers(updated)
    localStorage.setItem('members', JSON.stringify(updated))
    setShowMemberForm(false)
    setEditingMember(null)
  }

  const handleMemberDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const updated = members.filter((_, i) => i !== index)
      setMembers(updated)
      localStorage.setItem('members', JSON.stringify(updated))
    }
  }

  const handleLinkSave = (linkData) => {
    const updated = [...links]
    if (editingLink !== null) {
      updated[editingLink] = linkData
    } else {
      updated.push(linkData)
    }
    setLinks(updated)
    localStorage.setItem('usefulLinks', JSON.stringify(updated))
    setShowLinkForm(false)
    setEditingLink(null)
  }

  const handleLinkDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      const updated = links.filter((_, i) => i !== index)
      setLinks(updated)
      localStorage.setItem('usefulLinks', JSON.stringify(updated))
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={activeTab === 'members' ? 'active' : ''}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
        <button
          className={activeTab === 'links' ? 'active' : ''}
          onClick={() => setActiveTab('links')}
        >
          Useful Links
        </button>
        <button
          className={activeTab === 'contacts' ? 'active' : ''}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Submissions
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="admin-section">
          <button onClick={() => { setEditingProject(null); setShowProjectForm(true) }} className="add-btn">
            Add New Project
          </button>
          {showProjectForm && (
            <ProjectForm
              project={editingProject !== null ? projects[editingProject] : null}
              onSave={handleProjectSave}
              onCancel={() => { setShowProjectForm(false); setEditingProject(null) }}
            />
          )}
          <div className="items-list">
            {projects.map((project, index) => (
              <div key={index} className="item-card">
                <img src={project.mainPhoto} alt={project.title} className="item-thumb" />
                <div className="item-info">
                  <h3>{project.title}</h3>
                  <p>{project.description.substring(0, 100)}...</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => { setEditingProject(index); setShowProjectForm(true) }} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleProjectDelete(index)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="admin-section">
          <button onClick={() => { setEditingMember(null); setShowMemberForm(true) }} className="add-btn">
            Add New Member
          </button>
          {showMemberForm && (
            <MemberForm
              member={editingMember !== null ? members[editingMember] : null}
              onSave={handleMemberSave}
              onCancel={() => { setShowMemberForm(false); setEditingMember(null) }}
            />
          )}
          <div className="items-list">
            {members.map((member, index) => (
              <div key={index} className="item-card">
                <img src={member.photo} alt={member.name} className="item-thumb" />
                <div className="item-info">
                  <h3>{member.name}</h3>
                  {member.role && <p>{member.role}</p>}
                </div>
                <div className="item-actions">
                  <button onClick={() => { setEditingMember(index); setShowMemberForm(true) }} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleMemberDelete(index)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'links' && (
        <div className="admin-section">
          <button onClick={() => { setEditingLink(null); setShowLinkForm(true) }} className="add-btn">
            Add New Link
          </button>
          {showLinkForm && (
            <LinkForm
              link={editingLink !== null ? links[editingLink] : null}
              onSave={handleLinkSave}
              onCancel={() => { setShowLinkForm(false); setEditingLink(null) }}
            />
          )}
          <div className="items-list">
            {links.map((link, index) => (
              <div key={index} className="item-card">
                <div className="item-info">
                  <h3>{link.title}</h3>
                  <p>{link.description || 'No description'}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </div>
                <div className="item-actions">
                  <button onClick={() => { setEditingLink(index); setShowLinkForm(true) }} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleLinkDelete(index)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="admin-section">
          <ContactSubmissions />
        </div>
      )}
    </div>
  )
}

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([])

  React.useEffect(() => {
    const saved = localStorage.getItem('contactSubmissions')
    if (saved) {
      setSubmissions(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="contact-submissions">
      <h2>Contact Form Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="submissions-list">
          {submissions.map((submission, index) => (
            <div key={index} className="submission-card">
              <div className="submission-header">
                <strong>{submission.name}</strong>
                <span className="submission-date">
                  {new Date(submission.date).toLocaleDateString()}
                </span>
              </div>
              <p className="submission-email">{submission.email}</p>
              <p className="submission-message">{submission.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
