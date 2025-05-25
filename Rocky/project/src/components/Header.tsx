import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Venues', href: '#venues' },
    { name: 'Location', href: '#venue' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-sm py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/BINGEN.png"
                alt="Binge'N Celebrations"
                className="h-12 w-12"
              />
              <span className="hidden sm:inline text-white font-bold text-xl">
                Binge'N Celebration
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-5 rounded-full transition-all duration-300 text-sm uppercase tracking-wider font-bold hover:shadow-lg hover:shadow-pink-500/20"
              >
                Book Now
              </button>
            </nav>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden bg-gray-800 py-4 px-6 shadow-lg absolute top-full w-full">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block text-gray-300 hover:text-pink-500 py-2 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setIsBookingModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="block w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition-all duration-300 text-center"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default Header;
