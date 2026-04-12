import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Briefcase, GraduationCap, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { showToast } from '../utils';
import './AdminDashboard.css';

const placementData = [
  { name: 'Computer Science', placed: 120, total: 130 },
  { name: 'Information Tech', placed: 85, total: 100 },
  { name: 'Electronics', placed: 65, total: 90 },
  { name: 'Mechanical', placed: 40, total: 80 },
  { name: 'Civil', placed: 25, total: 70 },
  { name: 'Electrical', placed: 55, total: 85 },
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
  { id: 1, name: 'Alice Sharma', dept: 'Computer Science', company: 'Google', package: '24 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Rahul Kumar', dept: 'Electronics', company: 'Texas Instruments', package: '12.5 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Sneha Patel', dept: 'Information Tech', company: 'Infosys', package: '6.5 LPA', status: 'Pending Approval', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'David Chen', dept: 'Computer Science', company: 'Microsoft', package: '42 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 5, name: 'Priya Singh', dept: 'Mechanical', company: 'L&T', package: '8 LPA', status: 'Pending Approval', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 6, name: 'Arjun Reddy', dept: 'Electrical', company: 'Siemens', package: '10 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 7, name: 'Neha Gupta', dept: 'Computer Science', company: 'Amazon', package: '30 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 8, name: 'Vikas Sharma', dept: 'Information Tech', company: 'TCS', package: '7 LPA', status: 'Offer Accepted', avatar: 'https://i.pravatar.cc/150?img=13' },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="kpi-grid">
        {/* KPI 1 */}
        <div className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Total Placed</h3>
              <p className="kpi-value">390</p>
            </div>
            <div className="kpi-icon"><GraduationCap size={24} /></div>
          </div>
          <div className="kpi-bottom positive">
            <TrendingUp size={16} />
            <span>12% from last year</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Ongoing Drives</h3>
              <p className="kpi-value">24</p>
            </div>
            <div className="kpi-icon ongoing"><Briefcase size={24} /></div>
          </div>
          <div className="kpi-bottom positive">
            <TrendingUp size={16} />
            <span>+4 new this week</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Average Package</h3>
              <p className="kpi-value">9.2 LPA</p>
            </div>
            <div className="kpi-icon avg"><Users size={24} /></div>
          </div>
          <div className="kpi-bottom positive">
            <TrendingUp size={16} />
            <span>Up by 1.5 LPA</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="kpi-card glass-panel">
          <div className="kpi-top">
            <div className="kpi-info">
              <h3>Top Package</h3>
              <p className="kpi-value">42 LPA</p>
            </div>
            <div className="kpi-icon max"><TrendingUp size={24} /></div>
          </div>
          <div className="kpi-bottom neutral">
            <span style={{marginLeft: 0}}>Offered by Microsoft</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section glass-panel">
          <div className="section-header">
            <h2>Placement Trends by Department</h2>
            <button className="icon-btn-small" onClick={() => showToast('Action clicked')}><MoreVertical size={16}/></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={placementData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="total" fill="#E5E7EB" radius={[6, 6, 0, 0]} name="Total Students" barSize={32} />
                <Bar dataKey="placed" fill="url(#colorPlaced)" radius={[6, 6, 0, 0]} name="Placed" barSize={32} />
                <defs>
                  <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-blue)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--primary-navy)" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section glass-panel">
          <div className="section-header">
            <h2>Hiring Velocity (Year-to-Date)</h2>
            <button className="icon-btn-small" onClick={() => showToast('Action clicked')}><MoreVertical size={16}/></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}}/>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}/>
                <Area type="monotone" dataKey="count" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-placements glass-panel">
        <div className="section-header">
          <h2>Recent Placements</h2>
          <button className="btn-secondary" onClick={() => showToast("Viewing full records...")}>View All</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Company Offer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPlacements.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-cell">
                      <img src={student.avatar} alt="Avatar" className="table-avatar" />
                      <span className="font-semibold">{student.name}</span>
                    </div>
                  </td>
                  <td>{student.dept}</td>
                  <td>
                    <div className="offer-cell">
                      <span className="font-bold text-navy">{student.company}</span>
                      <span className="package-tag">{student.package}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status === 'Offer Accepted' ? 'success' : 'warning'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td><button className="text-btn" onClick={() => showToast(`Loading profile for ${student.name}`, 'success')}>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
