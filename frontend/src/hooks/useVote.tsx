// useVote.ts
import { useState } from "react";
import { toast } from "sonner";
import { VoteService } from "@/services/voteServices";

export const useVote = (blogId: string, initialUp: boolean, initialDown: boolean, initialUpVotes: number, initialDownVotes: number) => {
  const [localUpVotes, setLocalUpVotes] = useState(initialUpVotes);
  const [localDownVotes, setLocalDownVotes] = useState(initialDownVotes);
  const [localHasUpVoted, setLocalHasUpVoted] = useState(initialUp);
  const [localHasDownVoted, setLocalHasDownVoted] = useState(initialDown);
  const [loading, setLoading] = useState(false);

  const handleUpVote = async () => {
    if (loading) return;

    const prev = { localUpVotes, localDownVotes, localHasUpVoted, localHasDownVoted };
    let upVotes = localUpVotes;
    let downVotes = localDownVotes;
    let up = localHasUpVoted;
    let down = localHasDownVoted;

    if (up) {
      upVotes--;
      up = false;
    } else {
      upVotes++;
      up = true;
      if (down) {
        downVotes--;
        down = false;
      }
    }

    setLocalUpVotes(upVotes);
    setLocalHasUpVoted(up);
    setLocalDownVotes(downVotes);
    setLocalHasDownVoted(down);
    setLoading(true);

    try {
      await VoteService.upVote(blogId);
    } catch (err) {
      console.log(err);
      toast.error("Failed to vote. Try again.");
      setLocalUpVotes(prev.localUpVotes);
      setLocalHasUpVoted(prev.localHasUpVoted);
      setLocalDownVotes(prev.localDownVotes);
      setLocalHasDownVoted(prev.localHasDownVoted);
    } finally {
      setLoading(false);
    }
  };

  const handleDownVote = async () => {
    if (loading) return;

    const prev = { localUpVotes, localDownVotes, localHasUpVoted, localHasDownVoted };
    let upVotes = localUpVotes;
    let downVotes = localDownVotes;
    let up = localHasUpVoted;
    let down = localHasDownVoted;

    if (down) {
      downVotes--;
      down = false;
    } else {
      downVotes++;
      down = true;
      if (up) {
        upVotes--;
        up = false;
      }
    }

    setLocalUpVotes(upVotes);
    setLocalHasUpVoted(up);
    setLocalDownVotes(downVotes);
    setLocalHasDownVoted(down);
    setLoading(true);

    try {
      await VoteService.downVote(blogId);
    } catch (err) {
      console.log(err);
      toast.error("Failed to vote. Try again.");
      setLocalUpVotes(prev.localUpVotes);
      setLocalHasUpVoted(prev.localHasUpVoted);
      setLocalDownVotes(prev.localDownVotes);
      setLocalHasDownVoted(prev.localHasDownVoted);
    } finally {
      setLoading(false);
    }
  };

  return {
    localUpVotes,
    localDownVotes,
    localHasUpVoted,
    localHasDownVoted,
    handleUpVote,
    handleDownVote,
    loading,
  };
};
