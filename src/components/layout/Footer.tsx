
import { Link } from "react-router-dom";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Adv. Rama Kanth Reddy</h3>
            <p className="text-gray-300">
              Providing expert legal counsel and representation in Kurnool. 
              Committed to achieving justice for all clients with integrity and dedication.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center gap-2">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Kurnool Court Complex, Kurnool, Andhra Pradesh</span>
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <span>(+91) 9876543210</span>
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:advocate.ramakanth@gmail.com" className="hover:text-white">advocate.ramakanth@gmail.com</a>
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <Linkedin size={18} className="flex-shrink-0" />
                <a href="https://www.linkedin.com/in/ramakanthreddy" className="hover:text-white">linkedin.com/in/ramakanthreddy</a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/cases" className="text-gray-300 hover:text-white">Cases</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Advocate Rama Kanth Reddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
