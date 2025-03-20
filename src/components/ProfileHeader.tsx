
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <Avatar className="w-40 h-40">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Rama Kanth Reddy"
          className="object-cover"
        />
        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">RKR</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">రామ కంఠ రెడ్డి</h1>
        <p className="text-xl text-gray-600 mt-2">Advocate, Kurnool Court</p>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          <Badge variant="secondary">క్రిమినల్ లా</Badge>
          <Badge variant="secondary">సివిల్ లిటిగేషన్</Badge>
          <Badge variant="secondary">ప్రాపర్టీ లా</Badge>
          <Badge variant="secondary">ఫ్యామిలీ లా</Badge>
          <Badge variant="secondary">కాన్స్టిట్యూషనల్ లా</Badge>
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
