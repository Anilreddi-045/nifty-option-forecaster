
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="bg-gray-200 rounded-full p-6 w-40 h-40 flex items-center justify-center">
        <UserCircle className="w-28 h-28 text-gray-500" />
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">Rama Kanth Reddy</h1>
        <p className="text-xl text-gray-600 mt-2">Advocate, Kurnool Court</p>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          <Badge variant="secondary">Criminal Law</Badge>
          <Badge variant="secondary">Civil Litigation</Badge>
          <Badge variant="secondary">Property Law</Badge>
          <Badge variant="secondary">Family Law</Badge>
          <Badge variant="secondary">Constitutional Law</Badge>
        </div>
        
        <p className="mt-6 text-gray-700 max-w-3xl">
          With extensive experience practicing law at the Kurnool Court, I provide 
          dedicated legal counsel to individuals and businesses across Andhra Pradesh. 
          My practice focuses on achieving justice while maintaining the highest ethical standards.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
          <Button>Download CV</Button>
          <Button variant="outline">Book Consultation</Button>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="mailto:advocate.ramakanth@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Mail size={20} />
              <span className="hidden md:inline">advocate.ramakanth@gmail.com</span>
            </Link>
            <Link to="https://www.linkedin.com/in/ramakanthreddy" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Linkedin size={20} />
              <span className="hidden md:inline">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
