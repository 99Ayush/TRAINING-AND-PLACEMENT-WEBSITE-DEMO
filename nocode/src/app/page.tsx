'use client';

import { useState } from 'react';
import Dashboard from "../components/Dashboard";
import Vault from "../components/Vault";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 sm:p-20 pb-20 gap-8">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)]">
            Nivora
          </h1>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">Secure Vault & Aggregator</p>
        </div>
        <div className="px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 text-xs font-mono text-gray-400">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isAuthenticated ? 'bg-[var(--color-neon-blue)] animate-pulse' : 'bg-red-500'}`}></span>
          {isAuthenticated ? 'System Online' : 'Auth Required'}
        </div>
      </header>
      
      {!isAuthenticated ? (
        <div className="glass-card p-8 w-full max-w-sm mt-12 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] mb-6 flex items-center justify-center opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">WebAuthn Portal</h2>
          <p className="text-sm text-gray-400 mb-6 text-center">Authenticate with biometrics or passkey to access your secure vault.</p>
          
          <form onSubmit={handleLogin} className="w-full">
            <button 
              id="login-button"
              type="submit" 
              className="w-full py-3 rounded-lg bg-[var(--color-neon-blue)] text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Authenticate
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
          <Dashboard />
          <Vault />
        </div>
      )}
    </main>
  );
}
