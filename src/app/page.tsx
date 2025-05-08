"use client"

import { useState, useEffect } from "react"
import type { Post } from "~/lib/mocks/types"

/* Components */
import Hero from "~/components/home/hero"
import Footer from "~/components/globals/footer"
import JoinCommunity from "~/components/home/join-community"
import StoryPreview from "~/components/modals/story-preview"
import ScenarioPreview from "~/components/modals/scenario-preview"
import NavBar from "~/components/globals/navbar"
import TopStories from "~/components/home/top-stories"
import TopScenarios from "~/components/home/top-scenarios"

/* Mocked data */
import { topScenarios, topStories } from "~/lib/mocks/topPostData"

export default function Home() {
  const [activeStory, setActiveStory] = useState<Post | null>(null)
  const [activeScenario, setActiveScenario] = useState<Post | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Hydration - only run client-side formatting after initial render
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Formatting function that only runs on client after hydration
  const formatNumber = (num: number) => {
    if (!isClient) return num.toString(); // During SSR, return simple string
    return num.toLocaleString(); // Only on client after hydration
  };

  const shortenTimeAgo = (timeAgo: string) => {
    if (!isClient || !timeAgo) return "";
    const parts = timeAgo.split(' ');
    if (parts.length >= 2) {
      return parts[0] + (parts[1]?.[0] ?? ''); // e.g., "3h", "5d"
    }
    return timeAgo; // fallback
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />

      <TopStories
        stories={topStories}
        onPreview={setActiveStory}
        formatNumber={formatNumber}
        shortenTimeAgo={shortenTimeAgo}
      />
      <TopScenarios
        scenarios={topScenarios}
        onPreview={setActiveScenario}
        formatNumber={formatNumber}
        shortenTimeAgo={shortenTimeAgo}
      />

      <JoinCommunity />
      <Footer />

      {/* Story Preview Modal */}
      {activeStory && <StoryPreview story={activeStory} onClose={() => setActiveStory(null)} />}

      {/* Scenario Preview Modal */}
      {activeScenario && <ScenarioPreview scenario={activeScenario} onClose={() => setActiveScenario(null)} />}
    </div>
  )
}