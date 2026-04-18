import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell 
} from 'recharts';
import { 
  Users, Briefcase, GraduationCap, TrendingUp, 
  TrendingDown, MoreVertical, Search, Filter, 
  Download, ArrowUpRight 
} from 'lucide-react';
import { showToast, cn } from '../utils';
import './AdminDashboard.css';

const placementData = [
  { name: 'CS', placed: 120, total: 130 },
  { name: 'IT', placed: 85, total: 100 },
  { name: 'ECE', placed: 65, total: 90 },
  { name: 'ME', placed: 40, total: 80 },
  { name: 'CE', placed: 25, total: 70 },
  { name: 'EE', placed: 55, total: 85 },
];

const timelineData = [
  { month: 'Jan', count: 10 },
  { month: 'Feb', count: 45 },
  { month: 'Mar', count: 85 },
  { month: 'Apr', count: 120 },
  { month: 'May', count: 190 },
  { month: 'Jun', count: 305 },
];

const recentPlacements = [
  { id: 1, name: 'Alice Sharma', dept: 'CS', company: 'Google', package: '24 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Rahul Kumar', dept: 'ECE', company: 'Texas Inst.', package: '12.5 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Sneha Patel', dept: 'IT', company: 'Infosys', package: '6.5 LPA', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'David Chen', dept: 'CS', company: 'Microsoft', package: '42 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="dashboard-container">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="kpi-grid"
      >
        <motion.div variants={itemVariants} className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Total Placed</h3>
              <p className="kpi-value">390</p>
            </div>
            <div className="kpi-icon">
              <GraduationCap size={24} />
            </div>
          </div>
          <div className="kpi-bottom positive">
            <TrendingUp size={16} />
            <span>12% growth</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Ongoing Drives</h3>
              <p className="kpi-value">24</p>
            </div>
            <div className="kpi-icon" style={{ color: '#F59E0B' }}>
              <Briefcase size={24} />
            </div>
          </div>
          <div className="kpi-bottom positive">
            <AlertCircle size={16} />
            <span>4 starting today</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Avg. Package</h3>
              <p className="kpi-value">9.2</p>
            </div>
            <div className="kpi-icon" style={{ color: '#10B981' }}>
              <ArrowUpRight size={24} />
            </div>
          </div>
          <div className="kpi-bottom positive">
            <TrendingUp size={16} />
            <span>+1.5 LPA boost</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Top Offer</h3>
              <p className="kpi-value">42</p>
            </div>
            <div className="kpi-icon" style={{ color: '#8B5CF6' }}>
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="kpi-bottom neutral">
            <span>Microsoft • India</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="dashboard-content">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="chart-section glass-panel"
        >
          <div className="section-header">
            <h2>Placement Mix</h2>
            <div className="header-actions">
              <button className="icon-btn"><Filter size={18} /></button>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'var(--accent-soft)'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-lg)', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)'}}
                />
                <Bar dataKey="placed" radius={[6, 6, 0, 0]} barSize={30}>
                  {placementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary-blue)' : 'var(--accent-soft)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="chart-section glass-panel"
        >
          <div className="section-header">
            <h2>Hiring Speed</h2>
            <div className="header-actions">
              <button className="icon-btn"><Download size={18} /></button>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-lg)'}} />
                <Area type="monotone" dataKey="count" stroke="var(--primary-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="recent-placements glass-panel"
      >
        <div className="section-header">
          <h2>Latest Talent Matches</h2>
          <div className="header-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search students..." />
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Dept</th>
                <th>Company</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentPlacements.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-cell">
                      <img src={student.avatar} alt="" className="table-avatar" />
                      <span style={{ fontWeight: 700 }}>{student.name}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{student.dept}</td>
                  <td>
                    <div className="offer-cell">
                      <span style={{ fontWeight: 800, color: 'var(--primary-navy)' }}>{student.company}</span>
                      <span className="package-tag">{student.package}</span>
                    </div>
                  </td>
                  <td>
                    <span className={cn("status-badge", student.status === 'Offer Accepted' ? 'success' : 'warning')}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Simple AlertCircle fallback since I might have missed it in imports
const AlertCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export default AdminDashboard;
