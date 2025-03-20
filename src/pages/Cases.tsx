
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Cases = () => {
  const navigate = useNavigate();
  
  const casesList = [
    {
      id: 1,
      title: "Property Dispute Resolution",
      category: "Property Law",
      summary: "Successfully resolved a complex property dispute between multiple heirs, ensuring fair distribution and preventing lengthy litigation.",
      outcome: "Settled",
      year: "2023"
    },
    {
      id: 2,
      title: "Criminal Defense Case",
      category: "Criminal Law",
      summary: "Represented a client facing serious criminal charges, resulting in reduced charges due to procedural violations and insufficient evidence.",
      outcome: "Charges Reduced",
      year: "2022"
    },
    {
      id: 3,
      title: "Family Trust Settlement",
      category: "Family Law",
      summary: "Helped a family establish a comprehensive trust to protect assets and ensure smooth transition of wealth across generations.",
      outcome: "Successful",
      year: "2023"
    },
    {
      id: 4,
      title: "Domestic Violence Protection",
      category: "Family Law",
      summary: "Secured protection orders for victims of domestic abuse and helped arrange safe living conditions.",
      outcome: "Protection Granted",
      year: "2022"
    },
    {
      id: 5,
      title: "Business Contract Dispute",
      category: "Civil Litigation",
      summary: "Represented a small business in a contract dispute with a larger corporation, achieving a favorable settlement.",
      outcome: "Settled",
      year: "2021"
    },
    {
      id: 6,
      title: "Constitutional Rights Violation",
      category: "Constitutional Law",
      summary: "Defended a client whose constitutional rights were violated by local authorities, resulting in dismissal of all charges.",
      outcome: "Charges Dismissed",
      year: "2021"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Notable Cases</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {casesList.map(caseItem => (
            <Card key={caseItem.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{caseItem.title}</CardTitle>
                    <CardDescription>Year: {caseItem.year}</CardDescription>
                  </div>
                  <Badge>{caseItem.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-700">{caseItem.summary}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Badge variant="outline">{caseItem.outcome}</Badge>
                <Button variant="outline" size="sm" onClick={() => navigate(`/cases/${caseItem.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cases;
