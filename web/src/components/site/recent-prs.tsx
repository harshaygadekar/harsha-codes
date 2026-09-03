"use client";

import { useEffect, useState } from "react";
import type { PullRequest } from "@/lib/github";

function GitHubPRIcon({
  state = "open",
  className = "w-4 h-4",
}: {
  state?: string;
  className?: string;
}) {
  if (state === "merged") {
    // GitHub merged PR icon (purple)
    return (
      <svg
        className={`${className} text-[#8250df] dark:text-[#a371f7] shrink-0 mt-0.5`}
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-label="Merged pull request"
      >
        <path d="M5 3.254V3.25a2.25 2.25 0 1 1 3 2.122V6.5a.75.75 0 0 1-1.5 0v-1.128A2.251 2.251 0 0 1 5 3.254Zm-1.5 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm6.75 2.496a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0-3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM5.75 10.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122v.378a.75.75 0 0 1-1.5 0v-.378A2.251 2.251 0 0 1 3.5 11.5Zm6.75-2.25a.75.75 0 0 1 .75.75v1.628a2.251 2.251 0 1 1-1.5 0V10a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
      </svg>
    );
  }

  if (state === "closed") {
    // GitHub closed PR icon (red)
    return (
      <svg
        className={`${className} text-[#cf222e] dark:text-[#f85149] shrink-0 mt-0.5`}
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-label="Closed pull request"
      >
        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
      </svg>
    );
  }

  // GitHub open PR icon (green)
  return (
    <svg
      className={`${className} text-[#1a7f37] dark:text-[#3fb950] shrink-0 mt-0.5`}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-label="Open pull request"
    >
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

export function RecentPullRequests({
  initialPrs = [],
}: {
  initialPrs: PullRequest[];
}) {
  const [prs, setPrs] = useState<PullRequest[]>(initialPrs);

  // Dynamically fetch recent PRs in the client to ensure real-time updates
  useEffect(() => {
    let isMounted = true;
    async function loadFreshPRs() {
      try {
        const res = await fetch("/api/github/prs");
        if (res.ok) {
          const data = (await res.json()) as PullRequest[];
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setPrs(data.slice(0, 3));
          }
        }
      } catch {
        // keep fallback/initial PRs
      }
    }

    loadFreshPRs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ul className="space-y-2.5 text-[14px] sm:text-[14.5px] leading-relaxed">
      {prs.map((pr) => (
        <li key={pr.id} className="flex items-start gap-2">
          <GitHubPRIcon state={pr.state} />
          <a
            href={pr.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="blue-link"
          >
            <span className="font-medium">{pr.repo}#{pr.number}</span>: {pr.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
