
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="bg-gray-200 rounded-full p-6 w-40 h-40 flex items-center justify-center">
        <UserCircle className="w-28 h-28 text-gray-500" />
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">John Smith, Esq.</h1>
        <p className="text-xl text-gray-600 mt-2">Senior Legal Counsel</p>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          <Badge variant="secondary">Corporate Law</Badge>
          <Badge variant="secondary">Civil Litigation</Badge>
          <Badge variant="secondary">Property Law</Badge>
          <Badge variant="secondary">Contract Negotiation</Badge>
          <Badge variant="secondary">Administrative Law</Badge>
        </div>
        
        <p className="mt-6 text-gray-700 max-w-3xl">
          With over 15 years of experience in corporate and civil litigation, I provide 
          strategic legal counsel to individuals and businesses. My practice focuses on 
          achieving favorable outcomes while maintaining the highest ethical standards.
        </p>
        
        <div className="flex gap-4 mt-6 justify-center md:justify-start">
          <Button>Download CV</Button>
          <Button variant="outline">Book Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
