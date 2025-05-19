"use client";

import { useState } from "react";

/* Components */
import TopStories from "~/components/home/top-stories";
import TopScenarios from "~/components/home/top-scenarios";
import StoryPreview from "~/components/modals/story-preview";
import ScenarioPreview from "~/components/modals/scenario-preview";

/* Types */
import type { GetTopPostsWithAuthor } from "~/server/db/queries/posts";

interface InteractiveHomeContentProps {
    topStories: GetTopPostsWithAuthor | null;
    topScenarios: GetTopPostsWithAuthor | null;
}

export default function InteractiveHomeContent({ topStories, topScenarios }: InteractiveHomeContentProps) {
    const [activeStory, setActiveStory] = useState<GetTopPostsWithAuthor[number] | null>(null);
    const [activeScenario, setActiveScenario] = useState<GetTopPostsWithAuthor[number] | null>(null);

    const handleOpenStoryPreview = (story: GetTopPostsWithAuthor[number]) => {
        setActiveScenario(null);
        setActiveStory(story);
    };

    const handleOpenScenarioPreview = (scenario: GetTopPostsWithAuthor[number]) => {
        setActiveStory(null);
        setActiveScenario(scenario);
    };

    const handleCloseModals = () => {
        setActiveStory(null);
        setActiveScenario(null);
    };

    return (
        <>
            {topStories && (
                <TopStories
                    stories={topStories}
                    onStorySelect={handleOpenStoryPreview}
                />
            )}
            {topScenarios && (
                <TopScenarios
                    scenarios={topScenarios}
                    onScenarioSelect={handleOpenScenarioPreview}
                />
            )}

            {activeStory && (
                <StoryPreview
                    story={activeStory}
                    onClose={handleCloseModals}
                />
            )}
            {activeScenario && (
                <ScenarioPreview
                    scenario={activeScenario}
                    onClose={handleCloseModals}
                />
            )}
        </>
    );
}