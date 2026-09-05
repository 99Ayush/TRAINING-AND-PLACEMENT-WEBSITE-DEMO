import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, FileText, CheckCircle, Clock, ExternalLink, 
  Download, Loader2, Frown, Plus, Filter, Search 
} from 'lucide-react';
import { showToast, cn } from '../utils';
import { companiesMockData } from '../data/mockData';
import './StudentPortal.css';

const StudentPortal = ({ user, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeName, setResumeName] = useState(`${user?.username || 'Student'}_Resume.pdf`);
  const [driveSearch, setDriveSearch] = useState('');
  const fileInputRef = useRef(null);

  const username = user?.username?.split('@')[0] || 'Student';
  const myApplications = user?.applications || [];
  const myCgpa = parseFloat(user?.cgpa || '0');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = (company) => {
    // 1. Check if already applied
    if (myApplications.find(a => a.company === company.name)) {
      return showToast(`Already applied to ${company.name}`, 'info');
    }

    // 2. Eligibility Check (CGPA)
    const requiredCgpa = company.eligibility.cgpa;
    if (myCgpa < requiredCgpa) {
      return showToast(`Eligibility Failed: Minimum ${requiredCgpa} CGPA required.`, 'error');
    }

    // 3. Update State
    const newApplication = {
      company: company.name,
      role: company.industry === 'Technology' ? 'Software Engineer' : 'Analyst',
      status: 'Applied',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      logo: company.logo
    };

    const updatedUser = {
      ...user,
      applications: [newApplication, ...myApplications]
    };

    setUser(updatedUser);
    
    // Persist to localStorage
    const savedUsers = JSON.parse(localStorage.getItem('campusSyncUsers') || '[]');
    const idx = savedUsers.findIndex(u => u.email === user.email);
    if (idx > -1) {
      savedUsers[idx] = updatedUser;
      localStorage.setItem('campusSyncUsers', JSON.stringify(savedUsers));
    }

    showToast(`Successfully applied to ${company.name}!`, 'success');
  };

  const ongoingDrives = companiesMockData.filter(c => 
    c.name.toLowerCase().includes(driveSearch.toLowerCase()) ||
    c.industry.toLowerCase().includes(driveSearch.toLowerCase())
  );

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setResumeName(file.name);
        setIsUploading(false);
        showToast('Resume uploaded successfully!', 'success');
      }, 1500);
    }
  };

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
    <div className="portal-container">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="welcome-banner"
      >
        <div className="banner-content">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Good Morning, {username}!
          </motion.h2>
          <p>Your placement journey is {myApplications.length > 0 ? '75%' : '45%'} complete. {myApplications.length === 0 ? 'Apply to focus companies today!' : 'Keep it up!'}</p>
        </div>
        <div className="banner-stats">
          <div className="stat-item">
            <span className="stat-val">{user?.cgpa || '8.5'}</span>
            <span className="stat-label">CGPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">{myApplications.length}</span>
            <span className="stat-label">Apps</span>
          </div>
        </div>
      </motion.div>

      <div className="portal-grid">
        <div className="main-column">
          {/* Ongoing Drives Section */}
          <div className="ongoing-section glass-panel" style={{ marginBottom: '32px' }}>
            <div className="section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={24} color="var(--primary-blue)" />
                <h3 style={{ margin: 0 }}>Ongoing Recruitment Drives</h3>
              </div>
              <div className="mini-search">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Filter by company..." 
                  value={driveSearch}
                  onChange={(e) => setDriveSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="drives-grid">
              {ongoingDrives.map((company, idx) => {
                const hasApplied = myApplications.some(a => a.company === company.name);
                const isEligible = myCgpa >= company.eligibility.cgpa;

                return (
                  <motion.div 
                    key={idx} 
                    className={cn("drive-card glass-panel", hasApplied && "applied-overlay")}
                    whileHover={{ y: -4 }}
                  >
                    <div className="drive-header">
                      <img 
                        src={company.logo} 
                        alt="" 
                        className="drive-logo" 
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random` }}
                      />
                      <div>
                        <h4>{company.name}</h4>
                        <span className="drive-domain">{company.industry}</span>
                      </div>
                    </div>
                    <div className="drive-body">
                      <div className="d-info">
                        <Clock size={14} /> <span>Ends Oct 25</span>
                      </div>
                      <div className={cn("d-info", !isEligible && "text-error")}>
                        <Filter size={14} /> <span>Min {company.eligibility.cgpa} CGPA</span>
                      </div>
                    </div>
                    <div className="drive-footer">
                      <span className="drive-pkg">{company.package.ctc.split('-')[0]}</span>
                      <button 
                        className={cn("btn-primary btn-sm", hasApplied && "btn-success-static")}
                        disabled={hasApplied}
                        onClick={() => handleApply(company)}
                      >
                        {hasApplied ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="side-column">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="resume-section glass-panel"
          >
            <h3>My Resume</h3>
            <div className="current-resume">
              <div className="resume-icon">
                <FileText size={24} />
              </div>
              <div className="resume-info">
                <h4>{resumeName}</h4>
                <p>Verified by TPO • 1.2 MB</p>
              </div>
            </div>
            
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            
            <motion.div 
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="upload-area" 
              onClick={handleUploadClick}
            >
              <AnimatePresence mode="wait">
                {isUploading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 size={24} color="var(--primary-blue)" className="animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Download size={24} color="var(--text-muted)" />
                  </motion.div>
                )}
              </AnimatePresence>
              <p>{isUploading ? "Uploading file..." : "Click to upload new version"}</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="timeline-section glass-panel"
          >
            <h3>Schedule</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Oracle Assessment</h4>
                  <p>Tomorrow • 10:00 AM</p>
                </div>
              </div>
              <div className="timeline-item text-muted" style={{ opacity: 0.6 }}>
                <div className="timeline-dot" style={{ background: 'var(--glass-border)' }}></div>
                <div className="timeline-content">
                  <h4>Google Interview</h4>
                  <p>Oct 18 • Completed</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Infosys PPT</h4>
                  <p>Oct 22 • Main Hall</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
