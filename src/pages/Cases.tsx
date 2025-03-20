
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Filter, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("grid");
  
  // Sample data for all cases
  const allCases = [
    {
      id: 1,
      title: "Smith Enterprises v. Global Corp",
      category: "Corporate Litigation",
      year: "2023",
      description: "Successfully represented Smith Enterprises in a complex intellectual property dispute against Global Corp, resulting in a favorable settlement.",
      outcome: "Successful Settlement",
      caseType: "Intellectual Property",
      client: "Smith Enterprises"
    },
    {
      id: 2,
      title: "Westland Property Dispute",
      category: "Property Law",
      year: "2022",
      description: "Represented multiple property owners in a boundary dispute case involving commercial land with significant development potential.",
      outcome: "Trial Victory",
      caseType: "Land Dispute",
      client: "Westland Property Association"
    },
    {
      id: 3,
      title: "Johnson Contract Negotiations",
      category: "Contract Law",
      year: "2023",
      description: "Advised Johnson Manufacturing on restructuring supplier contracts to mitigate risks and improve terms, saving the company over $2M annually.",
      outcome: "Contract Restructuring",
      caseType: "Commercial Contracts",
      client: "Johnson Manufacturing"
    },
    {
      id: 4,
      title: "Martinez Family Trust",
      category: "Estate Planning",
      year: "2021",
      description: "Structured a comprehensive estate plan for the Martinez family, including tax optimization strategies and succession planning.",
      outcome: "Successful Implementation",
      caseType: "Estate Planning",
      client: "Martinez Family"
    },
    {
      id: 5,
      title: "City of Oakridge v. Thompson",
      category: "Administrative Law",
      year: "2022",
      description: "Defended a local business owner against improper zoning violations, resulting in case dismissal and policy changes.",
      outcome: "Case Dismissed",
      caseType: "Administrative Dispute",
      client: "Thompson Enterprises"
    },
    {
      id: 6,
      title: "Riverside Development Project",
      category: "Property Law",
      year: "2023",
      description: "Navigated complex regulatory requirements for a major riverside development project, securing all necessary approvals.",
      outcome: "Regulatory Approval",
      caseType: "Development Approvals",
      client: "Riverside Developers LLC"
    }
  ];
  
  const filteredCases = allCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Case Portfolio</h1>
            <p className="text-gray-600 mt-2">Browse through my previous cases and legal work</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search cases..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <Tabs defaultValue="grid" onValueChange={setCurrentView} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <TabsContent value="grid" className={currentView === "grid" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(caseItem => (
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{caseItem.caseType}</Badge>
                    <Badge variant="secondary" className="bg-gray-100">{caseItem.client}</Badge>
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
        </TabsContent>
        
        <TabsContent value="table" className={currentView === "table" ? "block" : "hidden"}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map(caseItem => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">{caseItem.title}</TableCell>
                      <TableCell>{caseItem.category}</TableCell>
                      <TableCell>{caseItem.year}</TableCell>
                      <TableCell>{caseItem.client}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{caseItem.outcome}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/cases/${caseItem.id}`}>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cases found matching your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cases;
