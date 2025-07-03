import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-4 border-t border-gray-300 mt-10">
      <div className="flex justify-between items-center mx-5 md:mx-20 lg:mx-40 text-sm text-gray-600">
        <p>© {currentYear}</p>
        <p>Made by Estifanos Kebede</p>
      </div>
    </footer>
  );
};

export default Footer;
