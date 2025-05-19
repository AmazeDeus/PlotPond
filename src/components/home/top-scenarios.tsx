import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

/* Components */
import { Button } from "~/components/ui/button";
import ContentCard from "~/components/ui/content-card"; //

/* Types */
import type { GetTopPostsWithAuthor } from "~/server/db/queries/posts";

interface TopScenariosProps {
    scenarios: GetTopPostsWithAuthor;
    onScenarioSelect: (scenario: GetTopPostsWithAuthor[number]) => void;
}

export default function TopScenarios({ scenarios, onScenarioSelect }: TopScenariosProps) {
    return (
        <section className="py-16 container mx-auto px-4 bg-gradient-to-b from-gray-950 to-black rounded-xl my-10">
            <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 inline-flex items-center">
                    <Zap className="mr-3 h-10 w-10 text-pink-400" />
                    <span className="p-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
                        Trending Scenarios
                    </span>
                </h2>
                <p className="text-lg text-gray-400">Shape your destiny in these player-driven worlds and compelling what-if scenarios.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {scenarios.map(scenario => (
                    <ContentCard
                        key={scenario.id}
                        content={scenario}
                        author={scenario.author}
                        type="scenario"
                        onOpenPreview={() => onScenarioSelect(scenario)}
                    />
                ))}
            </div>
            <div className="mt-16 text-center">
                <Link href="/scenarios" passHref>
                    <Button variant="outline" size="lg" className="text-pink-300 border-pink-500 hover:bg-pink-500/20 hover:text-pink-200 hover:cursor-pointer group px-8 py-3">
                        Explore All Scenarios <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
                    </Button>
                </Link>
            </div>
        </section>
    )
} 