import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-700">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
