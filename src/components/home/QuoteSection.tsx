
import { useEffect, useState } from "react";

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hard days are the best because that's when champions are made.",
  "If it doesn't challenge you, it doesn't change you.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
];

export const QuoteSection = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-2xl md:text-3xl font-medium italic max-w-4xl mx-auto">
          "{quote}"
        </blockquote>
      </div>
    </section>
  );
};
