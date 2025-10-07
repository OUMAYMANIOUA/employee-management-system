import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="modern-footer text-center py-3 mt-auto border-top border-light-subtle">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <div className="text-light">
          <i className="fas fa-copyright me-1"></i>
          {new Date().getFullYear()} EMS App
        </div>
        <div className="text-light opacity-75 small">
          <i className="fas fa-shield-alt me-1"></i>
          Gestion des employés sécurisée
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;