
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Mail, UserCircle } from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";
import FeaturedCases from "@/components/FeaturedCases";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <NavigationMenu className="max-w-full w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 mr-6">Advocate Profile</h1>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/cases">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Cases
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/contact")}>
              <Mail size={16} />
              Contact Now
            </Button>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <ProfileHeader />
        
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
        
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Client Testimonials</h2>
          <Testimonials />
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Advocate Profile</h3>
              <p className="text-gray-300">
                Providing expert legal counsel and representation for over 15 years. 
                Committed to achieving the best possible outcomes for all clients.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300">123 Legal Street</p>
              <p className="text-gray-300">Lawton, CA 90210</p>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
              <p className="text-gray-300">Email: contact@advocateprofile.com</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/cases" className="text-gray-300 hover:text-white">Cases</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
