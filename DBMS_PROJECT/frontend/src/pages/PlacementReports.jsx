import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Briefcase, Award, ArrowUpRight, Plus } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { cn } from '../utils';
import './PlacementReports.css';

const placementData = [
  { name: 'CS', placed: 85, total: 100 },
  { name: 'IT', placed: 75, total: 90 },
  { name: 'ECE', placed: 60, total: 110 },
  { name: 'ME', placed: 45, total: 80 },
];

const pieData = [
  { name: 'Placed', value: 265 },
  { name: 'Unplaced', value: 115 },
];

const COLORS = ['var(--primary-blue)', 'var(--accent-soft)'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-lg)' }}>
        <p style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--primary-navy)' }}>{label}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ color: 'var(--primary-blue)', fontSize: '0.9rem', fontWeight: 600 }}>
            Placed: {payload[0].value}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            Total: {payload[1].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const PlacementReports = () => {
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
    <div className="placement-reports">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="reports-header"
      >
        <h2>Placement Analytics</h2>
        <p>Comprehensive overview of university hiring trends and success metrics.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="report-stats-grid"
      >
        <motion.div variants={itemVariants} className="stat-card">
          <div className="stat-icon icon-blue">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>380</h3>
            <p>Registered</p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="stat-card">
          <div className="stat-icon icon-green">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3>265</h3>
            <p>Selected</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card">
          <div className="stat-icon icon-purple">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>45.0</h3>
            <p>Highest (LPA)</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card">
          <div className="stat-icon icon-orange">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>12.4</h3>
            <p>Average (LPA)</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="charts-grid">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="chart-card"
        >
          <div className="section-header">
            <h3>Department performance</h3>
            <button className="icon-btn-small"><ArrowUpRight size={18} /></button>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={placementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="placed" name="Placed" fill="var(--primary-blue)" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="total" name="Total" fill="var(--accent-soft)" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="chart-card"
        >
          <div className="section-header">
            <h3>Selection Ratio</h3>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="none"
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlacementReports;
