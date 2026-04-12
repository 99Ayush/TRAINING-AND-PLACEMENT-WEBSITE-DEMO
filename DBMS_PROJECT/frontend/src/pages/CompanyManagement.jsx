import React from 'react';
import { Search, MapPin, Globe, Mail, Briefcase, Plus, Users } from 'lucide-react';
import { showToast } from '../utils';
import './CompanyManagement.css';

const companies = [
  { name: 'Google', industry: 'Technology', logo: 'https://logo.clearbit.com/google.com', roles: 4, applicants: 120, location: 'Hyderabad' },
  { name: 'Microsoft', industry: 'Software', logo: 'https://logo.clearbit.com/microsoft.com', roles: 3, applicants: 95, location: 'Bangalore' },
  { name: 'Amazon', industry: 'E-commerce', logo: 'https://logo.clearbit.com/amazon.com', roles: 5, applicants: 150, location: 'Chennai' },
  { name: 'Atlassian', industry: 'Software', logo: 'https://logo.clearbit.com/atlassian.com', roles: 2, applicants: 60, location: 'Remote' },
  { name: 'Cisco', industry: 'Networking', logo: 'https://logo.clearbit.com/cisco.com', roles: 3, applicants: 75, location: 'Pune' },
  { name: 'Oracle', industry: 'Database', logo: 'https://logo.clearbit.com/oracle.com', roles: 1, applicants: 40, location: 'Bangalore' },
  { name: 'Uber', industry: 'Ride-sharing', logo: 'https://logo.clearbit.com/uber.com', roles: 2, applicants: 85, location: 'Hyderabad' },
  { name: 'Adobe', industry: 'Design Software', logo: 'https://logo.clearbit.com/adobe.com', roles: 2, applicants: 50, location: 'Noida' },
];

const CompanyManagement = () => {
  return (
    <div className="company-container">
      <div className="company-header-bar glass-panel">
        <div className="bar-left">
          <h2>Partner Companies</h2>
          <p>Manage visiting companies and schedule drives.</p>
        </div>
        <div className="bar-right">
          <div className="search-bar">
            <Search size={20} color="var(--text-muted)" />
            <input type="text" placeholder="Search companies..." />
          </div>
          <button className="btn-primary" onClick={() => showToast("Add Company form opening...")}>
            <Plus size={18}/> Add Company
          </button>
        </div>
      </div>

      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card glass-panel" key={index}>
            <div className="card-top">
              <img src={company.logo} alt={company.name} className="brand-logo-img" />
              <div className="company-basic-info">
                <h3>{company.name}</h3>
                <span className="industry-tag">{company.industry}</span>
              </div>
            </div>
            
            <div className="card-metrics">
              <div className="metric">
                <Briefcase size={16}/> 
                <span>{company.roles} Roles open</span>
              </div>
              <div className="metric">
                <Users size={16}/> 
                <span>{company.applicants} Applicants</span>
              </div>
              <div className="metric">
                <MapPin size={16}/> 
                <span>{company.location}</span>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn-primary btn-sm" onClick={() => showToast(`Scheduling drive for ${company.name}`, 'success')}>Schedule</button>
              <button className="btn-secondary btn-sm" onClick={() => showToast(`Viewing details for ${company.name}`)}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
