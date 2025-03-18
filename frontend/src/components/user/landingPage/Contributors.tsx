import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Contributors {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

const Contributors = () => {
  const [contributors, setContributors] = useState<Contributors[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/TheByteFlow/Inker/contributors"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Free and open-source</h2>
          <h3 className="text-5xl font-bold tracking-tight mb-8">
            Built by the community
          </h3>
          <p className="text-xl text-muted-foreground">
            Inker welcomes contributions from developers around the world
          </p>
        </div>

        {loading ? (
          <div className="text-center">Loading team members...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 md:mx-52">
            <TooltipProvider delayDuration={200}>
              {contributors.map((contributor) => (
                <Tooltip key={contributor.id}>
                  <TooltipTrigger asChild>
                    <Link
                      to={contributor.html_url}
                      target="_blank"
                      className="block transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                    >
                      <img
                        src={contributor.avatar_url || "/placeholder.svg"}
                        alt={`${contributor.login}'s avatar`}
                        width={60}
                        className="rounded-full"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{contributor.login}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contributors;
