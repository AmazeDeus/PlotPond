import Image from "next/image"
import { ChevronRight, ThumbsUp, Eye, Star, Clock } from "lucide-react"

/* Components */
import { Card, CardFooter } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

/* Types */
import type { Post } from "~/lib/mocks/types"

interface ContentCardProps {
    content: Post
    type: 'story' | 'scenario'
    onPreview: (content: Post) => void
    formatNumber: (num: number) => string
    shortenTimeAgo: (timeAgo: string) => string
}

export default function ContentCard({ content, type, onPreview, formatNumber, shortenTimeAgo }: ContentCardProps) {
    const isStory = type === 'story'
    const accentColor = isStory ? 'purple' : 'pink'

    const displayedUsername = content.author.displayName ?? content.author.username
    const postExcerpt = content.excerpt ?? `${displayedUsername} worked hard on this ${type}. Greatness ahead! We think you might enjoy it! o(*￣︶￣*)o`

    // `https://future-cdn-or-s3-bucket-url.com/${content.image?.storageKey ?? placeholder.png}`;
    const imageUrl = `/mocks/${content.image?.storageKey ?? 'matrix_placeholder.png'}`;
    const profilePictureUrl = `/mocks/${content.author.profilePictureUrl ?? "/placeholder-avatar.png"}`

    const stats = isStory
        ? {
            likes: content.likes ?? 0,
            views: content.views ?? 0,
            timeAgo: content.timeAgo
        }
        : {
            stars: content.likes ?? 0,
            plays: content.views ?? 0,
            timeAgo: content.timeAgo
        }

    const renderStats = () => {
        if (isStory) {
            const storyStats = stats as { likes: number; views: number; timeAgo: string }
            return (
                <>
                    <span className="flex items-center" title={`${formatNumber(storyStats.likes)} likes`}>
                        <ThumbsUp className={`h-3.5 w-3.5 mr-1 text-${accentColor}-400/80`} /> {formatNumber(storyStats.likes)}
                    </span>
                    <span className="flex items-center" title={`${formatNumber(storyStats.views)} views`}>
                        <Eye className={`h-3.5 w-3.5 mr-1 text-${accentColor}-400/80`} /> {formatNumber(storyStats.views)}
                    </span>
                </>
            )
        }
        const scenarioStats = stats as { stars: number; plays: number; timeAgo: string }
        return (
            <>
                <span className="flex items-center" title={`${formatNumber(scenarioStats.stars)} stars`}>
                    <Star className={`h-3.5 w-3.5 mr-1 text-${accentColor}-400/80`} /> {formatNumber(scenarioStats.stars)}
                </span>
                <span className="flex items-center" title={`${formatNumber(scenarioStats.plays)} plays`}>
                    <Eye className={`h-3.5 w-3.5 mr-1 text-${accentColor}-400/80`} /> {formatNumber(scenarioStats.plays)}
                </span>
            </>
        )
    }

    return (
        <Card
            className={`bg-gray-900 border-2 border-gray-800/60 rounded-xl overflow-hidden group relative hover:border-${accentColor}-500/70 focus-within:border-${accentColor}-500/70 transition-all duration-300 flex flex-col shadow-lg hover:shadow-${accentColor}-500/20`}
        >
            <div className="relative will-change-transform transform-gpu overflow-clip w-full aspect-[3/4] sm:aspect-video md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4]">
                <Image
                    src={imageUrl ?? "/matrix_placeholder.png"}
                    alt={content.title}
                    fill
                    className="will-change-transform transform-gpu object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                    {content.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/30 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="absolute z-20 bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className={`font-semibold text-lg md:text-xl mb-1.5 line-clamp-2 leading-tight group-hover:text-${accentColor}-300 transition-colors duration-200`}>
                        {content.title}
                    </h3>
                    <div className="flex items-center">
                        <Avatar className={`h-6 w-6 mr-2 border-2 border-transparent group-hover:border-${accentColor}-400/70 transition-all duration-200`}>
                            <AvatarImage src={profilePictureUrl ?? "/placeholder_avatar.png"} alt="Profile image" />
                            <AvatarFallback className="text-xs bg-gray-700">
                                {displayedUsername.substring(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-300 group-hover:text-gray-100 transition-colors duration-200">
                            {displayedUsername}
                        </span>
                    </div>
                </div>

                {/* Subtle excerpt overlay on hover */}
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-black/60 via-black/70 to-black/90 cursor-pointer z-30"
                    onClick={() => onPreview(content)}
                >
                    <div className="max-w-[90%] text-center px-4 py-3 transform transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0">
                        <p className={`text-white font-normal text-sm md:text-base italic leading-relaxed line-clamp-4 text-opacity-90 drop-shadow-md`}>
                            <span className={`text-${accentColor}-300`}>❝ </span>{postExcerpt}<span className={`text-${accentColor}-300`}> ❞</span>
                        </p>
                        <div className={`w-1/3 h-px bg-gradient-to-r from-transparent via-${accentColor}-400/50 to-transparent mt-3 mb-2 mx-auto`}></div>
                        <div
                            className={`text-${accentColor}-200 hover:text-${accentColor}-100 opacity-40 text-xs font-medium transition-colors duration-200`}
                        >
                            - - - - - - - - - - -
                        </div>
                    </div>
                </div>
            </div>

            <CardFooter className="z-20 p-3 bg-inherit border-t border-gray-700/30 flex justify-between items-center mt-auto">
                <div className="flex items-center text-gray-400 text-xs space-x-3">
                    {renderStats()}
                    <span className="flex items-center" title={stats.timeAgo}>
                        <Clock className={`h-3.5 w-3.5 mr-1 text-${accentColor}-400/80`} /> {shortenTimeAgo(stats.timeAgo)}
                    </span>
                </div>
                <Button
                    variant="link"
                    size="sm"
                    aria-label={`View details for ${content.title}`}
                    className={`will-change-transform transform-gpu text-${accentColor}-400 hover:cursor-pointer hover:text-${accentColor}-300 p-0 h-auto text-xs font-semibold`}
                    onClick={() => onPreview(content)}
                >
                    Details <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                </Button>
            </CardFooter>
        </Card>
    )
}