import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Calendar, Briefcase, Building, 
  CheckCircle2, AlertCircle, MessageSquare, 
  Users, DollarSign, Send, ArrowRight, FileText
} from 'lucide-react';
import { showToast, cn } from '../utils';
import './CompanyPortal.css';

function CompanyPortal() {
  const [formData, setFormData] = useState({
    collegeName: '',
    jobRole: '',
    package: '',
    deadline: '',
    eligibility: ''
  });

  const [applications, setApplications] = useState([
    {
      id: 1,
      college: 'NIT Trichy',
      role: 'Software Development Engineer',
      status: 'approved',
      applicants: 152,
      date: 'Oct 15, 2026',
      type: 'drive'
    },
    {
      id: 2,
      college: 'VIT Vellore',
      role: 'Data Analyst',
      status: 'pending',
      applicants: 0,
      date: 'Oct 16, 2026',
      type: 'drive'
    },
    {
      id: 3,
      college: 'BITS Pilani',
      role: 'Product Manager Query',
      status: 'query',
      applicants: 0,
      date: 'Oct 17, 2026',
      type: 'query',
      message: 'Requesting confirmation of PPT slots for next week.'
    }
  ]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.collegeName || !formData.jobRole) return;
    
    const newDrive = {
      id: Date.now(),
      college: formData.collegeName,
      role: formData.jobRole,
      status: 'pending',
      applicants: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'drive'
    };

    setApplications([newDrive, ...applications]);
    setFormData({ collegeName: '', jobRole: '', package: '', deadline: '', eligibility: '' });
    showToast('Proposal submitted successfully!', 'success');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="company-portal-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="portal-hero"
      >
        <div className="hero-content">
          <h2>Partner Console</h2>
          <p>Orchestrate your campus presence and connect with emerging talent across premier institutions.</p>
        </div>
      </motion.div>

      <div className="portal-grid">
        {/* Proposal Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="portal-card"
        >
          <h3><FileText size={24} color="var(--primary-blue)"/> Draft Proposal</h3>
          <form className="drive-form" onSubmit={handleSubmit} id="proposal-form">
            <div className="form-group">
              <label>Target Institution</label>
              <div style={{ position: 'relative' }}>
                <input 
                  id="target-college"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="Search university..." 
                  required
                />
                <Building size={18} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Role Profile</label>
              <input 
                id="job-role"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="Software Engineer, Analyst, etc." 
                required
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>Max Package (LPA)</label>
                <input 
                  id="package-val"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  placeholder="e.g. 24.5" 
                />
              </div>
              <div className="form-group">
                <label>Closing Date</label>
                <input 
                  id="deadline-date"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Prerequisites</label>
              <textarea 
                id="eligibility-text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                placeholder="List required skills, CGPA, department, etc." 
              />
            </div>

            <button type="submit" className="btn-primary" id="submit-proposal-btn" style={{ height: '56px' }}>
              Dispatch to TPO <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </button>
          </form>
        </motion.div>

        {/* Status List */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="portal-card"
        >
          <h3><CheckCircle2 size={24} color="var(--primary-blue)"/> Active Engagements</h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="applications-list"
          >
            {applications.map(app => (
              <motion.div 
                variants={itemVariants}
                key={app.id} 
                className="app-item"
              >
                <div className="app-header" style={{ alignItems: 'center' }}>
                  <div>
                    <h4>{app.college}</h4>
                    <div className="role">{app.role}</div>
                  </div>
                  <span className={cn("badge status-badge", app.status)}>
                    {app.status === 'query' ? 'Waiting Info' : app.status}
                  </span>
                </div>
                {app.type === 'query' && (
                  <div style={{ padding: '12px', background: 'var(--accent-soft)', borderRadius: '8px', marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <MessageSquare size={16} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--primary-navy)', fontWeight: 600, margin: 0 }}>
                      {app.message}
                    </p>
                  </div>
                )}
                <div className="app-footer" style={{ marginTop: app.type === 'query' ? '12px' : '20px' }}>
                  {app.type === 'drive' ? (
                    <div className="applicants-count">
                      <Users size={16} />
                      {app.applicants} Candidates
                    </div>
                  ) : <div />}
                  <div className="date-received" style={{ fontWeight: 600 }}>{app.date}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyPortal;
