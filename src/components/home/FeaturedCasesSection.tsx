
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeaturedCases from "@/components/FeaturedCases";

const FeaturedCasesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Cases</h2>
        <Button variant="outline" className="gap-2" onClick={() => navigate("/cases")}>
          View All Cases
          <Briefcase size={16} />
        </Button>
      </div>
      
      <FeaturedCases />
    </section>
  );
};

export default FeaturedCasesSection;
