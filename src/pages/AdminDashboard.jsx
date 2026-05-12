import React, { useState, useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'
import MemberForm from '../components/MemberForm'
import LinkForm from '../components/LinkForm'
import { getMemberPhotoUrl, getProjectPhotoUrl } from '../utils/memberPhoto'
import { loadSiteData, exportSiteData } from '../utils/siteData'
import { useI18n } from '../i18n/LanguageContext'
import './AdminDashboard.css'

function AdminDashboard({ onLogout }) {
  const { t } = useI18n()
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])
  const [directionSlots, setDirectionSlots] = useState([null, null, null, null, null])
  const [links, setLinks] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [editingProject, setEditingProject] = useState(null)
  const [editingMember, setEditingMember] = useState(null)
  const [editingLink, setEditingLink] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showMemberForm, setShowMemberForm] = useState(false)
  const [showLinkForm, setShowLinkForm] = useState(false)

  useEffect(() => {
    loadSiteData().then((data) => {
      if (data.projects) setProjects(data.projects)
      if (data.members) {
        setMembers(data.members.map((m, i) => ({ ...m, id: m.id ?? `m${Date.now()}-${i}`, order: m.order ?? i })))
      }
      if (data.directionSlots) setDirectionSlots(data.directionSlots)
      if (data.usefulLinks) setLinks(data.usefulLinks)
    })
  }, [])

  const handleProjectSave = (projectData) => {
    const updated = [...projects]
    const pinned = editingProject !== null ? (projects[editingProject].pinned ?? false) : false
    let data = { ...projectData, pinned }
    if (editingProject !== null && projects[editingProject]?.i18nKey) {
      data = { ...data, i18nKey: projects[editingProject].i18nKey }
    }
    if (editingProject !== null) {
      updated[editingProject] = data
    } else {
      updated.push(data)
    }
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const handleProjectPin = (index) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, pinned: !(p.pinned ?? false) } : p
    )
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
  }

  const handleProjectDelete = (index) => {
    if (window.confirm(t('admin.confirmDeleteProject'))) {
      const updated = projects.filter((_, i) => i !== index)
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
    }
  }

  const handleMemberSave = (memberData) => {
    const updated = [...members]
    if (editingMember !== null) {
      const existing = updated[editingMember]
      updated[editingMember] = { ...existing, ...memberData, id: existing.id, order: existing.order ?? editingMember }
    } else {
      updated.push({ ...memberData, id: `m${Date.now()}`, order: updated.length })
    }
    setMembers(updated)
    localStorage.setItem('members', JSON.stringify(updated))
    setShowMemberForm(false)
    setEditingMember(null)
  }

  const handleMemberDelete = (index) => {
    if (!window.confirm(t('admin.confirmDeleteMember'))) return
    const id = members[index]?.id
    const updated = members.filter((_, i) => i !== index)
    const newSlots = directionSlots.map((sid) => (sid === id ? null : sid))
    setMembers(updated)
    setDirectionSlots(newSlots)
    localStorage.setItem('members', JSON.stringify(updated))
    localStorage.setItem('directionSlots', JSON.stringify(newSlots))
  }

  const handleMemberMove = (index, direction) => {
    if (index === 0 && direction === -1) return
    if (index === members.length - 1 && direction === 1) return
    const updated = [...members]
    const swap = index + direction
    ;[updated[index], updated[swap]] = [updated[swap], updated[index]]
    const reordered = updated.map((m, i) => ({ ...m, order: i }))
    setMembers(reordered)
    localStorage.setItem('members', JSON.stringify(reordered))
  }

  const setDirectionSlot = (slotIndex, memberId) => {
    const newSlots = [...directionSlots]
    newSlots[slotIndex] = memberId || null
    setDirectionSlots(newSlots)
    localStorage.setItem('directionSlots', JSON.stringify(newSlots))
  }

  const handleLinkSave = (linkData) => {
    const updated = [...links]
    let data = { ...linkData }
    if (editingLink !== null && links[editingLink]?.i18nKey) {
      data = { ...data, i18nKey: links[editingLink].i18nKey }
    }
    if (editingLink !== null) {
      updated[editingLink] = data
    } else {
      updated.push(data)
    }
    setLinks(updated)
    localStorage.setItem('usefulLinks', JSON.stringify(updated))
    setShowLinkForm(false)
    setEditingLink(null)
  }

  const handleLinkDelete = (index) => {
    if (window.confirm(t('admin.confirmDeleteLink'))) {
      const updated = links.filter((_, i) => i !== index)
      setLinks(updated)
      localStorage.setItem('usefulLinks', JSON.stringify(updated))
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{t('admin.title')}</h1>
        <div className="admin-header-actions">
          <button
            type="button"
            onClick={() => exportSiteData({ projects, members, directionSlots, usefulLinks: links })}
            className="export-data-btn"
            title={t('admin.exportTitle')}
          >
            {t('admin.exportSiteData')}
          </button>
          <button onClick={onLogout} className="logout-btn">{t('admin.logout')}</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          {t('admin.tabProjects')}
        </button>
        <button
          className={activeTab === 'members' ? 'active' : ''}
          onClick={() => setActiveTab('members')}
        >
          {t('admin.tabMembers')}
        </button>
        <button
          className={activeTab === 'links' ? 'active' : ''}
          onClick={() => setActiveTab('links')}
        >
          {t('admin.tabLinks')}
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="admin-section">
          <button onClick={() => { setEditingProject(null); setShowProjectForm(true) }} className="add-btn">
            {t('admin.addProject')}
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
                <img src={getProjectPhotoUrl(project.mainPhoto || '')} alt={project.title || t('projectsPage.untitled')} className="item-thumb" />
                <div className="item-info">
                  <h3>{project.title || t('projectsPage.untitled')}</h3>
                  <p>{(project.description || '').substring(0, 100)}{(project.description || '').length > 100 ? '...' : ''}</p>
                  {project.pinned && <span className="pin-badge">{t('admin.pinnedBadge')}</span>}
                </div>
                <div className="item-actions">
                  <button onClick={() => handleProjectPin(index)} className="pin-btn" title={project.pinned ? t('admin.unpinTooltip') : t('admin.pinTooltip')}>
                    {project.pinned ? `📌 ${t('admin.unpin')}` : `📌 ${t('admin.pin')}`}
                  </button>
                  <button onClick={() => { setEditingProject(index); setShowProjectForm(true) }} className="edit-btn">
                    {t('admin.edit')}
                  </button>
                  <button onClick={() => handleProjectDelete(index)} className="delete-btn">
                    {t('admin.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="admin-section">
          <h2 className="admin-subtitle">{t('admin.directionHeading')}</h2>
          <div className="direction-slots">
            {[0, 1, 2, 3, 4].map((slotIndex) => (
              <div key={slotIndex} className="direction-slot">
                <label>{t('admin.slotLabel', { n: slotIndex + 1 })}</label>
                <select
                  value={directionSlots[slotIndex] ?? ''}
                  onChange={(e) => setDirectionSlot(slotIndex, e.target.value || null)}
                >
                  <option value="">{t('admin.directionEmptyOption')}</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <h2 className="admin-subtitle">{t('admin.membersOrderHeading')}</h2>
          <button onClick={() => { setEditingMember(null); setShowMemberForm(true) }} className="add-btn">
            {t('admin.addMember')}
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
              <div key={member.id ?? index} className="item-card">
                <div className="item-order">
                  <button type="button" onClick={() => handleMemberMove(index, -1)} disabled={index === 0} className="order-btn">↑</button>
                  <button type="button" onClick={() => handleMemberMove(index, 1)} disabled={index === members.length - 1} className="order-btn">↓</button>
                </div>
                <img src={getMemberPhotoUrl(member.photo)} alt={member.name} className="item-thumb" />
                <div className="item-info">
                  <h3>{member.name}</h3>
                  {member.role && <p>{member.role}</p>}
                </div>
                <div className="item-actions">
                  <button onClick={() => { setEditingMember(index); setShowMemberForm(true) }} className="edit-btn">
                    {t('admin.edit')}
                  </button>
                  <button onClick={() => handleMemberDelete(index)} className="delete-btn">
                    {t('admin.delete')}
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
            {t('admin.addLink')}
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
                  <p>{link.description || t('admin.noDescription')}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </div>
                <div className="item-actions">
                  <button onClick={() => { setEditingLink(index); setShowLinkForm(true) }} className="edit-btn">
                    {t('admin.edit')}
                  </button>
                  <button onClick={() => handleLinkDelete(index)} className="delete-btn">
                    {t('admin.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
