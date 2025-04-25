
import { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { GoalSelector } from "@/components/home/GoalSelector";
import { PreviewSections } from "@/components/home/PreviewSections";
import { QuoteSection } from "@/components/home/QuoteSection";
import { TransformationSlider } from "@/components/home/TransformationSlider";
import { FreeGuideSection } from "@/components/home/FreeGuideSection";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";

const Home = () => {
  const [goalTab, setGoalTab] = useState("lose-weight");

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <GoalSelector />
      <PreviewSections />
      <QuoteSection />
      <TransformationSlider onStartTransformation={() => setGoalTab("lose-weight")} />
      <FreeGuideSection />
      <DashboardPreview />
    </div>
  );
};

export default Home;
