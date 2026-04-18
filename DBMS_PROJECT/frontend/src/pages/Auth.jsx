import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Building, GraduationCap, ChevronRight, 
  User, AlertCircle, Briefcase, ShieldCheck 
} from 'lucide-react';
import { showToast, cn } from '../utils';
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
    if (saved) return JSON.parse(saved);
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
        showToast('Success! Redirecting to dashboard...');
        setUser(user);
      } else {
        setErrorMsg('Invalid credentials or role selection.');
      }
    } else {
      const userExists = usersDb.find(u => u.email === email);
      if (userExists) {
        setErrorMsg('This email is already registered.');
        return;
      }

      const newUser = { 
        email, 
        pass: password, 
        role: selectedRole, 
        username: selectedRole === 'COMPANY' ? companyName : `${firstName} ${lastName}`.trim() || email,
        cgpa: cgpa || undefined,
        dept: department || undefined,
        applications: []
      };
      setUsersDb([...usersDb, newUser]);
      showToast('Account created successfully!', 'success');
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="auth-card glass-panel"
      >
        <div className="auth-brand-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="brand-logo-large"
          >
            🎓
          </motion.div>
          <h2>CampusSync</h2>
        </div>

        <div className="mode-toggle">
          <button 
            type="button" 
            className={cn(mode === 'LOGIN' && 'active')} 
            onClick={() => switchMode('LOGIN')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={cn(mode === 'SIGNUP' && 'active')} 
            onClick={() => switchMode('SIGNUP')}
          >
            Register
          </button>
        </div>

        <div className="auth-header">
          <motion.h3
            key={mode}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {mode === 'LOGIN' ? 'Welcome Back' : 'Get Started'}
          </motion.h3>
          <p>{mode === 'LOGIN' ? 'Access your placement journey' : 'Join the university recruitment network'}</p>
        </div>

        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="error-banner"
            >
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="role-toggle">
          <button 
            type="button" 
            className={cn("toggle-btn", selectedRole === 'STUDENT' && "active")} 
            onClick={() => setSelectedRole('STUDENT')}
          >
            <GraduationCap size={20}/>
            <span>Student</span>
          </button>
          
          {mode === 'LOGIN' ? (
            <button 
              type="button" 
              className={cn("toggle-btn", selectedRole === 'TPO' && "active")} 
              onClick={() => setSelectedRole('TPO')}
            >
              <ShieldCheck size={20}/>
              <span>Admin</span>
            </button>
          ) : null}

          <button 
            type="button" 
            className={cn("toggle-btn", selectedRole === 'COMPANY' && "active")} 
            onClick={() => setSelectedRole('COMPANY')}
          >
            <Building size={20}/>
            <span>Company</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Work Email</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="you@university.edu" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength="4" 
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'SIGNUP' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="signup-extra-fields"
              >
                <hr className="divider" />
                
                {selectedRole === 'STUDENT' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="split-group">
                      <div className="form-group">
                        <label>First Name</label>
                        <div className="input-with-icon">
                          <User size={18} />
                          <input type="text" placeholder="John" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <div className="input-with-icon">
                          <User size={18} />
                          <input type="text" placeholder="Doe" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
                        </div>
                      </div>
                    </div>
                    <div className="split-group">
                      <div className="form-group">
                        <label>Department</label>
                        <div className="input-with-icon">
                          <Briefcase size={18} />
                          <input type="text" placeholder="CSE / IT / ECE" value={department} onChange={(e)=>setDepartment(e.target.value)} required/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>CGPA</label>
                        <div className="input-with-icon">
                          <GraduationCap size={18} />
                          <input type="number" step="0.01" max="10" placeholder="0.00" value={cgpa} onChange={(e)=>setCgpa(e.target.value)} required/>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === 'COMPANY' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                      <label>Company Display Name</label>
                      <div className="input-with-icon">
                        <Building size={18} />
                        <input type="text" placeholder="Google / Microsoft" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Industry Vertical</label>
                      <div className="input-with-icon">
                        <Briefcase size={18} />
                        <input type="text" placeholder="High-Tech / FinTech" value={industry} onChange={(e)=>setIndustry(e.target.value)} required/>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary login-btn"
          >
            <span>{mode === 'LOGIN' ? 'Sign In' : 'Create Account'}</span>
            <ChevronRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
