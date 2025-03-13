import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GuidelinesAccordion = () => {
  const guidelines = [
    {
      title: "Respect Everyone",
      content:
        "Be kind and respectful to all members, regardless of skill level, background, or opinions. Hate speech, bullying, or harassment will NOT be tolerated.",
    },
    {
      title: "Stay Collaborative",
      content:
        "Share knowledge, provide constructive feedback, and support each other's growth.",
    },
    {
      title: "No Spamming or Irrelevant Promotions",
      content:
        "Avoid unnecessary self-promotion or irrelevant posts. Tech-related or career-boosting posts are encouraged if they add value to the community.",
    },
    {
      title: "Be Open to Feedback",
      content:
        "Criticism should always be constructive. Accept feedback graciously and use it to improve.",
    },
    {
      title: "Encourage Initiative",
      content:
        "Take the lead on projects, share ideas, and inspire others to contribute toward the community's success.",
    },
    {
      title: "Content Rules",
      content:
        "Stay on-topic with discussions focused on coding, career advice, personal development, or tech-related topics. When seeking help, clearly describe your problem and what you've already tried.",
    },
    {
      title: "Communication Etiquette",
      content:
        "Maintain a casual yet respectful tone. Avoid NSFW content or anything that could make others uncomfortable. Encourage solution-oriented discussions rather than just providing direct answers.",
    },
  ];
  return (
    <Accordion type="single" collapsible className="w-full">
      {guidelines.map((guideline, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-md">{guideline.title}</AccordionTrigger>
          <AccordionContent>{guideline.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default GuidelinesAccordion;
