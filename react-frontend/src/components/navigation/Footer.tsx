import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Send,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

import { useModal } from '../../contexts/ModalContext';

const Footer: React.FC = () => {
  const { openModal } = useModal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/src/assets/logo.svg" alt="Foodies" className="w-8 h-8" />
              <span className="text-xl font-bold text-primary-500">Foodies</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Discover the best food from over 1,000 restaurants and fast delivery to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal('contact')}
                  className="text-neutral-300 hover:text-primary-500 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={20} className="mr-2 text-primary-500 flex-shrink-0" />
                <span className="text-neutral-300">
                  123 Food Street, Cuisine City, FC 12345, USA
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-2 text-primary-500 flex-shrink-0" />
                <span className="text-neutral-300">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-2 text-primary-500 flex-shrink-0" />
                <span className="text-neutral-300">
                  support@foodies.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter for the latest updates on new restaurants and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-neutral-700 border-0 text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 w-full"
              />
              <button type="submit" className="bg-primary-500 rounded-r-lg px-4 flex items-center justify-center">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Foodies. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img
              src="https://images.pexels.com/photos/6863175/pexels-photo-6863175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Payment Methods"
              className="h-6"
              style={{ filter: 'brightness(0.8) invert(1)' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;