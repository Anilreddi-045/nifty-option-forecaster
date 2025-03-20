
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Mail, Scale, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-primary-foreground py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+919876543210" className="flex items-center gap-1">
              <Phone size={14} />
              +91 98765 43210
            </a>
            <a href="mailto:advocate.ramakanth@gmail.com" className="flex items-center gap-1">
              <Mail size={14} />
              advocate.ramakanth@gmail.com
            </a>
          </div>
          <div>
            <span className="text-sm">న్యాయ సలహాల కోసం: 10:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>
    
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <NavigationMenu className="max-w-full w-full justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 mr-6">
                <Scale className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-gray-900">అడ్వకేట్ రామ కంఠ రెడ్డి</h1>
              </Link>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      హోమ్
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/cases">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      కేసులు
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      గురించి
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      సంప్రదించండి
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>
            <Button className="gap-2" onClick={() => navigate("/contact")}>
              <Phone size={16} />
              నేడే సంప్రదించండి
            </Button>
          </NavigationMenu>
        </div>
      </header>

      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
