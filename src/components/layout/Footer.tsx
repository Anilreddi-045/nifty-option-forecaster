
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Advocate Profile</h3>
            <p className="text-gray-300">
              Providing expert legal counsel and representation for over 15 years. 
              Committed to achieving the best possible outcomes for all clients.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">123 Legal Street</p>
            <p className="text-gray-300">Lawton, CA 90210</p>
            <p className="text-gray-300">Phone: (555) 123-4567</p>
            <p className="text-gray-300">Email: contact@advocateprofile.com</p>
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
          <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
