
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
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
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
