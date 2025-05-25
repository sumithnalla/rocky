import React, { useState } from 'react';
import { Building, Instagram, Mail, Phone } from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  return (
    <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Building className="h-7 w-7 text-pink-500" />
              <span className="text-white font-bold text-xl">
                Binge'N Celebration
              </span>
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <a
                href="mailto:bingencelebrations@gmail.com"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 flex items-center gap-2 justify-center md:justify-start"
              >
                <Mail className="h-5 w-5" />
                <span>bingencelebrations@gmail.com</span>
              </a>
              <div className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-5 w-5" />
                <span>+91 99590 59632</span>
              </div>
            </div>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/bingencelebrations?utm_source=qr&igsh=cXhpcjI3cjByYTdr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <button
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Binge'N Celebration. All rights
            reserved.
          </p>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </footer>
  );
};

export default Footer;
