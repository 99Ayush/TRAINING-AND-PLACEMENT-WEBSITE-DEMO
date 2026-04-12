import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Auth from './pages/Auth';

import AdminDashboard from './pages/AdminDashboard';
import StudentPortal from './pages/StudentPortal';
import CompanyManagement from './pages/CompanyManagement';

function App() {
  const [user, setUser] = useState(null); // { role, username, cgpa, avatar, ... }

  if (!user) {
    return (
      <>
        <Toast />
        <Auth setUser={setUser} />
      </>
    );
  }

  const { role, username } = user;

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          {/* Default Route based on role */}
          <Route 
            index 
            element={
              role === 'TPO' ? <AdminDashboard /> : 
              role === 'STUDENT' ? <StudentPortal user={user} /> : 
              <CompanyManagement />
            } 
          />
          
          {/* Other Routes */}
          {role === 'TPO' && (
            <>
              <Route path="companies" element={<CompanyManagement />} />
              <Route path="students" element={<div className="glass-panel"><h2>Students Directory</h2><p>List of all students.</p></div>} />
              <Route path="reports" element={<div className="glass-panel"><h2>Placement Reports</h2><p>Annual placement analytics.</p></div>} />
            </>
          )}

          {role === 'STUDENT' && (
            <Route path="applications" element={<div className="glass-panel"><h2>My Applications</h2><p>Detailed view of your applications.</p></div>} />
          )}
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
