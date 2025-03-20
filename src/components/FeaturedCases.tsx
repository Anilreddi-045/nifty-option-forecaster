
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedCases = () => {
  // Sample data for featured cases
  const featuredCases = [
    {
      id: 1,
      title: "Smith Enterprises v. Global Corp",
      category: "Corporate Litigation",
      year: "2023",
      description: "Successfully represented Smith Enterprises in a complex intellectual property dispute against Global Corp, resulting in a favorable settlement.",
      outcome: "Successful Settlement",
      caseType: "Intellectual Property"
    },
    {
      id: 2,
      title: "Westland Property Dispute",
      category: "Property Law",
      year: "2022",
      description: "Represented multiple property owners in a boundary dispute case involving commercial land with significant development potential.",
      outcome: "Trial Victory",
      caseType: "Land Dispute"
    },
    {
      id: 3,
      title: "Johnson Contract Negotiations",
      category: "Contract Law",
      year: "2023",
      description: "Advised Johnson Manufacturing on restructuring supplier contracts to mitigate risks and improve terms, saving the company over $2M annually.",
      outcome: "Contract Restructuring",
      caseType: "Commercial Contracts"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredCases.map(caseItem => (
        <Card key={caseItem.id} className="flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{caseItem.title}</CardTitle>
                <CardDescription>{caseItem.category} • {caseItem.year}</CardDescription>
              </div>
              <Badge variant="outline">{caseItem.outcome}</Badge>
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
