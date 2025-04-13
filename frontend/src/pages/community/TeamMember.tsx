import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface TeamMemberProps {
  name: string;
  github: string;
  imageUrl: string;
  names: Record<string, string>;
}

const TeamMember = ({ name, github, imageUrl, names }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 hover:bg-accent rounded-lg transition-colors">
      <div className="relative w-32 h-32">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover border-2"
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">{names[name]}</h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center w-full max-w-[200px]"
        >
          <Github className="w-4 h-4 mr-2" />
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate"
          >
            {github}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TeamMember;
