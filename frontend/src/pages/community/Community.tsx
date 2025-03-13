import Button from "@/components/ui/button";
import { Users } from "lucide-react";
import CoreValues from "./CoreValues";
import GuidelinesAccordion from "./GuidelinesAccordion";
import TeamMember from "./TeamMember";
import { useEffect, useState } from "react";
import { FaGithub, FaTelegram } from "react-icons/fa";

interface GitHubMember {
  login: string;
  id: number;
  avatar_url: string;
}

const names: Record<string, string> = {
  ijas9118: "Ijas Ahammed",
  AJMALAJU3: "Ajmal Aliyar",
  MrLionByte: "Farhan Mahmood",
};

const Community = () => {
  const [teamMembers, setTeamMembers] = useState<GitHubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("https://api.github.com/orgs/thebyteflow/members");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GitHubMember[] = await response.json();
        setTeamMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0  bg-[size:20px_20px]" />
        </div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Users className="w-4 h-4 mr-2" />
            Brocamp Students' Community
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Welcome to <span className="text-primary">Brogrammers</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            A community built on collaboration, growth, and learning. Our goal is to push
            each other, share knowledge, and grow together.
          </p>
          <div className="flex flex-wrap justify-center ">
            <a href="https://t.me/+iKqAnpXnVkdiZmI1">
              <Button size="lg">
                <FaTelegram /> Join Our Community
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Our Core Values
            </h2>
            <p className="">These principles guide everything we do as a community</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-6">
            <CoreValues />
          </div>
        </div>
      </section>

      {/* Community Guidelines Section */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Community Guidelines
            </h2>
            <p>
              Follow these guidelines to help foster a positive and productive environment
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <GuidelinesAccordion />
          </div>
        </div>
      </section>

      {/* Core Team Members Section */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Meet Our Core Team
            </h2>
            <p>The dedicated individuals who help make our community thrive</p>
          </div>

          {loading ? (
            <div className="text-center">Loading team members...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  name={member.login}
                  github={member.login}
                  names={names}
                  imageUrl={member.avatar_url}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Current Project Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Current Project: Inker
            </h2>
            <p className="mb-8">
              Want to contribute? Submit your ideas or contributions through our form.
            </p>
            <Button variant="secondary" size="lg">
              <a
                href="https://www.notion.so/1967f101833b80bab729f4d72a75d418?pvs=21"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit Your Ideas
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-12 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 ">
            <div className="flex gap-4">
              <Button variant="ghost">
                <p>The Byte Flow</p>
                <a href="https://github.com/TheByteFlow">
                  <FaGithub className="w-5 h-5" />
                </a>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Brogrammers. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Community;
