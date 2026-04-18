import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Mail, Phone, ExternalLink, X, GraduationCap, MapPin, Building } from 'lucide-react';
import { cn } from '../utils';
import './StudentsDirectory.css';

const mockStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav@uni.edu", dept: "Computer Science", cgpa: 9.2, status: "Placed", company: "Google", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Priya Patel", email: "priya@uni.edu", dept: "Information Tech", cgpa: 8.8, status: "Placed", company: "Microsoft", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Rohan Singh", email: "rohan@uni.edu", dept: "Electronics", cgpa: 7.9, status: "Unplaced", company: null, avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 4, name: "Neha Gupta", email: "neha@uni.edu", dept: "Computer Science", cgpa: 8.5, status: "Placed", company: "Amazon", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Vikram Verma", email: "vikram@uni.edu", dept: "Mechanical", cgpa: 7.4, status: "Unplaced", company: null, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: 6, name: "Ananya Desai", email: "ananya@uni.edu", dept: "Information Tech", cgpa: 9.5, status: "Placed", company: "Atlassian", avatar: "https://i.pravatar.cc/150?img=44" },
];

const StudentsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || student.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...new Set(mockStudents.map(s => s.dept))];

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
    <div className="students-directory">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="directory-header"
      >
        <div>
          <h2>Talent Directory</h2>
          <p>Browse and manage the upcoming professional cohort.</p>
        </div>
        <div className="controls">
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search talent..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="students-grid"
      >
        {filteredStudents.map(student => (
          <motion.div 
            variants={itemVariants}
            key={student.id} 
            className="student-card glass-panel"
            onClick={() => setSelectedStudent(student)}
            whileHover={{ y: -5 }}
          >
            <div className="student-card-header">
              <img src={student.avatar} alt="" className="student-avatar" />
              <div className="student-info">
                <h4>{student.name}</h4>
                <p>{student.email}</p>
              </div>
            </div>
            
            <div className="student-details">
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">{student.dept}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CGPA</span>
                <span className="detail-value">{student.cgpa}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={cn("status-badge", student.status === 'Placed' ? 'status-placed' : 'status-unplaced')}>
                  {student.status}
                </span>
              </div>
              {student.company && (
                <div className="detail-item">
                  <span className="detail-label">Company</span>
                  <span className="detail-value">{student.company}</span>
                </div>
              )}
            </div>

            <button className="btn-primary view-btn">View Profile</button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedStudent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="avatar-modal-overlay"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="avatar-modal glass-panel" 
              style={{width: '90%', maxWidth: '480px'}}
              onClick={e => e.stopPropagation()}
            >
              <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <button className="icon-btn" onClick={() => setSelectedStudent(null)}>
                  <X size={20} color="var(--primary-blue)" />
                </button>
              </div>

              <div className="modal-profile-header">
                <img src={selectedStudent.avatar} alt="" className="modal-avatar-large" />
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '4px' }}>
                    {selectedStudent.name}
                  </h2>
                  <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <Mail size={16}/> {selectedStudent.email}
                  </p>
                </div>
              </div>
              
              <div className="student-meta-box">
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value"><Building size={14} style={{ marginRight: '6px' }}/> {selectedStudent.dept}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CGPA Score</span>
                  <span className="detail-value"><GraduationCap size={14} style={{ marginRight: '6px' }}/> {selectedStudent.cgpa}</span>
                </div>
                <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-label">Current Status</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                    <span className={cn("status-badge", selectedStudent.status === 'Placed' ? 'status-placed' : 'status-unplaced')}>
                      {selectedStudent.status}
                    </span>
                    {selectedStudent.company && (
                      <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>
                        Offer from {selectedStudent.company}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                <button className="btn-primary" style={{ flex: 1 }}>Download Portfolio</button>
                <button className="btn-secondary" style={{ flex: 1 }}>Contact Student</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsDirectory;
