
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PracticeAreas = () => {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Practice Areas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Corporate Law</CardTitle>
            <CardDescription>Business formation, contracts, compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Specialized in helping businesses navigate complex legal landscapes, from startup 
              formation to corporate compliance and contract negotiations.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Civil Litigation</CardTitle>
            <CardDescription>Dispute resolution, settlements, trials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Representing clients in civil disputes with a strong record of favorable settlements 
              and successful trial outcomes across various jurisdictions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Property Law</CardTitle>
            <CardDescription>Real estate, land disputes, tenant rights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Handling all aspects of property law from real estate transactions to complex 
              ownership disputes and commercial property negotiations.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PracticeAreas;
