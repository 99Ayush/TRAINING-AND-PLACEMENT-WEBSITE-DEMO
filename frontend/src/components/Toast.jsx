import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import './Toast.css';

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleShowToast = (e) => {
      setToast(e.detail);
      setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    window.addEventListener('showToast', handleShowToast);
    return () => window.removeEventListener('showToast', handleShowToast);
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast-container slide-in ${toast.type}`}>
      {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{toast.message}</span>
      <button onClick={() => setToast(null)} className="close-toast"><X size={16}/></button>
    </div>
  );
};

export default Toast;
