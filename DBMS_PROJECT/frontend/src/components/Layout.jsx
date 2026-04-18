import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Briefcase, LogOut, Bell, Search, 
  Menu, ChevronLeft, Sun, Moon 
} from 'lucide-react';
import { showToast, cn } from '../utils';
import './Layout.css';

const Layout = ({ user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const location = useLocation();
  const { role, username, avatar } = user;
  
  // Permanent Robo Avatar for Admin (Robohash for high reliability)
  const adminRoboAvatar = 'https://robohash.org/admin-office?set=set1&bgset=bg1'; 
  const displayAvatar = role === 'TPO' ? adminRoboAvatar : (avatar || `https://ui-avatars.com/api/?name=${username}&background=random`);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} mode`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out securely');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="layout-container">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-overlay" 
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "sidebar glass-panel",
        isSidebarOpen && "open",
        isCollapsed && "collapsed"
      )}>
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
            <p className="nav-label">MAIN MENU</p>
            <NavLink to="/" className={({ isActive }) => cn("nav-link", isActive && "active")} end onClick={handleNavClick}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            
            {role === 'TPO' && (
              <>
                <NavLink to="/students" className={({ isActive }) => cn("nav-link", isActive && "active")} onClick={handleNavClick}>
                  <Users size={20} />
                  <span>Students</span>
                </NavLink>
                <NavLink to="/companies" className={({ isActive }) => cn("nav-link", isActive && "active")} onClick={handleNavClick}>
                  <Briefcase size={20} />
                  <span>Companies</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => cn("nav-link", isActive && "active")} onClick={handleNavClick}>
                  <LayoutDashboard size={20} />
                  <span>Reports</span>
                </NavLink>
              </>
            )}
            
            {role === 'STUDENT' && (
              <NavLink to="/applications" className={({ isActive }) => cn("nav-link", isActive && "active")} onClick={handleNavClick}>
                <Briefcase size={20} />
                <span>Applications</span>
              </NavLink>
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-mini">
            <img 
              src={displayAvatar} 
              alt="Avatar" 
              className="mini-avatar"
            />
            <div className="mini-user-info">
              <h4>{username.split('@')[0]}</h4>
              <p>Active Now</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar glass-header">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <button className="collapse-btn" onClick={toggleCollapse}>
              <ChevronLeft size={20} style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            <motion.h1
              key={location.pathname}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {location.pathname === '/' ? 'Overview' : 
               location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)}
            </motion.h1>
          </div>
          
          <div className="topbar-right">
            <div className="global-search">
              <Search size={18} />
              <input type="text" placeholder="Search for students, companies..." />
            </div>

            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="icon-btn">
              <Bell size={20} />
            </button>

            <div className="user-profile">
              <img 
                src={displayAvatar} 
                alt="Profile" 
                className={cn("topbar-avatar", "no-click")}
              />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="page-content"
          >
            <div className="page-content-inner">
              <Outlet />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
