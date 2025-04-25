
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export const TransformationSlider = ({ onStartTransformation }: { onStartTransformation: () => void }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderContainerRef.current) return;
    
    const containerRect = sliderContainerRef.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const containerWidth = containerRect.width;
    const clickX = clientX - containerRect.left;
    const newPosition = (clickX / containerWidth) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Transformation Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the real results our members have achieved with FitVerse
          </p>
        </div>
        
        <div 
          ref={sliderContainerRef}
          className="transform-slider max-w-2xl mx-auto rounded-xl overflow-hidden"
          onMouseDown={handleSliderMove}
          onTouchStart={handleSliderMove}
          onMouseMove={(e) => e.buttons === 1 && handleSliderMove(e)}
          onTouchMove={handleSliderMove}
        >
          <div 
            className="transform-before"
            style={{ 
              backgroundImage: "url(https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=60)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: `${sliderPosition}%`
            }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <span className="bg-black/50 text-white px-3 py-1 rounded text-sm">Before</span>
            </div>
          </div>
          <div 
            className="transform-after"
            style={{ 
              backgroundImage: "url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: `${100 - sliderPosition}%`,
              left: `${sliderPosition}%`
            }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <span className="bg-black/50 text-white px-3 py-1 rounded text-sm">After</span>
            </div>
          </div>
          <div 
            ref={sliderRef}
            className="slider-handle"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-handle-circle">
              <span className="text-xs">⟷</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 max-w-md mx-auto">
          <p className="text-muted-foreground mb-4">
            John lost 45 pounds and gained significant muscle mass in just 6 months following our program.
          </p>
          <Button onClick={onStartTransformation}>
            Start Your Transformation
          </Button>
        </div>
      </div>
    </section>
  );
};
