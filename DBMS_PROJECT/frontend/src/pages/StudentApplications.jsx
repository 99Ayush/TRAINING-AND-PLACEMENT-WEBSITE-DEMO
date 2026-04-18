import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, Briefcase, Calendar, CheckCircle, 
  Clock, XCircle, Search, Filter, Info 
} from 'lucide-react';
import { cn } from '../utils';
import './StudentPortal.css'; // Reuse portal styles

const StudentApplications = ({ user }) => {
  const applications = user?.applications || [];
  
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
    <div className="portal-container">
      <div className="section-header glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="brand-logo-large" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>📋</div>
          <div>
            <h2 style={{ margin: 0 }}>My Applications</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Track your progress with {applications.length} recruitment drives.</p>
          </div>
        </div>
        <div className="bar-right">
          <div className="mini-search">
            <Search size={18} />
            <input type="text" placeholder="Search applications..." />
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="applications-list"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {applications.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '100px 40px' }}>
            <Briefcase size={64} color="var(--glass-border)" style={{ marginBottom: '24px', opacity: 0.5 }} />
            <h3>No Active Applications</h3>
            <p>You haven't applied to any drives yet. Head over to the Dashboard to explore opportunities.</p>
          </div>
        ) : (
          applications.map((app, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="application-full-card glass-panel"
              style={{ 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 2 }}>
                <img 
                  src={app.logo} 
                  alt="" 
                  className="company-logo-img" 
                  style={{ width: '64px', height: '64px' }}
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${app.company}&background=random` }}
                />
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{app.role}</h3>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-muted)' }}>{app.company}</p>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="d-info"><Calendar size={14} /> <span>Applied: {app.date}</span></div>
                <div className="d-info"><Clock size={14} /> <span>Round: Initial Screening</span></div>
              </div>

              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div className={cn("status-badge", app.status.toLowerCase())}>
                   {app.status === 'Applied' && <Clock size={14} />}
                   {app.status === 'Interviewing' && <CheckCircle size={14} />}
                   {app.status}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary btn-sm" style={{ padding: '10px 16px' }}>View Details</button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default StudentApplications;
