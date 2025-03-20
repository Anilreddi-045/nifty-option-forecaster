
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedCases = () => {
  // Sample data for featured cases with Telugu names
  const featuredCases = [
    {
      id: 1,
      title: "స్మిత్ ఎంటర్ప్రైజెస్ v. గ్లోబల్ కార్ప్",
      category: "కార్పొరేట్ లిటిగేషన్",
      year: "2023",
      description: "Successfully represented Smith Enterprises in a complex intellectual property dispute against Global Corp, resulting in a favorable settlement.",
      outcome: "విజయవంతమైన సెటిల్మెంట్",
      caseType: "మేధో సంపత్తి",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "వెస్ట్ ల్యాండ్ ప్రాపర్టీ డిస్ప్యూట్",
      category: "ప్రాపర్టీ లా",
      year: "2022",
      description: "Represented multiple property owners in a boundary dispute case involving commercial land with significant development potential.",
      outcome: "ట్రయల్ విక్టరీ",
      caseType: "భూమి వివాదం",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "జాన్సన్ కాంట్రాక్ట్ నెగోషియేషన్స్",
      category: "కాంట్రాక్ట్ లా",
      year: "2023",
      description: "Advised Johnson Manufacturing on restructuring supplier contracts to mitigate risks and improve terms, saving the company over $2M annually.",
      outcome: "కాంట్రాక్ట్ రీస్ట్రక్చరింగ్",
      caseType: "కమర్షియల్ కాంట్రాక్ట్స్",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredCases.map(caseItem => (
        <Card key={caseItem.id} className="flex flex-col h-full overflow-hidden">
          <div className="h-48 relative overflow-hidden">
            <img 
              src={caseItem.image} 
              alt={caseItem.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">{caseItem.outcome}</Badge>
            </div>
          </div>
          <CardHeader>
            <div>
              <CardTitle className="line-clamp-2">{caseItem.title}</CardTitle>
              <CardDescription>{caseItem.category} • {caseItem.year}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-700">{caseItem.description}</p>
            <div className="mt-4">
              <Badge variant="secondary">{caseItem.caseType}</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Link to={`/cases/${caseItem.id}`} className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <FileText size={16} />
                View Case Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedCases;
