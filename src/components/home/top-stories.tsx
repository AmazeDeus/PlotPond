import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

/* Components */
import { Button } from "~/components/ui/button"
import ContentCard from "~/components/ui/content-card"

/* Types */
import type { Post } from "~/lib/mocks/types"

interface TopStoriesProps {
    stories: Post[]
    onPreview: (story: Post) => void
    formatNumber: (num: number) => string
    shortenTimeAgo: (timeAgo: string) => string
}

export default function TopStories({ stories, onPreview, formatNumber, shortenTimeAgo }: TopStoriesProps) {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 inline-flex items-center">
                    <BookOpen className="mr-3 h-10 w-10 text-purple-400" />
                    <span className="p-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Trending Narratives
                    </span>
                </h2>
                <p className="text-lg text-gray-400">Dive into the most talked-about tales and captivating sagas crafted by our community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {stories.map((story) => (
                    <ContentCard
                        key={story.id}
                        content={story}
                        type="story"
                        onPreview={onPreview}
                        formatNumber={formatNumber}
                        shortenTimeAgo={shortenTimeAgo}
                    />
                ))}
            </div>
            <div className="mt-16 text-center">
                <Link href="/stories" passHref>
                    <Button variant="outline" size="lg" className="text-purple-300 border-purple-500 hover:bg-purple-500/20 hover:text-purple-200 hover:cursor-pointer group px-8 py-3">
                        Explore All Stories <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
                    </Button>
                </Link>
            </div>
        </section>
    )
} 