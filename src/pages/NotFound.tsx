
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-24 h-24 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-12 w-12 text-brand-purple" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you were looking for. Perhaps you were searching for a deal that's no longer available?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline">
            <Link to="/search">
              <Search className="mr-2 h-4 w-4" />
              Search for Deals
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
