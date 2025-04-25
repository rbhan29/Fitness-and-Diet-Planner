
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const FreeGuideSection = () => {
  const handleGuidePdfDownload = () => {
    // In a real app, this would download a PDF
    alert("In a real app, this would download a fitness guide PDF.");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Fitness Guide</h2>
          <p className="mb-8 opacity-90">
            Download our comprehensive fitness guide with workout routines, nutrition tips, and expert advice to kickstart your fitness journey.
          </p>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-white/90 text-primary"
            onClick={handleGuidePdfDownload}
          >
            <Download className="mr-2 h-4 w-4" /> Download Free Guide
          </Button>
        </div>
      </div>
    </section>
  );
};
