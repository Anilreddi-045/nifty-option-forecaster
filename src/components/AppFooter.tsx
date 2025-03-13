
import { Github } from "lucide-react";

const AppFooter = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Nifty Option Forecaster. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Disclaimer: This tool provides theoretical option prices. Actual market prices may vary.
            </p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-finance-dark transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
