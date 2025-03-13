import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Lightbulb, TrendingUp, Users } from "lucide-react";

const CoreValues = () => {
  const values = [
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Collaboration",
      description: "Work together, share ideas, and help each other succeed.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Growth",
      description: "Strive for personal and community-wide improvement.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Learning",
      description: "Share knowledge and solve problems together.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      title: "Support",
      description: "Empower each other's success through mentorship and guidance.",
    },
  ];
  return (
    <>
      {values.map((value, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
              {value.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CoreValues;
