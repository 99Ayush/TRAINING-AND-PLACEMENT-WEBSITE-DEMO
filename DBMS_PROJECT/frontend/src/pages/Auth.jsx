import React, { useState, useEffect } from 'react';
import { Mail, Lock, Building, GraduationCap, ChevronRight, User, AlertCircle, Briefcase, MapPin } from 'lucide-react';
import { showToast } from '../utils';
import './Auth.css';

const defaultUsers = [
  { email: 'alex@uni.edu', pass: '1234', role: 'STUDENT', username: 'alex', cgpa: '8.75', dept: 'Computer Science', applications: [{ company: 'Google', role: 'Software Engineer', status: 'Interviewing', date: 'Oct 12', logo: 'https://logo.clearbit.com/google.com' }] },
  { email: 'admin@uni.edu', pass: '1234', role: 'TPO', username: 'Placement Office' },
  { email: 'hr@google.com', pass: '1234', role: 'COMPANY', username: 'Google HR' },
  { email: 'ayush@uni.edu', pass: 'ayush123', role: 'TPO', username: 'ayush' }
];

const Auth = ({ setUser }) => {
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'SIGNUP'
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  
  // Generic Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Signup Specific Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');

  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('campusSyncUsers');
    if (saved) {
      let parsed = JSON.parse(saved);
      // Force inject ayush if missing so testing works immediately
      if (!parsed.find(u => u.email === 'ayush@uni.edu')) {
        parsed.push({ email: 'ayush@uni.edu', pass: 'ayush123', role: 'TPO', username: 'ayush' });
      }
      return parsed;
    }
    return defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem('campusSyncUsers', JSON.stringify(usersDb));
  }, [usersDb]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'LOGIN') {
      const user = usersDb.find(u => u.email === email && u.pass === password && u.role === selectedRole);
      if (user) {
        showToast('Successfully logged in!');
        setUser(user); // Auto log in with full object (cgpa, apps, etc)
      } else {
        setErrorMsg('Account does not exist or incorrect password/role.');
      }
    } else {
      // SIGNUP MODE
      const userExists = usersDb.find(u => u.email === email);
      if (userExists) {
        setErrorMsg('Email is already registered. Please log in.');
        return;
      }

      // In a real app we would push this to a database
      const newUser = { 
        email, 
        pass: password, 
        role: selectedRole, 
        username: email,
        cgpa: cgpa || undefined,
        dept: department || undefined,
        applications: [] // Empty applications array mapped to Hackathon fix
      };
      setUsersDb([...usersDb, newUser]); // updating the mock DB
      
      showToast('Registration successful!', 'success');
      setUser(newUser);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMsg('');
    if (newMode === 'SIGNUP' && selectedRole === 'TPO') {
      setSelectedRole('STUDENT');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <div className="auth-brand-center">
          <div className="brand-logo-large">🎓</div>
          <h2>Placement Cell</h2>
        </div>

        <div className="mode-toggle">
          <button type="button" className={mode === 'LOGIN' ? 'active' : ''} onClick={() => switchMode('LOGIN')}>Log In</button>
          <button type="button" className={mode === 'SIGNUP' ? 'active' : ''} onClick={() => switchMode('SIGNUP')}>Sign Up</button>
        </div>

        <div className="auth-header">
          <h3>{mode === 'LOGIN' ? 'Welcome Back' : 'Create an Account'}</h3>
          <p>{mode === 'LOGIN' ? 'Sign in to the university portal' : 'Register for placement & hiring access'}</p>
        </div>

        {errorMsg && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="role-toggle">
          <button type="button" className={`toggle-btn ${selectedRole === 'STUDENT' ? 'active' : ''}`} onClick={() => setSelectedRole('STUDENT')}>
            <GraduationCap size={16}/> Student
          </button>
          
          {mode === 'LOGIN' && (
            <button type="button" className={`toggle-btn ${selectedRole === 'TPO' ? 'active' : ''}`} onClick={() => setSelectedRole('TPO')}>
              <Lock size={16}/> Admin
            </button>
          )}

          <button type="button" className={`toggle-btn ${selectedRole === 'COMPANY' ? 'active' : ''}`} onClick={() => setSelectedRole('COMPANY')}>
            <Building size={16}/> Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} color="var(--text-muted)" />
              <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          
          <div className="form-group">
            <div className="label-row">
              <label>Password</label>
            </div>
            <div className="input-with-icon">
              <Lock size={18} color="var(--text-muted)" />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="4" />
            </div>
          </div>

          {/* DYNAMIC SIGNUP FIELDS */}
          {mode === 'SIGNUP' && (
            <div className="signup-extra-fields">
              <hr className="divider" />
              <p className="section-label">Additional {selectedRole} Details</p>

              {selectedRole === 'STUDENT' && (
                <>
                  <div className="split-group">
                    <div className="form-group">
                      <label>First Name</label>
                      <div className="input-with-icon">
                        <User size={18} color="var(--text-muted)" />
                        <input type="text" placeholder="John" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <div className="input-with-icon">
                        <User size={18} color="var(--text-muted)" />
                        <input type="text" placeholder="Doe" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
                      </div>
                    </div>
                  </div>
                  <div className="split-group">
                    <div className="form-group">
                      <label>Department</label>
                      <div className="input-with-icon">
                        <Building size={18} color="var(--text-muted)" />
                        <input type="text" placeholder="Computer Science" value={department} onChange={(e)=>setDepartment(e.target.value)} required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>CGPA</label>
                      <div className="input-with-icon">
                        <GraduationCap size={18} color="var(--text-muted)" />
                        <input type="number" step="0.01" max="10" placeholder="8.50" value={cgpa} onChange={(e)=>setCgpa(e.target.value)} required/>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedRole === 'COMPANY' && (
                <>
                  <div className="form-group">
                    <label>Company Name</label>
                    <div className="input-with-icon">
                      <Building size={18} color="var(--text-muted)" />
                      <input type="text" placeholder="Tech Corp Inc." value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Industry</label>
                    <div className="input-with-icon">
                      <Briefcase size={18} color="var(--text-muted)" />
                      <input type="text" placeholder="Software Engineering" value={industry} onChange={(e)=>setIndustry(e.target.value)} required/>
                    </div>
                  </div>
                </>
              )}

              {selectedRole === 'TPO' && mode !== 'SIGNUP' && (
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} color="var(--text-muted)" />
                    <input type="text" placeholder="Admin Username" required/>
                  </div>
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn-primary login-btn">
            <span>{mode === 'LOGIN' ? 'Sign In Securely' : 'Complete Registration'}</span>
            <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
