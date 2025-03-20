
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // This would typically be fetched from an API based on the ID
  // For demonstration, we'll use a static case detail
  const caseDetail = {
    id: Number(id),
    title: id === "1" ? "Property Dispute Resolution" : "Legal Case Details",
    category: id === "1" ? "Property Law" : "Legal Practice",
    client: "Confidential",
    year: "2023",
    duration: "8 months",
    outcome: id === "1" ? "Settled" : "Successful Resolution",
    challenge: "This case involved multiple stakeholders with competing claims to ancestral property, complicated by incomplete documentation and verbal agreements spanning decades.",
    approach: "I employed a systematic approach to verify all claims, researched historical records, and facilitated mediation between parties. By focusing on the underlying interests rather than initial positions, we were able to find common ground.",
    resolution: "After several rounds of negotiation, all parties agreed to a fair division of the property that honored historical contributions while addressing current needs. The settlement was formalized through proper legal documentation.",
    impact: "The resolution prevented potentially years of costly litigation, preserved family relationships, and allowed all parties to move forward with clarity about their property rights."
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate('/cases')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cases
        </Button>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-6 border-b">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{caseDetail.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{caseDetail.category}</Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{caseDetail.year}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">{caseDetail.outcome}</Badge>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Client</h3>
                <p className="text-gray-700">{caseDetail.client}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Duration</h3>
                <p className="text-gray-700">{caseDetail.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Practice Area</h3>
                <p className="text-gray-700">{caseDetail.category}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Challenge</h2>
                <p className="text-gray-700">{caseDetail.challenge}</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Approach</h2>
                <p className="text-gray-700">{caseDetail.approach}</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Resolution</h2>
                <p className="text-gray-700">{caseDetail.resolution}</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Impact</h2>
                <p className="text-gray-700">{caseDetail.impact}</p>
              </section>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Have a similar case?</h2>
          <p className="text-gray-700 mb-4">
            If you're facing a similar legal challenge, I can help. Contact me for a consultation to discuss your situation.
          </p>
          <Button onClick={() => navigate('/contact')}>
            Book a Consultation
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;
