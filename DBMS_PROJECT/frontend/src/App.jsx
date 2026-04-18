import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Auth from './pages/Auth';

import AdminDashboard from './pages/AdminDashboard';
import StudentPortal from './pages/StudentPortal';
import CompanyManagement from './pages/CompanyManagement';
import StudentsDirectory from './pages/StudentsDirectory';
import PlacementReports from './pages/PlacementReports';
import CompanyPortal from './pages/CompanyPortal';
import StudentApplications from './pages/StudentApplications';

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
              role === 'STUDENT' ? <StudentPortal user={user} setUser={setUser} /> : 
              <CompanyPortal />
            } 
          />
          
          {/* Other Routes */}
          {role === 'TPO' && (
            <>
              <Route path="companies" element={<CompanyManagement />} />
              <Route path="students" element={<StudentsDirectory />} />
              <Route path="reports" element={<PlacementReports />} />
            </>
          )}

          {role === 'STUDENT' && (
            <Route path="applications" element={<StudentApplications user={user} />} />
          )}
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
