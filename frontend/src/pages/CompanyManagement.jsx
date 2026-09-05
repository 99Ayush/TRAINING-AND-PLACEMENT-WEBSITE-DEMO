import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Globe, Mail, Briefcase, Plus, Users, 
  X, Award, BookOpen, DollarSign, Calendar, Building, 
  CheckCircle2, Info, ArrowRight, ExternalLink, ChevronRight
} from 'lucide-react';
import { showToast, cn } from '../utils';
import { companiesMockData } from '../data/mockData';
import './CompanyManagement.css';

const CompanyDetailsModal = ({ company, onClose }) => {
  if (!company) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.95, opacity: 0 }}
        className="modal-content glass-panel" 
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="header-main">
            <img src={company.logo} alt="" className="modal-logo" />
            <div className="header-info">
              <h2>{company.name}</h2>
              <div className="header-tags">
                <span className="tag industry">{company.industry}</span>
                <span className="tag location"><MapPin size={12}/> {company.location}</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <a href={company.website} target="_blank" rel="noreferrer" className="btn-secondary btn-icon">
              <Globe size={18} /> Visit
            </a>
            <button className="btn-primary" onClick={() => showToast(`Applied for ${company.name}`)}>
              Apply Now
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="body-left">
            <section className="detail-section">
              <h4 className="section-title"><Info size={20}/> Overview</h4>
              <p className="company-bio">{company.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="meta-item">
                  <span className="meta-label">Founded</span>
                  <span className="meta-value">{company.founded}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">HQ</span>
                  <span className="meta-value">{company.headquarters}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h4 className="section-title"><CheckCircle2 size={20}/> Requirements</h4>
              <div className="eligibility-cards">
                <div className="e-card">
                  <div className="e-icon"><Award size={20} color="var(--primary-blue)"/></div>
                  <span className="e-label">CGPA</span>
                  <span className="e-value">{company.eligibility.cgpa}</span>
                </div>
                <div className="e-card">
                  <div className="e-icon"><BookOpen size={20} color="var(--primary-blue)"/></div>
                  <span className="e-label">Majors</span>
                  <span className="e-value">{company.eligibility.branches.join(", ")}</span>
                </div>
                <div className="e-card">
                  <div className="e-icon"><Info size={20} color="var(--primary-blue)"/></div>
                  <span className="e-label">Backlogs</span>
                  <span className="e-value">{company.eligibility.backlogs}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h4 className="section-title"><ArrowRight size={20}/> Pipeline</h4>
              <div className="process-timeline">
                {company.recruitmentProcess.map((step, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-content">
                      <h5>{step.step}</h5>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="body-right">
            <div className="package-card">
              <h4 className="section-title" style={{ color: '#FACC15', marginBottom: '20px' }}>
                <DollarSign size={20}/> Compensation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span className="pkg-label">Full-time CTC</span>
                  <p className="pkg-value highlight">{company.package.ctc}</p>
                </div>
                <div>
                  <span className="pkg-label">Monthly Stipend</span>
                  <p className="pkg-value">{company.package.stipend}</p>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="pkg-label">Perks</span>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '4px' }}>{company.package.benefits}</p>
                </div>
              </div>
            </div>

            <div className="stats-mini-card">
              <div className="s-item">
                <Users size={20} />
                <div>
                  <span className="s-val">{company.applicants}</span>
                  <p className="s-lab">Applied</p>
                </div>
              </div>
              <div className="s-item">
                <Briefcase size={20} />
                <div>
                  <span className="s-val">{company.roles}</span>
                  <p className="s-lab">Openings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CompanyManagement = () => {
  const [companies, setCompanies] = useState(companiesMockData);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduledIds, setScheduledIds] = useState(new Set());

  const handleSchedule = (e, index) => {
    e.stopPropagation();
    if (scheduledIds.has(index)) return;
    
    setScheduledIds(new Set([...scheduledIds, index]));
    showToast('Drive Scheduled Successfully!', 'success');
  };

  const handleAddPartner = (newCompany) => {
    // Add default values for complex nested fields not in the basic form
    const companyWithDefaults = {
      ...newCompany,
      roles: newCompany.roles || 0,
      applicants: 0,
      founded: newCompany.founded || 'N/A',
      headquarters: newCompany.location || 'N/A',
      eligibility: {
        cgpa: 'TBD',
        branches: ['All Technical'],
        backlogs: 'None'
      },
      package: {
        ctc: newCompany.package || 'TBD',
        stipend: 'TBD',
        benefits: 'As per policy'
      },
      recruitmentProcess: [
        { step: 'Applied', desc: 'Initial registration' },
        { step: 'Review', desc: 'Profile screening' }
      ]
    };

    setCompanies([companyWithDefaults, ...companies]);
    setIsAddModalOpen(false);
    showToast(`${newCompany.name} added to pipeline!`, 'success');
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="company-container">
      <div className="company-header-bar glass-panel">
        <div className="bar-left">
          <h2>Partner Nexus</h2>
          <p>Collaborating with world-class organizations.</p>
        </div>
        <div className="bar-right">
          <div className="search-bar" style={{ background: 'var(--accent-light)', border: 'none' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search domain..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary" 
            style={{ padding: '12px 20px' }}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18}/> <span>Add Partner</span>
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="company-grid"
      >
        {filteredCompanies.map((company, index) => {
          const isScheduled = scheduledIds.has(index);
          return (
            <motion.div 
              variants={itemVariants}
              key={index}
              className="company-card glass-panel" 
              onClick={() => setSelectedCompany(company)}
              whileHover={{ y: -5 }}
            >
              <div className="card-top">
                <img src={company.logo} alt="" className="brand-logo-img" />
                <div>
                  <h3>{company.name}</h3>
                  <span className="industry-tag">{company.industry}</span>
                </div>
              </div>
              
              <div className="card-metrics">
                <div className="metric">
                  <Briefcase size={16}/> 
                  <span>{company.roles} Roles</span>
                </div>
                <div className="metric">
                  <Users size={16}/> 
                  <span>{company.applicants} Candidates</span>
                </div>
                <div className="metric">
                  <MapPin size={16}/> 
                  <span>{company.location.split(',')[0]}</span>
                </div>
                <div className="metric pkg-preview">
                  <DollarSign size={16}/>
                  <span>{company.package.ctc.split('-')[0]}</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="btn-secondary btn-sm">Details</button>
                <button 
                  className={cn("btn-primary btn-sm", isScheduled && "btn-success-static")} 
                  onClick={(e) => handleSchedule(e, index)}
                  disabled={isScheduled}
                >
                  {isScheduled ? (
                    <><CheckCircle2 size={16}/> Scheduled</>
                  ) : (
                    "Schedule"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {selectedCompany && (
          <CompanyDetailsModal 
            company={selectedCompany} 
            onClose={() => setSelectedCompany(null)} 
          />
        )}
        {isAddModalOpen && (
          <AddPartnerModal 
            onSubmit={handleAddPartner} 
            onClose={() => setIsAddModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddPartnerModal = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'Software',
    location: '',
    website: '',
    description: '',
    package: '',
    logo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return showToast('Company name is required', 'error');
    
    // Auto-generate logo if empty using Clearbit
    const finalLogo = formData.logo || (formData.website ? `https://logo.clearbit.com/${new URL(formData.website).hostname}` : 'https://placehold.co/100x100?text=LOGO');
    
    onSubmit({ ...formData, logo: finalLogo });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="modal-content glass-panel" 
        style={{ maxWidth: '500px', padding: '32px' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Add New Partner</h3>
          <button className="icon-btn" onClick={onClose}><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="detail-label">Company Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Tesla"
              className="search-bar"
              style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '16px' }}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="detail-label">Industry</label>
              <select 
                className="search-bar"
                style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '12px' }}
                value={formData.industry}
                onChange={e => setFormData({...formData, industry: e.target.value})}
              >
                <option>Software</option>
                <option>Cloud</option>
                <option>Technology</option>
                <option>Fintech</option>
                <option>Automotive</option>
              </select>
            </div>
            <div className="form-group">
              <label className="detail-label">Package (CTC)</label>
              <input 
                type="text" 
                placeholder="e.g. 15.0 LPA"
                className="search-bar"
                style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '16px' }}
                value={formData.package}
                onChange={e => setFormData({...formData, package: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="detail-label">Website</label>
            <input 
              type="url" 
              placeholder="https://company.com"
              className="search-bar"
              style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '16px' }}
              value={formData.website}
              onChange={e => setFormData({...formData, website: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="detail-label">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Mumbai, Pune"
              className="search-bar"
              style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '16px' }}
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="detail-label">Brief Description</label>
            <textarea 
              rows="3"
              placeholder="What does the company do?"
              className="search-bar"
              style={{ width: '100%', background: 'var(--accent-light)', border: '1px solid var(--glass-border)', paddingLeft: '16px', paddingTop: '10px', height: 'auto' }}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
            Save Partner
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CompanyManagement;

