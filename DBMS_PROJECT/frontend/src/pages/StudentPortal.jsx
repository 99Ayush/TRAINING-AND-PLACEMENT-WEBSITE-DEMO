import React, { useState, useRef } from 'react';
import { Calendar, FileText, CheckCircle, Clock, ExternalLink, Download, Loader2, Frown } from 'lucide-react';
import { showToast } from '../utils';
import './StudentPortal.css';

const appliedJobs = [
  { company: 'Google', role: 'Software Engineer', status: 'Interviewing', date: 'Oct 12', logo: 'https://logo.clearbit.com/google.com' },
  { company: 'Microsoft', role: 'Cloud Solutions Architect', status: 'Applied', date: 'Oct 14', logo: 'https://logo.clearbit.com/microsoft.com' },
  { company: 'Amazon', role: 'SDE I', status: 'Offered', date: 'Oct 01', logo: 'https://logo.clearbit.com/amazon.com' },
  { company: 'Atlassian', role: 'Frontend Engineer', status: 'Rejected', date: 'Sep 28', logo: 'https://logo.clearbit.com/atlassian.com' },
  { company: 'Cisco', role: 'Network Engineer', status: 'Interviewing', date: 'Oct 10', logo: 'https://logo.clearbit.com/cisco.com' },
];

const StudentPortal = ({ user }) => {
  const username = user?.username?.split('@')[0] || 'Student';
  const myApplications = user?.applications || [];
  
  const fileInputRef = useRef(null);
  const [resumeName, setResumeName] = useState(`${username}_SDE_Resume.pdf`);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setResumeName(file.name);
        setIsUploading(false);
        showToast('Resume explicitly uploaded and saved!');
      }, 1200);
    }
  };

  return (
    <div className="portal-container">
      <div className="welcome-banner">
        <div className="banner-content">
          <h2>Welcome back, {username}!</h2>
          <p>Make sure your resume is up to date.</p>
        </div>
        <div className="banner-stats">
          <div className="stat-item">
            <span className="stat-val">{user?.cgpa || 'N/A'}</span>
            <span className="stat-label">Current CGPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">{myApplications.length}</span>
            <span className="stat-label">Applications</span>
          </div>
        </div>
      </div>

      <div className="portal-grid">
        <div className="main-column">
          <div className="application-status glass-panel">
            <div className="section-header">
              <h3>Active Applications</h3>
              <button className="text-btn" onClick={() => showToast("Loading full application history...")}>View full history</button>
            </div>
            
            <div className="status-list">
              {myApplications.length === 0 ? (
                <div className="empty-state">
                  <Frown size={40} color="var(--text-muted)" />
                  <h4>No Applications Yet</h4>
                  <p>You have not applied to any companies on the portal. Explore the Companies tab to start your journey!</p>
                </div>
              ) : (
                myApplications.map((job, idx) => (
                  <div className="status-item" key={idx}>
                    <img src={job.logo} alt={job.company} className="company-logo-img" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + job.company + '&background=random' }} />
                    <div className="status-details">
                      <h4>{job.role}</h4>
                      <p>{job.company} • Applied on {job.date}</p>
                    </div>
                    <div className={`status-badge ${job.status.toLowerCase()}`}>
                      {job.status === 'Applied' && <CheckCircle size={14} />}
                      {job.status === 'Interviewing' && <Clock size={14} />}
                      {job.status === 'Offered' && <CheckCircle size={14} />}
                      {job.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="side-column">
          <div className="resume-section glass-panel">
            <h3>Resume Management</h3>
            <div className="current-resume">
              <div className="resume-icon"><FileText size={24} color="var(--primary-blue)" /></div>
              <div className="resume-info">
                <h4>{resumeName}</h4>
                <p>Updated just now</p>
              </div>
            </div>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <div className="upload-area" onClick={handleUploadClick}>
              {isUploading ? (
                <Loader2 size={24} color="var(--primary-blue)" className="animate-spin" />
              ) : (
                <Download size={24} color="var(--text-muted)" />
              )}
              <p>{isUploading ? "Uploading file..." : "Drag & drop or click to upload"}</p>
            </div>
          </div>

          <div className="timeline-section glass-panel">
            <h3>Upcoming Drives</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Oracle Database Assessment</h4>
                  <p>Oct 16 • Online Test</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Google Technical Interview</h4>
                  <p>Oct 18 • 10:00 AM</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Infosys Placement Talk</h4>
                  <p>Oct 22 • Main Auditorium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
