import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, LogOut, Bell, Search, Settings, Menu, X, Edit2 } from 'lucide-react';
import { showToast } from '../utils';
import './Layout.css';

const Layout = ({ user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  
  const { role, username, avatar } = user;

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out securely');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const attemptAvatarUpdate = () => {
    if (avatarUrlInput.trim().length > 5) {
      const updatedUser = { ...user, avatar: avatarUrlInput };
      setUser(updatedUser);
      setProfileOpen(false);
      showToast('Avatar updated successfully!', 'success');
      
      // Update local storage explicitly
      const saved = JSON.parse(localStorage.getItem('campusSyncUsers'));
      const idx = saved.findIndex(u => u.email === updatedUser.email);
      if(idx > -1) {
        saved[idx] = updatedUser;
        localStorage.setItem('campusSyncUsers', JSON.stringify(saved));
      }
    }
  };

  return (
    <div className="layout-container">
      {/* Mobile overlay */}
      {isSidebarOpen && <div className="mobile-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar glass-panel ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo university-seal">🎓</div>
            <div className="brand-text">
              <h2>Placement Cell</h2>
              <p>University Dept.</p>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-label">MAIN</p>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end onClick={handleNavClick}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            
            {role === 'TPO' && (
              <>
                <NavLink to="/students" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={handleNavClick}>
                  <Users size={20} />
                  <span>Students Directory</span>
                </NavLink>
                <NavLink to="/companies" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={handleNavClick}>
                  <Briefcase size={20} />
                  <span>Partner Companies</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={handleNavClick}>
                  <LayoutDashboard size={20} />
                  <span>Placement Reports</span>
                </NavLink>
              </>
            )}
            
            {role === 'STUDENT' && (
              <>
                <NavLink to="/applications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={handleNavClick}>
                  <Briefcase size={20} />
                  <span>My Applications</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-mini" onClick={() => setProfileOpen(true)} style={{cursor: 'pointer'}}>
            <img 
              src={avatar || (role === 'TPO' ? "https://i.pravatar.cc/150?img=11" : role === 'STUDENT' ? "https://i.pravatar.cc/150?img=12" : "https://i.pravatar.cc/150?img=33")} 
              alt="User Avatar" 
              className="mini-avatar"
            />
            <div className="mini-user-info">
              <h4>{username.split('@')[0] || 'User'}</h4>
              <p>Online</p>
            </div>
            <Edit2 size={12} color="var(--text-muted)" style={{marginLeft: 'auto'}} />
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar glass-header">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={24} color="var(--primary-navy)" />
            </button>
            <h1>Department of Training & Placement</h1>
          </div>
          
          <div className="topbar-right">
            <div className="global-search">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search anything..." />
            </div>

            <div className="user-profile" onClick={() => setProfileOpen(true)} style={{cursor: 'pointer'}}>
              <img 
                src={avatar || (role === 'TPO' ? "https://i.pravatar.cc/150?img=11" : role === 'STUDENT' ? "https://i.pravatar.cc/150?img=12" : "https://i.pravatar.cc/150?img=33")} 
                alt="Profile" 
                className="topbar-avatar"
              />
            </div>
          </div>
        </header>

        {profileOpen && (
          <div className="avatar-modal-overlay">
            <div className="avatar-modal glass-panel">
               <div style={{display:'flex', justifyContent: 'space-between'}}>
                 <h3>Update Profile Picture</h3>
                 <button className="icon-btn" onClick={()=>setProfileOpen(false)}><X size={16}/></button>
               </div>
               <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px'}}>Provide a URL to an image file.</p>
               <input 
                 type="url" 
                 placeholder="https://example.com/my-photo.jpg" 
                 value={avatarUrlInput} 
                 onChange={(e) => setAvatarUrlInput(e.target.value)}
                 style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '16px'}}
               />
               <button className="btn-primary" onClick={attemptAvatarUpdate} style={{width: '100%'}}>Save Custom Avatar</button>
            </div>
          </div>
        )}

        <div className="page-content">
          <div className="page-content-inner">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
