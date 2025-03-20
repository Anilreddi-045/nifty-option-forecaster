
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, User, Gavel, Building, Clock } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would normally come from an API or database
  // For demonstration, we're using sample data
  const caseData = {
    id: parseInt(id || "1"),
    title: "Smith Enterprises v. Global Corp",
    category: "Corporate Litigation",
    year: "2023",
    description: "Successfully represented Smith Enterprises in a complex intellectual property dispute against Global Corp, resulting in a favorable settlement.",
    outcome: "Successful Settlement",
    caseType: "Intellectual Property",
    client: "Smith Enterprises",
    courtFiled: "U.S. District Court, Northern District of California",
    duration: "14 months",
    keyIssues: [
      "Patent infringement claims on proprietary technology",
      "Breach of confidentiality agreements",
      "Misappropriation of trade secrets"
    ],
    strategy: "We implemented a multi-faceted approach, combining aggressive litigation tactics with strategic settlement negotiations. After successfully defending against the defendant's motion to dismiss and obtaining favorable rulings on key discovery motions, we were able to negotiate from a position of strength.",
    result: "Secured a $4.2 million settlement for our client, along with a permanent injunction preventing further use of the disputed intellectual property. The settlement also included an ongoing licensing agreement that provides additional revenue to our client.",
    testimonial: {
      quote: "John's expertise in intellectual property law was instrumental in achieving this outcome. His strategic approach and tenacity made all the difference in our case.",
      author: "Michael Smith, CEO",
      company: "Smith Enterprises"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">Advocate Profile</Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/cases" className="text-primary font-medium">Cases</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/cases" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Cases
          </Link>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-2xl md:text-3xl">{caseData.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{caseData.category} • {caseData.year}</CardDescription>
                </div>
                <Badge className="text-base py-1 px-3">{caseData.outcome}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Client</p>
                      <p className="text-gray-600">{caseData.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Case Type</p>
                      <p className="text-gray-600">{caseData.caseType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Gavel className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Court Filed</p>
                      <p className="text-gray-600">{caseData.courtFiled}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Year</p>
                      <p className="text-gray-600">{caseData.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">{caseData.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Counsel</p>
                      <p className="text-gray-600">John Smith, Esq.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-bold mb-3">Case Overview</h3>
                  <p className="text-gray-700">{caseData.description}</p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-3">Key Issues</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {caseData.keyIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-3">Strategy</h3>
                  <p className="text-gray-700">{caseData.strategy}</p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-3">Result</h3>
                  <p className="text-gray-700">{caseData.result}</p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-3">Client Testimonial</h3>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <blockquote className="text-gray-700 italic">"{caseData.testimonial.quote}"</blockquote>
                      <footer className="mt-3">
                        <p className="font-medium">{caseData.testimonial.author}</p>
                        <p className="text-gray-600 text-sm">{caseData.testimonial.company}</p>
                      </footer>
                    </CardContent>
                  </Card>
                </section>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button onClick={() => window.location.href = "/contact"}>
                  Discuss a Similar Case
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CaseDetail;
