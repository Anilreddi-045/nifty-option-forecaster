import MainLayout from "@/components/layout/MainLayout";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would typically come from an API call using the id
  const caseData = {
    id: Number(id),
    title: "Smith Enterprises v. Global Corp",
    category: "Corporate Litigation",
    year: "2023",
    description: "Successfully represented Smith Enterprises in a complex intellectual property dispute against Global Corp, resulting in a favorable settlement.",
    outcome: "Successful Settlement",
    caseType: "Intellectual Property",
    client: "Smith Enterprises",
    court: "Federal District Court, Northern District",
    judge: "Hon. Maria Rodriguez",
    filingDate: "March 15, 2023",
    closingDate: "September 28, 2023",
    details: `
      This case involved a complex intellectual property dispute between Smith Enterprises and Global Corp regarding patent infringement claims on manufacturing technology.
      
      The dispute centered around three key patents related to automated manufacturing processes that Smith Enterprises had developed over a five-year period. Global Corp had allegedly incorporated similar technology into their production lines without proper licensing or attribution.
      
      Our strategy involved a comprehensive approach:
      
      1. Thorough documentation of the patent history and development process
      2. Expert testimony from leading industry specialists
      3. Detailed technical analysis comparing the patented technology with Global Corp's implementation
      
      After six months of litigation and discovery, we were able to demonstrate clear evidence of infringement. This strong position led to settlement negotiations where we secured not only financial compensation but also an ongoing licensing agreement that provides continued revenue for our client.
      
      The settlement terms included:
      - A substantial one-time payment for past infringement
      - A structured licensing agreement for continued use
      - Formal acknowledgment of Smith Enterprises' intellectual property rights
      - Collaborative framework for future technology development
    `,
    keyAchievements: [
      "Secured $2.7M in damages for past infringement",
      "Established ongoing licensing agreement worth approximately $500K annually",
      "Preserved client's market position and reputation",
      "Completed resolution in under 7 months, saving significant litigation costs"
    ]
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/cases">
          <Button variant="outline" className="gap-2">
            <ArrowLeft size={16} />
            Back to All Cases
          </Button>
        </Link>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{caseData.title}</CardTitle>
              <CardDescription>{caseData.category} • {caseData.year}</CardDescription>
            </div>
            <Badge variant="outline">{caseData.outcome}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Client</h3>
              <p className="text-gray-900 flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                {caseData.client}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Court</h3>
              <p className="text-gray-900">{caseData.court}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Date</h3>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {caseData.filingDate}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Closing Date</h3>
              <p className="text-gray-900 flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                {caseData.closingDate}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Case Overview</h3>
            <p className="text-gray-700">{caseData.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Case Details</h3>
            <div className="text-gray-700 whitespace-pre-line">{caseData.details}</div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {caseData.keyAchievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <Button variant="outline" className="gap-2" onClick={() => window.print()}>
          <FileText size={16} />
          Print Case Summary
        </Button>
        <Link to="/contact">
          <Button className="gap-2">
            Discuss a Similar Case
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;
