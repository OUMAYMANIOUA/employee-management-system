import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="footer bg-dark text-light text-center py-3 mt-auto">
      <p>© {new Date().getFullYear()} EMS App - Tous droits réservés</p>
    </footer>
  );
};

export default FooterComponent;
